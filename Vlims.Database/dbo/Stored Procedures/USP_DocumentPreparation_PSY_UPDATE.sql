  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_UPDATE] @DPNID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(500),
@template_PSY NVarChar(50),
@wokflow_PSY NVarChar(50),
@details_PSY NVarChar(max),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  DECLARE @ISWORKITEMS BIT,@CREATED_BY VARCHAR(500),@ParentGuid uniqueidentifier
  SET @CREATED_BY=(SELECT CreatedBy_PSY FROM dbo.DocumentPreparation_PSY WHERE DPNID_PSY = @DPNID_PSY)
  SET @ParentGuid=(SELECT GUID_DP FROM DocumentPreparation_PSY WHERE DPNID_PSY=@DPNID_PSY)
  IF (SELECT COUNT(*) FROM dbo.DocumentPreparation_PSY WHERE DPNID_PSY = @DPNID_PSY AND wokflow_PSY IS NULL) > 0
  BEGIN
  SET @ISWORKITEMS=1;
  END
 
IF(@Status_PSY='IN-PROGRESS' OR @Status_PSY='IN PROGRESS')
BEGIN
UPDATE [dbo].[DocumentPreparation_PSY] SET 
documenttitle_PSY=@documenttitle_PSY,
documentno_PSY=@documentno_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
template_PSY=@template_PSY,
wokflow_PSY=@wokflow_PSY,
details_PSY=@details_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DPNID_PSY] = @DPNID_PSY ; 
END
ELSE IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
--reject functionality is reset values and update status as rejected
UPDATE dbo.DocumentPreparation_PSY SET documenttitle_PSY=null,documentno_PSY=null,document_PSY=null,
template_PSY=null,wokflow_PSY=null,details_PSY=null,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY where DPNID_PSY=@DPNID_PSY
--once rejected delete workitems assigned to users
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid
END
ELSE IF(@Status_PSY='RETURN' OR @Status_PSY='RETURNED')
BEGIN
--return functionality is just update status as 'return'
UPDATE dbo.DocumentPreparation_PSY SET wokflow_PSY=null ,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY where DPNID_PSY=@DPNID_PSY
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid
END

ELSE IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentPreparation_PSY where DPNID_PSY=@DPNID_PSY)
UPDATE DocumentPreparation_PSY SET Status_PSY=@Status_PSY WHERE DPNID_PSY=@DPNID_PSY
DECLARE @ID INT
INSERT INTO DocumentEffective_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,document_PSY,EffectiveDate_PSY,Reviewdate_PSY,
CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY,GUID_DE,ReferenceGuid_PSY)
VALUES(@DPNID_PSY,@documenttitle_PSY,@documentno_PSY,@documenttype_PSY,@department_PSY,@document_PSY,null,null,
@CREATED_BY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',@referenceId,NEWID(),@ParentGuid)
SELECT @ID = @@IDENTITY;
END
IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
UPDATE DocumentPreparation_PSY SET Status_PSY=@Status_PSY WHERE DPNID_PSY=@DPNID_PSY
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY, @DPNID_PSY,@ModifiedBy_PSY,'PREPARATION',@ParentGuid
END
IF(@ISWORKITEMS=1)
BEGIN
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',NULL,@CREATED_BY,GetDate(),'IN-PROGRESS',GetDate(),@DPNID_PSY,WSR.Type,0,WSR.UserName,@ParentGuid,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',NULL,@CREATED_BY,GetDate(),'IN-PROGRESS',GetDate(),@DPNID_PSY,WSR.Type,0,WSR.UserName,@ParentGuid,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'
END

select @DPNID_PSY; 

  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END