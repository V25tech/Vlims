  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int,
@ModifiedBy_PSY NVarChar(100),@Status_PSY nvarchar(100),@Version int,@Workflow_PSY nvarchar(200)
 AS 
 BEGIN 
  BEGIN TRY 
  


DECLARE @DOCEFFID int=0; set @DOCEFFID=(select DocumentEffective_ID from AdditionalTask_PSY where ATID_PSY=@ATID_PSY)
DECLARE @DOCPREPID INT=0; SET @DOCPREPID=(select Documentmanagerid_PSY from DocumentEffective_PSY where DEID_PSY=@DOCEFFID)
DECLARE @referenceId INT=0; SET @referenceId=(select Refrence_PSY from AdditionalTask_PSY where ATID_PSY=@ATID_PSY)
DECLARE @OLDPREPARATIONDOCTYPE NVARCHAR(200);SET @OLDPREPARATIONDOCTYPE=(SELECT TOP(1) DP.documenttype_PSY FROM DocumentPreparation_PSY DP
WHERE DP.DPNID_PSY=@DOCPREPID)



IF(@Status_PSY='REVISION')
BEGIN

DECLARE @XML XML=''
SET @XML=(SELECT document_PSY FROM DocumentPreparation_PSY WHERE DPNID_PSY=@DOCPREPID)

IF(@XML IS NOT NULL)
BEGIN
-- Update supersedesNo
SET @XML.modify('
    replace value of (/PreperationDocument/supersedesNo/text())[1]
    with xs:int((/PreperationDocument/supersedesNo/text())[1]) + 1
');

-- Update revisionNo
SET @XML.modify('
    replace value of (/PreperationDocument/revisionNo/text())[1]
    with xs:int((/PreperationDocument/revisionNo/text())[1]) + 1
');
END

DECLARE @ID1 INT
INSERT INTO DocumentPreparation_PSY(Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,
department_PSY,document_PSY,template_PSY,wokflow_PSY,details_PSY,CreatedBy_PSY,CreatedDate_PSY,ModifiedBy_PSY,ModifiedDate_PSY,Status_PSY,DOCStatus_PSY,Refrence_PSY,GUID_DP,ReferenceGuid_PSY)
SELECT Documentmanagerid_PSY,documenttitle_PSY,documentno_PSY,documenttype_PSY,department_PSY,@XML,
template_PSY,null,details_PSY,CreatedBy_PSY,GetDate(),@ModifiedBy_PSY,GetDate(),'IN-PROGRESS',DOCStatus_PSY,@referenceId,NEWID(),GUID_DP FROM DocumentPreparation_PSY
WHERE DPNID_PSY=@DOCPREPID
SELECT @ID1 = @@IDENTITY;


END




select @ATID_PSY; 


  
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END