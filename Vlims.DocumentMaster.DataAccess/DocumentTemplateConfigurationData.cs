//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentMaster.DataAccess
{
    using System;
    using System.Data;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.DocumentMaster.Entities;
    using System.Xml.Serialization;
    using System.Runtime.Serialization;

    // Comment
    public  class DocumentTemplateConfigurationData 
    {
        
        
        
        public static DataSet GetAllDocumentTemplateConfiguration(RequestContext requestContext)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static DataSet GetDocumentTemplateConfigurationByDTID(int dTID)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_GET, DocumentTemplateConfigurationConstants.DTID, DbType.Int32, dTID, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public static bool IsTemplateDuplicate(string p_Template)
        {
            try
            {
                var obj= dataAccessHelper.ExecuteStoredProcedure("dbo.USP_CHECK_DUPLICATE_TEMPLATE", "@TEMPLATE", DbType.String, p_Template, ExecutionType.Scalar);
                int num= Convert.ToInt32(obj);
                return num.Equals(0) ? false : true;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public static DataSet GetDocumentTemplateConfigurationByTemplate(string templateName, int p_PrepId)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Templatename, Value = templateName });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = "@PrepId", Value = p_PrepId });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(
                    DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_TEMPLATE,
                    sqlparms,
                    ExecutionType.Dataset);
                return dataset;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public static DataSet GetTemplateHeaderFooterDetails(string templateName, int p_Prepid)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = "@TemplateName", Value = templateName});
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = "@PrepId", Value = p_Prepid });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure("dbo.USP_GetTemplateHeaderFooterDetails",sqlparms,ExecutionType.Dataset);
                return dataset;
            }
            catch (Exception ex)
            {
                throw; // Re-throwing the exception as is, you might want to handle or log it differently.
            }
        }


        public static bool SaveDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            try
            {
                var serializer = new XmlSerializer(typeof(DocumentTemplateConfiguration));
                // Create a StringWriter to hold the XML data
                var writer = new StringWriter();

                // Serialize the Person object to XML and write it to the StringWriter
                serializer.Serialize(writer, documentTemplateConfiguration);

                // Get the XML string from the StringWriter
                string xmlString = writer.ToString();
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.DocumentMasterId, Value = documentTemplateConfiguration.DocumentMasterId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Templatename, Value = documentTemplateConfiguration.Templatename });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Uniquecode, Value = documentTemplateConfiguration.Uniquecode });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.documenttype, Value = documentTemplateConfiguration.documenttype });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.description, Value = documentTemplateConfiguration.description });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.header, Value = documentTemplateConfiguration.header });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.rows, Value = documentTemplateConfiguration.rows });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.columns, Value = documentTemplateConfiguration.columns });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footer, Value = documentTemplateConfiguration.footer });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footerrows, Value = documentTemplateConfiguration.footerrows });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footercolumns, Value = documentTemplateConfiguration.footercolumns });
                sqlparms.Add(new SqlParameter { DbType = DbType.Xml, ParameterName = DocumentTemplateConfigurationConstants.document, Value =xmlString  });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.CreatedBy, Value = documentTemplateConfiguration.CreatedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.ModifiedBy, Value = documentTemplateConfiguration.ModifiedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Status, Value = documentTemplateConfiguration.Status });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = DocumentTemplateConfigurationConstants.Pages, Value = documentTemplateConfiguration.Pages });
                sqlparms.Add(new SqlParameter { DbType = DbType.Boolean, ParameterName = "@IsClone", Value = documentTemplateConfiguration.IsClone });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = "@PreparationId", Value = documentTemplateConfiguration.PreparationId });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_INSERT, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool UpdateDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            try
            {
                var serializer = new XmlSerializer(typeof(DocumentTemplateConfiguration));
                // Create a StringWriter to hold the XML data
                var writer = new StringWriter();

                // Serialize the Person object to XML and write it to the StringWriter
                serializer.Serialize(writer, documentTemplateConfiguration);

                // Get the XML string from the StringWriter
                string xmlString = writer.ToString();
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.DTID, Value = documentTemplateConfiguration.DTID });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.DocumentMasterId, Value = documentTemplateConfiguration.DocumentMasterId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Templatename, Value = documentTemplateConfiguration.Templatename });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Uniquecode, Value = documentTemplateConfiguration.Uniquecode });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.documenttype, Value = documentTemplateConfiguration.documenttype });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.description, Value = documentTemplateConfiguration.description });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.header, Value = documentTemplateConfiguration.header });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.rows, Value = documentTemplateConfiguration.rows });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.columns, Value = documentTemplateConfiguration.columns });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footer, Value = documentTemplateConfiguration.footer });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footerrows, Value = documentTemplateConfiguration.footerrows });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.footercolumns, Value = documentTemplateConfiguration.footercolumns });
                sqlparms.Add(new SqlParameter { DbType = DbType.Xml, ParameterName = DocumentTemplateConfigurationConstants.document, Value = xmlString });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.ModifiedBy, Value = documentTemplateConfiguration.ModifiedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = DocumentTemplateConfigurationConstants.Status, Value = documentTemplateConfiguration.Status });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = DocumentTemplateConfigurationConstants.Pages, Value = documentTemplateConfiguration.Pages });
                Object result = dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool DeleteDocumentTemplateConfigurationByDTID(int dTID)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_DELETE, DocumentTemplateConfigurationConstants.DTID, DbType.Int32, dTID, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static bool DeleteAllDocumentTemplateConfiguration(List<int> dTIDs)
        {
            try
            {
                var result = dataAccessHelper.ExecuteStoredProcedure(DocumentTemplateConfigurationConstants.USP_DocumentTemplateConfiguration_PSY_DELETE_ALL, DocumentTemplateConfigurationConstants.DTID, DbType.String, string.Join(',',  dTIDs), ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
