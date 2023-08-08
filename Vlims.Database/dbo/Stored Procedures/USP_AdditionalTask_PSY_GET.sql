﻿  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_GET] @ATID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT ATID_PSY,
Documentmanagerid_PSY,
AT.CreatedBy_PSY,
AT.CreatedDate_PSY,
AT.ModifiedBy_PSY,
AT.ModifiedDate_PSY,
AT.Status_PSY,
Version,
 count(*) over() as TotalRows  ,
 de.document_PSY,de.department_PSY,de.documentno_PSY,de.documenttitle_PSY,de.documenttype_PSY,de.EffectiveDate_PSY,de.Reviewdate_PSY
 FROM [dbo].[AdditionalTask_PSY] AT WITH (NOLOCK) inner join DocumentEffective_PSY de on AT.Refrence_PSY=de.Refrence_PSY 
 where [ATID_PSY] = @ATID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END