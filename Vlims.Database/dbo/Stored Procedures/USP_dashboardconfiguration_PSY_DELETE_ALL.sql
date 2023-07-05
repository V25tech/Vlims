  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_DELETE_ALL] @DCId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[dashboardconfiguration_PSY] WHERE [DCId_PSY] IN (select value from STRING_SPLIT(@DCId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END