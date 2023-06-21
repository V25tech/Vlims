//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Sheet1.Data
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    using VAMLibrary.Core;
    using VAMLibrary.Core.Common;
    
    
    // Comment
    public class DocumentManagerData : IDocumentManagerData
    {
        
        private readonly DataAccessHelper dataAccessHelper;
        
        public DocumentManagerData(DataAccessHelper dataAccessHelper)
        {
            this.dataAccessHelper = dataAccessHelper;
        }
        
        public DataSet GetAllDocumentManager(RequestContext requestContext)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DataSet GetDocumentManagerByDMGId(int dMGId)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_GET, DocumentManagerConstants.DMGId, DbType.Int32, dMGId, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveDocumentManager(DocumentManager documentManager)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.Documentrequest, Value = documentManager.Documentrequest });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.documentpreparation, Value = documentManager.documentpreparation });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.AdditionalTasks, Value = documentManager.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.CreatedBy, Value = documentManager.CreatedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.ModifiedBy, Value = documentManager.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_INSERT, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateDocumentManager(DocumentManager documentManager)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.DMGId, Value = documentManager.DMGId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.Documentrequest, Value = documentManager.Documentrequest });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.documentpreparation, Value = documentManager.documentpreparation });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.AdditionalTasks, Value = documentManager.AdditionalTasks });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentManagerConstants.ModifiedBy, Value = documentManager.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDocumentManagerByDMGId(int dMGId)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_DELETE, DocumentManagerConstants.DMGId, DbType.Int32, dMGId, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllDocumentManager(List<int> dMGIds)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentManagerConstants.USP_DocumentManager_PSY_DELETE_ALL, DocumentManagerConstants.DMGId, DbType.String, string.Join(',',  dMGIds), ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
