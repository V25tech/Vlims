CREATE PROCEDURE [dbo].[USP_GetTemplateHeaderFooterDetails]
@TemplateName varchar(500)
as
begin

DECLARE @REVIEWERS TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))
DECLARE @APPROVERS TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))
DECLARE @PREPAREDBY TABLE(TEMPLATE_NAME VARCHAR(500), USERNAME VARCHAR(500),DEPTNAME VARCHAR(500),ROLENAME VARCHAR(500))

DECLARE @WORKFLOWS TABLE(WORKFLOWNAME VARCHAR(500))
INSERT @WORKFLOWS
SELECT WORKFLOW_PSY FROM Documentrequest_PSY DR
JOIN DocumentPreparation_PSY DP ON DP.Refrence_PSY=DR.DRID_PSY WHERE DP.template_PSY=@TEMPLATENAME
INSERT @WORKFLOWS
SELECT WOKFLOW_PSY FROM DocumentPreparation_PSY WHERE template_PSY=@TEMPLATENAME
INSERT @WORKFLOWS
SELECT Workflow_PSY FROM DocumentEffective_PSY DE
JOIN DocumentPreparation_PSY DP ON DP.Documentmanagerid_PSY=DP.DPNID_PSY WHERE DP.template_PSY=@TEMPLATENAME


INSERT @REVIEWERS
SELECT DISTINCT @TEMPLATENAME,USR.UserID_PSY,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WUM
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WUM.USERNAME
JOIN @WORKFLOWS WF ON WF.WORKFLOWNAME=WUM.WorkFlowName
WHERE  WUM.Type='REVIEW'

INSERT @APPROVERS
SELECT DISTINCT @TEMPLATENAME,USR.UserID_PSY,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WUM
JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WUM.USERNAME
JOIN @WORKFLOWS WF ON WF.WORKFLOWNAME=WUM.WorkFlowName
WHERE  WUM.Type='APPROVE'

--INSERT @REVIEWERS
--SELECT DISTINCT DP.template_PSY,WFM.UserName,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WFM 
--JOIN Documentrequest_PSY DR ON DR.Workflow_PSY=WFM.WorkFlowName
--JOIN DocumentPreparation_PSY DP ON DP.wokflow_PSY=WFM.WorkFlowName
--JOIN DocumentEffective_PSY DE ON DE.Workflow_PSY=WFM.WorkFlowName
--JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
--JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WFM.UserName
--WHERE DP.template_PSY=@TemplateName AND WFM.Type='Review'

--INSERT @APPROVERS
--SELECT DISTINCT DP.template_PSY,WFM.UserName,USR.Department_PSY,USR.Role_PSY FROM WorkflowUsersMapping WFM 
--JOIN Documentrequest_PSY DR ON DR.Workflow_PSY=WFM.WorkFlowName
--JOIN DocumentPreparation_PSY DP ON DP.wokflow_PSY=WFM.WorkFlowName
--JOIN DocumentEffective_PSY DE ON DE.Workflow_PSY=WFM.WorkFlowName
--JOIN DocumentTemplateConfiguration_PSY DT ON DT.Templatename_PSY=DP.template_PSY
--JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=WFM.UserName
--WHERE DP.template_PSY=@TemplateName AND WFM.Type='Approve'

INSERT @PREPAREDBY
SELECT DP.template_PSY ,DR.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY FROM Documentrequest_PSY DR
LEFT JOIN DocumentPreparation_PSY DP ON DP.ReferenceGuid_PSY=DR.GUID_DR
LEFT JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DR.CreatedBy_PSY
WHERE DP.template_PSY=@TemplateName

INSERT @PREPAREDBY
SELECT DP.template_PSY ,DP.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY FROM DocumentPreparation_PSY DP
LEFT JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DP.CreatedBy_PSY
WHERE DP.template_PSY=@TemplateName

