  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_DELETE_ALL] @DPCFId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DepartmentConfiguration_PSY] WHERE [DPCFId_PSY] IN (select value from STRING_SPLIT(@DPCFId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END