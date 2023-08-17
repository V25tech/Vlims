using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Text = DocumentFormat.OpenXml.Wordprocessing.Text;
using DocumentFormat.OpenXml;
using HtmlAgilityPack;
using System.Text;
using Vlims.DMS.Entities;
using Header = DocumentFormat.OpenXml.Wordprocessing.Header;
using Table = DocumentFormat.OpenXml.Wordprocessing.Table;
using BottomBorder = DocumentFormat.OpenXml.Wordprocessing.BottomBorder;
using TopBorder = DocumentFormat.OpenXml.Wordprocessing.TopBorder;
using LeftBorder = DocumentFormat.OpenXml.Wordprocessing.LeftBorder;
using RightBorder = DocumentFormat.OpenXml.Wordprocessing.RightBorder;
using Run = DocumentFormat.OpenXml.Wordprocessing.Run;
using Aspose.Words;
using System.Data;
using Vlims.DocumentMaster.Entities;

internal class HeaderFooter
{
    public static void getData(string htmlheaderTable, string htmlfooterTable, string outputPath, DocumentTemplateConfiguration template)
    {
        try
        {
            //string filePath = $"{Directory.GetCurrentDirectory()}//test123.docx";
            //string htmlTable = "<table><tr><th>Column 1</th><th>Column 2</th></tr><tr><td>Value 1</td><td>Value 2</td></tr></table>";

            //AddHtmlTableToWordDocumentHeader(filePath, htmlTable);

            //string htmlheaderTable = "<table><tr><th>Header 1</th></tr><tr><td>Data 1</td></tr></table>";
            //string htmlfooterTable = "<table><tr><th>Header 3</th></tr><tr><td>Data 3</td></tr></table>";
            //string outputPath = Path.Combine(Directory.GetCurrentDirectory(), "f3.docx");//testheaderfooter.docx";

            //ConvertHtmlTableToWordTableInHeader(outputPath, htmlheaderTable);
            ConvertHtmlTableToWordTableInHeader1(outputPath, htmlheaderTable, htmlfooterTable, template);
            //ConvertHtmlTableToWordTableInHeaderAndFooter(outputPath, htmlheaderTable, htmlfooterTable);
        }
        catch (Exception ex)
        {

            //throw;
        }
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

    public static void ConvertHtmlTableToWordTableInHeader1(string filePath, string htmlTable, string htmlfooterTable, DocumentTemplateConfiguration template)
    {
        //string tempFilePath = Path.GetTempFileName() + ".docx";
        using (WordprocessingDocument document = WordprocessingDocument.Create(filePath, WordprocessingDocumentType.Document))
        {

            // Get the main document part
            MainDocumentPart mainPart;
            if (document.MainDocumentPart != null)
                mainPart = document.MainDocumentPart;
            else
            {
                mainPart = document.AddMainDocumentPart();
                new DocumentFormat.OpenXml.Wordprocessing.Document(new DocumentFormat.OpenXml.Wordprocessing.Body()).Save(mainPart);
            }

            // Iterate through each page and add header and footer tables
            for (int page = 0; page < template.Pages; page++)
            {
                // Create a new section properties for each page
                SectionProperties sectionProperties = new SectionProperties(
                    new PageSize() { Width = 11906U, Height = 16838U }, // Adjust page size as needed
                    new PageMargin() { Top = 1417, Right = 1417, Bottom = 1417, Left = 1417, Header = 708, Footer = 708 }
                );

                if (page > 0)
                {
                    DocumentFormat.OpenXml.Drawing.Paragraph pageBreak = new DocumentFormat.OpenXml.Drawing.Paragraph(new Run(new Break() { Type = BreakValues.Page }));
                    mainPart.Document.Body.Append(pageBreak);
                }

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

                sectionProperties.RemoveAllChildren<HeaderReference>();
                sectionProperties.RemoveAllChildren<FooterReference>();
                // Set the header reference on the section properties
                sectionProperties.InsertAt(headerReference, 0);
                // Set the footer reference on the section properties
                sectionProperties.InsertAt(footerReference, 1);

                // Add section properties to the body
                mainPart.Document.Body.Append(sectionProperties);

                // Create a new header with a table
                Header header = new Header();
                headerPart.Header = header;

                // Create a new footer with a table
                Footer footer = new Footer();
                footerPart.Footer = footer;

                // Load the HTML content into paragraphs for header and footer
                HtmlDocument htmlHeaderDocument = new HtmlDocument();
                htmlHeaderDocument.LoadHtml(htmlTable);
                GenerateHeaderContent(headerPart, htmlHeaderDocument);

                HtmlDocument htmlFooterDocument = new HtmlDocument();
                htmlFooterDocument.LoadHtml(htmlfooterTable);
                GenerateFooterContent(footerPart, htmlFooterDocument);

                // Add the table to the header
                //header.Append(headerElements);
                //headerPart.Header.Save();

                //footer.Append(footerElements);
                //footerPart.Footer.Save();

                // Add dynamic content to the body
                if (page < template.Page.ToList().Count)
                {
                    string bodyContent = template.Page[page].text;
                    string[] lines = bodyContent.Split('\n');

                    foreach (string line in lines)
                    {
                        DocumentFormat.OpenXml.Wordprocessing.Body body = mainPart.Document.Body;
                        DocumentFormat.OpenXml.Drawing.Paragraph paragraph = new DocumentFormat.OpenXml.Drawing.Paragraph();
                        Run run = new Run();
                        Text text = new Text(line.Trim()); // Trim to remove any leading/trailing spaces
                        run.Append(text);
                        paragraph.Append(run);
                        body.Append(paragraph);
                    }
                }
            }
        }
        //filePath = tempFilePath;
    }

    private static void GenerateHeaderContent(HeaderPart part, HtmlDocument htmlDocument)
    {
        Header header = new Header();

        foreach (HtmlNode rowNode in htmlDocument.DocumentNode.SelectNodes("//div[@class='table-row']"))
        {
            //Table table = GenerateTableFromRowNode(rowNode);
            Table table = GenerateTableFromRowNode1(rowNode);
            header.AppendChild(table);
        }

        part.Header = header;
        part.Header.Save();
    }
    private static void GenerateFooterContent(FooterPart part, HtmlDocument htmlDocument)
    {
        Footer footer = new Footer();

        foreach (HtmlNode rowNode in htmlDocument.DocumentNode.SelectNodes("//div[@class='table-row']"))
        {
            //Table table = GenerateTableFromRowNode(rowNode);
            Table table = GenerateTableFromRowNode1(rowNode);
            footer.AppendChild(table);
        }

        part.Footer = footer;
        part.Footer.Save();
    }
    private static Table GenerateTableFromRowNode1(HtmlNode rowNode)
    {
        Table table = new Table();
        TableRow tableRow = new TableRow();
        bool isLabel = true;

        HtmlNodeCollection cellNodes = rowNode.SelectNodes(".//div[@class='table-cell label-cell'] | .//div[@class='table-cell value-cell']");

        if (cellNodes != null)
        {
            // Define table border properties
            TableProperties tableProperties = new TableProperties(
                new TableBorders(
                    new TopBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" },
                    new BottomBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" },
                    new LeftBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" },
                    new RightBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" },
                    new InsideHorizontalBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" },
                    new InsideVerticalBorder() { Val = BorderValues.Single, Size = 2, Space = 0, Color = "000000" }
                ),
                new TableWidth() { Type = TableWidthUnitValues.Pct, Width = "100%" } // Set table width to 100%
            );
            table.AppendChild(tableProperties);
            // Calculate the number of cells per row (label and value)
            int cellsPerRow = cellNodes.Count / 2;
            foreach (HtmlNode cellNode in cellNodes)
            {
                TableCell tableCell = new TableCell();

                TableCellProperties cellProperties = new TableCellProperties();
                cellProperties.AppendChild(new TableCellWidth() { Type = TableWidthUnitValues.Auto, Width = cellsPerRow > 0 ? (100 / cellsPerRow).ToString() : "50%" }); // Adjust width as needed
                cellProperties.AppendChild(new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center });
                cellProperties.AppendChild(new DocumentFormat.OpenXml.Wordprocessing.Shading() { Val = ShadingPatternValues.Clear, Color = "auto" }); // Adjust fill color as needed
                cellProperties.AppendChild(new TableCellBorders(new BottomBorder(), new LeftBorder(), new RightBorder(), new TopBorder()));

                // Set bold text for label cell
                if (isLabel)
                {
                    Run run = new Run(new Text(cellNode.InnerText));
                    run.RunProperties = new RunProperties(new Bold());
                    DocumentFormat.OpenXml.Drawing.Paragraph paragraph = new DocumentFormat.OpenXml.Drawing.Paragraph(run);
                    tableCell.AppendChild(cellProperties);
                    tableCell.AppendChild(paragraph);
                }
                else
                {
                    tableCell.AppendChild(new DocumentFormat.OpenXml.Drawing.Paragraph(new Run(new Text(cellNode.InnerText))));
                }

                tableRow.AppendChild(tableCell);
                isLabel = !isLabel;
            }

            table.AppendChild(tableRow);
        }

        return table;
    }




