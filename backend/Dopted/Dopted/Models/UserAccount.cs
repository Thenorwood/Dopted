namespace Dopted.Models
{
    public class UserAccount
    {
        public int Id { get; set; }//updated

        public string DisplayName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public string? WebsiteUrl { get; set; }
        //

        public ICollection<Pet> Pets { get; set; } = new List<Pet>();
    }
}