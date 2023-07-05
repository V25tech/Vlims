  CREATE PROCEDURE [dbo].[USP_DocumentRevision_PSY_DELETE_ALL] @DRId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentRevision_PSY] WHERE [DRId_PSY] IN (select value from STRING_SPLIT(@DRId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END