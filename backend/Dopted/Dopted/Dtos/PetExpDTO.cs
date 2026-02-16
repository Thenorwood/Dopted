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
        public string image_url { get; set; } = null!;
        public string location { get; set; } = null!;
        public string province { get; set; } = "NS";
        public int adoption_fee { get; set; } = 0;
        public string description { get; set; } = null!;
        public bool vaccination_status { get; set; } = false;
        public string health_status { get; set; } = "Unknown";
        public string adoption_status { get; set; } = "available";
        public string date_listed { get; set; } = "";
    }
}
