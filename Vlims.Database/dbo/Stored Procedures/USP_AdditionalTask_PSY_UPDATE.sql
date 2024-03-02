  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int,
@ModifiedBy_PSY NVarChar(100),@Status_PSY nvarchar(100),@Version int,@Workflow_PSY nvarchar(200)
 AS 
 BEGIN 
  BEGIN TRY 
  
-- UPDATE [dbo].[AdditionalTask_PSY] SET 
--ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,version=@Version WHERE  [ATID_PSY] = @ATID_PSY ; 

DECLARE @DOCEFFID int=0; set @DOCEFFID=(select DocumentEffective_ID from AdditionalTask_PSY where ATID_PSY=@ATID_PSY)
DECLARE @DOCPREPID INT=0; SET @DOCPREPID=(select Documentmanagerid_PSY from DocumentEffective_PSY where DEID_PSY=@DOCEFFID)
DECLARE @referenceId INT=0; SET @referenceId=(select Refrence_PSY from AdditionalTask_PSY where ATID_PSY=@ATID_PSY)
DECLARE @OLDPREPARATIONDOCTYPE NVARCHAR(200);SET @OLDPREPARATIONDOCTYPE=(SELECT TOP(1) DP.documenttype_PSY FROM DocumentPreparation_PSY DP
WHERE DP.DPNID_PSY=@DOCPREPID)

--IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
--BEGIN
--EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@ATID_PSY,@ModifiedBy_PSY
--END

IF(@Status_PSY='REVISION')
BEGIN
DECLARE @ID1 INT
INSERT INTO DocumentPreparation_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,
department_PSY,document_PSY,template_PSY,wokflow_PSY,details_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,DOCStatus_PSY,Refrence_PSY)
SELECT Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,document_PSY,
template_PSY,null,details_PSY,CreatedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',DOCStatus_PSY,@referenceId FROM DocumentPreparation_PSY
WHERE DPNID_PSY=@DOCPREPID
SELECT @ID1 = @@IDENTITY;

--INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
-- SELECT @OLDPREPARATIONDOCTYPE,'Preparation','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@ID1,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@Workflow_PSY AND WSR.Type='Review'

-- INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
-- SELECT @OLDPREPARATIONDOCTYPE,'Preparation','Pending',NULL,WSR.UserName,GetDate(),'IN-PROGRESS',GetDate(),@ID1,WSR.Type,0 from WorkflowUsersMapping WSR WHERE WSR.WorkFlowName=@Workflow_PSY AND WSR.Type='Approve'


--INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
--SELECT TaskType_PSY,TaskName_PSY,'Pending',AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,'In-Progress',DueDate_PSY,@ID1,ActionType_PSY,0 FROM workitems_PSY WHERE TaskType_PSY='Preparation' AND RefrenceId_PSY=@OLDPREPARATIONID
END


--IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
--BEGIN
--DECLARE @ID INT,@wokflow_PSY nvarchar(200)
--set @wokflow_PSY=(select Workflow_PSY from Documentrequest_PSY where DRID_PSY=@referenceId)
--INSERT INTO DocumentPrint_PSY(documenttitle_PSY,printtype_PSY,documentno_PSY,noofcopies_PSY,workflow_PSY,reason_PSY,CreatedBy_PSY,CreatedDate_PSY,
--ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY)
--select dp.documenttitle_PSY,dp.documenttype_PSY,dp.documentno_PSY,0,
--dp.wokflow_PSY,null,@ModifiedBy_PSY,GETDATE(),@ModifiedBy_PSY,GETDATE(),'In-Progress',@referenceId from DocumentPreparation_PSY dp where Refrence_PSY=@referenceId;
--SELECT @ID = @@IDENTITY;

--INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
--SELECT DP.printtype_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR 
-- JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
-- WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

-- INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
-- SELECT DP.printtype_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR
-- JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
-- WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'

--END

select @ATID_PSY; 


  
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END