using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vlims.Common;
using Vlims.DocumentManager.Entities;
using Vlims.DocumentManager.Manager;
using Vlims.DocumentManager.Manager.Interface;

namespace Vlims.DocumentManager.Controllers
{
    [Route("api/documents")]
    [ApiController()]
    public class ExistingDocumentsController : ControllerBase
    {
        private readonly IExisitingDocumentsService exisitingDocumentsService;
        public ExistingDocumentsController(IExisitingDocumentsService exisitingDocumentsService) 
        { 
            this.exisitingDocumentsService = exisitingDocumentsService;
        }
        /// <summary>
        /// This method is used to Get List of Documents
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost("")]
        public async Task<ActionResult> GetAllDocuments(RequestContext requestContext) 
        {
            var result = await exisitingDocumentsService.GetAllExistingDocuments(requestContext);
            return Ok(result);
        }

        [HttpGet("")]
        public async Task<ActionResult> GetAllTrackedDocuments(string userName, string searchTerm)
        {
            var result = await exisitingDocumentsService.GetAllTrackedDocuments(userName,searchTerm);
            return Ok(result);
        }
    }
}
