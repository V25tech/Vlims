//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


using System;
using System.Data;
using System.Linq;
using System.Data.SqlClient;
using System.Collections.Generic;
using Newtonsoft.Json;
using Vlims.Common;



// Comment
public static class DocumentPrintData
{



    public static DataSet GetAllDocumentPrint(RequestContext requestContext)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
            sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
            return dataset;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static DataSet GetDocumentPrintByDRId(int dRId)
    {
        try
        {
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_GET, DocumentPrintConstants.DRId, DbType.Int32, dRId, ExecutionType.Dataset);
            return dataset;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool SaveDocumentPrint(DocumentPrint documentPrint)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.documenttitle, Value = documentPrint.documenttitle });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.printtype, Value = documentPrint.printtype });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.documentno, Value = documentPrint.DocumentNumber });
            sqlparms.Add(new SqlParameter { DbType = DbType.Int16, ParameterName = DocumentPrintConstants.noofcopies, Value = documentPrint.noofcopies });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.workflow, Value = documentPrint.workflow });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.reason, Value = documentPrint.reason });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.CreatedBy, Value = documentPrint.CreatedBy });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.ModifiedBy, Value = documentPrint.ModifiedBy });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = "@PrintCopy_PSY", Value = documentPrint.PrintCopy });
            Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_INSERT, sqlparms, ExecutionType.Scalar);
            return (Convert.ToInt32(result) > 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool UpdateDocumentPrint(DocumentPrint documentPrint)
    {
        try
        {
            List<SqlParameter> sqlparms = new List<SqlParameter>();
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.DRId, Value = documentPrint.DRId });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.documenttitle, Value = documentPrint.documenttitle });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.printtype, Value = documentPrint.printtype });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.documentno, Value = documentPrint.DocumentNumber });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.noofcopies, Value = documentPrint.noofcopies });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.workflow, Value = documentPrint.workflow });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.reason, Value = documentPrint.reason });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.ModifiedBy, Value = documentPrint.ModifiedBy });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentPrintConstants.Status, Value = documentPrint.Status });
            sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = "@PrintCopy_PSY", Value = documentPrint.PrintCopy });
            Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
            return (Convert.ToInt32(result) > 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool DeleteDocumentPrintByDRId(string dRId)
    {
        try
        {
            var result = dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_DELETE, DocumentPrintConstants.DRId, DbType.Int32, dRId, ExecutionType.NonQuery);
            return (Convert.ToInt32(result) >= 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static bool DeleteAllDocumentPrint(List<int> dRIds)
    {
        try
        {
            var result = dataAccessHelper.ExecuteStoredProcedure(DocumentPrintConstants.USP_DocumentPrint_PSY_DELETE_ALL, DocumentPrintConstants.DRId, DbType.String, string.Join(',', dRIds), ExecutionType.NonQuery);
            return (Convert.ToInt32(result) >= 0);
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }
}

