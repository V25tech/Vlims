  CREATE PROCEDURE [dbo].[USP_DocumentMaster_PSY_UPDATE] @Dmid_PSY int, @Documentypeconfiguration_PSY NVarChar(50),
@Documentemplateonfiguration_PSY NVarChar(50),
@WorkFlowConfiguration_PSY NVarChar(50),
@NotificationConfiguration_PSY NVarChar(50),
@DashboardConfiguration_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentMaster_PSY] SET Documentypeconfiguration_PSY=@Documentypeconfiguration_PSY,
Documentemplateonfiguration_PSY=@Documentemplateonfiguration_PSY,
WorkFlowConfiguration_PSY=@WorkFlowConfiguration_PSY,
NotificationConfiguration_PSY=@NotificationConfiguration_PSY,
DashboardConfiguration_PSY=@DashboardConfiguration_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [Dmid_PSY] = @Dmid_PSY ;  select @Dmid_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END