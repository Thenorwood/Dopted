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
        public DbSet<AdoptionRequest> AdoptionRequests { get; set; } = null!;

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
                        .Property(u => u.PasswordHash)
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
                        .Property(p => p.Sex)
                        .HasMaxLength(20)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Breed)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.ImageUrl)
                        .HasMaxLength(1000)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.AdditionalImagesCsv)
                        .HasMaxLength(4000);

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Location)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Province)
                        .HasMaxLength(10)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.Description)
                        .HasMaxLength(2000)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.HealthStatus)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.ShelterName)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.AdoptionStatus)
                        .HasMaxLength(20)
                        .IsRequired();

            modelBuilder.Entity<Pet>()
                        .Property(p => p.PosterEmail)
                        .HasMaxLength(200);

            modelBuilder.Entity<Pet>()
                        .Property(p => p.PosterName)
                        .HasMaxLength(200);

            // Relationship: Pet -> UserAccount
            modelBuilder.Entity<Pet>()
                        .HasOne(p => p.Owner)
                        .WithMany(u => u.Pets)
                        .HasForeignKey(p => p.OwnerUserAccountId)
                        .OnDelete(DeleteBehavior.Restrict);
            
            // AdoptionRequest
            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.PetName)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.AdopterName)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.AdopterEmail)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.Message)
                        .HasMaxLength(2000);

            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.Status)
                        .HasMaxLength(20)
                        .IsRequired();

            modelBuilder.Entity<AdoptionRequest>()
                        .Property(a => a.PosterEmail)
                        .HasMaxLength(200)
                        .IsRequired();

            modelBuilder.Entity<AdoptionRequest>()
                        .HasOne(a => a.Pet)
                        .WithMany()
                        .HasForeignKey(a => a.PetId)
                        .OnDelete(DeleteBehavior.Cascade);
        }
    }
}