namespace Dopted.Models
{
    public class UserAccount
    {
        public int Id { get; set; }

      
        public string DisplayName { get; set; } = null!;

       
        public string Email { get; set; } = null!;

        //(if they’re a shelter or have a site)
        public string? WebsiteUrl { get; set; }

        // Navigation: all pets this user has listed
        public ICollection<Pet> Pets { get; set; } = new List<Pet>();

    }
}
