  CREATE PROCEDURE [dbo].[USP_DocumentManager_PSY_INSERT] @Documentrequest NVarChar(50),
@documentpreparation NVarChar(50),
@AdditionalTasks_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentManager_PSY] 
 (Documentrequest,
documentpreparation,
AdditionalTasks_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@Documentrequest,
@documentpreparation,
@AdditionalTasks_PSY,
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