namespace Dopted.Models
{
    public class Pet
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Species { get; set; } = null!;   //Dog or Cat

        public string Breed { get; set; } = null!;

        public int AgeYears { get; set; }

        public string Sex { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string PhotoUrl { get; set; } = null!;

        public string Location { get; set; } = null!;  

        public bool IsAdopted { get; set; }

        // Contact info forlisting
        public string ContactEmail { get; set; } = null!;
        public string? ContactWebsite { get; set; }

        // Owner (user / shelter who created the listing)
        public int OwnerUserAccountId { get; set; }

        public UserAccount Owner { get; set; } = null!;
    }
}
