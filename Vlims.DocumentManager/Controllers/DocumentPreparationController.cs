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
    using System.Collections;

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
        [HttpGet("getbyId")]
        public ActionResult<DocumentPreparation> GetDocumentPreparationByDPNID(int dPNID)
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
            RequestContext request = new RequestContext() { PageNumber = 1, PageSize = 50 };
            DataSet dataset = DocumentTemplateConfigurationData.GetAllDocumentTemplateConfiguration(request);
            if (dataset != null && dataset.Tables[0].Rows.Count > 0)
            {
                result = DocumentTemplateConfigurationConverter.SetAllDocumentTemplateConfiguration(dataset, true);
                var template = result.FirstOrDefault(o => o.Templatename.Equals(documentPreparation.template, StringComparison.InvariantCultureIgnoreCase));
                if (template != null)
                {
                    //DataTable hTable = null;
                    //DataTable fTable = null;
                    //if (template.headerTable != null && template.footerTable != null)
                    //{
                    //    string ss = HeaderFooter.PrepareHeaderdiv(template);
                    //    hTable = PrepareDataTable(template);
                    //    fTable = PrepareDataTable1(template);
                    //}
                    //string headertable = HeaderFooter.PrepareHtmlTable(Convert.ToInt32(template.rows), Convert.ToInt32(template.columns), hTable);
                    //string footertable = HeaderFooter.PrepareHtmlTable(Convert.ToInt32(template.rows), Convert.ToInt32(template.columns), fTable);
                    string headertable = HeaderFooter.PrepareHeaderdiv(template);
                    string footertable = HeaderFooter.PrepareFooterdiv(template);
                    string tempFilePath = Path.GetTempFileName() + ".docx";
                    HeaderFooter.getData(headertable, footertable, tempFilePath, template);


                    //string tempFilePath = Path.GetTempFileName() + ".docx";

                    HeaderFooter.getData(headertable, footertable, tempFilePath,template);

                    // Generate the output file path dynamically
                    string outputFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads"); // Set the folder where you want to save the converted PDFs
                    string outputFileName = HeaderFooter.GenerateUniqueFileName(); // Function to generate a unique file name
                    string outputFilePath = Path.Combine(outputFolderPath, outputFileName);

                    // Convert the content to PDF using iTextSharp
                    HeaderFooter.generatePDF(tempFilePath, outputFilePath);

                    pdfBytes = System.IO.File.ReadAllBytes(outputFilePath);
                }
            }
            return Ok(pdfBytes); //result;
        }

        private DataTable PrepareDataTable1(DocumentTemplateConfiguration template)
        {
            //DataTable table = new DataTable();
            //template.footerTable[0].ForEach(o =>
            //{
            //    table.Columns.Add(new DataColumn(o.inputValue));
            //});
            //List<string> col = new List<string>();
            //foreach (DataColumn column in table.Columns)
            //{
            //    col.Add(column.ColumnName);
            //}
            //for (int i = 1; i < template.footerTable.Count; i++)
            //{
            //    var obj = template.footerTable[i];

            //    // Create a new row for each item in the headerTable
            //    foreach (var item in obj)
            //    {
            //        DataRow newRow = table.NewRow();

            //        // Populate the columns in the new row
            //        foreach (string columnName in col)
            //        {
            //            newRow[columnName] = item.inputValue;
            //        }

            //        // Add the new row to the DataTable
            //        table.Rows.Add(newRow);
            //    }
            //}
            //return table;
            DataTable table = new DataTable();
            foreach (List<FooterTable> item in template.footerTable)
            {
                if (item == template.footerTable.First())
                {//columns
                    var colums = item.Select(p => new DataColumn(p.inputValue)).ToArray();
                    table.Columns.AddRange(colums);
                }
                else
                {
                    DataRow newRow = table.NewRow();
                    int c = 0;
                    foreach (FooterTable item2 in item)
                    {
                        newRow[c++] = item2.inputValue;
                    }
                    table.Rows.Add(newRow);
                }
            }
            return table;
        }

        //private DataTable PrepareDataTable(DocumentTemplateConfiguration template)
        //{

        //    DataTable table = new DataTable();
        //    template.headerTable[0].ForEach(o =>
        //    {
        //        table.Columns.Add(new DataColumn(o.inputValue));
        //    });
        //    List<string> col = new List<string>();
        //    foreach (DataColumn column in table.Columns)
        //    {
        //        col.Add(column.ColumnName);
        //    }
        //    for (int i = 1; i < template.headerTable.Count; i++)
        //    {
        //        var obj = template.headerTable[i];

        //        // Create a new row for each item in the headerTable
        //        foreach (var item in obj)
        //        {
        //            DataRow newRow = table.NewRow();

        //            // Populate the columns in the new row
        //            foreach (string columnName in col)
        //            {
        //                newRow[columnName] = item.inputValue;
        //            }

        //            // Add the new row to the DataTable
        //            table.Rows.Add(newRow);
        //        }
        //    }
        //    return table;
        private DataTable PrepareDataTable(DocumentTemplateConfiguration template)
        {
            DataTable table = new DataTable();
            foreach (List<HeaderTable> item in template.headerTable)
            {
                if (item == template.headerTable.First())
                {//columns
                    var colums = item.Select(p => new DataColumn(p.inputValue)).ToArray();
                    table.Columns.AddRange(colums);
                }
                else
                {
                    DataRow newRow = table.NewRow();
                    int c = 0;
                    foreach (HeaderTable item2 in item)
                    {
                        newRow[c++] = item2.inputValue;
                    }
                    table.Rows.Add(newRow);
                }
            }
            return table;
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
        /// <summary>
        /// This method is used to Get List of Documentrequest
        /// </summary>
        /// <param name="docreq"></param>
        [HttpGet("GetDocumentRequestbyName")]
        public ActionResult GetDocumentRequestbyName(string name)
        {
            DocumentPreparation responseContext = new DocumentPreparation();
            RequestContext requestContext = new RequestContext();
            requestContext.PageNumber = 1;
            requestContext.PageSize = 50;
            var result = documentPreparationService.GetAllDocumentPreparation(requestContext);
            if (result != null)
            {
                responseContext = result.Response.FirstOrDefault(o => o.documenttype.Equals(name, StringComparison.InvariantCultureIgnoreCase));
            }
            return Ok(responseContext);
        }
    }
}
