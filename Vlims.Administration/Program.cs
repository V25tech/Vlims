using PolicySummary.Sheet1.Services;
using System.Text.Json.Serialization;
using Vlims.Administration.Manager;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers().AddJsonOptions(opt =>
        {
            opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            opt.JsonSerializerOptions.IgnoreNullValues = true;
            opt.JsonSerializerOptions.PropertyNamingPolicy = null;
        });

        builder.Services.AddScoped<IDepartmentConfigurationService, DepartmentConfigurationService>();
        builder.Services.AddScoped<IRoleConfigurationService, RoleConfigurationService>();
        builder.Services.AddScoped<IUserConfigurationService, UserConfigurationService>();
        builder.Services.AddScoped<IworkitemsService, workitemsService>();
        builder.Services.AddScoped<ISecurityManagementService, SecurityManagementService>();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.UseCors(x =>
        {
            x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}