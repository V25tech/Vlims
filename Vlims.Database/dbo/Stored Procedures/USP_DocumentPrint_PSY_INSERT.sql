  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_INSERT] @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
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
ModifiedDate_PSY)
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
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END