import { Component, Input } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'exp-tiles',
  templateUrl: './tiles.component.html'
})
export class TilesComponent {
  @Input('source') data: Array<Tile>;
  // getimg(tileobj: Tile) {
  //   return "url(data:image/png;base64," + tileobj.ImageBinaryData + ")";
  // }
}
