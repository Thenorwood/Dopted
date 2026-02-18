namespace Dopted.Dtos
{
    public class CreatePetListingDto
    {
        public string name { get; set; } = null!;
        public string species { get; set; } = null!;
        public string? sex { get; set; }
        public string? breed { get; set; }
        public string? age { get; set; }
        public int? age_months { get; set; }
        public bool? neutered_status { get; set; }
        public string location { get; set; } = null!;
        public string province { get; set; } = null!;
        public int? adoption_fee { get; set; }
        public string? description { get; set; }
        public bool? vaccination_status { get; set; }
        public string? health_status { get; set; }
        public string? image_url { get; set; }
        public List<string>? additional_images { get; set; }
    }

}