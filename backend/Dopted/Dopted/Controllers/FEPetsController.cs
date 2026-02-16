using Dopted.Data;
using Dopted.Models;
using Dopted.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dopted.Controllers
{
    [Route("pets")] 
    [ApiController]
    public class FEPetsController : ControllerBase
    {
        private readonly DoptedContext _context;

        public FEPetsController(DoptedContext context)
        {
            _context = context;
        }

        // GET /pets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetExpDto>>> GetPets(
            [FromQuery] string? species,
            [FromQuery] string? location)
        {
            var query = _context.Pets.AsQueryable();

            // Filter out adopted pets (matches Express logic)
            query = query.Where(p => p.IsAdopted == false);

            if (!string.IsNullOrEmpty(species))
                query = query.Where(p => p.Species.ToLower() == species.ToLower());

            if (!string.IsNullOrEmpty(location))
                query = query.Where(p => p.Location.ToLower() == location.ToLower());

            var pets = await query.ToListAsync();

            return pets.Select(MapToExpDto).ToList();
        }

        // GET /pets/{pet_id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PetExpDto>> GetPet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);

            if (pet == null)
                return NotFound();

            return MapToExpDto(pet);
        }

        // Maps your database 
        private static PetExpDto MapToExpDto(Pet pet)
        {
            return new PetExpDto
            {
                pet_id = pet.Id,
                name = pet.Name,
                species = pet.Species,
                breed = pet.Breed,
                age = $"{pet.AgeYears} years",
                sex = pet.Sex,
                image_url = pet.PhotoUrl,
                location = pet.Location,
                description = pet.Description,
                adoption_status = pet.IsAdopted ? "adopted" : "available"
            };
        }
    }
}
