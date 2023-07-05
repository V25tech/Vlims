  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_INSERT] @DocumentMasterId_PSY NVarChar(50),
@documentstage_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@reviewsCount_PSY Int,
@approvalsCount_PSY Int,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[workflowconiguration_PSY] 
 (DocumentMasterId_PSY,
documentstage_PSY,
documenttype_PSY,
department_PSY,
reviewsCount_PSY,
approvalsCount_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@DocumentMasterId_PSY,
@documentstage_PSY,
@documenttype_PSY,
@department_PSY,
@reviewsCount_PSY,
@approvalsCount_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END