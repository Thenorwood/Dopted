namespace Dopted.Dtos
{
    public class PetUpdateDto
    {
        public string Name { get; set; } = null!;
        public string Species { get; set; } = null!;
        public string Breed { get; set; } = null!;
        public int AgeYears { get; set; }
        public string Sex { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string PhotoUrl { get; set; } = null!;
        public string Location { get; set; } = null!;
        public bool IsAdopted { get; set; }
        public string ContactEmail { get; set; } = null!;
        public string? ContactWebsite { get; set; }
    }
}
