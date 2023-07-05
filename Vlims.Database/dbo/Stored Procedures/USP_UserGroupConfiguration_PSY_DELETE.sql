  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_DELETE] @Ugcid_PSY int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserGroupConfiguration_PSY]  WHERE [Ugcid_PSY] IN (@Ugcid_PSY) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END