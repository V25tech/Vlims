  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_UPDATE] @DRID_PSY int, @documentmanagerid_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@Purpose_PSY NVarChar(max),
@ApprovalsCount_PSY Int,
@AssigntoGroup_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),
@Workflow_PSY NVarchar(250),
@Status_PSY Nvarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 

  DECLARE @ISWORKITEMS BIT,@CREATED_BY VARCHAR(500),@ParentGuid uniqueidentifier
  SET @CREATED_BY=(SELECT CreatedBy_PSY FROM dbo.Documentrequest_PSY WHERE DRID_PSY = @DRID_PSY)
  set @ParentGuid=(select GUID_DR FROM Documentrequest_PSY WHERE DRID_PSY=@DRID_PSY)
  IF (SELECT COUNT(*) FROM dbo.Documentrequest_PSY WHERE DRID_PSY = @DRID_PSY AND Workflow_PSY IS NULL) > 0
  BEGIN
  SET @ISWORKITEMS=1;
  END
 
 IF(@Status_PSY='IN-PROGRESS' OR @Status_PSY='IN PROGRESS')
BEGIN
 UPDATE [dbo].[Documentrequest_PSY] SET documentmanagerid_PSY=@documentmanagerid_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
Purpose_PSY=@Purpose_PSY,
ApprovalsCount_PSY=@ApprovalsCount_PSY,
AssigntoGroup_PSY=@AssigntoGroup_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,Workflow_PSY=@Workflow_PSY WHERE  [DRID_PSY] = @DRID_PSY ;  
END
ELSE IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
--reject functionality is reset values and update status as rejected
UPDATE [dbo].[Documentrequest_PSY] SET documenttype_PSY=NULL,Workflow_PSY=null,
AssigntoGroup_PSY=null,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DRID_PSY] = @DRID_PSY ;
--once rejected delete workitems assigned to users
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid
END
ELSE IF(@Status_PSY='RETURN' OR @Status_PSY='RETURNED')
BEGIN
--return functionality is just update status as 'return'
UPDATE [dbo].[Documentrequest_PSY] SET Workflow_PSY=null,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DRID_PSY] = @DRID_PSY ;
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid;
END

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
UPDATE Documentrequest_PSY SET Status_PSY=@Status_PSY WHERE DRID_PSY=@DRID_PSY
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@DRID_PSY,@ModifiedBy_PSY,'REQUEST',@ParentGuid
END

IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN

UPDATE Documentrequest_PSY SET Status_PSY=@Status_PSY WHERE DRID_PSY=@DRID_PSY
DECLARE @nvarcharValue NVARCHAR(50);DECLARE @WORKFLOW NVARCHAR(50);
--SET @nvarcharValue = CAST(@DRID_PSY AS NVARCHAR(50));
SET @WORKFLOW=(SELECT Workflow_PSY FROM Documentrequest_PSY WHERE DRID_PSY=@DRID_PSY)
DECLARE @ID INT
INSERT INTO DocumentPreparation_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,
department_PSY,document_PSY,template_PSY,wokflow_PSY,details_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,DOCStatus_PSY,Refrence_PSY,GUID_DP,ReferenceGuid_PSY)
VALUES('1',NULL,NULL,@documenttype_PSY,@department_PSY,null,null,NUll,NULL,
@CREATED_BY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',NULL,@DRID_PSY,NEWID(),@ParentGuid);
SELECT @ID = @@IDENTITY;

END

IF(@ISWORKITEMS=1)
BEGIN
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,CreatedDate_PSY, ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documenttype_PSY,'Request','Pending',@AssigntoGroup_PSY,@CREATED_BY,GetDate(),@Status_PSY,GetDate(),@DRID_PSY,WSR.Type,0,@CREATED_BY,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@Workflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,CreatedDate_PSY, ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documenttype_PSY,'Request','Pending',@AssigntoGroup_PSY,@CREATED_BY,GetDate(),@Status_PSY,GetDate(),@DRID_PSY,WSR.Type,0,@CREATED_BY,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@Workflow_PSY AND WSR.Type='Approve'
END

select @DRID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END