  CREATE PROCEDURE [dbo].[USP_DocumentTypeConfiguration_PSY_DELETE_ALL] @DTCId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentTypeConfiguration_PSY] WHERE [DTCId_PSY] IN (select value from STRING_SPLIT(@DTCId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END