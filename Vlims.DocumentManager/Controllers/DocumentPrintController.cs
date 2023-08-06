using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Vlims.DocumentManager.Manager;
using Vlims.Common;
using Vlims.DMS.Entities;



/// <summary>
/// Comment
/// </summary>
[ApiController()]
[Route("api/documentprint")]
public class DocumentPrintController : ControllerBase
{

    private readonly IDocumentPrintService documentPrintService;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="documentPrintService"></param>
    public DocumentPrintController(IDocumentPrintService documentPrintServ)
    {
        this.documentPrintService = documentPrintServ;
    }

    /// <summary>
    /// This method is used to Get List of DocumentEffective
    /// </summary>
    /// <param name="requestContext"></param>
    [HttpPost("GetAllDocPrint")]
    public ActionResult GetAllDocumentPrint([FromQuery] RequestContext requestContext)
    {
        var result = documentPrintService.GetAllDocumentPrint(requestContext);
        return Ok(result);
    }

    /// <summary>
    /// This method is used to Get DocumentEffective By Id dEID
    /// </summary>
    /// <param name="dEID"></param>
   [HttpGet("getbyId")]
    public ActionResult<DocumentPrint> GetDocumentPrintByDRId(int dEID)
    {
        var result = documentPrintService.GetDocumentPrintByDRId(dEID);
        return result;
    }

    /// <summary>
    /// This Method is used to Save DocumentEffective
    /// </summary>
    /// <param name="documentEffective"></param>
    [HttpPost("savedocumentprint")]
    public ActionResult<System.Boolean> SaveDocumentPrint(DocumentPrint documentPrint)
    {
        var result = documentPrintService.SaveDocumentPrint(documentPrint);
        return result;
    }

    /// <summary>
    /// This Method is used to update DocumentEffective
    /// </summary>
    /// <param name="documentEffective"></param>
    [HttpPost("updatedocumentprint")]
    public ActionResult<System.Boolean> UpdateDocumentPrint(DocumentPrint documentEffective)
    {
        var result = documentPrintService.UpdateDocumentPrint(documentEffective);
        return result;
    }

    /// <summary>
    /// This Method is used to update DocumentEffective
    /// </summary>
    /// <param name="documentEffective"></param>
    [HttpPost("UpdateDocumentPrintApprove")]
    public ActionResult<System.Boolean> UpdateDocumentEffectiveApprove(DocumentPrint documentEffective)
    {
        var result = documentPrintService.UpdateDocumentPrint(documentEffective);
        return result;
    }

    /// <summary>
    /// This Method is used to Delete DocumentEffective By Id dEID
    /// </summary>
    /// <param name="dEID"></param>
    [HttpDelete("{dEID}")]
    public ActionResult<bool> DeleteDocumentEffectiveByDEID(string dEID)
    {
        var result = documentPrintService.DeleteDocumentPrintByDRId(dEID);
        return result;
    }

    /// <summary>
    /// This Method is used to Delete DocumentEffective By Multiple ids dEIDs
    /// </summary>
    /// <param name="dEIDs"></param>
    [HttpDelete("deleteAll")]
    public ActionResult<bool> DeleteAllDocumentEffective(List<int> dEIDs)
    {
        var result = documentPrintService.DeleteAllDocumentPrint(dEIDs);
        return result;
    }
  
}

