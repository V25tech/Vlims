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
    using Vlims.Common;
    using Vlims.DMS.Entities;
    using Vlims.DocumentManager.Manager;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/documentpreparation")]
    public class DocumentPreparationController : ControllerBase
    {
        
        private readonly IDocumentPreparationService documentPreparationService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="documentPreparationService"></param>
        public DocumentPreparationController(IDocumentPreparationService documentPreparationService)
        {
            this.documentPreparationService = documentPreparationService;
        }
        
        /// <summary>
        /// This method is used to Get List of DocumentPreparation
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost()]
        public ActionResult<ResponseContext<DocumentPreparation>> GetAllDocumentPreparation(RequestContext requestContext)
        {
            var result = documentPreparationService.GetAllDocumentPreparation(requestContext);
            return result;
        }
        
        /// <summary>
        /// This method is used to Get DocumentPreparation By Id dPNID
        /// </summary>
        /// <param name="dPNID"></param>
        [HttpGet("{dPNID}")]
        public ActionResult<DocumentPreparation> GetDocumentPreparationByDPNID(string dPNID)
        {
            var result = documentPreparationService.GetDocumentPreparationByDPNID(dPNID);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Save DocumentPreparation
        /// </summary>
        /// <param name="documentPreparation"></param>
        [HttpPost("savedocumentpreparation")]
        public ActionResult<System.Boolean> SaveDocumentPreparation(DocumentPreparation documentPreparation)
        {
            var result = documentPreparationService.SaveDocumentPreparation(documentPreparation);
            return result;
        }
        
        /// <summary>
        /// This Method is used to update DocumentPreparation
        /// </summary>
        /// <param name="documentPreparation"></param>
        [HttpPost("updatedocumentpreparation")]
        public ActionResult<System.Boolean> UpdateDocumentPreparation(DocumentPreparation documentPreparation)
        {
            var result = documentPreparationService.UpdateDocumentPreparation(documentPreparation);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete DocumentPreparation By Id dPNID
        /// </summary>
        /// <param name="dPNID"></param>
        [HttpDelete("{dPNID}")]
        public ActionResult<bool> DeleteDocumentPreparationByDPNID(string dPNID)
        {
            var result = documentPreparationService.DeleteDocumentPreparationByDPNID(dPNID);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete DocumentPreparation By Multiple ids dPNIDs
        /// </summary>
        /// <param name="dPNIDs"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAllDocumentPreparation(List<int> dPNIDs)
        {
            var result = documentPreparationService.DeleteAllDocumentPreparation(dPNIDs);
            return result;
        }
    }
}
