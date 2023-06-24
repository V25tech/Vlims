//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentManager.DataAccess
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Vlims.Common;
    using Vlims.DMS.Entities;


    // Comment
    public interface IDocumentManagerData
    {
        
        DataSet GetAllDocumentManager(RequestContext requestContext);
        
        DataSet GetDocumentManagerByDMGId(int dMGId);
        
        bool SaveDocumentManager(DocumentManager documentManager);
        
        bool UpdateDocumentManager(DocumentManager documentManager);
        
        bool DeleteDocumentManagerByDMGId(int dMGId);
        
        bool DeleteAllDocumentManager(List<int> dMGIds);
    }
}
