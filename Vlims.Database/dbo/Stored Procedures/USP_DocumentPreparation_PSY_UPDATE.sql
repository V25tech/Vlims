﻿  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_UPDATE] @DPNID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(200),
@template_PSY NVarChar(50),
@wokflow_PSY NVarChar(50),
@details_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentPreparation_PSY] SET 
documenttitle_PSY=@documenttitle_PSY,
documentno_PSY=@documentno_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
template_PSY=@template_PSY,
wokflow_PSY=@wokflow_PSY,
details_PSY=@details_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY='In Progress' WHERE  [DPNID_PSY] = @DPNID_PSY ;  select @DPNID_PSY; 

INSERT INTO [dbo].[DocumentEffective_PSY] 
 (Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,document_PSY,EffectiveDate_PSY,Reviewdate_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY)

 VALUES 
(@DPNID_PSY,@documenttitle_PSY,@documentno_PSY,@documenttype_PSY,@department_PSY,@document_PSY,'','','', GetDate() ,@ModifiedBy_PSY, GetDate() );
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END