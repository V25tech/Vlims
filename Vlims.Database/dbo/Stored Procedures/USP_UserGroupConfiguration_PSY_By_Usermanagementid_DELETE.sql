  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_By_Usermanagementid_DELETE] @Usermanagementid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserGroupConfiguration_PSY]  WHERE Usermanagementid_PSY IN (@Usermanagementid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END