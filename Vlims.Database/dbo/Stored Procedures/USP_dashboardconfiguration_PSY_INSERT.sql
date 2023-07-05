  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_INSERT] @DocumentMasterId NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[dashboardconfiguration_PSY] 
 (DocumentMasterId,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@DocumentMasterId,
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