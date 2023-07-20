  CREATE PROCEDURE [dbo].[USP_workitems_PSY_UPDATE] @WITId_PSY int, @TaskType_PSY NVarChar(50),
@Stage_PSY NVarChar(50),
@AssignedToGroup_PSY NVarChar(50),
@InitiatedOn_PSY NVarChar(50),
@Status_PSY NVarChar(50),
@DueDate_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[workitems_PSY] SET TaskType_PSY=@TaskType_PSY,
Stage_PSY=@Stage_PSY,
AssignedToGroup_PSY=@AssignedToGroup_PSY,
InitiatedOn_PSY=@InitiatedOn_PSY,
Status_PSY=@Status_PSY,
DueDate_PSY=@DueDate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [WITId_PSY] = @WITId_PSY ;  select @WITId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END