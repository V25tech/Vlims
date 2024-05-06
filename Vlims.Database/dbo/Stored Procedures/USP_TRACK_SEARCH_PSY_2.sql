CREATE PROCEDURE [dbo].[USP_TRACK_SEARCH_PSY_2] (@SearchTerm NVARCHAR(50) ='', @UserName NVARCHAR(50)='') AS
BEGIN
    DECLARE @SQLQuery NVARCHAR(MAX);
	DECLARE @TRACK_TEMP TABLE (
		ID INT,
		Stage VARCHAR(50),
		DocumentNo_PSY VARCHAR(150),
		DocumentName_PSY VARCHAR(500),
		Status_PSY VARCHAR(50)
		--ReferenceId INT
	)
 
	;WITH CTE AS (
		SELECT *,
			   ROW_NUMBER() OVER (PARTITION BY DocumentNo_PSY ORDER BY 
					CASE 
						WHEN Stage_PSY = 'Print' THEN 1
						WHEN Stage_PSY = 'Effective' THEN 2
						WHEN Stage_PSY = 'Preparation' THEN 3
						ELSE 4
					END
			   ) AS RowNum
		FROM 
			( 
				SELECT DPNID_PSY AS ID ,'Preparation' AS Stage_PSY, documentno_PSY AS DocumentNo_PSY, documenttitle_PSY AS DocumentName_PSY, Status_PSY AS Status_PSY 
				FROM [dbo].[DocumentPreparation_PSY] 
				UNION ALL
				SELECT DEID_PSY AS ID , 'Effective', documentno_PSY, documenttitle_PSY, Status_PSY 
				FROM [dbo].[DocumentEffective_PSY] 
				UNION ALL
				SELECT DRId_PSY AS ID , 'Print', documentno_PSY, documenttitle_PSY, Status_PSY 
				FROM [dbo].[DocumentPrint_PSY]
			) AS TrackTable 
		WHERE DocumentNo_PSY LIKE '%' + @SearchTerm + '%'
	)

	INSERT INTO @TRACK_TEMP (ID, Stage, DocumentNo_PSY, DocumentName_PSY, Status_PSY)
	SELECT ID, Stage_PSY, DocumentNo_PSY, DocumentName_PSY, Status_PSY
	FROM CTE
	WHERE RowNum = 1;

	SELECT ID, Stage, DocumentNo_PSY, DocumentName_PSY, (
	SELECT TOP 1 CASE 
			WHEN Status_PSY = 'Approved' THEN 'Under Approved'
			WHEN Status_PSY = 'Reviewed' THEN 'Under Reviewed'
            WHEN Status_PSY = 'In-Progress' OR Status_PSY IS NULL THEN 'Under In-Progress'

			ELSE 'Under In-Progress'
    END AS Status_PSY
	FROM dbo.workitems_PSY
	WHERE REFRENCEID_PSY = ID
	) AS STATUS_PSY FROM @TRACK_TEMP;

END;
--