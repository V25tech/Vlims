  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_DELETE_ALL] @DRID_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[Documentrequest_PSY] WHERE [DRID_PSY] IN (select value from STRING_SPLIT(@DRID_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END