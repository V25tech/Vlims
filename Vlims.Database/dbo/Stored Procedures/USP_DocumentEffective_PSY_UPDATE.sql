
  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_UPDATE] @DEID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(50),
@EffectiveDate_PSY DateTime,
@Reviewdate_PSY DateTime,
@ModifiedBy_PSY NVarChar(100)

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
Status_PSY='In Progress'
WHERE  [DEID_PSY] = @DEID_PSY ;  select @DEID_PSY; 
  
  INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY)
 SELECT @documenttype_PSY,'Document Effective Request','Pending Approval','','admin',@EffectiveDate_PSY,'Pending Approval',@Reviewdate_PSY

  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


