using PolicySummary.Sheet1.Services;
using System.Text.Json.Serialization;
using Vlims.Administration.Manager;
using Microsoft.Extensions.Logging.AzureAppServices;

internal class Program
{
    private static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration(config =>
        {
            config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: false);
        })
    .ConfigureLogging(logging => logging.AddAzureWebAppDiagnostics())
        .ConfigureServices(servicescollection => servicescollection
        .Configure<AzureFileLoggerOptions>(options =>
        {
            options.FileName = "azure-diagnostics-";
            options.FileSizeLimit = 50 * 1024;
            options.RetainedFileCountLimit = 5;
        })
        .Configure<AzureBlobLoggerOptions>(options =>
        {
            options.BlobName = "log.txt";
        }))
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

    //    var builder = WebApplication.CreateBuilder(args);

    //    // Add services to the container.

    //    builder.Services.AddControllers().AddJsonOptions(opt =>
    //    {
    //        opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    //        opt.JsonSerializerOptions.IgnoreNullValues = true;
    //        opt.JsonSerializerOptions.PropertyNamingPolicy = null;
    //    });

    //    builder.Services.AddScoped<IDepartmentConfigurationService, DepartmentConfigurationService>();
    //    builder.Services.AddScoped<IRoleConfigurationService, RoleConfigurationService>();
    //    builder.Services.AddScoped<IUserConfigurationService, UserConfigurationService>();
    //    builder.Services.AddScoped<IworkitemsService, workitemsService>();
    //    builder.Services.AddScoped<ISecurityManagementService, SecurityManagementService>();
    //    builder.Services.AddScoped<IUserGroupConfigurationService, UserGroupConfigurationService>();
    //    builder.Services.AddScoped<IPlantManagementService, PlantManagementService>();
    //    builder.Services.AddControllers();
    //    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    //    builder.Services.AddEndpointsApiExplorer();
    //    builder.Services.AddSwaggerGen();

    //    var app = builder.Build();

    //    app.UseCors(x =>
    //    {
    //        x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    //    });
    //    // Configure the HTTP request pipeline.
    //    if (app.Environment.IsDevelopment())
    //    {
    //        app.UseSwagger();
    //        app.UseSwaggerUI();
    //    }

    //    app.UseHttpsRedirection();

    //    app.UseAuthorization();

    //    app.MapControllers();

    //    app.Run();
    //}
}