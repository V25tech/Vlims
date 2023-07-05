  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_By_DocumentMasterId_DELETE] @DocumentMasterId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[dashboardconfiguration_PSY]  WHERE DocumentMasterId IN (@DocumentMasterId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END