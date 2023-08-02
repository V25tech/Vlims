
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

DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentEffective_PSY where DEID_PSY=@DEID_PSY)
if((SELECT COUNT(*) FROM workitems_PSY WHERE RefrenceId_PSY=@DEID_PSY)=0)
begin
INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
SELECT @documenttitle_PSY,'Effective','In Progress', null ,@ModifiedBy_PSY, GetDate(),'In Progress',GetDate(),@DEID_PSY
end

IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN

INSERT INTO AdditionalTask_PSY(DocumentEffective_ID,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Version,Refrence_PSY)
VALUES('1',
@ModifiedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS','0',@referenceId)

UPDATE workitems_PSY SET Status_PSY='APPROVED' WHERE RefrenceId_PSY=@DEID_PSY

END

select @DEID_PSY; 

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


