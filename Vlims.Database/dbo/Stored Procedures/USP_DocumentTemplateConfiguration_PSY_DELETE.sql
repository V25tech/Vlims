  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_DELETE] @DTID_PSY int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentTemplateConfiguration_PSY]  WHERE [DTID_PSY] IN (@DTID_PSY) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END