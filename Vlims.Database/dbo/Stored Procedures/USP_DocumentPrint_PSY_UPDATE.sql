  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_UPDATE] @DRId_PSY int, @documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentPrint_PSY] SET documenttitle_PSY=@documenttitle_PSY,
printtype_PSY=@printtype_PSY,
documentno_PSY=@documentno_PSY,
noofcopies_PSY=@noofcopies_PSY,
workflow_PSY=@workflow_PSY,
reason_PSY=@reason_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [DRId_PSY] = @DRId_PSY ;  select @DRId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END