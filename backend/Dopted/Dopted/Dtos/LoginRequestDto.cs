namespace Dopted.Dtos
{
    public class LoginRequestDto
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
    }

    public class RegisterRequestDto
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
        public string name { get; set; } = null!;
    }
}
