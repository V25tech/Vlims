using Microsoft.OpenApi.Models;
using PolicySummary.DMS.Services;
using Vlims.DocumentManager.Manager;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        //services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = null);
        // Register the Swagger generator, defining 1 or more Swagger documents
        services.AddSwaggerGen(SWGenOptions =>
        {
            SWGenOptions.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Document Manager API",
                Description = "API Used to Get or Set Information related to Document Manager Module In Dlims",

            });
        });
        AddManagerDependencies(services);
        //services.AddApplicationInsights(Configuration);
        //services.AddApplicationInsightsTelemetry();
    }

    /// <summary>
    /// METHOD TO REGISTER DEPENDENCIES
    /// CREATED BY : Srikanth G
    /// CREATED DATE : 11 th May 2020
    /// MODIFIED BY: 
    /// MODIFIED DATE:
    /// MODIFY COMMENTS
    /// </summary>
    /// <param name="services"></param>
    private void AddManagerDependencies(IServiceCollection Services)
    {
        Services.AddControllers();
        Services.AddScoped<IDocumentManagerService, DocumentManagerService>();
        Services.AddScoped<IAdditionalTaskService, AdditionalTaskService>();
        Services.AddScoped<IDocumentEffectiveService, DocumentEffectiveService>();
        Services.AddScoped<IDocumentPreparationService, DocumentPreparationService>();
        Services.AddScoped<IDocumentrequestService, DocumentrequestService>();
        Services.AddScoped<IDocumentPrintService, DocumentPrintService>();
        Services.AddScoped<IExistingDocumentRequestService, ExistingDocumentRequestService>();
        Services.AddEndpointsApiExplorer();
        Services.AddSwaggerGen();
    }


    public void configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("../swagger/v1/swagger.json", "Document Manager API V1");
        });
        app.UseCors(x =>
        {
            x.AllowAnyOrigin()
            .AllowAnyHeader().AllowAnyMethod();
        });
        app.UseRouting();
        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    }
}

