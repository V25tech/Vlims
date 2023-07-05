  CREATE PROCEDURE [dbo].[USP_DocumentManager_PSY_GET] @DMGId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DMGId_PSY,
Documentrequest,
documentpreparation,
DocumentEffective_PSY,
AdditionalTasks_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DocumentManager_PSY] WITH (NOLOCK) where [DMGId_PSY] = @DMGId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END