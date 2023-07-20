  CREATE PROCEDURE [dbo].[USP_workitems_PSY_INSERT] @TaskType_PSY NVarChar(50),
@Stage_PSY NVarChar(50),
@AssignedToGroup_PSY NVarChar(50),
@InitiatedOn_PSY NVarChar(50),
@Status_PSY NVarChar(50),
@DueDate_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[workitems_PSY] 
 (TaskType_PSY,
Stage_PSY,
AssignedToGroup_PSY,
InitiatedOn_PSY,
Status_PSY,
DueDate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@TaskType_PSY,
@Stage_PSY,
@AssignedToGroup_PSY,
@InitiatedOn_PSY,
@Status_PSY,
@DueDate_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END