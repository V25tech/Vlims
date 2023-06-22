//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    
    
    using Vlims.Services;
    using Vlims.Entities;
    using Vlims.Entities.Common;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/dashboardconfiguration")]
    public class dashboardconfigurationController : ControllerBase
    {
        
        private readonly IdashboardconfigurationService dashboardconfigurationService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dashboardconfigurationService"></param>
        public dashboardconfigurationController(IdashboardconfigurationService dashboardconfigurationService)
        {
            this.dashboardconfigurationService = dashboardconfigurationService;
        }
        
        /// <summary>
        /// This method is used to Get List of dashboardconfiguration
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost()]
        public ActionResult<ResponseContext<dashboardconfiguration>> GetAlldashboardconfiguration(RequestContext requestContext)
        {
            var result = dashboardconfigurationService.GetAlldashboardconfiguration(requestContext);
            return result;
        }
        
        /// <summary>
        /// This method is used to Get dashboardconfiguration By Id dCId
        /// </summary>
        /// <param name="dCId"></param>
        [HttpGet("{dCId}")]
        public ActionResult<dashboardconfiguration> GetdashboardconfigurationByDCId(int dCId)
        {
            var result = dashboardconfigurationService.GetdashboardconfigurationByDCId(dCId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Save dashboardconfiguration
        /// </summary>
        /// <param name="dashboardconfiguration"></param>
        [HttpPost("savedashboardconfiguration")]
        public ActionResult<System.Boolean> Savedashboardconfiguration(dashboardconfiguration dashboardconfiguration)
        {
            var result = dashboardconfigurationService.Savedashboardconfiguration(dashboardconfiguration);
            return result;
        }
        
        /// <summary>
        /// This Method is used to update dashboardconfiguration
        /// </summary>
        /// <param name="dashboardconfiguration"></param>
        [HttpPost("updatedashboardconfiguration")]
        public ActionResult<System.Boolean> Updatedashboardconfiguration(dashboardconfiguration dashboardconfiguration)
        {
            var result = dashboardconfigurationService.Updatedashboardconfiguration(dashboardconfiguration);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete dashboardconfiguration By Id dCId
        /// </summary>
        /// <param name="dCId"></param>
        [HttpDelete("{dCId}")]
        public ActionResult<bool> DeletedashboardconfigurationByDCId(int dCId)
        {
            var result = dashboardconfigurationService.DeletedashboardconfigurationByDCId(dCId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete dashboardconfiguration By Multiple ids dCIds
        /// </summary>
        /// <param name="dCIds"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAlldashboardconfiguration(List<int> dCIds)
        {
            var result = dashboardconfigurationService.DeleteAlldashboardconfiguration(dCIds);
            return result;
        }
    }
}
