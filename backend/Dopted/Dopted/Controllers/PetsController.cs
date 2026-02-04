using Dopted.Data;
using Dopted.Dtos;
using Dopted.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dopted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly DoptedContext _context;

        public PetsController(DoptedContext context)
        {
            _context = context;
        }

        // GET: api/pets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pet>>> GetPets()
        {
            return await _context.Pets.ToListAsync();
        }

        // GET: api/pets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pet>> GetPet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();

            return pet;
        }

        // POST: api/pets
        [HttpPost]
        public async Task<ActionResult<Pet>> PostPet(PetCreateDto dto)
        /*
             We use a DTO here instead of accepting the Pet entity directly.
              - Prevents overposting (client cannot set Id, IsAdopted, or navigation properties)
              - Separates API input shape from database model
              - Allows validation and business rules without exposing EF internals
              - Makes the API safer and easier to evolve in the future
         */

        // Ensure the owner (user/shelter) actually exists
        {
            var ownerExists = await _context.UserAccounts
                                            .AnyAsync(u => u.Id == dto.OwnerUserAccountId);

            if (!ownerExists)
                return BadRequest($"OwnerUserAccountId {dto.OwnerUserAccountId} does not exist.");


        // Map DTO -> Entity
        // Only fields allowed by API copied
            var pet = new Pet
            {
                Name = dto.Name,
                Species = dto.Species,
                Breed = dto.Breed,
                AgeYears = dto.AgeYears,
                Sex = dto.Sex,
                Description = dto.Description,
                PhotoUrl = dto.PhotoUrl,
                Location = dto.Location,
                IsAdopted = false,
                ContactEmail = dto.ContactEmail,
                ContactWebsite = dto.ContactWebsite,
                OwnerUserAccountId = dto.OwnerUserAccountId
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            // Return 201 Created with a route to the newly created resource
            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
        }

        // PUT: api/pets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPet(int id, PetUpdateDto dto)
        {
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == id);
            if (pet == null)
                return NotFound();

            pet.Name = dto.Name;
            pet.Species = dto.Species;
            pet.Breed = dto.Breed;
            pet.AgeYears = dto.AgeYears;
            pet.Sex = dto.Sex;
            pet.Description = dto.Description;
            pet.PhotoUrl = dto.PhotoUrl;
            pet.Location = dto.Location;
            pet.IsAdopted = dto.IsAdopted;

            pet.ContactEmail = dto.ContactEmail;
            pet.ContactWebsite = dto.ContactWebsite;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/pets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
