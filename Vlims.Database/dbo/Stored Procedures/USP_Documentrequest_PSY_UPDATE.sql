  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_UPDATE] @DRID_PSY int, @documentmanagerid_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@Purpose_PSY NVarChar(50),
@ApprovalsCount_PSY Int,
@AssigntoGroup_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY Nvarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[Documentrequest_PSY] SET documentmanagerid_PSY=@documentmanagerid_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
Purpose_PSY=@Purpose_PSY,
ApprovalsCount_PSY=@ApprovalsCount_PSY,
AssigntoGroup_PSY=@AssigntoGroup_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DRID_PSY] = @DRID_PSY ;  

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@DRID_PSY,@ModifiedBy_PSY
END

IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
DECLARE @nvarcharValue NVARCHAR(50);DECLARE @WORKFLOW NVARCHAR(50);
--SET @nvarcharValue = CAST(@DRID_PSY AS NVARCHAR(50));
SET @WORKFLOW=(SELECT Workflow_PSY FROM Documentrequest_PSY WHERE DRID_PSY=@DRID_PSY)
DECLARE @ID INT
INSERT INTO DocumentPreparation_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,
department_PSY,document_PSY,template_PSY,wokflow_PSY,details_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,DOCStatus_PSY,Refrence_PSY)
VALUES('1',NULL,NULL,@documenttype_PSY,@department_PSY,null,null,@WORKFLOW,NULL,
@ModifiedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',NULL,@DRID_PSY);
SELECT @ID = @@IDENTITY;

INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',@AssigntoGroup_PSY,WSR.UserName,GetDate(),@Status_PSY,GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@WORKFLOW AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',@AssigntoGroup_PSY,WSR.UserName,GetDate(),@Status_PSY,GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@WORKFLOW AND WSR.Type='Approve'

END

select @DRID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END