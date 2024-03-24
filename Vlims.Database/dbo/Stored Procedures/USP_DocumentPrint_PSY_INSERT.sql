  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_INSERT] @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@PrintCopy_PSY varchar(500)
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT,@REFRENCEID INT,@REFERENCEGUID UNIQUEIDENTIFIER,@GUID_DPP UNIQUEIDENTIFIER,@CREATED_BY VARCHAR(500)
 SET @REFRENCEID=(SELECT TOP(1) Refrence_PSY FROM DocumentPreparation_PSY WHERE @documentno_PSY=@documentno_PSY)
 SET @REFERENCEGUID=(SELECT TOP(1) GUID_DP FROM DocumentPreparation_PSY WHERE @documentno_PSY=@documentno_PSY)
 SET @CREATED_BY=(SELECT TOP(1) CreatedBy_PSY FROM DocumentPreparation_PSY WHERE @documentno_PSY=@documentno_PSY)



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
ModifiedDate_PSY,Refrence_PSY,Status_PSY,GUID_DPP,ReferenceGuid_PSY,PrintCopy_PSY)
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
 GetDate(),@REFRENCEID,'In-Progress',NEWID(),@REFERENCEGUID,@PrintCopy_PSY);
 SELECT @ID = @@IDENTITY; 

  --DECLARE @ISWORKITEMS BIT
  --IF (SELECT COUNT(*) FROM dbo.DocumentPrint_PSY WHERE DRId_PSY = @ID AND workflow_PSY IS NULL) > 0
  --BEGIN
  --SET @ISWORKITEMS=1;
  --END
  SET @GUID_DPP=(SELECT GUID_DPP FROM DocumentPrint_PSY WHERE DRId_PSY=@ID)


  INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,RefrenceGuid_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
SELECT @documentno_PSY,'Print','Pending',NULL,@CreatedBy_PSY,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0,@GUID_DPP,WSR.UserName,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR 
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Review'

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY,ActionType_PSY,IsCompleted_PSY,RefrenceGuid_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documentno_PSY,'Print','Pending',NULL,@CreatedBy_PSY,GetDate(),'In-Progress',GetDate(),@ID,WSR.Type,0,@GUID_DPP,WSR.UserName,GETDATE(),WSR.UserName,GETDATE() from WorkflowUsersMapping WSR
 JOIN DocumentPrint_PSY DP ON DP.DRId_PSY=@ID
 WHERE WSR.WorkFlowName=@workflow_PSY AND WSR.Type='Approve'
  

 select @ID 
 
 

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END