
CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_APPROVE] @DEID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(50),
@EffectiveDate_PSY DateTime,
@Reviewdate_PSY DateTime,
@ModifiedBy_PSY NVarChar(100),
@workId int

 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentEffective_PSY] SET Documentmanagerid_PSY=@Documentmanagerid_PSY,
documenttitle_PSY=@documenttitle_PSY,
documentno_PSY=@documentno_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
EffectiveDate_PSY=@EffectiveDate_PSY,
Reviewdate_PSY=@Reviewdate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,
Status_PSY='Approve'
WHERE  [DEID_PSY] = @DEID_PSY ;  select @DEID_PSY; 
  
  UPDATE workitems_PSY SET Stage_PSY='Approve',Status_PSY='Approve' WHERE WITId_PSY=@workId;

  INSERT INTO AdditionalTask_PSY(DocumentEffective_ID,CreatedDate_PSY,CreatedBy_PSY,Status_pSY,Version)
  values(@DEID_PSY,GETDATE(),@ModifiedBy_PSY,'In Progress',00)
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


