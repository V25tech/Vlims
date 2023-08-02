  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_GET] @DRID_PSY int 
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
ModifiedDate_PSY,
Status_PSY,
Workflow_PSY
  FROM [dbo].[Documentrequest_PSY] WITH (NOLOCK) where [DRID_PSY] = @DRID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END