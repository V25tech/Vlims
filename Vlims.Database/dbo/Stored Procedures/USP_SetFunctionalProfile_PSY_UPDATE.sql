  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_UPDATE] @SFPID_PSY int, @Role_PSY Bit,
@AdminManagement_PSY Bit,
@SecurityManagement_PSY Bit,
@SecurityConfigurations_PSY Bit,
@EsignandAprrovalConfigurations_PSY Bit,
@HirearchyManagement_PSY Bit,
@RoleConfiguration_PSY Bit,
@DepartmentConfiguration_PSY Bit,
@SetFunctionalProfile_PSY Bit,
@PlantManagement_PSY Bit,
@UserManagement_PSY Bit,
@UserGroupConfiguration_PSY Bit,
@ActivateStatus Bit,
@AuditLog_PSY Bit,
@DocumentMaster_PSY Bit,
@DocumentTypeConfiguration_PSY Bit,
@DocumentTemplateConfiguration_PSY Bit,
@WorkFlowConfiguration_PSY Bit,
@DashBoardConfiguration_PSY Bit,
@NotificationConfiguration_PSY Bit,
@DocumentRequest_PSY Bit,
@DocumentPreparation_PSY Bit,
@DocumentEffectiveOut_PSY Bit,
@AdditionalTasks_PSY Bit,
@DocumentRevision_PSY Bit,
@DocumentRepository_PSY Bit,


@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[SetFunctionalProfile_PSY] SET Role_PSY=@Role_PSY,
AdminManagement_PSY=@AdminManagement_PSY,
SecurityManagement_PSY=@SecurityManagement_PSY,
SecurityConfigurations_PSY=@SecurityConfigurations_PSY,
EsignandAprrovalConfigurations_PSY=@EsignandAprrovalConfigurations_PSY,
HirearchyManagement_PSY=@HirearchyManagement_PSY,
RoleConfiguration_PSY=@RoleConfiguration_PSY,
DepartmentConfiguration_PSY=@DepartmentConfiguration_PSY,
SetFunctionalProfile_PSY=@SetFunctionalProfile_PSY,
PlantManagement_PSY=@PlantManagement_PSY,
UserManagement_PSY=@UserManagement_PSY,
UserGroupConfiguration_PSY=@UserGroupConfiguration_PSY,
ActivateStatus=@ActivateStatus,
AuditLog_PSY=@AuditLog_PSY,
DocumentMaster_PSY=@DocumentMaster_PSY,
DocumentTypeConfiguration_PSY=@DocumentTypeConfiguration_PSY,
DocumentTemplateConfiguration_PSY=@DocumentTemplateConfiguration_PSY,
WorkFlowConfiguration_PSY=@WorkFlowConfiguration_PSY,
DashBoardConfiguration_PSY=@DashBoardConfiguration_PSY,
NotificationConfiguration_PSY=@NotificationConfiguration_PSY,
DocumentRequest_PSY=@DocumentRequest_PSY,
DocumentPreparation_PSY=@DocumentPreparation_PSY,
DocumentEffectiveOut_PSY=@DocumentEffectiveOut_PSY,
AdditionalTasks_PSY=@AdditionalTasks_PSY,
DocumentRevision_PSY=@DocumentRevision_PSY,
DocumentRepository_PSY=@DocumentRepository_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [SFPID_PSY] = @SFPID_PSY ;  select @SFPID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END