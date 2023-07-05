  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_DELETE_ALL] @DTID_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentTemplateConfiguration_PSY] WHERE [DTID_PSY] IN (select value from STRING_SPLIT(@DTID_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END