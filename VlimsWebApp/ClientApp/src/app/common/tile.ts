export class Tile {
  public DisplayName: string = "";
  public Url: string = "";
  public LogoUrl: string = null;
  public ImageBinaryData: any = null
  constructor(name: string, url: string, logourl: string, imagedata: any) {
    this.DisplayName = name;
    this.ImageBinaryData = imagedata;
    this.LogoUrl = logourl;
    this.Url = url;
  }
}
