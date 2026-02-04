using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dopted.Migrations
{
    /// <inheritdoc />
    public partial class AddUserTypeToUserAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "UserAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "UserAccounts");
        }
    }
}
