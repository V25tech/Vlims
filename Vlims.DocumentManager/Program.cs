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
}
