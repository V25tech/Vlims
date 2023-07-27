

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PolicySummary.Sheet1.Services;
//using Serilog;
using Vlims.Administration.Manager;

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
                Title = "Admin API",
                Description = "API Used to Get or Set Information related to Admin Module In Ifoundry",

            });
        });
        AddAdminDependencies(services);
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
    private void AddAdminDependencies(IServiceCollection services)
    {
        //confiuguration settings
        //services.AddConfiguration(Configuration);
        //METHOD TO READ AND BUILD APPLICATION CONFIGURATION
        //appmgr.BuildIFSettings(services);
        //services.AddScoped<IRolesDao,RolesDao>();
        services.AddScoped<IDepartmentConfigurationService, DepartmentConfigurationService>();
        services.AddScoped<IRoleConfigurationService, RoleConfigurationService>();
        services.AddScoped<IUserConfigurationService, UserConfigurationService>();
        services.AddScoped<IworkitemsService, workitemsService>();
        services.AddScoped<ISecurityManagementService, SecurityManagementService>();
        services.AddScoped<IUserGroupConfigurationService, UserGroupConfigurationService>();
        services.AddScoped<IPlantManagementService, PlantManagementService>();

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
            c.SwaggerEndpoint("../swagger/v1/swagger.json", "Admin API V1");
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

