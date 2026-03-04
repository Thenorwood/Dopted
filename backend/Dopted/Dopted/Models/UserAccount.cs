namespace Dopted.Models
{
    public class UserAccount
    {
        public int Id { get; set; }//updated

        public string DisplayName { get; set; } = null!;

       
        public string Email { get; set; } = null!;

        // what kind of account this is
        public UserType UserType { get; set; } = UserType.Regular;

        //if they’re a shelter or have a site
        public string? WebsiteUrl { get; set; }        

        public ICollection<Pet> Pets { get; set; } = new List<Pet>();
    }
}