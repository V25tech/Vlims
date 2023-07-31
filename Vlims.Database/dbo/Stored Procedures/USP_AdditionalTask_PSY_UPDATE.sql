  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),@Status_PSY nvarchar(100),@Version int,@EffectiveDate_PSY datetime,@Reviewdate_PSY datetime
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[AdditionalTask_PSY] SET DocumentEffective_ID=@Documentmanagerid_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,Status_PSY=@Status_PSY,version=@Version WHERE  [ATID_PSY] = @ATID_PSY ;  select @ATID_PSY; 

  INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY)
 SELECT 'Revison','Document Effective Request',@Status_PSY,'','admin',@EffectiveDate_PSY,@Status_PSY,@Reviewdate_PSY
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END