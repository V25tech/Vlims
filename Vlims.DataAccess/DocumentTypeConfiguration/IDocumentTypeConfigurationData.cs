//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Sheet1.Data
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    
    
    // Comment
    public interface IDocumentTypeConfigurationData
    {
        
        DataSet GetAllDocumentTypeConfiguration(RequestContext requestContext);
        
        DataSet GetDocumentTypeConfigurationByDTCId(int dTCId);
        
        bool SaveDocumentTypeConfiguration(DocumentTypeConfiguration documentTypeConfiguration);
        
        bool UpdateDocumentTypeConfiguration(DocumentTypeConfiguration documentTypeConfiguration);
        
        bool DeleteDocumentTypeConfigurationByDTCId(int dTCId);
        
        bool DeleteAllDocumentTypeConfiguration(List<int> dTCIds);
    }
}
