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

        public DbSet<Pet> Pets { get; set; } = null!;
        public DbSet<UserAccount> UserAccounts { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            // UserAccount           
            modelBuilder.Entity<UserAccount>()
                        .HasIndex(u => u.Email)
                        .IsUnique();

            modelBuilder.Entity<UserAccount>()
                        .Property(u => u.DisplayName)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<UserAccount>()
                        .Property(u => u.Email)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<UserAccount>()
                        .Property(u => u.WebsiteUrl)
                        .HasMaxLength(500);


            // Pet
            modelBuilder.Entity<Pet>()
                        .Property(p => p.Name)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Species)
                        .HasMaxLength(20)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Breed)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Sex)
                        .HasMaxLength(20)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Description)
                        .HasMaxLength(2000)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.PhotoUrl)
                        .HasMaxLength(1000)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Location)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.ContactEmail)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.ContactWebsite)
                        .HasMaxLength(500);


            // Relationship: Pet -> UserAccount (Owner)
            modelBuilder.Entity<Pet>()
                        .HasOne(p => p.Owner)
                        .WithMany(u => u.Pets)
                        .HasForeignKey(p => p.OwnerUserAccountId)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}