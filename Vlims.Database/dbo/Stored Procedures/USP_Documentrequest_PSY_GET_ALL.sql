





 CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
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
ApprovedOn_PSY,
Approvedby_PSY,
Workflow_PSY,
Reason_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[Documentrequest_PSY] WITH (NOLOCK) 
 Order by CreatedDate_PSY DESC  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


