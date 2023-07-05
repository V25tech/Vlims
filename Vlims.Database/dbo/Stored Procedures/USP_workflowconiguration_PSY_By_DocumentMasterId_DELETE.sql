  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_By_DocumentMasterId_DELETE] @DocumentMasterId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[workflowconiguration_PSY]  WHERE DocumentMasterId_PSY IN (@DocumentMasterId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END