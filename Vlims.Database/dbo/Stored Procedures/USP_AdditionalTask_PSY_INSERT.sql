



  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_INSERT] @DocumentEffective_ID NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100), 
@Status_PSY NVarchar(100),
@Version NVarchar(100),
@EffectiveDate_PSY datetime,
@reviewDate_PSY datetime,
@workflow_PSY Nvarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[AdditionalTask_PSY] 
 (DocumentEffective_ID,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,Status_PSY,Version,EffectiveDate_PSY,ReviewDate_PSY,workflow_PSY)
 VALUES 
(@DocumentEffective_ID,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),@Status_PSY,@Version,@EffectiveDate_PSY,@reviewDate_PSY,@workflow_PSY);
 SELECT @ID = @@IDENTITY; 

 DECLARE @documenttitle_PSY NVarchar(500)
 SET @documenttitle_PSY=(SELECT top 1 (documenttitle_PSY) FROM DocumentPreparation_PSY WHERE Documentmanagerid_PSY=1)

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
 SELECT @documenttitle_PSY,'Additional',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID

 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END