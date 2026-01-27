using Dopted.Models;
using Microsoft.EntityFrameworkCore;

namespace Dopted.Data
{
    public class DoptedContext : DbContext
    {
        public DoptedContext(DbContextOptions<DoptedContext> options)
            : base(options)
        {
        }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
    }
}