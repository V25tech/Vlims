//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentMaster.Manager
{
    using System;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.DocumentMaster.Entities;
    using Vlims.DocumentMaster.DataAccess;
    using Vlims.Administration.Entities;

    // Comment
    public class workflowconigurationService : IworkflowconigurationService
    {



        public ResponseContext<workflowconiguration> GetAllworkflowconiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = workflowconigurationData.GetAllworkflowconiguration(requestContext);
                List<workflowconiguration> result = workflowconigurationConverter.SetAllworkflowconiguration(dataset);
                return new ResponseContext<workflowconiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public workflowconiguration GetworkflowconigurationByWFCId(int wFCId)
        {
            try
            {
                DataSet dataset = workflowconigurationData.GetworkflowconigurationByWFCId(wFCId);
                workflowconiguration result = workflowconigurationConverter.Setworkflowconiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool Saveworkflowconiguration(workflowconiguration workflowconiguration)
        {
            try
            {
                    workflowconiguration.CreatedDate = DateTime.Now;
                if (workflowconiguration != null && workflowconiguration.WFCId == null)
                {
                    workflowconiguration.DocumentMasterId = "1";
                }
                String validationMessages = workflowconigurationValidator.IsValidworkflowconiguration(workflowconiguration);
                if (validationMessages.Length <= 0)
                {
                    workflowconiguration.Status = "Active";
                    var result = workflowconigurationData.Saveworkflowconiguration(workflowconiguration);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = workflowconiguration.CreatedBy, EntityName = workflowconiguration.workflowName, Type = workflowconigurationConstants.WorkflowType, state = DefinitionStatus.New,  EntityInfo = workflowconiguration, Unique = workflowconiguration.code });

                    if (result)
                        workflowconigurationData.WorkspaceUserMapping(workflowconiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool Updateworkflowconiguration(workflowconiguration workflowconiguration)
        {
            try
            {
                String validationMessages = workflowconigurationValidator.IsValidworkflowconiguration(workflowconiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = workflowconigurationData.Updateworkflowconiguration(workflowconiguration);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = workflowconiguration.CreatedBy, EntityName = workflowconiguration.workflowName, Type = workflowconigurationConstants.WorkflowType, state = DefinitionStatus.Modify, EntityInfo = workflowconiguration, Unique = workflowconiguration.code });

                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
            
        public bool DeleteworkflowconigurationByWFCId(int wFCId)
        {
            try
            {
                return workflowconigurationData.DeleteworkflowconigurationByWFCId(wFCId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllworkflowconiguration(List<int> wFCIds)
        {
            try
            {
                return workflowconigurationData.DeleteAllworkflowconiguration(wFCIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
