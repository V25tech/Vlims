CREATE PROCEDURE [dbo].[USP_UpdateWorkItemsByReferenceId_PSY]
@Status_PSY NVarChar(500),
@RefrenceId_PSY int,
@UserName NVarchar(500),
@TYPEWORK NVARCHAR(200),
@REFERENCEGUID_PSY UNIQUEIDENTIFIER
as
begin
DECLARE @TYPE NVARCHAR(100); SET @TYPE=(SELECT ActionType_PSY FROM workitems_PSY WHERE CreatedBy_PSY=@UserName AND RefrenceId_PSY=@RefrenceId_PSY AND TaskType_PSY=@TYPEWORK)
IF(@Status_PSY='RETURN' OR @Status_PSY='RETURNED')
BEGIN
UPDATE workitems_PSY SET Status_PSY='IN-PROGRESS',Stage_PSY=@Status_PSY, ModifiedDate_PSY=GETDATE(),IsCompleted_PSY=0 WHERE RefrenceGuid_PSY=@REFERENCEGUID_PSY --AND InitiatedBy_PSY=@UserName
END
ELSE IF(@Status_PSY!='REJECT' OR @Status_PSY!='REJECTED')
BEGIN
IF(@TYPE='REVIEW' OR @TYPE='REVIEWED')
BEGIN
UPDATE workitems_PSY SET Status_PSY='Reviewed', Stage_PSY=@Status_PSY,IsCompleted_PSY=1,ModifiedDate_PSY=GETDATE() WHERE RefrenceGuid_PSY=@REFERENCEGUID_PSY AND CreatedBy_PSY=@UserName
END
ELSE IF(@TYPE='APPROVE' OR @TYPE='APPROVED')
BEGIN
UPDATE workitems_PSY SET Status_PSY='Approved', Stage_PSY=@Status_PSY,IsCompleted_PSY=1,ModifiedDate_PSY=GETDATE() WHERE RefrenceGuid_PSY=@REFERENCEGUID_PSY AND CreatedBy_PSY=@UserName
END
END
--ELSE IF(@TYPE='REJECT' OR @TYPE='REJECTED')
--BEGIN
--UPDATE workitems_PSY SET Status_PSY='REJECTED', ModifiedDate_PSY=GETDATE() WHERE RefrenceId_PSY=@RefrenceId_PSY AND InitiatedBy_PSY=@UserName
--END
end