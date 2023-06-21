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
    public class DocumentEffectiveData : IDocumentEffectiveData
    {
        
        private readonly DataAccessHelper dataAccessHelper;
        
        public DocumentEffectiveData(DataAccessHelper dataAccessHelper)
        {
            this.dataAccessHelper = dataAccessHelper;
        }
        
        public DataSet GetAllDocumentEffective(RequestContext requestContext)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DataSet GetDocumentEffectiveByDEID(string dEID)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_GET, DocumentEffectiveConstants.DEID, DbType.Int32, dEID, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveDocumentEffective(DocumentEffective documentEffective)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.Documentmanagerid, Value = documentEffective.Documentmanagerid });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documenttitle, Value = documentEffective.documenttitle });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documentno, Value = documentEffective.documentno });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documenttype, Value = documentEffective.documenttype });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.department, Value = documentEffective.department });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.document, Value = documentEffective.document });
                sqlparms.Add(new SqlParameter { DbType = DbType.DateTime, ParameterName = DocumentEffectiveConstants.EffectiveDate, Value = documentEffective.EffectiveDate });
                sqlparms.Add(new SqlParameter { DbType = DbType.DateTime, ParameterName = DocumentEffectiveConstants.Reviewdate, Value = documentEffective.Reviewdate });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.CreatedBy, Value = documentEffective.CreatedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.ModifiedBy, Value = documentEffective.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_INSERT, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateDocumentEffective(DocumentEffective documentEffective)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.DEID, Value = documentEffective.DEID });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.Documentmanagerid, Value = documentEffective.Documentmanagerid });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documenttitle, Value = documentEffective.documenttitle });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documentno, Value = documentEffective.documentno });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.documenttype, Value = documentEffective.documenttype });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.department, Value = documentEffective.department });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.document, Value = documentEffective.document });
                sqlparms.Add(new SqlParameter { DbType = DbType.DateTime, ParameterName = DocumentEffectiveConstants.EffectiveDate, Value = documentEffective.EffectiveDate });
                sqlparms.Add(new SqlParameter { DbType = DbType.DateTime, ParameterName = DocumentEffectiveConstants.Reviewdate, Value = documentEffective.Reviewdate });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentEffectiveConstants.ModifiedBy, Value = documentEffective.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDocumentEffectiveByDEID(string dEID)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_DELETE, DocumentEffectiveConstants.DEID, DbType.Int32, dEID, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllDocumentEffective(List<int> dEIDs)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentEffectiveConstants.USP_DocumentEffective_PSY_DELETE_ALL, DocumentEffectiveConstants.DEID, DbType.String, string.Join(',',  dEIDs), ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
