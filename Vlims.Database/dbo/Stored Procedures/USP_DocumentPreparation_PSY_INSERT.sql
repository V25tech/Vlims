  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_INSERT] @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(500),
@template_PSY NVarChar(50),
@wokflow_PSY NVarChar(50),
@details_PSY NVarChar(max),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
  AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentPreparation_PSY]  
 (Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,document_PSY,template_PSY,wokflow_PSY,details_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY)
 SELECT 1,NULL,NULL,@documenttype_PSY,@department_PSY,NULL,NULL,NULL,NULL,@CreatedBy_PSY,Getdate(),@ModifiedBy_PSY,Getdate(),'Approved'
 
 --UPDATE Documentrequest_PSY SET Status_PSY='Approved',Approvedby_PSY=@ModifiedBy_PSY,ApprovedON_PSY=GETDATE() where DRID_PSY=@Documentmanagerid_PSY

 SELECT @ID = @@IDENTITY; 

 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY, CreatedBy_PSY, CreatedDate_PSY, ModifiedBy_PSY,ModifiedDate_PSY)
 SELECT @documenttitle_PSY,'Preparation',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID,@CreatedBy_PSY, GETDATE(), @ModifiedBy_PSY, GETDATE()

 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END