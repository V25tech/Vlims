  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_By_AdminManagerId_DELETE] @AdminManagerId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[SecurityManagement_PSY]  WHERE AdminManagerId_PSY IN (@AdminManagerId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END