    //private static Table GenerateTableFromRowNode(HtmlNode rowNode)
    //{
    //    Table table = new Table();
    //    HtmlNodeCollection cellNodes = rowNode.SelectNodes(".//div[@class='table-cell label-cell']");

    //    if (cellNodes != null)
    //    {
    //        TableRow tableRow = new TableRow();

    //        foreach (HtmlNode cellNode in cellNodes)
    //        {
    //            TableCell tableCell = new TableCell(new DocumentFormat.OpenXml.Wordprocessing.Paragraph(new Run(new Text(cellNode.InnerText))));
    //            tableRow.AppendChild(tableCell);
    //        }

    //        table.AppendChild(tableRow);
    //    }
    //    HtmlNodeCollection cellNodes1 = rowNode.SelectNodes(".//div[@class='table-cell value-cell']");

    //    if (cellNodes1 != null)
    //    {
    //        TableRow tableRow = new TableRow();

    //        foreach (HtmlNode cellNode in cellNodes1)
    //        {
    //            TableCell tableCell = new TableCell(new DocumentFormat.OpenXml.Wordprocessing.Paragraph(new Run(new Text(cellNode.InnerText))));
    //            tableRow.AppendChild(tableCell);
    //        }

    //        table.AppendChild(tableRow);
    //    }

