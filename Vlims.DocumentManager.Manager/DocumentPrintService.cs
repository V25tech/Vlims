using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Vlims.Common;
using Vlims.DocumentMaster.Entities;

// Comment
public class DocumentPrintService : IDocumentPrintService
{
    private static int printCounter = 1;

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

                // Generate Unique value
                string uniqueValue = "print" + printCounter++;

                AuditLog.SaveAuditLog(new AuditLogEntity { UserName = documentPrint.CreatedBy, EntityName = documentPrint.DocumentNumber, Type = DocumentPrintConstants.PrintType, state = DefinitionStatus.New, EntityInfo = documentPrint, Unique = uniqueValue });
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

                // Generate Unique value
                string uniqueValue = "print" + printCounter++;

                // AuditLog.SaveAuditLog(new AuditLogEntity { UserName = documentPrint.CreatedBy, EntityName = documentPrint.DocumentNumber, Type = DocumentPrintConstants.PrintType, state = DefinitionStatus.New, EntityInfo = documentPrint, Unique = uniqueValue });
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
    public bool UpdateDocumentPrintCount(DocumentPrint documentPrint)
    {
        try
        {
            bool result = DocumentPrintData.UpdatePrintCount(documentPrint);
            //string uniqueValue = "print" + printCounter++;
            return result;
        }
        catch (System.Exception)
        {
            throw;
        }
    }

}
