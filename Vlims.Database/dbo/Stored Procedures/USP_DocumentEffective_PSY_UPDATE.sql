
  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_UPDATE] @DEID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(500),
@EffectiveDate_PSY DateTime,
@Reviewdate_PSY DateTime,
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(50),
@wokflow_PSY NVarChar(50)
 AS 
 BEGIN 
  BEGIN TRY 
  
  DECLARE @ISWORKITEMS BIT,@CREATED_BY VARCHAR(500),@ParentGuid_PSY uniqueidentifier
  SET @CREATED_BY=(SELECT CreatedBy_PSY FROM dbo.DocumentEffective_PSY WHERE DEID_PSY=@DEID_PSY)
  SET @ParentGuid_PSY=(SELECT GUID_DE FROM DocumentEffective_PSY WHERE DEID_PSY=@DEID_PSY)
  IF (SELECT COUNT(*) FROM dbo.DocumentEffective_PSY WHERE DEID_PSY = @DEID_PSY AND Workflow_PSY IS NULL) > 0
  BEGIN
  SET @ISWORKITEMS=1;
  END

IF(@Status_PSY='IN-PROGRESS' OR @Status_PSY='IN PROGRESS')
BEGIN
 UPDATE [dbo].[DocumentEffective_PSY] SET Documentmanagerid_PSY=@Documentmanagerid_PSY,
documenttitle_PSY=@documenttitle_PSY,
documentno_PSY=@documentno_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
EffectiveDate_PSY=@EffectiveDate_PSY,
Reviewdate_PSY=@Reviewdate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,
Status_PSY=@Status_PSY,
Workflow_PSY=@wokflow_PSY
WHERE  [DEID_PSY] = @DEID_PSY ;  
END
ELSE IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
--reject functionality is reset values and update status as rejected
 UPDATE [dbo].[DocumentEffective_PSY] SET EffectiveDate_PSY=null,Reviewdate_PSY=null,ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,
Workflow_PSY=null WHERE  [DEID_PSY] = @DEID_PSY ;
--once rejected delete workitems assigned to users
DELETE FROM workitems_PSY WHERE RefrenceGuid_PSY=@ParentGuid_PSY
END
ELSE IF(@Status_PSY='RETURN' OR @Status_PSY='RETURNED')
BEGIN
--return functionality is just update status as 'return'
 UPDATE [dbo].[DocumentEffective_PSY] SET ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DEID_PSY] = @DEID_PSY ;
END

IF(@ISWORKITEMS=1)
BEGIN
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY)
 SELECT @documenttype_PSY,'Effective','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@DEID_PSY,WSR.Type,0,@CREATED_BY,@ParentGuid_PSY from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,CreatedBy_PSY,RefrenceGuid_PSY)
 SELECT @documenttype_PSY,'Effective','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@DEID_PSY,WSR.Type,0,@CREATED_BY,@ParentGuid_PSY from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'
END

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@DEID_PSY,@ModifiedBy_PSY,'EFFECTIVE'
END

DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentEffective_PSY where DEID_PSY=@DEID_PSY)


IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN

DECLARE @ID INT DECLARE @printID int,@version int=0
SET @version=(SELECT COUNT(*)+1 FROM AdditionalTask_PSY WHERE Refrence_PSY=@referenceId AND Status_PSY='APPROVED')
INSERT INTO AdditionalTask_PSY(DocumentEffective_ID,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Version,Refrence_PSY,GUID_AD,ReferenceGuid_PSY)
VALUES(@DEID_PSY,
@CREATED_BY,GetDate(),@ModifiedBy_PSY,GetDate(),'APPROVED',@version,@referenceId,NEWID(),@ParentGuid_PSY)
SELECT @ID = @@IDENTITY;



SELECT @ID = @@IDENTITY;

END

--IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
--BEGIN
--DECLARE @REF INT=0
--SET @REF=(SELECT Documentmanagerid_PSY FROM DocumentEffective_PSY WHERE DEID_PSY=@DEID_PSY)
--DELETE FROM workitems_PSY WHERE RefrenceId_PSY=@DEID_PSY
--DELETE FROM DocumentEffective_PSY WHERE DEID_PSY=@DEID_PSY
--UPDATE DocumentPreparation_PSY SET Status_PSY='IN-PROGRESS' WHERE DPNID_PSY=@REF
--UPDATE workitems_PSY SET Stage_PSY='Pending',Status_PSY='IN-PROGRESS',IsCompleted_PSY=0 WHERE RefrenceId_PSY=@REF
--END

select @DEID_PSY; 

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