    //    return table;
    //}
    private static Table GenerateTableFromRowNode(HtmlNode rowNode)
    {
        Table table = new Table();
        TableRow tableRow = new TableRow();

        HtmlNodeCollection cellNodes = rowNode.SelectNodes(".//div[@class='table-cell label-cell'] | .//div[@class='table-cell value-cell']");

        if (cellNodes != null)
        {
            foreach (HtmlNode cellNode in cellNodes)
            {
                TableCell tableCell = new TableCell();
                if (cellNode.Attributes["class"] != null)
                {
                    string cellClass = cellNode.Attributes["class"].Value;
                    TableCellProperties cellProperties = new TableCellProperties();
                    if (cellClass.Contains("label-cell"))
                    {
                        //TableCell tableCell1 = ApplyCellStyle(cellNode.Attributes["class"].Value, cellNode.InnerText);
                        // Apply style for label cells
                        cellProperties.AppendChild(new TableCellWidth() { Type = TableWidthUnitValues.Auto, Width = "800" }); // Adjust width as needed
                        cellProperties.AppendChild(new TableCellBorders(new BottomBorder(), new LeftBorder(), new RightBorder(), new TopBorder()));
                        //cellProperties.AppendChild(new DocumentFormat.OpenXml.Wordprocessing.Shading() { Val = ShadingPatternValues.Clear, Color = "auto", Fill = "E5E5E5" }); // Adjust fill color as needed
                        //cellProperties.AppendChild(new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center });

                        // Add spacing between cells
                        TableCellMargin cellMargin = new TableCellMargin(new TableCellLeftMargin() { Width = 800 }, new TableCellRightMargin() { Width = 800 });
                        cellProperties.Append(cellMargin);

                        tableCell.AppendChild(cellProperties);

                        DocumentFormat.OpenXml.Drawing.Paragraph paragraph = new DocumentFormat.OpenXml.Drawing.Paragraph();
                        Run run = new Run(new Text(cellNode.InnerText));
                        paragraph.Append(run);
                        tableCell.AppendChild(paragraph);
                    }
                    else if (cellClass.Contains("value-cell"))
                    {
                        // Apply style for value cells
                        cellProperties.AppendChild(new TableCellWidth() { Type = TableWidthUnitValues.Auto, Width = "800" }); // Adjust width as needed
                        cellProperties.AppendChild(new TableCellBorders(new BottomBorder(), new LeftBorder(), new RightBorder(), new TopBorder()));
                        //cellProperties.AppendChild(new DocumentFormat.OpenXml.Wordprocessing.Shading() { Val = ShadingPatternValues.Clear, Color = "auto", Fill = "FFFFFF" }); // Adjust fill color as needed
                        //cellProperties.AppendChild(new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center });
                        cellProperties.AppendChild(new Justification() { Val = JustificationValues.Right });

                        // Add spacing between cells
                        TableCellMargin cellMargin = new TableCellMargin(new TableCellLeftMargin() { Width = 800 }, new TableCellRightMargin() { Width = 800 });
                        cellProperties.Append(cellMargin);

                        tableCell.AppendChild(cellProperties);

                        DocumentFormat.OpenXml.Drawing.Paragraph paragraph = new DocumentFormat.OpenXml.Drawing.Paragraph();
                        Run run = new Run(new Text(cellNode.InnerText));
                        paragraph.Append(run);
                        tableCell.AppendChild(paragraph);
                    }
                }
                //TableCell tableCell = new TableCell(new DocumentFormat.OpenXml.Wordprocessing.Paragraph(new Run(new Text(cellNode.InnerText))));
                tableRow.AppendChild(tableCell);

                if (tableRow.ChildElements.Count == 2)
                {
                    // Add the completed row to the table
                    table.AppendChild(tableRow);

                    // Start a new row for the next pair of label and value cells
                    tableRow = new TableRow();
                }
            }

            // Check if there's an incomplete row and add it to the table
            if (tableRow.ChildElements.Count > 0)
            {
                table.AppendChild(tableRow);
            }
        }

        return table;
    }
    private static TableCell ApplyCellStyle(string className, string text)
    {
        TableCell tableCell = new TableCell();

        switch (className)
        {
            case "label-cell":
                // Apply label cell style
                tableCell.AppendChild(new TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Dxa, Width = "200" }));
                // ... other styling properties ...
                break;

