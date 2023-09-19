  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_UPDATE] @DPNID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(500),
@template_PSY NVarChar(50),
@wokflow_PSY NVarChar(50),
@details_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  DECLARE @ISWORKITEMS BIT
  IF (SELECT COUNT(*) FROM dbo.DocumentPreparation_PSY WHERE DPNID_PSY = @DPNID_PSY AND wokflow_PSY IS NULL) > 0
  BEGIN
  SET @ISWORKITEMS=1;
  END
  
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

IF(@ISWORKITEMS=1)
BEGIN
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@DPNID_PSY,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT @documenttype_PSY,'Preparation','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@DPNID_PSY,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'
END

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY, @DPNID_PSY,@ModifiedBy_PSY,'PREPARATION'
END


DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentPreparation_PSY where DPNID_PSY=@DPNID_PSY)
IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
DECLARE @ID INT

INSERT INTO DocumentEffective_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,document_PSY,EffectiveDate_PSY,Reviewdate_PSY,
CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY)
VALUES(@DPNID_PSY,@documenttitle_PSY,@documentno_PSY,@documenttype_PSY,@department_PSY,@document_PSY,null,null,
@ModifiedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',@referenceId)
SELECT @ID = @@IDENTITY;

--INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
-- SELECT @documenttype_PSY,'Effective','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

-- INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
-- SELECT @documenttype_PSY,'Effective','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'

END

IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
DECLARE @COUNT INT=0,@REF INT=0
SET @REF=(SELECT Refrence_PSY FROM DocumentPreparation_PSY WHERE DPNID_PSY=@DPNID_PSY)
SET @COUNT=(SELECT COUNT(*) FROM DocumentPreparation_PSY WHERE Refrence_PSY=@REF)
DELETE FROM workitems_PSY WHERE RefrenceId_PSY=@DPNID_PSY
DELETE FROM DocumentPreparation_PSY WHERE DPNID_PSY=@DPNID_PSY
IF(@COUNT=1)
BEGIN
UPDATE Documentrequest_PSY SET Status_PSY='IN-PROGRESS' WHERE DRID_PSY=@REF
UPDATE workitems_PSY SET Stage_PSY='Pending',Status_PSY='IN-PROGRESS',IsCompleted_PSY=0 WHERE RefrenceId_PSY=@REF
END

END


select @DPNID_PSY; 

  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END