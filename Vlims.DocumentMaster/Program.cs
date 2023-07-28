using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging.AzureAppServices;
using System.Text.Json.Serialization;
using Vlims.DocumentMaster.Manager;

internal class Program
{
    #region Commented Region
    //private static void Main(string[] args)
    //{

    //    //var builder = WebApplication.CreateBuilder(args);

    //    //// Add services to the container.

    //    //builder.Services.AddControllers().AddJsonOptions(opt =>
    //    //{
    //    //    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    //    //    opt.JsonSerializerOptions.IgnoreNullValues = true;
    //    //    opt.JsonSerializerOptions.PropertyNamingPolicy = null;
    //    //});

    //    //builder.Services.AddScoped<IDocumentTypeConfigurationService, DocumentTypeConfigurationService>();
    //    //builder.Services.AddScoped<IDocumentTemplateConfigurationService, DocumentTemplateConfigurationService>();
    //    //builder.Services.AddScoped<IworkflowconigurationService, workflowconigurationService>();
    //    //// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    //    //builder.Services.AddEndpointsApiExplorer();
    //    //builder.Services.AddSwaggerGen();

    //    //var app = builder.Build();

    //    //app.UseCors(x =>
    //    //{
    //    //    x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    //    //});
    //    //// Configure the HTTP request pipeline.
    //    //if (app.Environment.IsDevelopment())
    //    //{
    //    //    app.UseSwagger();
    //    //    app.UseSwaggerUI();
    //    //}

    //    //app.UseHttpsRedirection();

    //    //app.UseAuthorization();

    //    //app.MapControllers();

    //    //app.Run();
    //} 
    #endregion
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
}
