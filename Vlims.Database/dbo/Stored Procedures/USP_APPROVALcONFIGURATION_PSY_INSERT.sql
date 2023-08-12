

  CREATE PROCEDURE [dbo].[USP_APPROVALcONFIGURATION_PSY_INSERT]
@DocTypeNoOfApprovals INT,
@DocTempNoOfApprovals int,
@WFlowNoOfApprovals INT
 AS 
 BEGIN 
  BEGIN TRY 
  
 
 INSERT INTO [dbo].Approval_Configuration_PSY 
 (DocTypeNoOfApprovals,
DocTempNoOfApprovals,
WFlowNoOfApprovals)
 VALUES 
(@DocTypeNoOfApprovals,
@DocTempNoOfApprovals,
@WFlowNoOfApprovals);
 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END