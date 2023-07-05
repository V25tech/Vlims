  CREATE PROCEDURE [dbo].[USP_AdimManagement_PSY_DELETE_ALL] @AMId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[AdimManagement_PSY] WHERE [AMId_PSY] IN (select value from STRING_SPLIT(@AMId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END