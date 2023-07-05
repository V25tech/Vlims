  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_By_Documentmanagerid_DELETE] @Documentmanagerid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentPreparation_PSY]  WHERE Documentmanagerid_PSY IN (@Documentmanagerid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END