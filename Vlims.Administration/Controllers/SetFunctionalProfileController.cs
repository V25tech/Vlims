    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Vlims.Administration.Entities;
using Vlims.Administration.Manager;
    using Vlims.Common;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/SetFunctionalProfile")]
    public class SetFunctionalProfileController : ControllerBase
    {
        
        private readonly ISetFunctionalProfileService functionalConfigurationService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="functionalConfigurationService"></param>
        public SetFunctionalProfileController(ISetFunctionalProfileService setfunctionalprofileConfigurationService)
        {
            this.functionalConfigurationService = setfunctionalprofileConfigurationService;
        }
        
        /// <summary>
        /// This method is used to Get List of DepartmentConfiguration
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost("getallprofileconfig")]
        public ActionResult GetAllSetFunctionalProfile([FromQuery] RequestContext requestContext)
        {
            var result = functionalConfigurationService.GetAllSetFunctionalProfile(requestContext);
            return Ok(result);
        }
        
        ///// <summary>
        ///// This method is used to Get DepartmentConfiguration By Id dPCFId
        ///// </summary>
        ///// <param name="dPCFId"></param>
        //[HttpGet("{dPCFId}")]
        //public ActionResult<SetFunctionalProfile> GetFunctionalProfileConfigByDPCFId(int dPCFId)
        //{
        //    var result = functionalConfigurationService.GetSetFunctionalProfileBySFPID(dPCFId);
        //    return result;
        //}
        
        /// <summary>
        /// This Method is used to Save DepartmentConfiguration
        /// </summary>
        /// <param name="departmentConfiguration"></param>
        [HttpPost("saveprofileconfiguration")]
        public ActionResult<bool> SaveSetFunctionalProfile(SetFunctionalProfile profileConfiguration)
        {
       
            var result = functionalConfigurationService.SaveSetFunctionalProfile(profileConfiguration);
            return result;
        }
        ///// <summary>
        ///// This method is used to Get DocumentTypeConfiguration By Id dTCId
        ///// </summary>
        ///// <param name="dTCId"></param>
        //[HttpGet("getbyId")]
        //public ActionResult<SetFunctionalProfile> GetDocumentTypeConfigurationByDTCId(int dTCId)
        //{
        //    var result = functionalConfigurationService.GetSetFunctionalProfileBySFPID(dTCId);
        //    return result;
        //}
        /// <summary>
        /// This Method is used to update DepartmentConfiguration
        /// </summary>
        /// <param name="departmentConfiguration"></param>
        [HttpPost("updateprofileconfiguration")]
        public ActionResult<System.Boolean> UpdateSetFunctionalProfile(SetFunctionalProfile departmentConfiguration)
        {
            var result = functionalConfigurationService.UpdateSetFunctionalProfile(departmentConfiguration);
            return result;
        }
        
        ///// <summary>
        ///// This Method is used to Delete DepartmentConfiguration By Id dPCFId
        ///// </summary>
        ///// <param name="dPCFId"></param>
        //[HttpDelete("{dPCFId}")]
        //public ActionResult<bool> DeleteDepartmentConfigurationByDPCFId(string dPCFId)
        //{
        //    var result = functionalConfigurationService.DeleteSetFunctionalProfileBySFPID(dPCFId);
        //    return result;
        //}
        
        ///// <summary>
        ///// This Method is used to Delete DepartmentConfiguration By Multiple ids dPCFIds
        ///// </summary>
        ///// <param name="dPCFIds"></param>
        //[HttpDelete("deleteAll")]
        //public ActionResult<bool> DeleteAllDepartmentConfiguration(List<int> dPCFIds)
        //{
        //    var result = functionalConfigurationService.DeleteAllDepartmentConfiguration(dPCFIds);
        //    return result;
        //}
        
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="hMId"></param>
        //[HttpGet("getDepartmentConfigurationByHierarchyManagementId/{hMId}")]
        //public ActionResult<List<DepartmentConfiguration>> GetDepartmentConfigurationByHierarchyManagementId(System.Int32? hMId)
        //{
        //    var result = functionalConfigurationService.GetDepartmentConfigurationByHierarchyManagementId(hMId);
        //    return result;
        //}
        
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="hMId"></param>
        //[HttpDelete("deleteDepartmentConfigurationByHierarchyManagementId/{hMId}")]
        //public ActionResult<bool> DeleteDepartmentConfigurationByHierarchyManagementId(System.Int32? hMId)
        //{
        //    var result = functionalConfigurationService.DeleteDepartmentConfigurationByHierarchyManagementId(hMId);
        //    return result;
        //}
    }

