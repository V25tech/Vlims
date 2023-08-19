

  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_By_documentmanagerid_GET] @documentmanagerid int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DRID_PSY,
documentmanagerid_PSY,
documenttype_PSY,
department_PSY,
Purpose_PSY,
ApprovalsCount_PSY,
AssigntoGroup_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[Documentrequest_PSY] WITH (NOLOCK) where documentmanagerid_PSY = @documentmanagerid 
  order by CreatedDate_PSY desc
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END