using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.Swagger;
using System.IO;

namespace PolicySummary.Sheet1.API.Extensions
{
    public static class SwaggerConfig
    {
        /*
By default swagger loading
--------------------------
Right click on solution 
properties -> debug ->
Lanuch Browser-> update it is "swagger"

for Comments
-------------
properties -> Build -> output ->
check the checkbox for the XML Documentation File
*/

        /// <summary>
        /// for swagger service configuration
        /// </summary>
        /// <param name="services"></param>
        /// <param name="xmlFile"></param>
        public static void AddSwaggerService(this IServiceCollection services, string xmlFile)
        {
            services.AddSwaggerGen(swOption =>
            {
                swOption.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "PolicySummary.Sheet1", Description = "PolicySummary.Sheet1", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                //var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                //swOption.IncludeXmlComments(xmlPath);
            });
        }

        /// <summary>
        /// Use Swagger in Middleware
        /// </summary>
        /// <param name="app"></param>
        public static void AddSwaggerMiddleware(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();
            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(u => u.SwaggerEndpoint("/swagger/v1/swagger.json", "dotnet Core"));
        }
    }
}
