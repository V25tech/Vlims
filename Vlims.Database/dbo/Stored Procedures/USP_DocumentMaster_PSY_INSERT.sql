  CREATE PROCEDURE [dbo].[USP_DocumentMaster_PSY_INSERT] @Documentypeconfiguration_PSY NVarChar(50),
@Documentemplateonfiguration_PSY NVarChar(50),
@WorkFlowConfiguration_PSY NVarChar(50),
@NotificationConfiguration_PSY NVarChar(50),
@DashboardConfiguration_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentMaster_PSY] 
 (Documentypeconfiguration_PSY,
Documentemplateonfiguration_PSY,
WorkFlowConfiguration_PSY,
NotificationConfiguration_PSY,
DashboardConfiguration_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@Documentypeconfiguration_PSY,
@Documentemplateonfiguration_PSY,
@WorkFlowConfiguration_PSY,
@NotificationConfiguration_PSY,
@DashboardConfiguration_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END