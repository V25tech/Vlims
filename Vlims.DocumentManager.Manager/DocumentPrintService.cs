using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Vlims.Common;

// Comment
public class DocumentPrintService : IDocumentPrintService
{
    public ResponseContext<DocumentPrint> GetAllDocumentPrint(RequestContext requestContext)
    {
        try
        {
            DataSet dataset = DocumentPrintData.GetAllDocumentPrint(requestContext);
            List<DocumentPrint> result = DocumentPrintConverter.SetAllDocumentPrint(dataset);
            return new ResponseContext<DocumentPrint>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public DocumentPrint GetDocumentPrintByDRId(int dRId)
    {
        try
        {
            DataSet dataset = DocumentPrintData.GetDocumentPrintByDRId(dRId);
            DocumentPrint result = DocumentPrintConverter.SetDocumentPrint(dataset);
            return result;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public bool SaveDocumentPrint(DocumentPrint documentPrint)
    {
        try
        {
            String validationMessages = DocumentPrintValidator.IsValidDocumentPrint(documentPrint);
            if (validationMessages.Length <= 0)
            {
                documentPrint.Status = "Active";
                var result = DocumentPrintData.SaveDocumentPrint(documentPrint);
                AuditLog.SaveAuditLog(new AuditLogEntity { UserName = "test", EntityName = documentPrint.documenttitle, Type = DocumentPrintConstants.dprintname, state = DefinitionStatus.New });
                return result;
            }
            throw new System.Exception(validationMessages);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public bool UpdateDocumentPrint(DocumentPrint documentPrint)
    {
        try
        {
            String validationMessages = DocumentPrintValidator.IsValidDocumentPrint(documentPrint);
            if (validationMessages.Length <= 0)
            {
                bool result = DocumentPrintData.UpdateDocumentPrint(documentPrint);
                return result;
            }
            throw new System.Exception(validationMessages);
        }
        catch (System.Exception)
        {
            throw;
        }
    }

    public bool DeleteDocumentPrintByDRId(string dRId)
    {
        try
        {
            return DocumentPrintData.DeleteDocumentPrintByDRId(dRId);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public bool DeleteAllDocumentPrint(List<int> dRIds)
    {
        try
        {
            return DocumentPrintData.DeleteAllDocumentPrint(dRIds);
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}

