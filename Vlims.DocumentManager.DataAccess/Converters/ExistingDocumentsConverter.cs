using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Common;
using Vlims.DocumentManager.Entities;
using Vlims.DocumentManager.Entities.Constants;

namespace Vlims.DocumentManager.DataAccess.Converters
{
    public class ExistingDocumentsConverter
    {
        public static DocumentsEntity SetAllExistingDocuments(DataSet dataset)
        {
            DocumentsEntity documents = new DocumentsEntity();
            try
			{
                if(dataset != null && dataset.Tables != null && dataset.Tables.Count > 0)
                {
                    documents.TotalRecords = 0;
                    List<ExisitingDocumentsEntity> tableDocuments = new List<ExisitingDocumentsEntity>();
                    foreach (DataTable dataTable in dataset.Tables)
                    {
                        if (dataTable != null && dataTable.Rows.Count > 0)
                        {
                            documents.TotalRecords += Convert.ToInt32(dataTable.Rows[0][DocumentsDatabaseConstants.TotalRows]);
                            foreach (DataRow row in dataTable.Rows)
                            {
                                tableDocuments.Add(SetDocuments(row));
                            }
                        }
                    }
                    documents.exisitingDocuments = tableDocuments;
                }
                return documents;
			}
			catch (Exception ex)
			{

				throw;
			}
        }
        private static ExisitingDocumentsEntity SetDocuments(DataRow row)
        {
            try
            {
                ExisitingDocumentsEntity document = new ExisitingDocumentsEntity();
                if (row != null)
                {
                        document.Id = Convert.ToInt32(Convert.ToInt32(row[DocumentsDatabaseConstants.Id]));
                        document.DocumentNo = Convert.ToString(row[DocumentsDatabaseConstants.DocumentNo]);
                        document.DocumentName = Convert.ToString(row[DocumentsDatabaseConstants.DocumentName]);
                        document.DocumentType = Convert.ToString(row[DocumentsDatabaseConstants.DocumentType]);
                        document.Department = Convert.ToString(row[DocumentsDatabaseConstants.Department]);
                        document.CreatedBy = Convert.ToString(row[DocumentsDatabaseConstants.CreatedBy]);
                        document.CreatedOn = DatatypeConverter.SetDateTime(row[DocumentsDatabaseConstants.CreatedOn]);
                        document.ModifiedBy = Convert.ToString(row[DocumentsDatabaseConstants.ModifiedBy]);
                        document.ModifiedOn = DatatypeConverter.SetDateTime(row[DocumentsDatabaseConstants.ModifiedOn]);
                        document.EffectiveDate = DatatypeConverter.SetDateTime(row[DocumentsDatabaseConstants.EffectiveDate]);
                        document.ReviewDate = Convert.ToDateTime(DatatypeConverter.SetDateTime(row[DocumentsDatabaseConstants.ReviewDate]));
                        document.EntityName = Convert.ToString(row[DocumentsDatabaseConstants.TableName]);
                        document.Document = Convert.ToString(row[DocumentsDatabaseConstants.Document]);
                        if (Convert.ToString(row[DocumentsDatabaseConstants.TableName]) == "New Document")
                        {
                            document.Template = Convert.ToString(row[DocumentsDatabaseConstants.Template]);
                        }                      
                }
                return document;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static List<TrackSearchInfo> SetAllTrackedDocuments(DataSet dataset)
        {
            List<TrackSearchInfo> trackSearchInfo = new List<TrackSearchInfo>();
            try
            {
                if (dataset != null && dataset.Tables != null && dataset.Tables.Count > 0)
                {
                    if(dataset.Tables[0].Rows != null && dataset.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in dataset.Tables[0].Rows)
                        {
                            TrackSearchInfo info = new TrackSearchInfo();
                            info.Id = 0;
                            info.DocumentNo = Convert.ToString(row[DocumentsDatabaseConstants.DocumentNo]);
                            info.DocumentName = Convert.ToString(row[DocumentsDatabaseConstants.DocumentTitle]);
                            info.Stage = Convert.ToString(row[DocumentsDatabaseConstants.Stage]);
                            info.Status = Convert.ToString(row[DocumentsDatabaseConstants.Status]);
                            trackSearchInfo.Add(info);
                        }
                    }
                }
                return trackSearchInfo;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
