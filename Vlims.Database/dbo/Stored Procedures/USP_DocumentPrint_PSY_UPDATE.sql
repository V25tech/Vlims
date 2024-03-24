  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_UPDATE] @DRId_PSY int, @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) ,
@Status_PSY NVarchar(100),
@PrintCopy_PSY varchar(500)
 AS 
 BEGIN 
  BEGIN TRY 
 
DECLARE @ParentGuid_PSY uniqueidentifier,@ISWORKITEMS BIT,@CREATED_BY VARCHAR(500)
SET @CREATED_BY=(SELECT CreatedBy_PSY FROM dbo.DocumentPrint_PSY WHERE DRId_PSY=@DRId_PSY)
SET @ParentGuid_PSY=(SELECT GUID_DPP FROM DocumentPrint_PSY WHERE DRId_PSY=@DRId_PSY)
IF (SELECT COUNT(*) FROM dbo.DocumentPrint_PSY WHERE DRId_PSY = @DRId_PSY AND Workflow_PSY IS NULL) > 0
  BEGIN
  SET @ISWORKITEMS=1;
  END

 IF(@Status_PSY='IN-PROGRESS' OR @Status_PSY='IN PROGRESS')
BEGIN
 UPDATE [dbo].[DocumentPrint_PSY] SET documenttitle_PSY=@documenttitle_PSY,
printtype_PSY=@printtype_PSY,
documentno_PSY=@documentno_PSY,
noofcopies_PSY=@noofcopies_PSY,
workflow_PSY=@workflow_PSY,
reason_PSY=@reason_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,PrintCopy_PSY=@PrintCopy_PSY WHERE  [DRId_PSY] = @DRId_PSY ; 
END
ELSE IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
UPDATE DocumentPrint_PSY SET documenttitle_PSY=NULL,documentno_PSY=NULL,printtype_PSY=NULL,noofcopies_PSY=NULL,workflow_PSY=NULL,
reason_PSY=NULL,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,@PrintCopy_PSY=null WHERE DRId_PSY=@DRId_PSY
--UPDATE workitems_PSY SET Stage_PSY='Pending',Status_PSY='IN-PROGRESS',IsCompleted_PSY=0 WHERE RefrenceId_PSY=@DRId_PSY
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid_PSY
END
ELSE IF(@Status_PSY='RETURN' OR @Status_PSY='RETURNED')
BEGIN
UPDATE DocumentPrint_PSY SET workflow_PSY=NULL, ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE DRId_PSY=@DRId_PSY
--UPDATE workitems_PSY SET Stage_PSY='Pending',Status_PSY='IN-PROGRESS',IsCompleted_PSY=0 WHERE RefrenceId_PSY=@DRId_PSY
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid_PSY
END
ELSE IF(@Status_PSY='APPROVE' OR @Status_PSY='APPROVED')
BEGIN
UPDATE DocumentPrint_PSY SET ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE DRId_PSY=@DRId_PSY
END
IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
UPDATE DocumentPreparation_PSY SET Status_PSY=@Status_PSY, ModifiedBy_PSY=@ModifiedBy_PSY, ModifiedDate_PSY=GETDATE()
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY, @DRId_PSY,@ModifiedBy_PSY,'PRINT',@ParentGuid_PSY
END
IF(@ISWORKITEMS=1)
BEGIN
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documentno_PSY,'Print','Pending',NULL,@CREATED_BY,GetDate(),'IN-PROGRESS',GetDate(),@DRId_PSY,WSR.Type,0,wsr.UserName,@ParentGuid_PSY,getdate(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documentno_PSY,'Print','Pending',NULL,@CREATED_BY,GetDate(),'IN-PROGRESS',GetDate(),@DRId_PSY,WSR.Type,0,wsr.UserName,@ParentGuid_PSY,getdate(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Approve'
END





select @DRId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END