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

internal class HeaderFooter
{
    public static void getData(string htmlheaderTable, string htmlfooterTable, string outputPath)
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
            ConvertHtmlTableToWordTableInHeader1(outputPath, htmlheaderTable, htmlfooterTable);
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

    public static void ConvertHtmlTableToWordTableInHeader1(string filePath, string htmlTable, string htmlfooterTable)
    {
        using (WordprocessingDocument document = WordprocessingDocument.Open(filePath, true))
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
            //MainDocumentPart mainPart = document.AddMainDocumentPart();
            //new Document(new Body()).Save(mainPart);

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


    public static string PrepareHtmlTable(int p_rows, int p_columns, DocumentPreparation documentPreparation)
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
        for (int i = 0; i < columns; i++)
        {
            headers.Add("Column" + i);
        }
        foreach (string header in headers)
        {
            tableHtml.Append("<th>").Append(header).Append("</th>");
        }
        tableHtml.Append("</tr>");

        // Generate table rows


        for (int i = 0; i < rows; i++)
        {
            tableHtml.Append("<tr>");
            for (int j = 0; j < columns; j++)
            {
                tableHtml.Append("<td>").Append("Row" + 1 + "-" + "column" + j).Append("</td>");
            }
            tableHtml.Append("</tr>");
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