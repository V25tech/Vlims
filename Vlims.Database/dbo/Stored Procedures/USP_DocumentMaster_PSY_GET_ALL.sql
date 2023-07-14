 CREATE PROCEDURE [dbo].[USP_DocumentMaster_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT Dmid_PSY,
Documentypeconfiguration_PSY,
Documentemplateonfiguration_PSY,
WorkFlowConfiguration_PSY,
NotificationConfiguration_PSY,
DashboardConfiguration_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,  
 count(*) over() as TotalRows 
 FROM [dbo].[DocumentMaster_PSY] WITH (NOLOCK) 
 Order by [Dmid_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END