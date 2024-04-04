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
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.DocumentMaster.Entities;
    using System.Data.SqlTypes;
    using System.Xml.Serialization;


    // Comment
    public static class DocumentTemplateConfigurationConverter
    {

        public static List<DocumentTemplateConfiguration> SetAllDocumentTemplateConfiguration(DataSet dataset, bool fromprep = false)
        {
            try
            {
                List<DocumentTemplateConfiguration> result = new List<DocumentTemplateConfiguration>();
                DocumentTemplateConfiguration documentTemplateConfigurationData; bool islist;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    islist = dataset.Tables[0].Rows.Count > 1;
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        documentTemplateConfigurationData = new DocumentTemplateConfiguration();
                        documentTemplateConfigurationData.DTID = Convert.ToString(row[DocumentTemplateConfigurationConstants.DTID.Trim('@')]);
                        documentTemplateConfigurationData.DocumentMasterId = Convert.ToString(row[DocumentTemplateConfigurationConstants.DocumentMasterId.Trim('@')]);
                        documentTemplateConfigurationData.Templatename = Convert.ToString(row[DocumentTemplateConfigurationConstants.Templatename.Trim('@')]);
                        documentTemplateConfigurationData.Uniquecode = Convert.ToString(row[DocumentTemplateConfigurationConstants.Uniquecode.Trim('@')]);
                        documentTemplateConfigurationData.documenttype = Convert.ToString(row[DocumentTemplateConfigurationConstants.documenttype.Trim('@')]);
                        documentTemplateConfigurationData.description = Convert.ToString(row[DocumentTemplateConfigurationConstants.description.Trim('@')]);
                        documentTemplateConfigurationData.header = Convert.ToString(row[DocumentTemplateConfigurationConstants.header.Trim('@')]);
                        documentTemplateConfigurationData.rows = Convert.ToString(row[DocumentTemplateConfigurationConstants.rows.Trim('@')]);
                        documentTemplateConfigurationData.columns = Convert.ToString(row[DocumentTemplateConfigurationConstants.columns.Trim('@')]);
                        documentTemplateConfigurationData.footer = Convert.ToString(row[DocumentTemplateConfigurationConstants.footer.Trim('@')]);
                        documentTemplateConfigurationData.footerrows = Convert.ToString(row[DocumentTemplateConfigurationConstants.footerrows.Trim('@')]);
                        documentTemplateConfigurationData.footercolumns = Convert.ToString(row[DocumentTemplateConfigurationConstants.footercolumns.Trim('@')]);
                        if (islist)
                            documentTemplateConfigurationData.IsParent = Convert.ToBoolean(row[DocumentTemplateConfigurationConstants.IsParent.Trim('@')]);
                        if (!islist || fromprep)
                        {
                            string docvalue = Convert.ToString(row[DocumentTemplateConfigurationConstants.document.Trim('@')]);
                            if (!string.IsNullOrEmpty(docvalue))
                            {
                                // Create an XmlSerializer for the Person type
                                var serializer1 = new XmlSerializer(typeof(DocumentTemplateConfiguration));
                                // Create a StringReader to read the XML data
                                var reader = new StringReader(Convert.ToString(row[DocumentTemplateConfigurationConstants.document.Trim('@')]));
                                // Deserialize the XML data back to a Person object
                                var person = (DocumentTemplateConfiguration)serializer1.Deserialize(reader);
                                documentTemplateConfigurationData.headerTable = person.headerTable;
                                documentTemplateConfigurationData.footerTable = person.footerTable;
                                documentTemplateConfigurationData.Page = person.Page;
                                documentTemplateConfigurationData.Pages = person.Pages;
                                if (person.titleTable != null)
                                    documentTemplateConfigurationData.titleTable = person.titleTable;
                            }
                        }
                        documentTemplateConfigurationData.CreatedBy = Convert.ToString(row[DocumentTemplateConfigurationConstants.CreatedBy.Trim('@')]);
                        documentTemplateConfigurationData.CreatedDate = DatatypeConverter.SetDateTime(row[DocumentTemplateConfigurationConstants.CreatedDate.Trim('@')]);
                        documentTemplateConfigurationData.ModifiedBy = Convert.ToString(row[DocumentTemplateConfigurationConstants.ModifiedBy.Trim('@')]);
                        documentTemplateConfigurationData.ModifiedDate = DatatypeConverter.SetDateTime(row[DocumentTemplateConfigurationConstants.ModifiedDate.Trim('@')]);
                        documentTemplateConfigurationData.Status = Convert.ToString(row[DocumentTemplateConfigurationConstants.Status.Trim('@')]);
                        result.Add(documentTemplateConfigurationData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        public static List<DocumentTemplateConfiguration> SetAllDocumentTemplateHeaderFooterConfiguration(DataSet dataset)
        {
            try
            {
                List<DocumentTemplateConfiguration> result = new List<DocumentTemplateConfiguration>();
                DocumentTemplateConfiguration documentTemplateConfigurationData; bool islist;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    islist = dataset.Tables[0].Rows.Count > 1;
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        documentTemplateConfigurationData = new DocumentTemplateConfiguration();
                        documentTemplateConfigurationData.DocumentTitle = Convert.ToString(row["documenttitle_PSY"]);
                        documentTemplateConfigurationData.DocumentNo = Convert.ToString(row["documentno_PSY"]);
                        documentTemplateConfigurationData.Version = Convert.ToInt32(row["Version"]);
                        documentTemplateConfigurationData.Supersedes = Convert.ToInt32(row["Supersedes"]);
                        documentTemplateConfigurationData.Department = Convert.ToString(row["department_PSY"]);
                        documentTemplateConfigurationData.EffectiveDate = Convert.ToDateTime(row["EffectiveDate_PSY"]).ToShortDateString();
                        documentTemplateConfigurationData.ReviewDate = Convert.ToDateTime(row["Reviewdate_PSY"]).ToShortDateString();
                        documentTemplateConfigurationData.ReviewedBy = Convert.ToString(row["REVIWED_BY"]);
                        documentTemplateConfigurationData.PreparedBy = Convert.ToString(row["PREPARED_BY"]);
                        documentTemplateConfigurationData.ApprovedBy = Convert.ToString(row["APPROVED_BY"]);
                        documentTemplateConfigurationData.ApprovedDept = Convert.ToString(row["APPROVEDDEPT"]);
                        documentTemplateConfigurationData.ApprovedRole = Convert.ToString(row["APPROVEDROLE"]);
                        documentTemplateConfigurationData.ReviewedDept = Convert.ToString(row["REVIWEDDEPT"]);
                        documentTemplateConfigurationData.ReviewedRole = Convert.ToString(row["REVIWEDROLE"]);
                        documentTemplateConfigurationData.PrintCopy = Convert.ToString(row["PrintCopy_PSY"]);
                        documentTemplateConfigurationData.PrintReason = Convert.ToString(row["reason_PSY"]);
                        string depts = Convert.ToString(row["PREPAREDDEPT"]);
                        if (!string.IsNullOrEmpty(depts))
                        {
                            string[] values = depts.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.PrepareDept = string.Join(",", values.Distinct());
                        }
                        if(!string.IsNullOrEmpty(documentTemplateConfigurationData.ReviewedBy))
                        {
                            string[] values = documentTemplateConfigurationData.ReviewedBy.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ReviewedBy= string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.PreparedBy))
                        {
                            string[] values = documentTemplateConfigurationData.PreparedBy.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.PreparedBy = string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.ApprovedBy))
                        {
                            string[] values = documentTemplateConfigurationData.ApprovedBy.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ApprovedBy = string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.ApprovedDept))
                        {
                            string[] values = documentTemplateConfigurationData.ApprovedDept.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ApprovedDept = string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.ApprovedRole))
                        {
                            string[] values = documentTemplateConfigurationData.ApprovedRole.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ApprovedRole = string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.ReviewedDept))
                        {
                            string[] values = documentTemplateConfigurationData.ReviewedDept.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ReviewedDept = string.Join(",", values.Distinct());
                        }
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.ReviewedRole))
                        {
                            string[] values = documentTemplateConfigurationData.ReviewedRole.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.ReviewedRole = string.Join(",", values.Distinct());
                        }
                        documentTemplateConfigurationData.PreparedRole = Convert.ToString(row["PREPAREDROLE"]);
                        if (!string.IsNullOrEmpty(documentTemplateConfigurationData.PreparedRole))
                        {
                            string[] values = documentTemplateConfigurationData.PreparedRole.Split(',');
                            //HashSet<string> uniqueValues = new HashSet<string>(values);
                            documentTemplateConfigurationData.PreparedRole = string.Join(",", values.Distinct());
                        }
                        //documentTemplateConfigurationData.PrepareDept = Convert.ToString(row["PREPAREDDEPT"]);
                        result.Add(documentTemplateConfigurationData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public static DocumentTemplateConfiguration SetDocumentTemplateConfiguration(DataSet dataset)
        {
            var result = SetAllDocumentTemplateConfiguration(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
        public static DocumentTemplateConfiguration SetDocumentTemplateHeaderFooterConfiguration(DataSet dataset)
        {
            var result = SetAllDocumentTemplateHeaderFooterConfiguration(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
    }
}
