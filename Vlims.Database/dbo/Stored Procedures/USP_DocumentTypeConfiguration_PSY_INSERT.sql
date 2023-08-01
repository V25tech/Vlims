  CREATE PROCEDURE [dbo].[USP_DocumentTypeConfiguration_PSY_INSERT] @DocumentMasterId_PSY NVarChar(50),
@Documenttypename_PSY NVarChar(50),
@documenttypeprefix_PSY NVarChar(50),
@Description_PSY NVarChar(50),
@Assigntodepartment_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentTypeConfiguration_PSY] 
 (DocumentMasterId_PSY,
Documenttypename_PSY,
documenttypeprefix_PSY,
Description_PSY,
Assigntodepartment_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY)
 VALUES 
(@DocumentMasterId_PSY,
@Documenttypename_PSY,
@documenttypeprefix_PSY,
@Description_PSY,
@Assigntodepartment_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),
 @Status_PSY);
 SELECT @ID = @@IDENTITY;
 
 INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
 SELECT @Documenttypename_PSY,'Type',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID

 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END