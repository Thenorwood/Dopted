namespace Dopted.Models
{
    public class AdoptionRequest
    {
        public int Id { get; set; } 

        public int PetId { get; set; }
        public Pet Pet { get; set; } = null!;

        public string PetName { get; set; } = null!;

        public string AdopterName { get; set; } = null!;
        public string AdopterEmail { get; set; } = null!;
        public string? AdopterPhone { get; set; }

        public string Message { get; set; } = "";

        public string Status { get; set; } = "pending";
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        public string PosterEmail { get; set; } = null!;
    }
}