  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_By_UserManagementID_DELETE] @UserManagementID int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserConfiguration_PSY]  WHERE UserManagementID_PSY IN (@UserManagementID) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END