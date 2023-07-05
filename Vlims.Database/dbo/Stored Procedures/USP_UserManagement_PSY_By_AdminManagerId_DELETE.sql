  CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_By_AdminManagerId_DELETE] @AdminManagerId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserManagement_PSY]  WHERE AdminManagerId_PSY IN (@AdminManagerId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END