INSERT @PREPAREDBY
SELECT DP.template_PSY ,DE.CreatedBy_PSY,USR.Department_PSY,USR.Role_PSY FROM DocumentEffective_PSY DE
LEFT JOIN DocumentPreparation_PSY DP ON DP.GUID_DP=DE.ReferenceGuid_PSY
LEFT JOIN UserConfiguration_PSY USR ON USR.UserID_PSY=DE.CreatedBy_PSY
WHERE DP.template_PSY=@TemplateName


SELECT TOP(1) DP.documenttitle_PSY,DP.documentno_PSY,DP.department_PSY,AT.Version,(VERSION-1) AS Supersedes,
DE.EffectiveDate_PSY,DE.Reviewdate_PSY,DP.department_PSY,DP.GUID_DP,DE.GUID_DE,
(SELECT STRING_AGG(USERNAME,',') FROM @REVIEWERS) AS REVIWED_BY,
(SELECT STRING_AGG(USERNAME,',') FROM @APPROVERS) AS APPROVED_BY,
STRING_AGG(PR.UserName, ',') AS PREPARED_BY,
(SELECT STRING_AGG(DEPTNAME,',') FROM @APPROVERS) AS APPROVEDDEPT,
(SELECT STRING_AGG(DEPTNAME,',') FROM @REVIEWERS) AS REVIWEDDEPT,
STRING_AGG(PR.DEPTNAME, ',') AS PREPAREDDEPT,
(SELECT STRING_AGG(ROLENAME,',') FROM @APPROVERS) AS APPROVEDROLE,
(SELECT STRING_AGG(ROLENAME,',') FROM @REVIEWERS) AS REVIWEDROLE,
STRING_AGG(PR.ROLENAME, ',') AS PREPAREDROLE,
DP.CreatedDate_PSY AS PREAPREDDATE,DPP.PrintCopy_PSY,DPP.reason_PSY
FROM DocumentPreparation_PSY DP 
LEFT JOIN DocumentEffective_PSY DE ON DE.ReferenceGuid_PSY=DP.GUID_DP
LEFT JOIN AdditionalTask_PSY AT ON AT.ReferenceGuid_PSY=DE.GUID_DE
LEFT JOIN DocumentPrint_PSY DPP ON DPP.ReferenceGuid_PSY=DP.GUID_DP AND DPP.IsActive_PSY=1
JOIN @PREPAREDBY PR ON PR.TEMPLATE_NAME=DP.template_PSY
WHERE DP.template_PSY=@TemplateName
GROUP BY
    DP.documenttitle_PSY,
    DP.documentno_PSY,
    AT.Version,
    DP.department_PSY,
    DE.EffectiveDate_PSY,
    DE.Reviewdate_PSY,
    DP.CreatedDate_PSY,
    DP.department_PSY,
    DPP.PrintCopy_PSY,
    DPP.reason_PSY,DP.GUID_DP,DE.GUID_DE
--UNION ALL
--SELECT TOP(1) AT.Version,(VERSION-1) AS Supersedes FROM AdditionalTask_PSY AT 
--JOIN DocumentEffective_PSY DE ON DE.GUID_DE=AT.ReferenceGuid_PSY
--JOIN DocumentPreparation_PSY DP ON DP.GUID_DP=DE.ReferenceGuid_PSY WHERE DP.template_PSY=@TemplateName
--SELECT TOP(1) DP.documenttitle_PSY,DP.documentno_PSY,AT.Version,(VERSION-1) AS Supersedes,DP.department_PSY,
--DE.EffectiveDate_PSY,DE.Reviewdate_PSY,DP.department_PSY, 
--DP.CreatedDate_PSY AS PREAPREDDATE,DPP.PrintCopy_PSY,DPP.reason_PSY
--FROM DocumentPreparation_PSY DP 
--RIGHT JOIN DocumentEffective_PSY DE ON DE.ReferenceGuid_PSY=DP.GUID_DP
--RIGHT JOIN AdditionalTask_PSY AT ON AT.ReferenceGuid_PSY=DE.GUID_DE
--RIGHT JOIN DocumentPrint_PSY DPP ON DPP.ReferenceGuid_PSY=DP.GUID_DP
--WHERE DP.template_PSY=''

end