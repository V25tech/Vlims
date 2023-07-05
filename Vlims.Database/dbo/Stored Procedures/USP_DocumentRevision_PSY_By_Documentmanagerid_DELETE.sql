  CREATE PROCEDURE [dbo].[USP_DocumentRevision_PSY_By_Documentmanagerid_DELETE] @Documentmanagerid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentRevision_PSY]  WHERE Documentmanagerid_PSY IN (@Documentmanagerid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END