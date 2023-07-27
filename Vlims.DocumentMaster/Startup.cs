

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using Vlims.DocumentMaster.Manager;

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
        //services.AddControllers();
        services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = null);
        // Register the Swagger generator, defining 1 or more Swagger documents
        services.AddSwaggerGen(SWGenOptions =>
        {
            SWGenOptions.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Document Master API",
                Description = "API Used to Get or Set Information related to Document Master Module In Dlims",

            });
        });
        AddMasterDependencies(services);
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
    private void AddMasterDependencies(IServiceCollection Services)
    {
        Services.AddControllers().AddJsonOptions(opt =>
        {
            opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            opt.JsonSerializerOptions.IgnoreNullValues = true;
            opt.JsonSerializerOptions.PropertyNamingPolicy = null;
        });
        Services.AddScoped<IDocumentTypeConfigurationService, DocumentTypeConfigurationService>();
        Services.AddScoped<IDocumentTemplateConfigurationService, DocumentTemplateConfigurationService>();
        Services.AddScoped<IworkflowconigurationService, workflowconigurationService>();
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
            c.SwaggerEndpoint("../swagger/v1/swagger.json", "Document Master API V1");
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

