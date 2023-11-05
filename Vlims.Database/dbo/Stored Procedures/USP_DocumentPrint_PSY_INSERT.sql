  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_INSERT] @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT,@REFRENCEID INT
 SET @REFRENCEID=(SELECT TOP(1) DEID_PSY FROM DocumentEffective_PSY WHERE documentno_PSY =@documentno_PSY)



 INSERT INTO [dbo].[DocumentPrint_PSY] 
 (documenttitle_PSY,
printtype_PSY,
documentno_PSY,
noofcopies_PSY,
workflow_PSY,
reason_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,Refrence_PSY,Status_PSY)
 VALUES 
(@documenttitle_PSY,
@printtype_PSY,
@documentno_PSY,
@noofcopies_PSY,
@workflow_PSY,
@reason_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),@REFRENCEID,'In-Progress' );
 SELECT @ID = @@IDENTITY; 

  --DECLARE @ISWORKITEMS BIT
  --IF (SELECT COUNT(*) FROM dbo.DocumentPrint_PSY WHERE DRId_PSY = @ID AND workflow_PSY IS NULL) > 0
  --BEGIN
  --SET @ISWORKITEMS=1;
  --END


  INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
SELECT @documentno_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR 
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY)
 SELECT @documentno_PSY,'Print','Pending',NULL,WSR.UserName,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0 from WorkflowUsersMapping WSR
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Approve'
  

 select @ID 
 
 

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END