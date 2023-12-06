CREATE PROCEDURE [dbo].[USP_GetTemplateHeaderFooterDetails]
@TemplateName varchar(500)
as
begin

DECLARE @REVIEWERS TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))
DECLARE @APPROVERS TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))
DECLARE @PREPAREDBY TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))


INSERT @REVIEWERS
SELECT DISTINCT DP.template_PSY,WFM.UserName,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WFM 
JOIN Documentrequest_PSY DR ON DR.Workflow_PSY=WFM.WorkFlowName
JOIN DocumentPreparation_PSY DP ON DP.wokflow_PSY=WFM.WorkFlowName
JOIN DocumentEffective_PSY DE ON DE.Workflow_PSY=WFM.WorkFlowName
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WFM.UserName
WHERE DP.template_PSY=@TemplateName AND WFM.Type='Review'

INSERT @APPROVERS
SELECT DISTINCT DP.template_PSY,WFM.UserName,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WFM 
JOIN Documentrequest_PSY DR ON DR.Workflow_PSY=WFM.WorkFlowName
JOIN DocumentPreparation_PSY DP ON DP.wokflow_PSY=WFM.WorkFlowName
JOIN DocumentEffective_PSY DE ON DE.Workflow_PSY=WFM.WorkFlowName
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WFM.UserName
WHERE DP.template_PSY=@TemplateName AND WFM.Type='Approve'

INSERT @PREPAREDBY
SELECT DISTINCT DP.template_PSY ,DRT.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY
FROM AdditionalTask_PSY AT
JOIN DocumentEffective_PSY DE ON DE.DEID_PSY=AT.DocumentEffective_ID
JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY
JOIN Documentrequest_PSY DRT ON DRT.DRID_PSY=DP.Refrence_PSY
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DRT.CreatedBy_PSY
WHERE DT.Templatename_PSY=@TemplateName AND DRT.CreatedBy_PSY NOT IN (SELECT USERNAME FROM @PREPAREDBY)

INSERT @PREPAREDBY
SELECT DISTINCT DP.template_PSY ,DP.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY
FROM AdditionalTask_PSY AT
JOIN DocumentEffective_PSY DE ON DE.DEID_PSY=AT.DocumentEffective_ID
JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DP.CreatedBy_PSY
JOIN Documentrequest_PSY DRT ON DRT.DRID_PSY=DP.Refrence_PSY
WHERE DT.Templatename_PSY=@TemplateName AND DP.CreatedBy_PSY NOT IN (SELECT USERNAME FROM @PREPAREDBY)

INSERT @PREPAREDBY
SELECT DISTINCT DP.template_PSY ,DE.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY
FROM AdditionalTask_PSY AT
JOIN DocumentEffective_PSY DE ON DE.DEID_PSY=AT.DocumentEffective_ID
JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DE.CreatedBy_PSY
JOIN Documentrequest_PSY DRT ON DRT.DRID_PSY=DP.Refrence_PSY
WHERE DT.Templatename_PSY=@TemplateName AND DE.CreatedBy_PSY NOT IN (SELECT USERNAME FROM @PREPAREDBY)


SELECT TOP(1) DP.documenttitle_PSY,DP.documentno_PSY,AT.Version,(VERSION-1) AS Supersedes,DP.department_PSY,
DE.EffectiveDate_PSY,DE.Reviewdate_PSY,DRT.department_PSY,
(SELECT STRING_AGG(USERNAME,',') FROM @REVIEWERS) AS REVIWED_BY,
(SELECT STRING_AGG(USERNAME,',') FROM @APPROVERS) AS APPROVED_BY,
STRING_AGG(PR.UserName, ',') AS PREPARED_BY,
(SELECT STRING_AGG(DEPTNAME,',') FROM @APPROVERS) AS APPROVEDDEPT,
(SELECT STRING_AGG(DEPTNAME,',') FROM @REVIEWERS) AS REVIWEDDEPT,
STRING_AGG(PR.DEPTNAME, ',') AS PREPAREDDEPT,
(SELECT STRING_AGG(ROLENAME,',') FROM @APPROVERS) AS APPROVEDROLE,
(SELECT STRING_AGG(ROLENAME,',') FROM @REVIEWERS) AS REVIWEDROLE,
STRING_AGG(PR.ROLENAME, ',') AS PREPAREDROLE,
DP.CreatedDate_PSY AS PREAPREDDATE
FROM AdditionalTask_PSY AT
JOIN DocumentEffective_PSY DE ON DE.DEID_PSY=AT.DocumentEffective_ID
JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY
JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
JOIN Documentrequest_PSY DRT ON DRT.DRID_PSY=DP.Refrence_PSY
JOIN @PREPAREDBY PR ON PR.TEMPLATE_NAME=DP.template_PSY
WHERE DT.Templatename_PSY=@TemplateName
GROUP BY
    DP.documenttitle_PSY,
    DP.documentno_PSY,
    AT.Version,
    DP.department_PSY,
    DE.EffectiveDate_PSY,
    DE.Reviewdate_PSY,
    DP.CreatedDate_PSY,
    DRT.department_PSY;

end