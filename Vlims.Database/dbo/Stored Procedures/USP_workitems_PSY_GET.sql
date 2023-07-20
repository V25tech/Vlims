  CREATE PROCEDURE [dbo].[USP_workitems_PSY_GET] @WITId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT WITId_PSY,
TaskType_PSY,
Stage_PSY,
AssignedToGroup_PSY,
InitiatedOn_PSY,
Status_PSY,
DueDate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[workitems_PSY] WITH (NOLOCK) where [WITId_PSY] = @WITId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END