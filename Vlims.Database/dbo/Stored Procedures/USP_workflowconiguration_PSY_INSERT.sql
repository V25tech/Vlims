  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_INSERT] @DocumentMasterId_PSY NVarChar(50),
@documentstage_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@reviewsCount_PSY Int,
@approvalsCount_PSY Int,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100),
@document_PSY xml,
@workflowname_PSY NVarchar(100),
@code_PSY NVarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[workflowconiguration_PSY] 
 (DocumentMasterId_PSY,
documentstage_PSY,
documenttype_PSY,
department_PSY,
reviewsCount_PSY,
approvalsCount_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY,
Document_PSY,
workflowName_PSY,code_PSY)
 VALUES 
(@DocumentMasterId_PSY,
@documentstage_PSY,
@documenttype_PSY,
@department_PSY,
@reviewsCount_PSY,
@approvalsCount_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() ,
 @Status_PSY,@document_PSY,@workflowname_PSY,@code_PSY);
 SELECT @ID = @@IDENTITY; 

 --INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
 --SELECT @workflowname_PSY,'Workflow',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID

 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END