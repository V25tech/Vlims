  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_INSERT] @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(50),
@EffectiveDate_PSY DateTime,
@Reviewdate_PSY DateTime,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentEffective_PSY] 
 (Documentmanagerid_PSY,
documenttitle_PSY,
documentno_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
EffectiveDate_PSY,
Reviewdate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@Documentmanagerid_PSY,
@documenttitle_PSY,
@documentno_PSY,
@documenttype_PSY,
@department_PSY,
@document_PSY,
@EffectiveDate_PSY,
@Reviewdate_PSY,
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