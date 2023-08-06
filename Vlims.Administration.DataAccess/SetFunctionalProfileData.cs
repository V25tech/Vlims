//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.DMS.Data
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Vlims.Common;



    // Comment
    public static class SetFunctionalProfileData 
    {
        
       
        
        public static DataSet GetAllSetFunctionalProfile(RequestContext requestContext)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static DataSet GetSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_GET, SetFunctionalProfileConstants.SFPID, DbType.Int32, sFPID, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool SaveSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Role, Value = setFunctionalProfile.Role });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.AdminManagement, Value = setFunctionalProfile.AdminManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Security_Management, Value = setFunctionalProfile.SecurityManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Security_Configurations, Value = setFunctionalProfile.SecurityConfigurations });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.E_sign_and_Aprroval_Configurations, Value = setFunctionalProfile.EsignandAprrovalConfigurations });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Hirearchy_Management, Value = setFunctionalProfile.HirearchyManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Role_Configuration, Value = setFunctionalProfile.RoleConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Department_Configuration, Value = setFunctionalProfile.DepartmentConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Plant_Management, Value = setFunctionalProfile.PlantManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.User_Management, Value = setFunctionalProfile.UserManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.User_Group_Configuration, Value = setFunctionalProfile.UserGroupConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Activatestatus, Value = setFunctionalProfile.Activatestatus });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Audit_Log, Value = setFunctionalProfile.AuditLog });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Master, Value = setFunctionalProfile.DocumentMaster });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Type_Configuration, Value = setFunctionalProfile.DocumentTypeConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Template_Configuration, Value = setFunctionalProfile.DocumentTemplateConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.WorkFlow_Configuration, Value = setFunctionalProfile.WorkFlowConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Dash_Board_Configuration, Value = setFunctionalProfile.DashBoardConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Notification_Configuration, Value = setFunctionalProfile.NotificationConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Master, Value = setFunctionalProfile.DocumentMaster });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Request, Value = setFunctionalProfile.DocumentRequest });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Preparation, Value = setFunctionalProfile.DocumentPreparation });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_EffectiveOut, Value = setFunctionalProfile.DocumentEffectiveOut });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Additional_Tasks, Value = setFunctionalProfile.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Additional_Tasks, Value = setFunctionalProfile.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Revision, Value = setFunctionalProfile.DocumentRevision });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = SetFunctionalProfileConstants.CreatedBy, Value = setFunctionalProfile.CreatedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = SetFunctionalProfileConstants.ModifiedBy, Value = setFunctionalProfile.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_INSERT, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool UpdateSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.SFPID, Value = setFunctionalProfile.SFPID });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Role, Value = setFunctionalProfile.Role });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.AdminManagement, Value = setFunctionalProfile.AdminManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Security_Management, Value = setFunctionalProfile.SecurityManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Security_Configurations, Value = setFunctionalProfile.SecurityConfigurations });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.E_sign_and_Aprroval_Configurations, Value = setFunctionalProfile.EsignandAprrovalConfigurations });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Hirearchy_Management, Value = setFunctionalProfile.HirearchyManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Role_Configuration, Value = setFunctionalProfile.RoleConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Department_Configuration, Value = setFunctionalProfile.DepartmentConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Plant_Management, Value = setFunctionalProfile.PlantManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.User_Management, Value = setFunctionalProfile.UserManagement });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.User_Group_Configuration, Value = setFunctionalProfile.UserGroupConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Activatestatus, Value = setFunctionalProfile.Activatestatus });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Audit_Log, Value = setFunctionalProfile.AuditLog });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Master, Value = setFunctionalProfile.DocumentMaster });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Type_Configuration, Value = setFunctionalProfile.DocumentTypeConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Template_Configuration, Value = setFunctionalProfile.DocumentTemplateConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.WorkFlow_Configuration, Value = setFunctionalProfile.WorkFlowConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Dash_Board_Configuration, Value = setFunctionalProfile.DashBoardConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Notification_Configuration, Value = setFunctionalProfile.NotificationConfiguration });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Master, Value = setFunctionalProfile.DocumentMaster });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Request, Value = setFunctionalProfile.DocumentRequest });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Preparation, Value = setFunctionalProfile.DocumentPreparation });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_EffectiveOut, Value = setFunctionalProfile.DocumentEffectiveOut });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Additional_Tasks, Value = setFunctionalProfile.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Additional_Tasks, Value = setFunctionalProfile.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Revision, Value = setFunctionalProfile.DocumentRevision });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = SetFunctionalProfileConstants.Document_Repository, Value = setFunctionalProfile.DocumentRepository });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = SetFunctionalProfileConstants.ModifiedBy, Value = setFunctionalProfile.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool DeleteSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_DELETE, SetFunctionalProfileConstants.SFPID, DbType.Int32, sFPID, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool DeleteAllSetFunctionalProfile(List<int> sFPIDs)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(SetFunctionalProfileConstants.USP_SetFunctionalProfile_PSY_DELETE_ALL, SetFunctionalProfileConstants.SFPID, DbType.String, string.Join(',',  sFPIDs), ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
