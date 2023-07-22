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
    using Microsoft.Extensions.Hosting;


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
        [HttpPost("GetAllDocPrep")]
        public ActionResult GetAllDocumentPreparation([FromQuery] RequestContext requestContext)
        {
            var result = documentPreparationService.GetAllDocumentPreparation(requestContext);
            return Ok(result);
        }
        
        /// <summary>
        /// This method is used to Get DocumentPreparation By Id dPNID
        /// </summary>
        /// <param name="dPNID"></param>
        [HttpGet("getdocId")]
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

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file selected.");
            }

            try
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return Ok(new { message = "File uploaded successfully.", filePath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while uploading the file: {ex.Message}");
            }
        }
    }
}
