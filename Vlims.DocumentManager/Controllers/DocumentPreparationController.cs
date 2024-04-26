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
    using System.IO;
    //using Spire.Doc;
    //using Document = Spire.Doc.Document;

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

        [HttpGet("templatepreview")]
        public ActionResult PreviewDocumentTemplate(int dtid)
        {
            byte[] pdfBytes = null;
            if (dtid > 0)
            {
                try
                {
                    DataSet dataset = DocumentTemplateConfigurationData.GetDocumentTemplateConfigurationByDTID(dtid);
                    pdfBytes = DownloadTemplate(dataset);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return Ok(pdfBytes);
        }
        [HttpGet("preview")]
        public ActionResult PreviewTemplate(string templateinf)
        {
            byte[] pdfBytes = null;
            if (templateinf != null)
            {
                try
                {
                    DataSet dataset = DocumentTemplateConfigurationData.GetDocumentTemplateConfigurationByTemplate(templateinf,0);
                    pdfBytes = DownloadTemplate(dataset);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return Ok(pdfBytes);
        }
        [HttpGet("getTemplate")]
        public ActionResult GetTemplate(string templateinf)
        {
            try
            {
                DataSet dataset = DocumentTemplateConfigurationData.GetDocumentTemplateConfigurationByTemplate(templateinf,0);
                DocumentTemplateConfiguration template = DocumentTemplateConfigurationConverter.SetDocumentTemplateConfiguration(dataset);
                if (template != null)
                {
                    //string headertable = HeaderFooter.PrepareHeaderdiv(template);
                    //string footertable = HeaderFooter.PrepareFooterdiv(template);
                    ////string titleTable = HeaderFooter.PrepareTitlediv(template);
                    //template.header = headertable;
                    //template.footer = footertable;

                    //Document document = new Spire.Doc.Document();
                    //Section section = document.AddSection();
                    //section.PageSetup.Margins.All = 72f;
                    //Spire.Doc.Pa
                    //HeaderFooter header = document.Sections[0].HeadersFooters.Header;

                    //Spire.Doc.Paragraph = section


                }
                return Ok(template);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private byte[] DownloadTemplate(DataSet dataset)
        {
            byte[] pdfBytes = null;
            try
            {
                DocumentTemplateConfiguration template = DocumentTemplateConfigurationConverter.SetDocumentTemplateConfiguration(dataset);
                string headertable = HeaderFooter.PrepareHeaderdiv(template);
                string footertable = HeaderFooter.PrepareFooterdiv(template);
                //string tempFilePath = Path.GetTempFileName() + ".docx";
                Stream docStream = new System.IO.MemoryStream();
                //HeaderFooter.getData(headertable, footertable, tempFilePath, template);
                docStream = HeaderFooter.getData(headertable, footertable, docStream, template);
                // Convert the content to PDF using iTextSharp
                Stream pdfStream = HeaderFooter.generatePDF(docStream);
                using (var memoryStream = new MemoryStream())
                {
                    pdfStream.Seek(0, SeekOrigin.Begin);
                    pdfStream.CopyTo(memoryStream);
                    pdfBytes = memoryStream.ToArray();
                }
            }
            catch
            {
                throw;
            }
            return pdfBytes;
        }
        /// <summary>
        /// This Method is used to Preview DocumentPreparation
        /// </summary>
        /// <param name="documentPreparation"></param>
        /// <returns></returns>
        //[HttpPost("preview")]
        //public ActionResult PreviewDocumentPreparation(string templateinf)
        //{
        //    List<DocumentTemplateConfiguration> result; byte[] pdfBytes = null;
        //    RequestContext request = new RequestContext() { PageNumber = 1, PageSize = 50 };
        //    DataSet dataset = DocumentTemplateConfigurationData.GetAllDocumentTemplateConfiguration(request);
        //    if (dataset != null && dataset.Tables[0].Rows.Count > 0)
        //    {
        //        result = DocumentTemplateConfigurationConverter.SetAllDocumentTemplateConfiguration(dataset, true);
        //        var template = result.FirstOrDefault(o => o.Templatename.Equals(templateinf, StringComparison.InvariantCultureIgnoreCase));
        //        if (template != null)
        //        {
        //            string headertable = HeaderFooter.PrepareHeaderdiv(template);
        //            string footertable = HeaderFooter.PrepareFooterdiv(template);
        //            string tempFilePath = Path.GetTempFileName() + ".docx";
        //            HeaderFooter.getData(headertable, footertable, tempFilePath, template);

        //            // Generate the output file path dynamically
        //            string outputFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads"); // Set the folder where you want to save the converted PDFs
        //            string outputFileName = HeaderFooter.GenerateUniqueFileName(); // Function to generate a unique file name
        //            string outputFilePath = Path.Combine(outputFolderPath, outputFileName);

        //            // Convert the content to PDF using iTextSharp
        //            HeaderFooter.generatePDF(tempFilePath, outputFilePath);
        //            pdfBytes = System.IO.File.ReadAllBytes(outputFilePath);
        //        }
        //    }
        //    return Ok(pdfBytes); //result;
        //}

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
