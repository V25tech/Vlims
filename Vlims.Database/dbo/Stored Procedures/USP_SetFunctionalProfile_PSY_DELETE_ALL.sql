  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_DELETE_ALL] @SFPID_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[SetFunctionalProfile_PSY] WHERE [SFPID_PSY] IN (select value from STRING_SPLIT(@SFPID_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END