            case "value-cell":
                // Apply value cell style
                tableCell.AppendChild(new TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Dxa, Width = "200" }));
                // ... other styling properties ...
                break;

            // Add more cases for other classes as needed

            default:
                // Apply default style
                tableCell.AppendChild(new TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Dxa, Width = "200" }));
                // ... other default styling properties ...
                break;
        }

        // Add cell content
        tableCell.AppendChild(new DocumentFormat.OpenXml.Drawing.Paragraph(new Run(new Text(text))));

        return tableCell;
    }



    private static DocumentFormat.OpenXml.Drawing.Paragraph CreateHtmlParagraph(string htmlContent)
    {
        DocumentFormat.OpenXml.Drawing.Paragraph paragraph = new DocumentFormat.OpenXml.Drawing.Paragraph();

        // Split the HTML content into lines and create runs for each line
        string[] lines = htmlContent.Split('\n');
        foreach (string line in lines)
        {
            Run run = new Run();
            Text text = new Text(line.Trim());
            run.Append(text);
            paragraph.Append(run);
        }

        return paragraph;
    }
    private static List<OpenXmlElement> ParseHtmlToElements(string htmlContent)
    {
        List<OpenXmlElement> elements = new List<OpenXmlElement>();

        HtmlAgilityPack.HtmlDocument htmlDocument = new HtmlAgilityPack.HtmlDocument();
        htmlDocument.LoadHtml(htmlContent);

        foreach (HtmlAgilityPack.HtmlNode node in htmlDocument.DocumentNode.ChildNodes)
        {
            if (node.NodeType == HtmlAgilityPack.HtmlNodeType.Element)
            {
                OpenXmlElement element = CreateElementFromHtmlNode(node);
                if (element != null)
                {
                    elements.Add(element);
                }
            }
        }

        return elements;
    }

    private static OpenXmlElement CreateElementFromHtmlNode(HtmlAgilityPack.HtmlNode node)
    {
        // Map HTML element names to OpenXml elements
        Dictionary<string, Type> elementMappings = new Dictionary<string, Type>
    {
        { "div", typeof(DocumentFormat.OpenXml.Wordprocessing.Paragraph) },
        { "span", typeof(DocumentFormat.OpenXml.Wordprocessing.Run) },
        // Add more mappings as needed
    };

        if (elementMappings.ContainsKey(node.Name))
        {
            Type elementType = elementMappings[node.Name];
            OpenXmlElement element = Activator.CreateInstance(elementType) as OpenXmlElement;

            // Process attributes and child nodes as needed
            // For example, handle CSS classes and other attributes

            // Recursively add child nodes
            foreach (HtmlAgilityPack.HtmlNode childNode in node.ChildNodes)
            {
                OpenXmlElement childElement = CreateElementFromHtmlNode(childNode);
                if (childElement != null)
                {
                    element.Append(childElement);
                }
            }

            return element;
        }

        return null;
    }
    private static Table ConvertHtmlTableToWordTable1(string htmlTable)
    {
        HtmlDocument htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(htmlTable);

        Table wordTable = new Table();
        TableProperties tableProperties = new TableProperties(
            new TableJustification() { Val = TableRowAlignmentValues.Center },
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
                        wordCell.Append(new DocumentFormat.OpenXml.Wordprocessing.Paragraph(new Run(new Text(cell.InnerText))));

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

    public static string PrepareHeaderdiv(DocumentTemplateConfiguration Template)
    {
        string table = string.Empty;
        StringBuilder tableHtml = new StringBuilder();
        // Add CSS styles
        tableHtml.Append("<style>");
        tableHtml.Append(".table-container { display: table; width: 100%; border-collapse: collapse; }");
        tableHtml.Append(".table-row { display: table-row; }");
        tableHtml.Append(".table-cell { display: table-cell; padding: 1px;}");
        tableHtml.Append(".label-cell { text-align: left; font-weight: bold; width: 50px; }");
        tableHtml.Append(".value-cell { text-align: center; width: 50px; }");
        tableHtml.Append("</style>");
        tableHtml.Append("<div class=\"table-container\">");

        if (Template.titleTable != null)
        {
            foreach (List<HeaderTable> row in Template.titleTable)
            {
                tableHtml.Append("<div class=\"table-row\">");
                foreach (HeaderTable item in row)
                {
                    tableHtml.Append("<div class=\"table-cell ");

                    if (item.selectedOption == 1)
                    {
                        tableHtml.Append("label-cell");
                    }
                    tableHtml.Append("\">");
                    tableHtml.Append(item.inputValue);
                    tableHtml.Append("</div>");
                }
                tableHtml.Append("</div>");
            }
        }


        foreach (List<HeaderTable> row in Template.headerTable)
        {
            tableHtml.Append("<div class=\"table-row\">");

            foreach (HeaderTable item in row)
            {


                tableHtml.Append("<div class=\"table-cell ");

                if (item.selectedOption == 1)
                {
                    tableHtml.Append("label-cell");
                }
                else
                {
                    tableHtml.Append("value-cell");
                }

                tableHtml.Append("\">");
                if (item.selectedOption == 1)
                    tableHtml.Append(item.inputValue + " " + ":");
                else
                    tableHtml.Append(item.inputValue);
                tableHtml.Append("</div>");

                //IsLabel = !IsLabel; // Toggle between label and value for each cell
            }

            tableHtml.Append("</div>");

        }
        tableHtml.Append("</div>");
        table = tableHtml.ToString();
        return table;

    }

    public static string PrepareFooterdiv(DocumentTemplateConfiguration Template)
    {
        string table = string.Empty;
        StringBuilder tableHtml = new StringBuilder();
        // Add CSS styles
        tableHtml.Append("<style>");
        tableHtml.Append(".table-container { display: table; width: 100%; border-collapse: collapse; }");
        tableHtml.Append(".table-row { display: table-row; }");
        tableHtml.Append(".table-cell { display: table-cell; padding: 1px;}");
        tableHtml.Append(".label-cell { text-align: left; font-weight: bold; width: 50px; }");
        tableHtml.Append(".value-cell { text-align: center; width: 50px; }");
        tableHtml.Append("</style>");
        tableHtml.Append("<div class=\"table-container\">");

        foreach (List<FooterTable> row in Template.footerTable)
        {
            tableHtml.Append("<div class=\"table-row\">");

            foreach (FooterTable item in row)
            {


                tableHtml.Append("<div class=\"table-cell ");

                if (item.selectedOption == 1)
                {
                    tableHtml.Append("label-cell");
                }
                else
                {
                    tableHtml.Append("value-cell");
                }

                tableHtml.Append("\">");
                if (item.selectedOption == 1)
                    tableHtml.Append(item.inputValue + " " + ":");
                else
                    tableHtml.Append(item.inputValue);
                tableHtml.Append("</div>");

                //IsLabel = !IsLabel; // Toggle between label and value for each cell
            }

            tableHtml.Append("</div>");

        }
        tableHtml.Append("</div>");
        table = tableHtml.ToString();
        return table;

    }

    public static string PrepareHtmlTable(int p_rows, int p_columns, DataTable dt_table = null)
    {
        string table = string.Empty;
        StringBuilder tableHtml = new StringBuilder();
        tableHtml.Append("<table border='1'>");
        // Generate table headers
        tableHtml.Append("<tr>");
        List<string> headers = new List<string>();
        List<string> data = new List<string>();
        int rows = p_rows;
        int columns = p_columns;

        if (dt_table != null)
        {
            foreach (DataColumn column in dt_table.Columns)
            {
                headers.Add(column.ColumnName);
                //Console.WriteLine(column.ColumnName);
            }
        }
        else
        {
            for (int i = 0; i < columns; i++)
            {
                headers.Add("Column" + i);
            }
        }
        foreach (string header in headers)
        {
            tableHtml.Append("<th>").Append(header).Append("</th>");
        }
        tableHtml.Append("</tr>");

        // Generate table rows
        if (dt_table != null)
        {
            foreach (DataRow item in dt_table.Rows)
            {
                tableHtml.Append("<tr>");
                foreach (string head in headers)
                {
                    tableHtml.Append("<td>").Append(item[head].ToString()).Append("</td>");
                }
                tableHtml.Append("</tr>");
            }
        }
        else
        {
            for (int i = 0; i < rows; i++)
            {
                tableHtml.Append("<tr>");
                for (int j = 0; j < columns; j++)
                {
                    tableHtml.Append("<td>").Append("Row" + 1 + "-" + "column" + j).Append("</td>");
                }
                tableHtml.Append("</tr>");
            }
        }
        //tableHtml.Append("</tr>");

        tableHtml.Append("</table>");
        table = tableHtml.ToString();
        return table;
    }

    public static string GenerateUniqueFileName()
    {
        // Generate a unique file name using the current date and time
        string fileName = "ConvertedFile_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".pdf";
        return fileName;
    }
    public static string GetTextFromBody(OpenXmlElement element)
    {
        return element?.InnerText ?? string.Empty;
    }

    public static void generatePDF(string inputFilePath, string outputFilePath)
    {
        // Load the input DOCX document using Aspose.Words
        Aspose.Words.Document doc = new Aspose.Words.Document(inputFilePath);

        // Save the document as PDF using Aspose.Words
        doc.Save(outputFilePath, SaveFormat.Pdf);
    }
}