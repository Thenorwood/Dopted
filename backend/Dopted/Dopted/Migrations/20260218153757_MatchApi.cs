using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dopted.Migrations
{
    /// <inheritdoc />
    public partial class MatchApi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactWebsite",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Pets",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "IsAdopted",
                table: "Pets",
                newName: "VaccinationStatus");

            migrationBuilder.RenameColumn(
                name: "ContactEmail",
                table: "Pets",
                newName: "ShelterName");

            migrationBuilder.RenameColumn(
                name: "AgeYears",
                table: "Pets",
                newName: "AgeMonths");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "UserAccounts",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalImagesCsv",
                table: "Pets",
                type: "nvarchar(4000)",
                maxLength: 4000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "AdoptionFee",
                table: "Pets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AdoptionStatus",
                table: "Pets",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateListed",
                table: "Pets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "HealthStatus",
                table: "Pets",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsUserListing",
                table: "Pets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "NeuteredStatus",
                table: "Pets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PosterEmail",
                table: "Pets",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PosterName",
                table: "Pets",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Pets",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "AdoptionRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PetId = table.Column<int>(type: "int", nullable: false),
                    PetName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdopterName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    AdopterEmail = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    AdopterPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PosterEmail = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdoptionRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdoptionRequests_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdoptionRequests_PetId",
                table: "AdoptionRequests",
                column: "PetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdoptionRequests");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "UserAccounts");

            migrationBuilder.DropColumn(
                name: "AdditionalImagesCsv",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "AdoptionFee",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "AdoptionStatus",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "DateListed",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "HealthStatus",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "IsUserListing",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "NeuteredStatus",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "PosterEmail",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "PosterName",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "VaccinationStatus",
                table: "Pets",
                newName: "IsAdopted");

            migrationBuilder.RenameColumn(
                name: "ShelterName",
                table: "Pets",
                newName: "ContactEmail");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Pets",
                newName: "PhotoUrl");

            migrationBuilder.RenameColumn(
                name: "AgeMonths",
                table: "Pets",
                newName: "AgeYears");

            migrationBuilder.AddColumn<string>(
                name: "ContactWebsite",
                table: "Pets",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
