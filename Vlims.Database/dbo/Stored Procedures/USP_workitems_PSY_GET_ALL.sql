 CREATE PROCEDURE [dbo].[USP_workitems_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT WITId_PSY,
TaskType_PSY,
TaskName_PSY,
Stage_PSY,
AssignedToGroup_PSY,
InitiatedOn_PSY,
Status_PSY,
DueDate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
RefrenceId_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[workitems_PSY] WITH (NOLOCK) 
 Order by [WITId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END