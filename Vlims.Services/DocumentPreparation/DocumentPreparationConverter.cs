//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    
    using VAMLIbrary.Core.Extentions;
    using Vlims.Entities;



    // Comment
    public static class DocumentPreparationConverter
    {
        
        public static List<DocumentPreparation> SetAllDocumentPreparation(DataSet dataset)
        {
            try
            {
                List<DocumentPreparation> result = new List<DocumentPreparation>();
                DocumentPreparation documentPreparationData;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        documentPreparationData = new DocumentPreparation();
                        documentPreparationData.DPNID = Convert.ToString(row[DocumentPreparationConstants.DPNID.TrimAt()]);
                        documentPreparationData.Documentmanagerid = Convert.ToString(row[DocumentPreparationConstants.Documentmanagerid.TrimAt()]);
                        documentPreparationData.documenttitle = Convert.ToString(row[DocumentPreparationConstants.documenttitle.TrimAt()]);
                        documentPreparationData.documentno = Convert.ToString(row[DocumentPreparationConstants.documentno.TrimAt()]);
                        documentPreparationData.documenttype = Convert.ToString(row[DocumentPreparationConstants.documenttype.TrimAt()]);
                        documentPreparationData.department = Convert.ToString(row[DocumentPreparationConstants.department.TrimAt()]);
                        documentPreparationData.document = Convert.ToString(row[DocumentPreparationConstants.document.TrimAt()]);
                        documentPreparationData.template = Convert.ToString(row[DocumentPreparationConstants.template.TrimAt()]);
                        documentPreparationData.wokflow = Convert.ToString(row[DocumentPreparationConstants.wokflow.TrimAt()]);
                        documentPreparationData.details = Convert.ToString(row[DocumentPreparationConstants.details.TrimAt()]);
                        documentPreparationData.CreatedBy = Convert.ToString(row[DocumentPreparationConstants.CreatedBy.TrimAt()]);
                        documentPreparationData.CreatedDate = DatatypeConverter.SetDateTime(row[DocumentPreparationConstants.CreatedDate.TrimAt()]);
                        documentPreparationData.ModifiedBy = Convert.ToString(row[DocumentPreparationConstants.ModifiedBy.TrimAt()]);
                        documentPreparationData.ModifiedDate = DatatypeConverter.SetDateTime(row[DocumentPreparationConstants.ModifiedDate.TrimAt()]);
                        result.Add(documentPreparationData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static DocumentPreparation SetDocumentPreparation(DataSet dataset)
        {
            var result = SetAllDocumentPreparation(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
    }
}
