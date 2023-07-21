//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using Vlims.Administration.Manager;
    using Vlims.Common;
    using Vlims.Administration.Entities;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/plantmanagement")]
    public class PlantManagementController : ControllerBase
    {
        
        private readonly IPlantManagementService plantManagementService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="plantManagementService"></param>
        public PlantManagementController(IPlantManagementService plantManagementService)
        {
            this.plantManagementService = plantManagementService;
        }
        
        /// <summary>
        /// This method is used to Get List of PlantManagement
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost("GetAllPlantManagement")]
        public ActionResult<ResponseContext<PlantManagement>> GetAllPlantManagement(RequestContext requestContext)
        {
            var result = plantManagementService.GetAllPlantManagement(requestContext);
            return result;
        }
        
        /// <summary>
        /// This method is used to Get PlantManagement By Id pMId
        /// </summary>
        /// <param name="pMId"></param>
        [HttpGet("{pMId}")]
        public ActionResult<PlantManagement> GetPlantManagementByPMId(string pMId)
        {
            var result = plantManagementService.GetPlantManagementByPMId(pMId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Save PlantManagement
        /// </summary>
        /// <param name="plantManagement"></param>
        [HttpPost("saveplantmanagement")]
        public ActionResult<System.Boolean> SavePlantManagement(PlantManagement plantManagement)
        {
            var result = plantManagementService.SavePlantManagement(plantManagement);
            return result;
        }
        
        /// <summary>
        /// This Method is used to update PlantManagement
        /// </summary>
        /// <param name="plantManagement"></param>
        [HttpPost("updateplantmanagement")]
        public ActionResult<System.Boolean> UpdatePlantManagement(PlantManagement plantManagement)
        {
            var result = plantManagementService.UpdatePlantManagement(plantManagement);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete PlantManagement By Id pMId
        /// </summary>
        /// <param name="pMId"></param>
        [HttpDelete("{pMId}")]
        public ActionResult<bool> DeletePlantManagementByPMId(string pMId)
        {
            var result = plantManagementService.DeletePlantManagementByPMId(pMId);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete PlantManagement By Multiple ids pMIds
        /// </summary>
        /// <param name="pMIds"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAllPlantManagement(List<int> pMIds)
        {
            var result = plantManagementService.DeleteAllPlantManagement(pMIds);
            return result;
        }
    }
}
