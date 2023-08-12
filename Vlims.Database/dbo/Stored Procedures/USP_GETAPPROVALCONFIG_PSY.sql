

  CREATE PROCEDURE [dbo].[USP_GETAPPROVALCONFIG_PSY] 
 AS 
 BEGIN 
  BEGIN TRY 
  
 SELECT [DocTypeNoOfApprovals]
      ,[DocTempNoOfApprovals]
      ,[WFlowNoOfApprovals]
      ,[ApprConfigId]
  FROM [dbo].[Approval_Configuration_PSY]

  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END