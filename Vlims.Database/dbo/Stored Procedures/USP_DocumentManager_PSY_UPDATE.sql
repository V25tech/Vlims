  CREATE PROCEDURE [dbo].[USP_DocumentManager_PSY_UPDATE] @DMGId_PSY int, @Documentrequest NVarChar(50),
@documentpreparation NVarChar(50),
@AdditionalTasks_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentManager_PSY] SET Documentrequest=@Documentrequest,
documentpreparation=@documentpreparation,
AdditionalTasks_PSY=@AdditionalTasks_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [DMGId_PSY] = @DMGId_PSY ;  select @DMGId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END