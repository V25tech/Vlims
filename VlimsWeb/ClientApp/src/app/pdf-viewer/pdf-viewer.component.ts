import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfBytes: Uint8Array;
  safePdfDataUrl: SafeResourceUrl;
  //data: string = 'data:application/pdf;base64,<base64-encoded-data>';
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  constructor(private sanitizer: DomSanitizer,private commonsvc: CommonService) {}

  ngOnInit(): void {
    debugger
    this.pdfBytes=this.commonsvc.pdfBytes;
    if (this.pdfBytes) {
      console.log("safePdfDataUrl"+"-"+this.pdfBytes);

      // Convert PDF bytes to Blob
      //const pdfBlob = new Blob([this.pdfBytes], { type: 'application/pdf' });
      // Handle the updated pdfBytes here, e.g., update the displayed PDF
      // Convert PDF bytes to Base64 data URL
      // const base64Data = btoa(String.fromCharCode(...this.pdfBytes));
      // const pdfDataUrl = `data:application/pdf;base64,${base64Data}`;
      // this.safePdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data);

      const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;

      // Mark the data URL as safe
      // Create a Blob URL from the Blob
      // this.safePdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   URL.createObjectURL(pdfBlob));
      //   this.data = `data:application/pdf;base64,${pdfDataUrl}`;
      console.log("safePdfDataUrl"+"-"+this.safePdfDataUrl);
      //this.getSafePdfUrl();
    }
  }
  // Function to convert base64 to Blob
  private b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
