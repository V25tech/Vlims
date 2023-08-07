  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_GET] @SFPID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT SFPID_PSY,
Role_PSY,
AdminManagement_PSY,
SecurityManagement_PSY,
SecurityConfigurations_PSY,
EsignandAprrovalConfigurations_PSY,
HirearchyManagement_PSY,
RoleConfiguration_PSY,
DepartmentConfiguration_PSY,
SetFunctionalProfile_PSY,
PlantManagement_PSY,
UserManagement_PSY,
UserGroupConfiguration_PSY,
ActivateStatus,
AuditLog_PSY,
DocumentMaster_PSY,
DocumentTypeConfiguration_PSY,
DocumentTemplateConfiguration_PSY,
WorkFlowConfiguration_PSY,
DashBoardConfiguration_PSY,
NotificationConfiguration_PSY,
DocumentMaster_PSY,
DocumentRequest_PSY,
DocumentPreparation_PSY,
DocumentEffectiveOut_PSY,
AdditionalTasks_PSY,
AdditionalTasks_PSY,
DocumentRevision_PSY,
DocumentRepository_PSY,

CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[SetFunctionalProfile_PSY] WITH (NOLOCK) where [SFPID_PSY] = @SFPID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END