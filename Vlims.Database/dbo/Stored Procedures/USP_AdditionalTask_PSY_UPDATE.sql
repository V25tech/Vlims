  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int,
@ModifiedBy_PSY NVarChar(100),@Status_PSY nvarchar(100),@Version int
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[AdditionalTask_PSY] SET 
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,version=@Version WHERE  [ATID_PSY] = @ATID_PSY ; 

DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from AdditionalTask_PSY where ATID_PSY=@ATID_PSY)

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@ATID_PSY,@ModifiedBy_PSY
END

IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
DECLARE @ID INT,@wokflow_PSY nvarchar(200)
set @wokflow_PSY=(select Workflow_PSY from Documentrequest_PSY where DRID_PSY=@referenceId)
INSERT INTO DocumentPrint_PSY(documenttitle_PSY,printtype_PSY,documentno_PSY,noofcopies_PSY,workflow_PSY,reason_PSY,CreatedBy_PSY,CreatedDate_PSY,
ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY)
select dp.documenttitle_PSY,dp.documenttype_PSY,dp.documentno_PSY,0,
dp.wokflow_PSY,null,@ModifiedBy_PSY,GETDATE(),@ModifiedBy_PSY,GETDATE(),'In-Progress',@referenceId from DocumentPreparation_PSY dp where Refrence_PSY=@referenceId;
SELECT @ID = @@IDENTITY;

INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
SELECT DP.printtype_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR 
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT DP.printtype_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@wokflow_PSY AND WSR.Type='Approve'

END

select @ATID_PSY; 


  
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END