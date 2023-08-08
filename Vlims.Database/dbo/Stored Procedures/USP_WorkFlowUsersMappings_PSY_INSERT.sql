CREATE PROCEDURE [dbo].[USP_WorkFlowUsersMappings_PSY_INSERT]
@mappings as dbo.Workflowusrmappings   Readonly
as
begin
DECLARE @WORKFLOWNAME VARCHAR(200); SET @WORKFLOWNAME=(SELECT TOP(1) WorkFlowName FROM @mappings)
IF((SELECT COUNT(*) FROM WorkflowUsersMapping WHERE WorkFlowName=@WORKFLOWNAME)>0)
BEGIN
DELETE FROM WorkflowUsersMapping WHERE WorkFlowName=@WORKFLOWNAME
insert into WorkflowUsersMapping(UserId,UserName,WorkFlowId,WorkFlowName,Type)
SELECT UserId,UserName,WorkFlowId,WorkFlowName,Type FROM @mappings
END
ELSE
BEGIN
insert into WorkflowUsersMapping(UserId,UserName,WorkFlowId,WorkFlowName,Type)
SELECT UserId,UserName,WorkFlowId,WorkFlowName,Type FROM @mappings
END
end

