
using System;
using System.Data;
using System.Linq;
using System.Data.SqlClient;
using System.Collections.Generic;
using Newtonsoft.Json;
using Vlims.Common;



// Comment
public static class ExistingDocumentRequestData
{

    public static DataSet GetAllExistingDocumentRequest(RequestContext requestContext)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
            sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
            return dataset;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static DataSet GetExistingDocumentRequestByEDRId(string eDRId)
    {
        try
        {
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_GET, ExistingDocumentRequestConstants.EDRId, DbType.Int32, eDRId, ExecutionType.Dataset);
            return dataset;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool SaveExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.Documentmanagerid, Value = existingDocumentRequest.Documentmanagerid });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.documentno, Value = existingDocumentRequest.documentno });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.documenttitle, Value = existingDocumentRequest.documenttitle });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.printtype, Value = existingDocumentRequest.printtype });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.noofcopies, Value = existingDocumentRequest.noofcopies });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.workflow, Value = existingDocumentRequest.workflow });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.reason, Value = existingDocumentRequest.reason });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.browse, Value = existingDocumentRequest.browse });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.sampletemplate, Value = existingDocumentRequest.sampletemplate });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.CreatedBy, Value = existingDocumentRequest.CreatedBy });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.ModifiedBy, Value = existingDocumentRequest.ModifiedBy });
            Object result = dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_INSERT, sqlparms, ExecutionType.Scalar);
            return (Convert.ToInt32(result) > 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool UpdateExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.EDRId, Value = existingDocumentRequest.EDRId });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.Documentmanagerid, Value = existingDocumentRequest.Documentmanagerid });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.documentno, Value = existingDocumentRequest.documentno });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.documenttitle, Value = existingDocumentRequest.documenttitle });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.printtype, Value = existingDocumentRequest.printtype });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.noofcopies, Value = existingDocumentRequest.noofcopies });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.workflow, Value = existingDocumentRequest.workflow });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.reason, Value = existingDocumentRequest.reason });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.browse, Value = existingDocumentRequest.browse });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.sampletemplate, Value = existingDocumentRequest.sampletemplate });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = ExistingDocumentRequestConstants.ModifiedBy, Value = existingDocumentRequest.ModifiedBy });
            Object result = dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
            return (Convert.ToInt32(result) > 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool DeleteExistingDocumentRequestByEDRId(string eDRId)
    {
        try
        {
            var result = dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_DELETE, ExistingDocumentRequestConstants.EDRId, DbType.Int32, eDRId, ExecutionType.NonQuery);
            return (Convert.ToInt32(result) >= 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool DeleteAllExistingDocumentRequest(List<int> eDRIds)
    {
        try
        {
            var result = dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocumentRequest_PSY_DELETE_ALL, ExistingDocumentRequestConstants.EDRId, DbType.String, string.Join(',', eDRIds), ExecutionType.NonQuery);
            return (Convert.ToInt32(result) >= 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }
}

