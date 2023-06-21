//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Sheet1.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    using PolicySummary.Sheet1.Data;
    
    
    // Comment
    public class DocumentTemplateConfigurationService : IDocumentTemplateConfigurationService
    {
        
        private readonly IDocumentTemplateConfigurationData documentTemplateConfigurationData;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="documentTemplateConfigurationData"></param>
        public DocumentTemplateConfigurationService(IDocumentTemplateConfigurationData documentTemplateConfigurationData)
        {
            this.documentTemplateConfigurationData = documentTemplateConfigurationData;
        }
        
        public ResponseContext<DocumentTemplateConfiguration> GetAllDocumentTemplateConfiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = documentTemplateConfigurationData.GetAllDocumentTemplateConfiguration(requestContext);
                List<DocumentTemplateConfiguration> result = DocumentTemplateConfigurationConverter.SetAllDocumentTemplateConfiguration(dataset);
                return new ResponseContext<DocumentTemplateConfiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DocumentTemplateConfiguration GetDocumentTemplateConfigurationByDTID(int dTID)
        {
            try
            {
                DataSet dataset = documentTemplateConfigurationData.GetDocumentTemplateConfigurationByDTID(dTID);
                DocumentTemplateConfiguration result = DocumentTemplateConfigurationConverter.SetDocumentTemplateConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            try
            {
                String validationMessages = DocumentTemplateConfigurationValidator.IsValidDocumentTemplateConfiguration(documentTemplateConfiguration);
                if (validationMessages.Length <= 0)
                {
                    var result = documentTemplateConfigurationData.SaveDocumentTemplateConfiguration(documentTemplateConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateDocumentTemplateConfiguration(DocumentTemplateConfiguration documentTemplateConfiguration)
        {
            try
            {
                String validationMessages = DocumentTemplateConfigurationValidator.IsValidDocumentTemplateConfiguration(documentTemplateConfiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = documentTemplateConfigurationData.UpdateDocumentTemplateConfiguration(documentTemplateConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDocumentTemplateConfigurationByDTID(int dTID)
        {
            try
            {
                return documentTemplateConfigurationData.DeleteDocumentTemplateConfigurationByDTID(dTID);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllDocumentTemplateConfiguration(List<int> dTIDs)
        {
            try
            {
                return documentTemplateConfigurationData.DeleteAllDocumentTemplateConfiguration(dTIDs);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
