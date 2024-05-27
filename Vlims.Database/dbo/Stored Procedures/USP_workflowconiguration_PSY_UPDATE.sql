  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_UPDATE] @WFCId_PSY int, @DocumentMasterId_PSY NVarChar(50),
@documentstage_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@reviewsCount_PSY Int,
@approvalsCount_PSY Int,
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100),
@document_PSY xml
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[workflowconiguration_PSY] SET DocumentMasterId_PSY=@DocumentMasterId_PSY,
documentstage_PSY=@documentstage_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
reviewsCount_PSY=@reviewsCount_PSY,
approvalsCount_PSY=@approvalsCount_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,
ModifiedDate_PSY = GETDATE(),
Status_PSY=@Status_PSY,Document_PSY=@document_PSY WHERE  [WFCId_PSY] = @WFCId_PSY ;  select @WFCId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END