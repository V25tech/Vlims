  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_DELETE_ALL] @UCFId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserConfiguration_PSY] WHERE [UCFId_PSY] IN (select value from STRING_SPLIT(@UCFId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END