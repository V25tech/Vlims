  CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_DELETE_ALL] @HMId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[HierarchyManagement_PSY] WHERE [HMId_PSY] IN (select value from STRING_SPLIT(@HMId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END