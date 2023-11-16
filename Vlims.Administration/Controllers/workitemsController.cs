using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PolicySummary.DMS.Entities;
using PolicySummary.DMS.Services;
using Vlims.Common;
using Vlims.DMS.Entities;


/// <summary>
/// Comment
/// </summary>
[ApiController()]
[Route("api/workitems")]
public class workitemsController : ControllerBase
{

    private readonly IworkitemsService workitemsService;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="workitemsService"></param>
    public workitemsController(IworkitemsService workitemsService)
    {
        this.workitemsService = workitemsService;
    }

    /// <summary>
    /// This method is used to Get List of workitems
    /// </summary>
    /// <param name="requestContext"></param>
    [HttpPost("GetAllworkitems")]
    public ActionResult<ResponseContext<workitems>> GetAllworkitems(RequestContext requestContext,string p_UserName=null)
    {
        var result = workitemsService.GetAllworkitems(requestContext, p_UserName);
        return result;
    }

    /// <summary>
    /// This method is used to Get workitems By Id wITId
    /// </summary>
    /// <param name="wITId"></param>
    [HttpGet("{wITId}")]
    public ActionResult<workitems> GetworkitemsByWITId(System.Int32? wITId)
    {
        var result = workitemsService.GetworkitemsByWITId(wITId);
        return result;
    }

    /// <summary>
    /// This Method is used to Save workitems
    /// </summary>
    /// <param name="workitems"></param>
    [HttpPost("saveworkitems")]
    public ActionResult<System.Boolean> Saveworkitems(workitems workitems)
    {
        var result = workitemsService.Saveworkitems(workitems);
        return result;
    }

    /// <summary>
    /// This Method is used to update workitems
    /// </summary>
    /// <param name="workitems"></param>
    [HttpPost("updateworkitems")]
    public ActionResult<System.Boolean> Updateworkitems(workitems workitems)
    {
        var result = workitemsService.Updateworkitems(workitems);
        return result;
    }

    /// <summary>
    /// This Method is used to Delete workitems By Id wITId
    /// </summary>
    /// <param name="wITId"></param>
    [HttpDelete("{wITId}")]
    public ActionResult<bool> DeleteworkitemsByWITId(System.Int32? wITId)
    {
        var result = workitemsService.DeleteworkitemsByWITId(wITId);
        return result;
    }

    /// <summary>
    /// This Method is used to Delete workitems By Multiple ids wITIds
    /// </summary>
    /// <param name="wITIds"></param>
    [HttpDelete("deleteAll")]
    public ActionResult<bool> DeleteAllworkitems(List<int> wITIds)
    {
        var result = workitemsService.DeleteAllworkitems(wITIds);
        return result;
    }
}

