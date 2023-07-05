  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_DELETE] @DCId_PSY int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[dashboardconfiguration_PSY]  WHERE [DCId_PSY] IN (@DCId_PSY) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END