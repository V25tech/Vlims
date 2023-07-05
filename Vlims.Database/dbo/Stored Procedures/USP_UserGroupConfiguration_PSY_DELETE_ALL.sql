  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_DELETE_ALL] @Ugcid_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[UserGroupConfiguration_PSY] WHERE [Ugcid_PSY] IN (select value from STRING_SPLIT(@Ugcid_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END