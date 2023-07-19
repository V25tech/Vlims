CREATE PROCEDURE [dbo].[USP_GET_ALL_WORK_ASSAIGNED_TO_ME]
AS
BEGIN
DELETE FROM WORK_ASSAIGNED_TO_ME
INSERT WORK_ASSAIGNED_TO_ME(Task_Type,Stage,Assigned,Initiated_By,Status,Due_Date)
SELECT Documenttypename_PSY,Status_PSY,Assigntodepartment_PSY,CreatedBy_PSY,Status_PSY,CreatedDate_PSY FROM DocumentTypeConfiguration_PSY
INSERT WORK_ASSAIGNED_TO_ME(Task_Type,Stage,Assigned,Initiated_By,Status,Due_Date)
SELECT Templatename_PSY,Status_PSY,CreatedBy_PSY,CreatedBy_PSY,Status_PSY,CreatedDate_PSY FROM DocumentTemplateConfiguration_PSY
--INSERT WORK_ASSAIGNED_TO_ME(Task_Type,Stage,Assigned,Initiated_By,Status,Due_Date)
--SELECT  FROM Documentrequest_PSY
END