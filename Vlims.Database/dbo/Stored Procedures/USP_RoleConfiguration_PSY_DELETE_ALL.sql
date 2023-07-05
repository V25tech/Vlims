  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_DELETE_ALL] @ROCFId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[RoleConfiguration_PSY] WHERE [ROCFId_PSY] IN (select value from STRING_SPLIT(@ROCFId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END