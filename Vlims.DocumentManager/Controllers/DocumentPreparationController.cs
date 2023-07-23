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
    using Vlims.Common;
    using Vlims.DMS.Entities;
    using Vlims.DocumentManager.Manager;

    using System.Data;
    using Vlims.DocumentMaster.Entities;
    using Vlims.DocumentMaster.DataAccess;
    using DocumentFormat.OpenXml.Wordprocessing;
    //using Microsoft.Office.Interop.Word;





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
        /// This Method is used to Preview DocumentPreparation
        /// </summary>
        /// <param name="documentPreparation"></param>
        /// <returns></returns>
        [HttpPost("preview")]
        public ActionResult PreviewDocumentPreparation(DocumentPreparation documentPreparation)
        {
            List<DocumentTemplateConfiguration> result; byte[] pdfBytes = null;
            RequestContext request = new RequestContext() { PageNumber = 1, PageSize = 1 };
            DataSet dataset = DocumentTemplateConfigurationData.GetAllDocumentTemplateConfiguration(request);
            if (dataset != null && dataset.Tables[0].Rows.Count > 0)
            {
                result = DocumentTemplateConfigurationConverter.SetAllDocumentTemplateConfiguration(dataset);
                var template = result.FirstOrDefault(o => o.Templatename.Equals(documentPreparation.template, StringComparison.InvariantCultureIgnoreCase));
                if (template != null)
                {
                    string headertable = HeaderFooter.PrepareHtmlTable(Convert.ToInt32(template.rows), Convert.ToInt32(template.columns), documentPreparation);
                    string footertable = HeaderFooter.PrepareHtmlTable(Convert.ToInt32(template.rows), Convert.ToInt32(template.columns), documentPreparation);
                    HeaderFooter.getData(headertable, footertable,documentPreparation.path);

                    // Generate the output file path dynamically
                    string outputFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads"); // Set the folder where you want to save the converted PDFs
                    string outputFileName = HeaderFooter.GenerateUniqueFileName(); // Function to generate a unique file name
                    string outputFilePath = Path.Combine(outputFolderPath, outputFileName);

                    // Convert the content to PDF using iTextSharp
                    HeaderFooter.generatePDF(documentPreparation.path, outputFilePath);

                    pdfBytes = System.IO.File.ReadAllBytes(outputFilePath);
                }
            }
            return Ok(pdfBytes); //result;
        }

        private void PrepareFooterTable(DocumentTemplateConfiguration template, DocumentPreparation documentPreparation)
        {
            throw new NotImplementedException();
        }

        private void PrepareHeaderTable(DocumentTemplateConfiguration template, DocumentPreparation documentPreparation)
        {
            throw new NotImplementedException();
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
            //if (file == null || file.Length == 0)
            //{
            //    return BadRequest("No file selected.");
            //}

            try
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = file.FileName;
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
