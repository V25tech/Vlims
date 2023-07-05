  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_DELETE_ALL] @SMId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[SecurityManagement_PSY] WHERE [SMId_PSY] IN (select value from STRING_SPLIT(@SMId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END