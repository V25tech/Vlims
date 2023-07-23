// blob-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'blobUrl' })
export class BlobUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(blobUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }
}
