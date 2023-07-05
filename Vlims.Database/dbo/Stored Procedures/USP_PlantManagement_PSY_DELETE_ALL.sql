  CREATE PROCEDURE [dbo].[USP_PlantManagement_PSY_DELETE_ALL] @PMId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[PlantManagement_PSY] WHERE [PMId_PSY] IN (select value from STRING_SPLIT(@PMId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END