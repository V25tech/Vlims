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
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    using PolicySummary.Sheet1.Services;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/documentrequest")]
    public class DocumentrequestController : ControllerBase
    {
        
        private readonly IDocumentrequestService documentrequestService;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="documentrequestService"></param>
        public DocumentrequestController(IDocumentrequestService documentrequestService)
        {
            this.documentrequestService = documentrequestService;
        }
        
        /// <summary>
        /// This method is used to Get List of Documentrequest
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost()]
        public ActionResult<ResponseContext<Documentrequest>> GetAllDocumentrequest(RequestContext requestContext)
        {
            var result = documentrequestService.GetAllDocumentrequest(requestContext);
            return result;
        }
        
        /// <summary>
        /// This method is used to Get Documentrequest By Id dRID
        /// </summary>
        /// <param name="dRID"></param>
        [HttpGet("{dRID}")]
        public ActionResult<Documentrequest> GetDocumentrequestByDRID(string dRID)
        {
            var result = documentrequestService.GetDocumentrequestByDRID(dRID);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Save Documentrequest
        /// </summary>
        /// <param name="documentrequest"></param>
        [HttpPost("savedocumentrequest")]
        public ActionResult<System.Boolean> SaveDocumentrequest(Documentrequest documentrequest)
        {
            var result = documentrequestService.SaveDocumentrequest(documentrequest);
            return result;
        }
        
        /// <summary>
        /// This Method is used to update Documentrequest
        /// </summary>
        /// <param name="documentrequest"></param>
        [HttpPost("updatedocumentrequest")]
        public ActionResult<System.Boolean> UpdateDocumentrequest(Documentrequest documentrequest)
        {
            var result = documentrequestService.UpdateDocumentrequest(documentrequest);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete Documentrequest By Id dRID
        /// </summary>
        /// <param name="dRID"></param>
        [HttpDelete("{dRID}")]
        public ActionResult<bool> DeleteDocumentrequestByDRID(string dRID)
        {
            var result = documentrequestService.DeleteDocumentrequestByDRID(dRID);
            return result;
        }
        
        /// <summary>
        /// This Method is used to Delete Documentrequest By Multiple ids dRIDs
        /// </summary>
        /// <param name="dRIDs"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAllDocumentrequest(List<int> dRIDs)
        {
            var result = documentrequestService.DeleteAllDocumentrequest(dRIDs);
            return result;
        }
    }
}
