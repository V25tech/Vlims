CREATE PROCEDURE [dbo].[USP_UpdateWorkItemsByReferenceId_PSY]
@Status_PSY NVarChar(500),
@RefrenceId_PSY int,
@UserName NVarchar(500),
@TYPEWORK NVARCHAR(200)
as
begin
DECLARE @TYPE NVARCHAR(100); SET @TYPE=(SELECT ActionType_PSY FROM workitems_PSY WHERE InitiatedBy_PSY=@UserName AND RefrenceId_PSY=@RefrenceId_PSY AND TaskType_PSY=@TYPEWORK)
IF(@TYPE='REVIEW')
BEGIN
UPDATE workitems_PSY SET Status_PSY='Reviewed', Stage_PSY=@Status_PSY,IsCompleted_PSY=1,ModifiedDate_PSY=GETDATE() WHERE RefrenceId_PSY=@RefrenceId_PSY AND InitiatedBy_PSY=@UserName
END
ELSE 
BEGIN
UPDATE workitems_PSY SET Status_PSY='Approved', Stage_PSY=@Status_PSY,IsCompleted_PSY=1,ModifiedDate_PSY=GETDATE() WHERE RefrenceId_PSY=@RefrenceId_PSY AND InitiatedBy_PSY=@UserName
END
end