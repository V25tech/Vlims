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
    using Vlims.Entities.Common;
    using Vlims.Entities;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/securitymanagement")]
    public class SecurityManagementController : ControllerBase
    {
        
        private readonly ISecurityManagementService securityManagementService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="securityManagementService"></param>
        public SecurityManagementController(ISecurityManagementService securityManagementService)
        {
            this.securityManagementService = securityManagementService;
        }
        
        /// <summary>
        /// This method is used to Get List of SecurityManagement
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost()]
        public ActionResult<ResponseContext<SecurityManagement>> GetAllSecurityManagement(RequestContext requestContext)
        {
            var result = securityManagementService.GetAllSecurityManagement(requestContext);
            return result;
        }
        
        /// <summary>
        /// This method is used to Get SecurityManagement By Id sMId
        /// </summary>
        /// <param name="sMId"></param>
        [HttpGet("{sMId}")]
        public ActionResult<SecurityManagement> GetSecurityManagementBySMId(string sMId)
        {
            var result = securityManagementService.GetSecurityManagementBySMId(sMId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Save SecurityManagement
        /// </summary>
        /// <param name="securityManagement"></param>
        [HttpPost("savesecuritymanagement")]
        public ActionResult<System.Boolean> SaveSecurityManagement(SecurityManagement securityManagement)
        {
            var result = securityManagementService.SaveSecurityManagement(securityManagement);
            return result;
        }
        
        /// <summary>
        /// This Method is used to update SecurityManagement
        /// </summary>
        /// <param name="securityManagement"></param>
        [HttpPost("updatesecuritymanagement")]
        public ActionResult<System.Boolean> UpdateSecurityManagement(SecurityManagement securityManagement)
        {
            var result = securityManagementService.UpdateSecurityManagement(securityManagement);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete SecurityManagement By Id sMId
        /// </summary>
        /// <param name="sMId"></param>
        [HttpDelete("{sMId}")]
        public ActionResult<bool> DeleteSecurityManagementBySMId(string sMId)
        {
            var result = securityManagementService.DeleteSecurityManagementBySMId(sMId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete SecurityManagement By Multiple ids sMIds
        /// </summary>
        /// <param name="sMIds"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAllSecurityManagement(List<int> sMIds)
        {
            var result = securityManagementService.DeleteAllSecurityManagement(sMIds);
            return result;
        }
    }
}
