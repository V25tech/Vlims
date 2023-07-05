  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_DELETE_ALL] @WFCId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[workflowconiguration_PSY] WHERE [WFCId_PSY] IN (select value from STRING_SPLIT(@WFCId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END