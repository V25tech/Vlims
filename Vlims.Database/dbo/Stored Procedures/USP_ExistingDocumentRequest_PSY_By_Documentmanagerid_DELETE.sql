  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_By_Documentmanagerid_DELETE] @Documentmanagerid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[ExistingDocumentRequest_PSY]  WHERE EDRId_PSY IN (@Documentmanagerid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END