namespace Dopted.Models
{
    public class UserAccount
    {
        public int Id { get; set; }

        public string DisplayName { get; set; } = null!;
        public string Email { get; set; } = null!;

        // For demo 
        public string Password { get; set; } = null!;

        public UserType UserType { get; set; } = UserType.Regular;
        public string? WebsiteUrl { get; set; }

        public ICollection<Pet> Pets { get; set; } = new List<Pet>();
    }
}