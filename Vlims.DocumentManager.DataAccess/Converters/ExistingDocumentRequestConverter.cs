
using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using Vlims.Common;



// Comment
public static class ExistingDocumentRequestConverter
{

    public static List<ExistingDocumentRequest> SetAllExistingDocumentRequest(DataSet dataset)
    {
        try
        {
            List<ExistingDocumentRequest> result = new();
            ExistingDocumentRequest existingDocumentRequestData;
            if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; (i < dataset.Tables[0].Rows.Count); i++)
                {
                    DataRow row = dataset.Tables[0].Rows[i];
                    existingDocumentRequestData = new ExistingDocumentRequest();
                    existingDocumentRequestData.EDRId = Convert.ToInt16(row[ExistingDocumentRequestConstants.EDRId.Trim('@')]);
                    existingDocumentRequestData.documentno = Convert.ToString(row[ExistingDocumentRequestConstants.documentno.Trim('@')]);
                    existingDocumentRequestData.documenttitle = Convert.ToString(row[ExistingDocumentRequestConstants.documenttitle.Trim('@')]);
                    existingDocumentRequestData.documenttype = Convert.ToString(row[ExistingDocumentRequestConstants.documenttype.Trim('@')]);
                    existingDocumentRequestData.department = Convert.ToString(row[ExistingDocumentRequestConstants.department.Trim('@')]);
                    existingDocumentRequestData.document = Convert.ToString(row[ExistingDocumentRequestConstants.document.Trim('@')]);
                    existingDocumentRequestData.sampletemplate = Convert.ToString(row[ExistingDocumentRequestConstants.sampletemplate.Trim('@')]);
                    existingDocumentRequestData.CreatedBy = Convert.ToString(row[ExistingDocumentRequestConstants.CreatedBy.Trim('@')]);
                    existingDocumentRequestData.CreatedDate = DatatypeConverter.SetDateTime(row[ExistingDocumentRequestConstants.CreatedDate.Trim('@')]);
                    existingDocumentRequestData.ModifiedBy = Convert.ToString(row[ExistingDocumentRequestConstants.ModifiedBy.Trim('@')]);
                    existingDocumentRequestData.ModifiedDate = DatatypeConverter.SetDateTime(row[ExistingDocumentRequestConstants.ModifiedDate.Trim('@')]);
                    existingDocumentRequestData.effectiveDate = DatatypeConverter.SetDateTime(row[ExistingDocumentRequestConstants.EffectiveDate.Trim('@')]).Value;
                    existingDocumentRequestData.reviewDate = Convert.ToString(row[ExistingDocumentRequestConstants.ReviewDate.Trim('@')]);
                    result.Add(existingDocumentRequestData);
                }
            }
            return result;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static ExistingDocumentRequest SetExistingDocumentRequest(DataSet dataset)
    {
        var result = SetAllExistingDocumentRequest(dataset);
        if (result.Count > 0)
        {
            return result.FirstOrDefault();
        }
        return null;
    }
}

