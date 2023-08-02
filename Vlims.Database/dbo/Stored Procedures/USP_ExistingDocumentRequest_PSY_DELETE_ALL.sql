  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_DELETE_ALL] @EDRId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[ExistingDocumentRequest_PSY] WHERE [EDRId_PSY] IN (select value from STRING_SPLIT(@EDRId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END