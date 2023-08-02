  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),@Status_PSY nvarchar(100),@Version int
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[AdditionalTask_PSY] SET DocumentEffective_ID=@Documentmanagerid_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,version=@Version WHERE  [ATID_PSY] = @ATID_PSY ; 

DECLARE @referenceId int=0; set @referenceId=(select Refrence_PSY from DocumentEffective_PSY where DEID_PSY=@ATID_PSY)

if((SELECT COUNT(*) FROM workitems_PSY WHERE RefrenceId_PSY=@ATID_PSY)=0)
begin
DECLARE @documenttitle_PSY NVarchar(500)
 SET @documenttitle_PSY=(SELECT documenttitle_PSY FROM DocumentPreparation_PSY WHERE Refrence_PSY=@referenceId)

INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
SELECT @documenttitle_PSY,'Preparation','In Progress', null ,@ModifiedBy_PSY, GetDate(),'In Progress',GetDate(),@ATID_PSY
end

IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
BEGIN
;WITH CTE AS (SELECT top(1) * FROM DocumentPreparation_PSY WHERE Refrence_PSY=@referenceId)
INSERT INTO DocumentPrint_PSY(documenttitle_PSY,printtype_PSY,documentno_PSY,noofcopies_PSY,workflow_PSY,reason_PSY,CreatedBy_PSY,CreatedDate_PSY,
ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,Refrence_PSY)
select e.documenttitle_PSY,documenttype_PSY,documentno_PSY,0,e.wokflow_PSY,null,@ModifiedBy_PSY,GETDATE(),@ModifiedBy_PSY,GETDATE(),'In-Progress',@referenceId from CTE e
--VALUES(select document from cte)

UPDATE workitems_PSY SET Status_PSY='APPROVED' WHERE RefrenceId_PSY=@ATID_PSY

END

select @ATID_PSY; 


  
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END