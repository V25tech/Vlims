//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentManager.Manager
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.DMS.Entities;
    using Vlims.Common;
    using Vlims.DocumentManager.DataAccess;



    // Comment
    public class DocumentManagerService : IDocumentManagerService
    {
        
      
        
        public ResponseContext<DocumentManager> GetAllDocumentManager(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = DocumentManagerData.GetAllDocumentManager(requestContext);
                List<DocumentManager> result = DocumentManagerConverter.SetAllDocumentManager(dataset);
                return new ResponseContext<DocumentManager>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DocumentManager GetDocumentManagerByDMGId(int dMGId)
        {
            try
            {
                DataSet dataset = DocumentManagerData.GetDocumentManagerByDMGId(dMGId);
                DocumentManager result = DocumentManagerConverter.SetDocumentManager(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveDocumentManager(DocumentManager documentManager)
        {
            try
            {
                String validationMessages = DocumentManagerValidator.IsValidDocumentManager(documentManager);
                if (validationMessages.Length <= 0)
                {
                    var result = DocumentManagerData.SaveDocumentManager(documentManager);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateDocumentManager(DocumentManager documentManager)
        {
            try
            {
                String validationMessages = DocumentManagerValidator.IsValidDocumentManager(documentManager);
                if (validationMessages.Length <= 0)
                {
                    bool result = DocumentManagerData.UpdateDocumentManager(documentManager);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDocumentManagerByDMGId(int dMGId)
        {
            try
            {
                return DocumentManagerData.DeleteDocumentManagerByDMGId(dMGId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllDocumentManager(List<int> dMGIds)
        {
            try
            {
                return DocumentManagerData.DeleteAllDocumentManager(dMGIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
