using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using NotesFor.HtmlToOpenXml;
using Text = DocumentFormat.OpenXml.Wordprocessing.Text;
using DocumentFormat.OpenXml;
using HtmlAgilityPack;
using System.Text;
using System.Diagnostics;

internal class HeaderFooter
{
    private static void get()
    {
        try
        {
            //string filePath = $"{Directory.GetCurrentDirectory()}//test123.docx";
            //string htmlTable = "<table><tr><th>Column 1</th><th>Column 2</th></tr><tr><td>Value 1</td><td>Value 2</td></tr></table>";

            //AddHtmlTableToWordDocumentHeader(filePath, htmlTable);

            string htmlheaderTable = "<table><tr><th>Header 1</th></tr><tr><td>Data 1</td></tr></table>";
            string htmlfooterTable = "<table><tr><th>Header 3</th></tr><tr><td>Data 3</td></tr></table>";
            string outputPath = Path.Combine(Directory.GetCurrentDirectory(), "f3.docx");//testheaderfooter.docx";

            //ConvertHtmlTableToWordTableInHeader(outputPath, htmlheaderTable);
            ConvertHtmlTableToWordTableInHeader1(outputPath, htmlheaderTable, htmlfooterTable);
            //ConvertHtmlTableToWordTableInHeaderAndFooter(outputPath, htmlheaderTable, htmlfooterTable);
        }
        catch (Exception ex)
        {

            //throw;
        }
    }
    private static void AddHtmlTableToWordDocumentHeader(string filePath, string htmlTable)
    {
        // Load the HTML table using HtmlAgilityPack
        HtmlDocument htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(htmlTable);

        using (WordprocessingDocument document = WordprocessingDocument.Open(filePath, true))
        {
            // Get the main document part
            MainDocumentPart mainPart = document.MainDocumentPart;

            // Create a new header part and assign an ID
            HeaderPart headerPart = mainPart.AddNewPart<HeaderPart>();
            string headerPartId = mainPart.GetIdOfPart(headerPart);

            // Create a new header reference and assign the ID
            HeaderReference headerReference = new HeaderReference() { Type = HeaderFooterValues.Default, Id = headerPartId };

            // Get the header part's section properties
            SectionProperties sectionProperties = mainPart.Document.Body.Elements<SectionProperties>().FirstOrDefault();
            if (sectionProperties == null)
            {
                // If section properties do not exist, create them
                sectionProperties = new SectionProperties();
                mainPart.Document.Body.Append(sectionProperties);
            }

            // Set the header reference on the section properties
            sectionProperties.InsertAt(headerReference, 0);



            // Create the HTML table as a paragraph in the header part
            Paragraph paragraph = new Paragraph(new Run(new Text(htmlTable)));

            // Add the paragraph to the header part
            headerPart.Header = new Header(paragraph);
            headerPart.Header.Save();
        }
    }


