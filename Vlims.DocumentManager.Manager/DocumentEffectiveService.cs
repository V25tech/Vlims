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
    using Vlims.Common;
    using Vlims.DMS.Entities;
    using Vlims.DocumentManager.DataAccess;


    // Comment
    public class DocumentEffectiveService : IDocumentEffectiveService
    {
        public ResponseContext<DocumentEffective> GetAllDocumentEffective(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = DocumentEffectiveData.GetAllDocumentEffective(requestContext);
                List<DocumentEffective> result = DocumentEffectiveConverter.SetAllDocumentEffective(dataset);
                return new ResponseContext<DocumentEffective>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }


        //public ResponseContext<Documentrequest> GetAllDocumentEffective(RequestContext requestContext)
        //{
        //    try
        //    {
        //        requestContext.PageNumber = 1;
        //        requestContext.PageSize = 50;
        //        DataSet dataset = DocumentEffectiveData.GetAllDocumentEffective(requestContext);
        //        List<Documentrequest> result = DocumentrequestConverter.SetAllDocumentrequest(dataset);
        //        result = result.Where(item => item.Status == "Approved").ToList();
        //        return new ResponseContext<Documentrequest>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
        //    }
        //    catch (System.Exception ex)
        //    {
        //        throw;
        //    }
        //}

        public DocumentEffective GetDocumentEffectiveByDEID(string dEID)
        {
            try
            {
                DataSet dataset = DocumentEffectiveData.GetDocumentEffectiveByDEID(dEID);
                DocumentEffective result = DocumentEffectiveConverter.SetDocumentEffective(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveDocumentEffective(DocumentEffective documentEffective)
        {
            try
            {
                String validationMessages = DocumentEffectiveValidator.IsValidDocumentEffective(documentEffective);
                if (validationMessages.Length <= 0)
                {
                    var result = DocumentEffectiveData.SaveDocumentEffective(documentEffective);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateDocumentEffective(DocumentEffective documentEffective)
        {
            try
            {
                String validationMessages = DocumentEffectiveValidator.IsValidDocumentEffective(documentEffective);
                if (validationMessages.Length <= 0)
                {
                    bool result = DocumentEffectiveData.UpdateDocumentEffective(documentEffective);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteDocumentEffectiveByDEID(string dEID)
        {
            try
            {
                return DocumentEffectiveData.DeleteDocumentEffectiveByDEID(dEID);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllDocumentEffective(List<int> dEIDs)
        {
            try
            {
                return DocumentEffectiveData.DeleteAllDocumentEffective(dEIDs);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
