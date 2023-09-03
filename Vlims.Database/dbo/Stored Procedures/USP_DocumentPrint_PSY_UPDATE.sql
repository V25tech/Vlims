  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_UPDATE] @DRId_PSY int, @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) ,
@Status_PSY NVarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentPrint_PSY] SET documenttitle_PSY=@documenttitle_PSY,
printtype_PSY=@printtype_PSY,
documentno_PSY=@documentno_PSY,
noofcopies_PSY=@noofcopies_PSY,
workflow_PSY=@workflow_PSY,
reason_PSY=@reason_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY WHERE  [DRId_PSY] = @DRId_PSY ; 

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY, @DRId_PSY,@ModifiedBy_PSY,'PRINT'
END

IF(@Status_PSY='REJECT' OR @Status_PSY='REJECTED')
BEGIN
UPDATE workitems_PSY SET Stage_PSY='Pending',Status_PSY='IN-PROGRESS',IsCompleted_PSY=0 WHERE RefrenceId_PSY=@DRId_PSY
END

select @DRId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END