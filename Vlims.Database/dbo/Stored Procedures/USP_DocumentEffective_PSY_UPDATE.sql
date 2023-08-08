
  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_UPDATE] @DEID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(500),
@EffectiveDate_PSY DateTime,
@Reviewdate_PSY DateTime,
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(50)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentEffective_PSY] SET Documentmanagerid_PSY=@Documentmanagerid_PSY,
documenttitle_PSY=@documenttitle_PSY,
documentno_PSY=@documentno_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
EffectiveDate_PSY=@EffectiveDate_PSY,
Reviewdate_PSY=@Reviewdate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,
Status_PSY=@Status_PSY
WHERE  [DEID_PSY] = @DEID_PSY ;  

IF(@Status_PSY!='IN-PROGRESS' AND @Status_PSY!='IN PROGRESS')
BEGIN
EXEC [dbo].[USP_UpdateWorkItemsByReferenceId_PSY] @Status_PSY,@DEID_PSY,@ModifiedBy_PSY,'EFFECTIVE'
END

DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentEffective_PSY where DEID_PSY=@DEID_PSY)


IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
DECLARE @ID INT,@wokflow_PSY nvarchar(200),@version int=0
set @wokflow_PSY=(select Workflow_PSY from Documentrequest_PSY where DRID_PSY=@referenceId)
SET @version=(SELECT COUNT(*)+1 FROM AdditionalTask_PSY WHERE Refrence_PSY=@referenceId AND Status_PSY='APPROVED')
INSERT INTO AdditionalTask_PSY(DocumentEffective_ID,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Version,Refrence_PSY)
VALUES(@DEID_PSY,
@ModifiedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'APPROVED',@version,@referenceId)
SELECT @ID = @@IDENTITY;

INSERT INTO DocumentPrint_PSY(documenttitle_PSY,printtype_PSY,documentno_PSY,noofcopies_PSY,workflow_PSY,reason_PSY,CreatedBy_PSY,CreatedDate_PSY,
ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY)
select dp.documenttitle_PSY,dp.documenttype_PSY,dp.documentno_PSY,0,
dp.wokflow_PSY,null,@ModifiedBy_PSY,GETDATE(),@ModifiedBy_PSY,GETDATE(),'In-Progress',@referenceId from DocumentPreparation_PSY dp where Refrence_PSY=@referenceId;
SELECT @ID = @@IDENTITY;


END

select @DEID_PSY; 

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


