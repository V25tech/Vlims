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
    public interface IdashboardconfigurationData
    {
        
        DataSet GetAlldashboardconfiguration(RequestContext requestContext);
        
        DataSet GetdashboardconfigurationByDCId(int dCId);
        
        bool Savedashboardconfiguration(dashboardconfiguration dashboardconfiguration);
        
        bool Updatedashboardconfiguration(dashboardconfiguration dashboardconfiguration);
        
        bool DeletedashboardconfigurationByDCId(int dCId);
        
        bool DeleteAlldashboardconfiguration(List<int> dCIds);
    }
}
