  CREATE PROCEDURE [dbo].[USP_DocumentMaster_PSY_By_Dmid_GET] @Dmid int 
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
ModifiedDate_PSY 
  FROM [dbo].[DocumentMaster_PSY] WITH (NOLOCK) where Dmid_PSY = @Dmid   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END