using VAMLibrary.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PolicySummary.Sheet1.API.Extensions
{
    /// <summary>
    /// 
    /// </summary>
    public static class DBConfig
    {
        /// <summary>
        /// RegisterDatabaseProvider
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void RegisterDatabaseProvider(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DBConnection");
            //if (configuration.GetValue<bool>("ElasticPoolConfig:IsEnabled"))
            //{
            //    //]connectionString = DBProvider.GetTenantConnString(configuration.GetValue<int>("ElasticPoolConfig:TenantId"),
            //    //connectionString);
            //}

            //services.AddSingleton(dbc =>
            //{
            //    return DBProvider.CreateDatabase(connectionString);
            //});
        }
    }
}