    public static void ConvertHtmlTableToWordTableInHeader(string filePath, string htmlTable)
    {
        using (WordprocessingDocument document = WordprocessingDocument.Open(filePath, true))
        {
            // Get the main document part
            MainDocumentPart mainPart = document.MainDocumentPart;

            // Create a new header part and assign an ID
            HeaderPart headerPart = mainPart.AddNewPart<HeaderPart>();
            string headerPartId = mainPart.GetIdOfPart(headerPart);

            // Create a new header reference and assign the ID
            HeaderReference headerReference = new HeaderReference() { Type = HeaderFooterValues.Default, Id = headerPartId };

            // Get the header part's section properties
            SectionProperties sectionProperties = mainPart.Document.Body.Elements<SectionProperties>().FirstOrDefault();
            if (sectionProperties == null)
            {
                // If section properties do not exist, create them
                sectionProperties = new SectionProperties();
                mainPart.Document.Body.Append(sectionProperties);
            }

            // Set the header reference on the section properties
            sectionProperties.InsertAt(headerReference, 0);

            // Load the HTML table using HtmlAgilityPack
            HtmlDocument htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(htmlTable);

            // Create a new header with a table
            Header header = new Header();
            headerPart.Header = header;

            // Create a table in the header
            Table wordTable = new Table();

            // Set table borders
            TableProperties tableProperties = new TableProperties(
                new TableBorders(
                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
                )
            );
            wordTable.AppendChild(tableProperties);

            // Parse the HTML table and convert it to Word table
            HtmlNodeCollection rows = htmlDocument.DocumentNode.SelectNodes("//tr");
            if (rows != null)
            {
                foreach (HtmlNode row in rows)
                {
                    TableRow wordRow = new TableRow();

                    HtmlNodeCollection cells = row.SelectNodes("th|td");
                    if (cells != null)
                    {
                        foreach (HtmlNode cell in cells)
                        {
                            TableCell wordCell = new TableCell();
                            wordCell.Append(new Paragraph(new Run(new Text(cell.InnerText))));

                            // Set cell borders
                            TableCellProperties cellProperties = new TableCellProperties(
                                new TableCellBorders(
                                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 }
                                )
                            );
                            wordCell.AppendChild(cellProperties);

                            wordRow.Append(wordCell);
                        }
                    }

                    wordTable.Append(wordRow);
                }
            }

            // Add the table to the header
            header.Append(wordTable);
            headerPart.Header.Save();
        }
    }
    public static void ConvertHtmlTableToWordTableInHeaderAndFooter(string filePath, string htmlHeaderTable, string htmlFooterTable)
    {
        try
        {
            string modifiedFilePath = Path.Combine(Directory.GetCurrentDirectory(), "new01.docx");

            // Create a copy of the original file
            File.Copy(filePath, modifiedFilePath, true);
            using (WordprocessingDocument document = WordprocessingDocument.Create(filePath, WordprocessingDocumentType.Document))
            {
                MainDocumentPart mainPart = document.AddMainDocumentPart();
                new Document(new Body()).Save(mainPart);

                // Load the HTML header table using HtmlAgilityPack
                HtmlDocument htmlHeaderDocument = new HtmlDocument();
                htmlHeaderDocument.LoadHtml(htmlHeaderTable);
                bool isValid = ValidateHtmlTable(htmlHeaderTable);
                // Load the HTML footer table using HtmlAgilityPack
                HtmlDocument htmlFooterDocument = new HtmlDocument();
                htmlFooterDocument.LoadHtml(htmlFooterTable);
                isValid = ValidateHtmlTable(htmlFooterTable);
                // Create a new Word document for the header
                using (MemoryStream headerStream = new MemoryStream())
                {
                    using (WordprocessingDocument headerDocument = WordprocessingDocument.Create(headerStream, WordprocessingDocumentType.Document))
                    {
                        MainDocumentPart headerMainPart = headerDocument.AddMainDocumentPart();
                        headerMainPart.Document = new Document(new Body());

                        // Create a header table
                        Table headerTable = ConvertHtmlTableToWordTable(htmlHeaderDocument);

                        // Add the table to the header document
                        headerMainPart.Document.Body.Append(headerTable);
                        headerMainPart.Document.Save();
                    }

                    // Set the position of the stream to the beginning
                    headerStream.Position = 0;

                    // Create a new HeaderPart and add it to the main document part
                    HeaderPart headerPart = mainPart.AddNewPart<HeaderPart>();
                    using (Stream headerPartStream = headerPart.GetStream())
                    {
                        // Copy the content from the header stream to the header part
                        headerStream.CopyTo(headerPartStream);
                    }

                    // Create a new HeaderReference and assign the ID of the header part
                    HeaderReference headerReference = new HeaderReference { Type = HeaderFooterValues.Default, Id = mainPart.GetIdOfPart(headerPart) };

                    // Get the section properties of the main document part
                    SectionProperties sectionProperties = mainPart.Document.Body.Elements<SectionProperties>().FirstOrDefault();
                    if (sectionProperties == null)
                    {
                        // If section properties do not exist, create them
                        sectionProperties = new SectionProperties();
                        mainPart.Document.Body.Append(sectionProperties);
                    }

                    // Set the header reference on the section properties
                    sectionProperties.RemoveAllChildren<HeaderReference>();
                    sectionProperties.InsertAt(headerReference, 0);
                }

                // Create a new Word document for the footer
                using (MemoryStream footerStream = new MemoryStream())
                {
                    using (WordprocessingDocument footerDocument = WordprocessingDocument.Create(footerStream, WordprocessingDocumentType.Document))
                    {
                        MainDocumentPart footerMainPart = footerDocument.AddMainDocumentPart();
                        footerMainPart.Document = new Document(new Body());

                        // Create a footer table
                        Table footerTable = ConvertHtmlTableToWordTable(htmlFooterDocument);

                        // Add the table to the footer document
                        footerMainPart.Document.Body.Append(footerTable);
                        footerMainPart.Document.Save();
                    }

                    // Set the position of the stream to the beginning
                    footerStream.Position = 0;

                    // Create a new FooterPart and add it to the main document part
                    FooterPart footerPart = mainPart.AddNewPart<FooterPart>();
                    using (Stream footerPartStream = footerPart.GetStream())
                    {
                        // Copy the content from the footer stream to the footer part
                        footerStream.CopyTo(footerPartStream);
                    }

                    // Create a new FooterReference and assign the ID of the footer part
                    FooterReference footerReference = new FooterReference { Type = HeaderFooterValues.Default, Id = mainPart.GetIdOfPart(footerPart) };

                    // Get the section properties of the main document part
                    SectionProperties sectionProperties = mainPart.Document.Body.Elements<SectionProperties>().FirstOrDefault();
                    if (sectionProperties == null)
                    {
                        // If section properties do not exist, create them
                        sectionProperties = new SectionProperties();
                        mainPart.Document.Body.Append(sectionProperties);
                    }

                    // Set the footer reference on the section properties
                    sectionProperties.RemoveAllChildren<FooterReference>();
                    sectionProperties.InsertAt(footerReference, 1);
                }

                // Save and close the document
                mainPart.Document.Save();
                document.Close();
            }

            // Open the modified document for viewing
            //Process.Start(new ProcessStartInfo { FileName = filePath, UseShellExecute = true });
        }
        catch (Exception ex)
        {

            //throw;
        }
    }

    private static Table ConvertHtmlTableToWordTable(HtmlDocument htmlDocument)
    {
        Table wordTable = new Table();
        try
        {


            // Set table borders
            TableProperties tableProperties = new TableProperties(
                new TableBorders(
                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
                )
            );
            wordTable.AppendChild(tableProperties);

            // Parse the HTML table and convert it to Word table
            HtmlNodeCollection rows = htmlDocument.DocumentNode.SelectNodes("//tr");
            if (rows != null)
            {
                foreach (HtmlNode row in rows)
                {
                    TableRow wordRow = new TableRow();

                    HtmlNodeCollection cells = row.SelectNodes("th|td");
                    if (cells != null)
                    {
                        foreach (HtmlNode cell in cells)
                        {
                            TableCell wordCell = new TableCell();
                            wordCell.Append(new Paragraph(new Run(new Text(cell.InnerText))));

                            // Set cell borders
                            TableCellProperties cellProperties = new TableCellProperties(
                                new TableCellBorders(
                                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 }
                                )
                            );
                            wordCell.AppendChild(cellProperties);

                            wordRow.Append(wordCell);
                        }
                    }

                    wordTable.Append(wordRow);
                }
            }

            return wordTable;
        }
        catch (Exception ex)
        {

            //throw;
        }
        return wordTable;
    }
    public static bool ValidateHtmlTable(string htmlTable)
    {
        try
        {
            // Load the HTML table using HtmlAgilityPack
            HtmlDocument htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(htmlTable);

            // Validate table structure
            HtmlNodeCollection rows = htmlDocument.DocumentNode.SelectNodes("//tr");
            if (rows == null || rows.Count == 0)
            {
                Console.WriteLine("No rows found in the HTML table.");
                return false;
            }

            int columnCount = -1;
            foreach (HtmlNode row in rows)
            {
                HtmlNodeCollection cells = row.SelectNodes("th|td");
                if (cells == null || cells.Count == 0)
                {
                    Console.WriteLine("No cells found in a row of the HTML table.");
                    return false;
                }

                if (columnCount == -1)
                {
                    columnCount = cells.Count;
                }
                else if (cells.Count != columnCount)
                {
                    Console.WriteLine("Inconsistent number of cells in the HTML table rows.");
                    return false;
                }
            }

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error validating HTML table: {ex.Message}");
            return false;
        }
    }

    public static void ConvertHtmlTableToWordTableInHeader1(string filePath, string htmlTable, string htmlfooterTable)
    {
        using (WordprocessingDocument document = WordprocessingDocument.Open(filePath, true))
        {
            // Get the main document part
            //MainDocumentPart mainPart = document.MainDocumentPart;
            MainDocumentPart mainPart = document.AddMainDocumentPart();
            new Document(new Body()).Save(mainPart);

            // Create a new header part and assign an ID
            HeaderPart headerPart = mainPart.AddNewPart<HeaderPart>();
            string headerPartId = mainPart.GetIdOfPart(headerPart);

            // Create a new footer part and assign an ID
            FooterPart footerPart = mainPart.AddNewPart<FooterPart>();
            string footerPartId = mainPart.GetIdOfPart(footerPart);

            // Create a new header reference and assign the ID
            HeaderReference headerReference = new HeaderReference() { Type = HeaderFooterValues.Default, Id = headerPartId };
            // Create a new footer reference and assign the ID
            FooterReference footerReference = new FooterReference() { Type = HeaderFooterValues.Default, Id = footerPartId };

            // Get the header part's section properties
            SectionProperties sectionProperties = mainPart.Document.Body.Elements<SectionProperties>().FirstOrDefault();
            if (sectionProperties == null)
            {
                // If section properties do not exist, create them
                sectionProperties = new SectionProperties();
                mainPart.Document.Body.Append(sectionProperties);
            }

            // Set the header reference on the section properties
            sectionProperties.InsertAt(headerReference, 0);
            // Set the footer reference on the section properties
            sectionProperties.InsertAt(footerReference, 1);

            // Load the HTML table using HtmlAgilityPack
            //HtmlDocument htmlDocument = new HtmlDocument();
            //htmlDocument.LoadHtml(htmlTable);
            //htmlDocument.LoadHtml(htmlfooterTable);

            // Create a new header with a table
            Header header = new Header();
            headerPart.Header = header;

            // Create a new footer with a table
            Footer footer = new Footer();
            footerPart.Footer = footer;

            // Create a table in the header
            Table wordTable = new Table();
            // Create a table in the footer
            Table wordTable1 = new Table();

            wordTable = ConvertHtmlTableToWordTable1(htmlTable);
            wordTable1 = ConvertHtmlTableToWordTable1(htmlfooterTable);
            // Add the table to the header
            header.Append(wordTable);
            headerPart.Header.Save();

            footer.Append(wordTable1);
            footerPart.Footer.Save();
        }
    }
    private static Table ConvertHtmlTableToWordTable1(string htmlTable)
    {
        HtmlDocument htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(htmlTable);

        Table wordTable = new Table();
        TableProperties tableProperties = new TableProperties(
                new TableBorders(
                    new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                    new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
                )
            );
        wordTable.AppendChild(tableProperties);

        // Parse the HTML table and convert it to Word table
        HtmlNodeCollection rows = htmlDocument.DocumentNode.SelectNodes("//tr");
        if (rows != null)
        {
            foreach (HtmlNode row in rows)
            {
                TableRow wordRow = new TableRow();

                HtmlNodeCollection cells = row.SelectNodes("th|td");
                if (cells != null)
                {
                    foreach (HtmlNode cell in cells)
                    {
                        TableCell wordCell = new TableCell();
                        wordCell.Append(new Paragraph(new Run(new Text(cell.InnerText))));

                        // Set cell borders
                        TableCellProperties cellProperties = new TableCellProperties(
                            new TableCellBorders(
                                new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 }
                            )
                        );
                        wordCell.AppendChild(cellProperties);

                        wordRow.Append(wordCell);
                    }
                }

                wordTable.Append(wordRow);
            }
        }
        return wordTable;
    }
    /// <summary>
    /// merging middle cells
    /// </summary>
    /// <param name="htmlDocument"></param>
    /// <returns></returns>
    private static Table ConvertHtmlTableToWordTable2(HtmlDocument htmlDocument)
    {
        Table wordTable = new Table();

        // Set table borders
        TableProperties tableProperties = new TableProperties(
            new TableBorders(
                new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 },
                new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 6 }
            )
        );
        wordTable.AppendChild(tableProperties);

        // Parse the HTML table and convert it to Word table
        HtmlNodeCollection rows = htmlDocument.DocumentNode.SelectNodes("//tr");
        if (rows != null)
        {
            for (int rowIndex = 0; rowIndex < rows.Count; rowIndex++)
            {
                HtmlNode row = rows[rowIndex];
                TableRow wordRow = new TableRow();

                HtmlNodeCollection cells = row.SelectNodes("th|td");
                if (cells != null)
                {
                    for (int cellIndex = 0; cellIndex < cells.Count; cellIndex++)
                    {
                        HtmlNode cell = cells[cellIndex];
                        TableCell wordCell = new TableCell();
                        wordCell.Append(new Paragraph(new Run(new Text(cell.InnerText))));

                        // Set cell borders
                        TableCellProperties cellProperties = new TableCellProperties(
                            new TableCellBorders(
                                new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 },
                                new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single), Size = 4 }
                            )
                        );

                        // Merge cells in the middle column of the third row
                        if (rowIndex == 2 && cellIndex == 1)
                        {
                            cellProperties.Append(new HorizontalMerge() { Val = MergedCellValues.Restart });
                            wordCell.AppendChild(cellProperties);
                        }
                        else if (rowIndex == 2 && cellIndex == 2)
                        {
                            cellProperties.Append(new HorizontalMerge() { Val = MergedCellValues.Continue });
                            wordCell.AppendChild(cellProperties);
                        }
                        else
                        {
                            wordCell.AppendChild(cellProperties);
                        }

                        wordRow.Append(wordCell);
                    }
                }

                wordTable.Append(wordRow);
            }
        }

        return wordTable;
    }

}