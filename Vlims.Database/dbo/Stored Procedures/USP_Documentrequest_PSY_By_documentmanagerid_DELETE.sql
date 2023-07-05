  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_By_documentmanagerid_DELETE] @documentmanagerid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[Documentrequest_PSY]  WHERE documentmanagerid_PSY IN (@documentmanagerid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END