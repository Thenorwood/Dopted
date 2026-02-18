namespace Dopted.Dtos
{
    public class PetExpDto
    {
        public int pet_id { get; set; }
        public string name { get; set; } = null!;
        public string species { get; set; } = null!;
        public string sex { get; set; } = null!;
        public string breed { get; set; } = null!;
        public string age { get; set; } = null!;
        public string age_group { get; set; } = null!;
        public int age_months { get; set; }
        public string image_url { get; set; } = null!;
        public List<string> additional_images { get; set; } = new();

        public bool neutered_status { get; set; }

        public string location { get; set; } = null!;
        public string province { get; set; } = null!;

        public int adoption_fee { get; set; }

        public string description { get; set; } = null!;
        public bool vaccination_status { get; set; }
        public string health_status { get; set; } = null!;
        public string shelter_name { get; set; } = null!;

        public string adoption_status { get; set; } = null!;
        public string date_listed { get; set; } = null!;

        public string? poster_name { get; set; }
        public string? poster_email { get; set; }
        public string? poster_phone { get; set; }

        public bool is_user_listing { get; set; }
    }
}