  CREATE PROCEDURE [dbo].[USP_DocumentManager_PSY_DELETE_ALL] @DMGId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentManager_PSY] WHERE [DMGId_PSY] IN (select value from STRING_SPLIT(@DMGId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END