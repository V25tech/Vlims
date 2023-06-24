//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Administration.Manager
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.Administration.Entities;
    using PolicySummary.Sheet1.Data;
    using Vlims.Administration.DataAccess;
    using PolicySummary.Sheet1.Services;



    // Comment
    public class PlantManagementService : IPlantManagementService
    {
        
      
        
        public ResponseContext<PlantManagement> GetAllPlantManagement(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = PlantManagementData.GetAllPlantManagement(requestContext);
                List<PlantManagement> result = PlantManagementConverter.SetAllPlantManagement(dataset);
                return new ResponseContext<PlantManagement>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public PlantManagement GetPlantManagementByPMId(string pMId)
        {
            try
            {
                DataSet dataset = PlantManagementData.GetPlantManagementByPMId(pMId);
                PlantManagement result = PlantManagementConverter.SetPlantManagement(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SavePlantManagement(PlantManagement plantManagement)
        {
            try
            {
                String validationMessages = PlantManagementValidator.IsValidPlantManagement(plantManagement);
                if (validationMessages.Length <= 0)
                {
                    var result = PlantManagementData.SavePlantManagement(plantManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdatePlantManagement(PlantManagement plantManagement)
        {
            try
            {
                String validationMessages = PlantManagementValidator.IsValidPlantManagement(plantManagement);
                if (validationMessages.Length <= 0)
                {
                    bool result = PlantManagementData.UpdatePlantManagement(plantManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeletePlantManagementByPMId(string pMId)
        {
            try
            {
                return PlantManagementData.DeletePlantManagementByPMId(pMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllPlantManagement(List<int> pMIds)
        {
            try
            {
                return PlantManagementData.DeleteAllPlantManagement(pMIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
