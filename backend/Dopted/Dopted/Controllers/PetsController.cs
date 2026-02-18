using Dopted.Data;
using Dopted.Dtos;
using Dopted.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dopted.Controllers
{
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly DoptedContext _context;

        public PetsController(DoptedContext context)
        {
            _context = context;
        }

        // ROUTES
        //   GET    /pets
        //   GET    /pets/{pet_id}
        //   POST   /pets                 (login required)
        //   PATCH  /pets/{pet_id}/adopt   (login required)
        //   DELETE /pets/{pet_id}         (login required)
        //   GET    /my-listings           (login required)
        //   POST   /adoption-requests     (login required)

        private async Task<UserAccount?> AuthenticateAsync()
        {
            if (!Request.Headers.TryGetValue("email", out var emailHeader))
                return null;

            var email = emailHeader.ToString();

            var user = await _context.UserAccounts
                                     .FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }

        // GET /pets?species=&location=&province=
        [HttpGet("pets")]
        public async Task<ActionResult<IEnumerable<PetExpDto>>> GetPets(
            [FromQuery] string? species,
            [FromQuery] string? location,
            [FromQuery] string? province)
        {
            var query = _context.Pets.AsQueryable();

            //filter out adopted pets
            query = query.Where(p => p.AdoptionStatus != "adopted");

            if (!string.IsNullOrWhiteSpace(species))
                query = query.Where(p => p.Species.ToLower() == species.ToLower());

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(p => p.Location.ToLower() == location.ToLower());

            if (!string.IsNullOrWhiteSpace(province))
                query = query.Where(p => p.Province.ToLower() == province.ToLower());

            var pets = await query.ToListAsync();

            var randomized = pets.OrderBy(_ => Guid.NewGuid()).ToList();

            return randomized.Select(MapToExpDto).ToList();
        }

        // GET /pets/{pet_id}
        [HttpGet("pets/{pet_id:int}")]
        public async Task<ActionResult<PetExpDto>> GetPet(int pet_id)
        {
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == pet_id);

            if (pet == null)
                return NotFound(new { error = "Pet not found" });

            return MapToExpDto(pet);
        }

        // POST /pets   (login required)
        [HttpPost("pets")]
        public async Task<IActionResult> CreatePetListing([FromBody] CreatePetListingDto dto)
        {
            var user = await AuthenticateAsync();
            if (user == null)
                return Unauthorized(new { error = "Missing credentials" });

            // Required fields (match teammate)
            if (string.IsNullOrWhiteSpace(dto.name) ||
                string.IsNullOrWhiteSpace(dto.species) ||
                string.IsNullOrWhiteSpace(dto.location) ||
                string.IsNullOrWhiteSpace(dto.province))
            {
                return BadRequest(new { error = "Required fields: name, species, location, province" });
            }

            var ageMonths = dto.age_months ?? 0;

            var pet = new Pet
            {
                Name = dto.name,
                Species = dto.species.ToLower(),
                Sex = dto.sex ?? "unknown",
                Breed = dto.breed ?? "Mixed",

                AgeMonths = ageMonths,

                ImageUrl = dto.image_url ?? "http://example.com/images/default_pet.jpg",
                AdditionalImagesCsv = (dto.additional_images == null || dto.additional_images.Count == 0)
                                       ? ""
                                       : string.Join(",", dto.additional_images),

                NeuteredStatus = dto.neutered_status ?? false,

                Location = dto.location,
                Province = dto.province.ToUpper(),

                AdoptionFee = dto.adoption_fee ?? 0,

                Description = dto.description ?? "No description provided.",
                VaccinationStatus = dto.vaccination_status ?? false,
                HealthStatus = dto.health_status ?? "Unknown",

                ShelterName = "Private Listing",
                AdoptionStatus = "available",
                DateListed = DateTime.UtcNow,

                IsUserListing = true,
                PosterName = user.DisplayName,
                PosterEmail = user.Email,

                OwnerUserAccountId = user.Id
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                message = "Pet listing created successfully",
                listing = MapToExpDto(pet)
            });
        }

        // PATCH /pets/{pet_id}/adopt   (login required)
        [HttpPatch("pets/{pet_id:int}/adopt")]
        public async Task<IActionResult> MarkAsAdopted(int pet_id)
        {
            var user = await AuthenticateAsync();
            if (user == null)
                return Unauthorized(new { error = "Missing credentials" });

            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == pet_id);

            if (pet == null || pet.PosterEmail != user.Email)
                return NotFound(new { error = "Listing not found or not owned by you" });

            pet.AdoptionStatus = "adopted";
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Pet marked as adopted successfully",
                listing = MapToExpDto(pet)
            });
        }

        // DELETE /pets/{pet_id}   (login required)
        [HttpDelete("pets/{pet_id:int}")]
        public async Task<IActionResult> DeleteListing(int pet_id)
        {
            var user = await AuthenticateAsync();
            if (user == null)
                return Unauthorized(new { error = "Missing credentials" });

            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == pet_id);

            if (pet == null || pet.PosterEmail != user.Email)
                return NotFound(new { error = "Listing not found or not owned by you" });

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Listing deleted successfully",
                listing = MapToExpDto(pet)
            });
        }

        // GET /my-listings   (login required)
        [HttpGet("my-listings")]
        public async Task<IActionResult> GetMyListings()
        {
            var user = await AuthenticateAsync();
            if (user == null)
                return Unauthorized(new { error = "Missing credentials" });

            var mine = await _context.Pets
                                     .Where(p => p.PosterEmail == user.Email)
                                     .ToListAsync();

            return Ok(mine.Select(MapToExpDto).ToList());
        }

        // POST /adoption-requests   (login required)

        [HttpPost("adoption-requests")]
        public async Task<IActionResult> CreateAdoptionRequest([FromBody] CreateAdoptionRequestDto dto)
        {
            var user = await AuthenticateAsync();
            if (user == null)
                return Unauthorized(new { error = "Missing credentials" });

            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == dto.pet_id);

            if (pet == null)
                return NotFound(new { error = "Pet not found" });

            Console.WriteLine($"\n=== EMAIL SIMULATION ===" +
                              $"\nTo: {pet.PosterEmail ?? "shelter@example.com"}" +
                              $"\nAdopter: {user.DisplayName} ({user.Email})" +
                              $"\nPet: {pet.Name}" +
                              $"\nMessage: {dto.message ?? "No message"}" +
                              $"\n======================\n");

            return StatusCode(201, new
            {
                message = "Adoption request submitted successfully",
                request = new
                {
                    request_id = 0,
                    pet_id = pet.Id,
                    pet_name = pet.Name,
                    adopter_name = user.DisplayName,
                    adopter_email = user.Email,
                    adopter_phone = (string?)null,
                    message = dto.message ?? "",
                    status = "pending",
                    submitted_at = DateTime.UtcNow.ToString("o"),
                    poster_email = pet.PosterEmail ?? "shelter@example.com"
                }
            });
        }

        private static PetExpDto MapToExpDto(Pet pet)
        {
            return new PetExpDto
            {
                pet_id = pet.Id,
                name = pet.Name,
                species = pet.Species,
                sex = pet.Sex,
                breed = pet.Breed,

                age = FormatAge(pet.AgeMonths),
                age_group = GetAgeGroup(pet.Species, pet.AgeMonths),

                image_url = pet.ImageUrl,
                location = pet.Location,
                province = pet.Province,

                adoption_fee = pet.AdoptionFee,
                description = pet.Description,

                vaccination_status = pet.VaccinationStatus,
                health_status = pet.HealthStatus,

                adoption_status = pet.AdoptionStatus,
                date_listed = pet.DateListed.ToString("yyyy-MM-dd")
            };
        }

        private static string GetAgeGroup(string species, int ageMonths)
        {
            if (ageMonths <= 12)
                return species.ToLower() == "dog" ? "puppy" : "kitten";

            return "adult";
        }

        private static string FormatAge(int ageMonths)
        {
            if (ageMonths <= 0)
                return "Unknown";

            if (ageMonths < 12)
                return $"{ageMonths} months";

            var years = ageMonths / 12;
            return $"{years} years";
        }
    }
}