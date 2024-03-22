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
    using System.Data;
    using System.Text;
    using System.Xml.Serialization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Hosting;
    using Spire.Doc;
    using Spire.Doc.Documents;
    using Vlims.Common;
    using Vlims.DocumentManager.Manager;
    using Vlims.DocumentMaster.DataAccess;
    using Vlims.DocumentMaster.Entities;
    using Vlims.DocumentMaster.Manager;
    using Spire.Doc;
    using Spire.Pdf;
    using FileFormat = Spire.Doc.FileFormat;
    using System.Drawing.Printing;
    using DocumentFormat.OpenXml.Packaging;
    using iTextSharp.text.pdf;
    using Microsoft.SharePoint.Client;


    /// <summary>
    /// Comment
    /// </summary>
    [ApiController()]
    [Route("api/documenttemplateconfiguration")]
    public class DocumentTemplateConfigurationController : ControllerBase
    {

        private readonly IDocumentTemplateConfigurationService documentTemplateConfigurationService;

        private readonly string htmlUpper = "<html>\r\n<head>\r\n<style type=\"text/css\">\r\n        li, p, table {\r\n            font-family: 'Lucida Sans Unicode', sans-serif;\r\n            font-size: 14pt;\r\n        }\r\n\t\ttable {\r\n            font-family: 'Lucida Sans Unicode', sans-serif;\r\n            font-size: 14pt;\r\n            border: 1px solid black; /* Set border to 1px solid black */\r\n            width: 100%;\r\n        }\r\n</style>\r\n</head>\r\n<body>";
        private readonly string htmllower = "</body>\r\n</html>";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="documentTemplateConfigurationService"></param>
        public DocumentTemplateConfigurationController(IDocumentTemplateConfigurationService documentTemplateConfigurationService)
        {
            this.documentTemplateConfigurationService = documentTemplateConfigurationService;
        }

        /// <summary>
        /// This method is used to Get List of DocumentTemplateConfiguration
        /// </summary>
        /// <param name="requestContext"></param>
        [HttpPost("getalldoctemplate")]
        public ActionResult GetAllDocumentTemplateConfiguration([FromQuery] RequestContext requestContext)
        {
            var result = documentTemplateConfigurationService.GetAllDocumentTemplateConfiguration(requestContext);
            return Ok(result);
        }

        /// <summary>
        /// This method is used to Get DocumentTemplateConfiguration By Id dTID
        /// </summary>
        /// <param name="dTID"></param>
        [HttpGet("getbyId")]
        public ActionResult<DocumentTemplateConfiguration> GetDocumentTemplateConfigurationByDTID(int dTID)
        {
            var result = documentTemplateConfigurationService.GetDocumentTemplateConfigurationByDTID(dTID);
            return result;
        }
        /// <summary>
        /// This method is used to Get DocumentTemplateConfiguration By Name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("getbyName")]
        public ActionResult GetDocumentTemplateConfigurationByName(string name)
        {
            DocumentTemplateConfiguration responseContext = new DocumentTemplateConfiguration();
            RequestContext requestContext = new RequestContext();
            requestContext.PageNumber = 1;
            requestContext.PageSize = 50;
            var result = documentTemplateConfigurationService.GetAllDocumentTemplateConfiguration(requestContext);
            if (result != null)
            {
                responseContext = result.Response.FirstOrDefault(o => o.Templatename.Equals(name, StringComparison.InvariantCultureIgnoreCase));
            }
            return Ok(responseContext);
        }
        [HttpPost("upload-image")]
        public IActionResult UploadImage(IFormFile image)
        {
            try
            {
                if (image != null && image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Logo");
                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);
                    var uniqueFileName = $"{Path.GetRandomFileName()}_{image.FileName}";

                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        image.CopyTo(stream);
                    }

                    return Ok(new { Success = true, Message = uniqueFileName });
                }

                return BadRequest("Invalid image file");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        /// <summary>
        /// This Method is used to Save DocumentTemplateConfiguration
        /// </summary>
        /// <param name="documentTemplateConfiguration"></param>
        [HttpPost("savedocumenttemplateconfiguration")]
        public ActionResult<System.Boolean> SaveDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            var result = documentTemplateConfigurationService.SaveDocumentTemplateConfiguration(documentTemplateConfiguration);
            return result;
        }

        /// <summary>
        /// This Method is used to update DocumentTemplateConfiguration
        /// </summary>
        /// <param name="documentTemplateConfiguration"></param>
        [HttpPost("updatedocumenttemplateconfiguration")]
        public ActionResult<System.Boolean> UpdateDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            var result = documentTemplateConfigurationService.UpdateDocumentTemplateConfiguration(documentTemplateConfiguration);
            return result;
        }

        /// <summary>
        /// This Method is used to Delete DocumentTemplateConfiguration By Id dTID
        /// </summary>
        /// <param name="dTID"></param>
        [HttpDelete("{dTID}")]
        public ActionResult<bool> DeleteDocumentTemplateConfigurationByDTID(int dTID)
        {
            var result = documentTemplateConfigurationService.DeleteDocumentTemplateConfigurationByDTID(dTID);
            return result;
        }

        /// <summary>
        /// This Method is used to Delete DocumentTemplateConfiguration By Multiple ids dTIDs
        /// </summary>
        /// <param name="dTIDs"></param>
        [HttpDelete("deleteAll")]
        public ActionResult<bool> DeleteAllDocumentTemplateConfiguration(List<int> dTIDs)
        {
            var result = documentTemplateConfigurationService.DeleteAllDocumentTemplateConfiguration(dTIDs);
            return result;
        }
        
        public byte[] geturl()
        {
            byte[] bytes = null;
            string docxFilePath = Path.Combine(Directory.GetCurrentDirectory(), "DocumentWithMargins.docx");
            string pdfFilePath = Path.Combine(Directory.GetCurrentDirectory(), "DocumentWithHeaderTable.pdf");

            // Create a new PDF document
            iTextSharp.text.Document pdfDoc = new iTextSharp.text.Document();

            // Create a new PDF writer
            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, new FileStream(pdfFilePath, FileMode.Create));

            // Open the PDF document for writing
            pdfDoc.Open();

            // Open the DOCX file using Open XML SDK
            using (WordprocessingDocument doc = WordprocessingDocument.Open(docxFilePath, false))
            {
                DocumentFormat.OpenXml.Wordprocessing.Body body = doc.MainDocumentPart.Document.Body;

                // Iterate through paragraphs and tables in the DOCX and add them to the PDF
                foreach (var element in body.Elements())
                {
                    if (element is DocumentFormat.OpenXml.Wordprocessing.Paragraph para)
                    {
                        // Create a new paragraph in the PDF
                        pdfDoc.Add(new iTextSharp.text.Paragraph(para.InnerText));
                    }
                    else if (element is DocumentFormat.OpenXml.Wordprocessing.Table table)
                    {
                        // Process tables
                        PdfPTable pdfTable = new PdfPTable(table.Elements<DocumentFormat.OpenXml.Wordprocessing.TableRow>().First().Elements<DocumentFormat.OpenXml.Wordprocessing.TableCell>().Count());
                        foreach (var row in table.Elements<DocumentFormat.OpenXml.Wordprocessing.TableRow>())
                        {
                            foreach (var cell in row.Elements<DocumentFormat.OpenXml.Wordprocessing.TableCell>())
                            {
                                pdfTable.AddCell(cell.InnerText);
                            }
                        }
                        pdfDoc.Add(pdfTable);
                    }
                }
            }

            // Close the PDF document
            pdfDoc.Close();

            string path = Path.Combine(Directory.GetCurrentDirectory(), "DocumentWithHeaderTable.pdf");
             bytes = System.IO.File.ReadAllBytes(path);
           return bytes;
        }

        [HttpGet("getpdf")]
        public ActionResult<byte[]> getpdf(string templateinf,string p_user, bool p_isPdf = true)
        {
            byte[] bytes = null;
            DataSet dataset = DocumentTemplateConfigurationData.GetDocumentTemplateConfigurationByTemplate(templateinf);
            DataSet ds_template = DocumentTemplateConfigurationData.GetTemplateHeaderFooterDetails(templateinf);
            DocumentTemplateConfiguration template = DocumentTemplateConfigurationConverter.SetDocumentTemplateConfiguration(dataset);
            DocumentTemplateConfiguration template1 = DocumentTemplateConfigurationConverter.SetDocumentTemplateHeaderFooterConfiguration(ds_template);

            StringBuilder builder = new StringBuilder();
            builder.Append(htmlUpper);
            Document document = new Spire.Doc.Document();
            Section section = document.AddSection();
            section.PageSetup.PageSize = PageSize.A4;
            section.PageSetup.Margins.All = 72f;


            //section.PageSetup.Margins.Top = 0f;

            //section.PageSetup.Margins.Bottom = 0f;


            HeaderFooter footer = section.HeadersFooters.Footer;
            Paragraph footerParagraph = footer.AddParagraph();
            StringBuilder footerbuilder = new StringBuilder();
            footerbuilder.Append(htmlUpper);
            footerbuilder.Append(PrepareStaticdiv(template, template1,p_user));
            footerbuilder.Append(htmllower);
            footerParagraph.AppendHTML(footerbuilder.ToString());
            footerParagraph.Format.BeforeSpacing = 0;
            footerParagraph.Format.AfterSpacing = 0;
            footerParagraph.Format.PageBreakBefore = false;

            Paragraph paragraph = section.AddParagraph();

            for (int i = 0; i < template.Pages; i++)
            {
                HeaderFooter header = section.HeadersFooters.Header;
                Paragraph headerParagraph = header.AddParagraph();
                StringBuilder headerbuilder = new StringBuilder();
                headerbuilder.Append(htmlUpper);
                headerbuilder.Append(PrepareHeaderStaticdiv(template, template1, i + 1));
                headerbuilder.Append(htmllower);
                headerParagraph.AppendHTML(headerbuilder.ToString());
                headerParagraph.Format.BeforeSpacing = 0;
                headerParagraph.Format.AfterSpacing = 0;
                headerParagraph.Format.PageBreakBefore = false;

                builder.Append(htmlUpper);
                builder.Append(template.Page[i].text);
                builder.Append(htmllower);
                builder.Append("<div style=\"page-break-before: always;\"></div>");
                //if (i < template.Pages - 1)
                //{
                //    section = document.AddSection();
                //    section.PageSetup.Margins.All = 72f;
                //}
            }
            paragraph.Format.BeforeSpacing = -10;

            paragraph.Format.AfterSpacing = 0;
            paragraph.AppendHTML(builder.ToString());
            document.SaveToFile("DocumentWithMargins.docx", FileFormat.Docx2013);
            document.Dispose();


            Document doc = new Document();
            doc.LoadFromFile("DocumentWithMargins.docx");
            string pathhh = Path.Combine(Directory.GetCurrentDirectory(), "DocumentWithMargins.docx");
            byte[] pdfBytes1 = System.IO.File.ReadAllBytes(pathhh);
            string pdfFilePath = "DocumentWithHeaderTable.pdf";
            doc.SaveToFile(pdfFilePath, FileFormat.PDF);
            byte[] pdfBytes = ConvertDocxToPdfBytes(doc);
            //byte[] pdfBytes = geturl();
            doc.Dispose();
            bytes = pdfBytes;
            //PrintDocument();
            if (!p_isPdf)
                return pdfBytes1;
            else
                return bytes;

        }




        static byte[] ConvertDocxToPdfBytes(Document document)

        {

            using (MemoryStream stream = new MemoryStream())

            {

                document.SaveToStream(stream, FileFormat.PDF);

                return stream.ToArray();

            }

        }

        public static string PrepareStaticdiv(DocumentTemplateConfiguration template, DocumentTemplateConfiguration template1,string p_user)
        {
            string table = string.Empty;
            StringBuilder htmlBuilder = new StringBuilder();
            //htmlBuilder.Append("<style>");
            //htmlBuilder.Append(".table-container { display: table; width: 100%; border-collapse: collapse; }");
            //htmlBuilder.Append(".table-row { display: table-row; }");
            //htmlBuilder.Append(".table-cell { display: table-cell; padding: 1px;}");
            //htmlBuilder.Append(".label-cell { text-align: left; font-weight: bold; width: 50px; }");
            //htmlBuilder.Append(".value-cell { text-align: center; width: 50px; }");
            //htmlBuilder.Append("</style>");
            //htmlBuilder.Append("<div class=\"table-container\">");kkkkkkkkkk

            // Append the style information
            htmlBuilder.AppendLine("<style type=\"text/css\">");
            htmlBuilder.AppendLine(".tg  {border-collapse:collapse;border-spacing:0;}");
            htmlBuilder.AppendLine(".tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:5px 5px;word-break:normal;}");
            htmlBuilder.AppendLine(".tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:5px 5px;word-break:normal;}");
            htmlBuilder.AppendLine(".tg .tg-0p91{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;text-align:center;vertical-align:top}");
            htmlBuilder.AppendLine(".tg .tg-53v8{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;font-weight:bold;text-align:left;vertical-align:top}");
            htmlBuilder.AppendLine(".tg .tg-iucd{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;text-align:left;vertical-align:top}");
            htmlBuilder.AppendLine(".p {border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;text-align:left;vertical-align:top}");
            htmlBuilder.AppendLine("</style>");

            htmlBuilder.AppendLine("<table class=\"tg\">");
            htmlBuilder.AppendLine("<thead>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-zd42\"></th>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Prepared By</th>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Checked By</th>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Approved By</th>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("</thead>");
            htmlBuilder.AppendLine("<tbody>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Signature</th>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Date</th>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("    <td class=\"tg-zd42\"></td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Name</th>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.PreparedBy) ? template1.PreparedBy : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ReviewedBy) ? template1.ReviewedBy : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ApprovedBy) ? template1.ApprovedBy : "test") : "test")}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Designation</th>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.PreparedRole) ? template1.PreparedRole : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ReviewedRole) ? template1.ReviewedRole : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ApprovedRole) ? template1.ApprovedRole : "test") : "test")}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <th class=\"tg-adin\">Department</th>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.PrepareDept) ? template1.PrepareDept : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ReviewedDept) ? template1.ReviewedDept : "test") : "test")}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ApprovedDept) ? template1.ApprovedDept : "test") : "test")}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("</tbody>");
            htmlBuilder.AppendLine("</table>");
            // Add the label after the table
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">Print Type: {(template1 != null ? (!string.IsNullOrEmpty(template1.PrintCopy) ? template1.PrintCopy : "test") : "test")}, Printed By: {p_user}, Date: {DateTime.Now.ToShortDateString()} {DateTime.Now.ToShortTimeString()}, </td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine($"    <td class=\"tg-zd42\">Print Reason: {(template1 != null ? (!string.IsNullOrEmpty(template1.PrintReason) ? template1.PrintReason : "test") : "test")}</td>");
            //htmlBuilder.AppendLine($"<p>Print Type: {(template1 != null ? (!string.IsNullOrEmpty(template1.PrintCopy) ? template1.PrintCopy : "test") : "test")}</p>");
            table = htmlBuilder.ToString();
            return table;

        }

        public static string PrepareHeaderStaticdiv(DocumentTemplateConfiguration template, DocumentTemplateConfiguration template1, int p_PageNo)
        {
            string table = string.Empty;
            StringBuilder htmlBuilder = new StringBuilder();

            //DocumentPreparationService prepservice = new DocumentPreparationService();
            //DocumentEffectiveService effectiveService= new DocumentEffectiveService();
            //AdditionalTaskService taskService = new AdditionalTaskService();
            //DocumentrequestService documentrequestService = new DocumentrequestService();

            //RequestContext context = new RequestContext();
            //context.PageNumber = 1; context.PageSize = 1000;
            //var prep=prepservice.GetAllDocumentPreparation(context).Response.Where(o=>o.template.Equals(template.Templatename,StringComparison.InvariantCultureIgnoreCase));
            //var reqList = documentrequestService.GetAllDocumentrequest(context).Response.Where(o => o..Equals(template.Templatename, StringComparison.InvariantCultureIgnoreCase)); ;
            //var effList = effectiveService.GetAllDocumentEffective(context);
            //var revisionList = taskService.GetAllAdditionalTask(context);

            // Read the contents of the SVG file
            string currentDirectory = Directory.GetCurrentDirectory();
            string path = Path.Combine(currentDirectory, "Logo", template.header);
            string footerpath = Path.Combine(currentDirectory, "Logo", template.footer);
            string dataUri = string.Empty; string dataUri1 = string.Empty;
            if (System.IO.File.Exists(path))
            {
                string base64EncodedImage = Convert.ToBase64String(System.IO.File.ReadAllBytes(path));
                dataUri = $"data:image/jpeg;base64,{base64EncodedImage}";
            }
            if (System.IO.File.Exists(footerpath))
            {
                string base64EncodedImage = Convert.ToBase64String(System.IO.File.ReadAllBytes(footerpath));
                dataUri1 = $"data:image/jpeg;base64,{base64EncodedImage}";
            }
            // Append the style information
            htmlBuilder.AppendLine("<style type=\"text/css\">");
            htmlBuilder.AppendLine(".tg  {border-collapse:collapse;border-spacing:0;}");
            htmlBuilder.AppendLine(".tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:5px 5px;word-break:normal;}");
            htmlBuilder.AppendLine(".tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:5px 5px;word-break:normal;}");
            htmlBuilder.AppendLine(".tg .tg-0p91{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;text-align:center;vertical-align:top}");
            htmlBuilder.AppendLine(".tg .tg-53v8{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;font-weight:bold;text-align:left;vertical-align:top}");
            htmlBuilder.AppendLine(".tg .tg-iucd{border-color:inherit;font-family:\"Times New Roman\", Times, serif !important;text-align:left;vertical-align:top}");
            htmlBuilder.AppendLine("</style>");

            // Append the table
            htmlBuilder.AppendLine("<table class=\"tg\">");
            htmlBuilder.AppendLine("<thead>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine($@"<th class=""tg-iucd""><img src=""{dataUri}"" width=""80"" height=""80"" /></th>");
            //htmlBuilder.AppendLine($@"<th class=""tg-iucd""><img src=""{dataUri}"" width=""20"" height=""20"" /></th>");
            //htmlBuilder.AppendLine($@"<img src=""{dataUri}"" width=""20"" height=""20"" />");
            htmlBuilder.AppendLine($"    <th class=\"tg-0p91\" colspan=\"2\">{(template1 != null ? (!string.IsNullOrEmpty(template.titleTable[0][0].inputValue) ? template.titleTable[0][0].inputValue : "test") : "test")}</th>");
            htmlBuilder.AppendLine($@"<th class=""tg-iucd""><img src=""{dataUri1}"" width=""100"" height=""100"" style=""align:center"" /></th>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("</thead>");
            htmlBuilder.AppendLine("<tbody>");
            htmlBuilder.AppendLine("  <tr>");
            //htmlBuilder.AppendLine("    <td class=\"tg-iucd\" colspan=\"2\">Title: Preparation, checking, approval, control, distribution, <br>revision, retrieval &amp; destruction of standard operating procedure</td>");
            //htmlBuilder.AppendLine($"   <td class=\"ttg-iucd\" colspan=\"t2\"t><span style=\"tfont-weight:bold\"t>Title:</span> {template1.DocumentTitle}</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\" colspan=\"2\"><span style=\"font-weight:bold\">Title:</span> {(template1 != null ? (!string.IsNullOrEmpty(template1.DocumentTitle) ? template1.DocumentTitle : "test") : "test")}</td>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">SOP No.</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.DocumentNo) ? template1.DocumentNo : "test") : "test")}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Revision No.</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.Version.ToString()) ? template1.Version : "test") : "test")}</td>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Supersedes</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.Supersedes.ToString()) ? template1.Supersedes : 0) : 0)}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Depaertment</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.Department) ? template1.Department : "test") : "test")}</td>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Page No.</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{p_PageNo} of {template.Pages}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("  <tr>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Effective Date</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.EffectiveDate) ? template1.EffectiveDate : "test") : "test")}</td>");
            htmlBuilder.AppendLine("    <td class=\"tg-53v8\">Review Date</td>");
            htmlBuilder.AppendLine($"    <td class=\"tg-iucd\">{(template1 != null ? (!string.IsNullOrEmpty(template1.ReviewDate) ? template1.ReviewDate : "test") : "test")}</td>");
            htmlBuilder.AppendLine("  </tr>");
            htmlBuilder.AppendLine("</tbody>");
            htmlBuilder.AppendLine("</table>");
            table = htmlBuilder.ToString();
            return table;

        }
        public static string PrepareHeaderdiv(DocumentTemplateConfiguration Template)
        {
            string table = string.Empty;
            StringBuilder tableHtml = new StringBuilder();
            // Add CSS styles
            tableHtml.Append("<style>");
            tableHtml.Append(".table-container { display: table; width: 100%; border-collapse: collapse; }");
            tableHtml.Append(".table-row { display: table-row; }");
            tableHtml.Append(".table-cell { display: table-cell; padding: 1px;}");
            tableHtml.Append(".label-cell { text-align: left; font-weight: bold; width: 50px; }");
            tableHtml.Append(".value-cell { text-align: center; width: 50px; }");
            tableHtml.Append("</style>");
            tableHtml.Append("<div class=\"table-container\">");

            foreach (List<HeaderTable> row in Template.headerTable)
            {
                tableHtml.Append("<div class=\"table-row\">");

                foreach (HeaderTable item in row)
                {
                    tableHtml.Append("<div class=\"table-cell ");

                    if (item.selectedOption == 1)
                    {
                        tableHtml.Append("label-cell");
                    }
                    else
                    {
                        tableHtml.Append("value-cell");
                    }

                    tableHtml.Append("\">");
                    if (item.selectedOption == 1)
                    {

                        tableHtml.Append(item.inputValue);
                    }
                    else
                        tableHtml.Append(item.inputValue);
                    tableHtml.Append("</div>");
                }

                tableHtml.Append("</div>");

            }
            tableHtml.Append("</div>");
            table = tableHtml.ToString();
            return table;

        }

        public static string PrepareFooterdiv(DocumentTemplateConfiguration Template)
        {
            string table = string.Empty;
            StringBuilder tableHtml = new StringBuilder();
            // Add CSS styles
            tableHtml.Append("<style>");
            tableHtml.Append(".table-container { display: table; width: 100%; border-collapse: collapse; }");
            tableHtml.Append(".table-row { display: table-row; }");
            tableHtml.Append(".table-cell { display: table-cell; padding: 1px;}");
            tableHtml.Append(".label-cell { text-align: left; font-weight: bold; width: 50px; }");
            tableHtml.Append(".value-cell { text-align: center; width: 50px; }");
            tableHtml.Append("</style>");
            tableHtml.Append("<div class=\"table-container\">");

            foreach (List<FooterTable> row in Template.footerTable)
            {
                tableHtml.Append("<div class=\"table-row\">");

                foreach (FooterTable item in row)
                {


                    tableHtml.Append("<div class=\"table-cell ");

                    if (item.selectedOption == 1)
                    {
                        tableHtml.Append("label-cell");
                    }
                    else
                    {
                        tableHtml.Append("value-cell");
                    }

                    tableHtml.Append("\">");
                    if (item.selectedOption == 1)
                    {
                        //if (!string.IsNullOrEmpty(item.inputValue))
                        //    tableHtml.Append(item.inputValue + " " + ":");
                        //else
                        tableHtml.Append(item.inputValue);
                    }
                    else
                        tableHtml.Append(item.inputValue);
                    tableHtml.Append("</div>");

                    //IsLabel = !IsLabel; // Toggle between label and value for each cell
                }

                tableHtml.Append("</div>");

            }
            tableHtml.Append("</div>");
            table = tableHtml.ToString();
            return table;

        }
    }
}
