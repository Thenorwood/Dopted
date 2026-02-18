namespace Dopted.Models
{
    public class Pet
    {
        public int Id { get; set; }                // maps to pet_id

        public string Name { get; set; } = null!;
        public string Species { get; set; } = null!;       // dog or cat
        public string Sex { get; set; } = null!;           // male, female, unknownm
        public string Breed { get; set; } = "Mixed";

        public int AgeMonths { get; set; }

        public string ImageUrl { get; set; } = null!;

        public string AdditionalImagesCsv { get; set; } = "";

        public bool NeuteredStatus { get; set; }

        public string Location { get; set; } = null!;
        public string Province { get; set; } = null!;     

        public int AdoptionFee { get; set; }

        public string Description { get; set; } = null!;
        public bool VaccinationStatus { get; set; }
        public string HealthStatus { get; set; } = "Unknown";

        public string ShelterName { get; set; } = "Private Listing";

        public string AdoptionStatus { get; set; } = "available"; 

        public DateTime DateListed { get; set; } = DateTime.UtcNow;

        // Ownership / listings
        public bool IsUserListing { get; set; }
        public string? PosterEmail { get; set; }
        public string? PosterName { get; set; }
        public int OwnerUserAccountId { get; set; }
        public UserAccount Owner { get; set; } = null!;
    }
}