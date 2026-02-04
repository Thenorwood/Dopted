namespace Dopted.Dtos
{
    public class PetCreateDto
    {
        public string Name { get; set; } = null!;
        public string Species { get; set; } = null!;
        public string Breed { get; set; } = null!;
        public int AgeYears { get; set; }
        public string Sex { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string PhotoUrl { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string ContactEmail { get; set; } = null!;
        public string? ContactWebsite { get; set; }
        public int OwnerUserAccountId { get; set; }
    }
}