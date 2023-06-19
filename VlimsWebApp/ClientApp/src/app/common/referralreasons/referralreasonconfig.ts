export class ReferralReasonConfig {
  public OfferId: any;
  public UriParameters: any;
  public HttpHeaders: any;

  constructor() {
    this.HttpHeaders = {};
    this.UriParameters = new UriParameter();
  }
}

export class ReferralReasonUrl {
  public UpdateUrl: string;
  public GetProductsUrl: string;
  constructor(updateUrl: string, prodUrl: string) {
    this.GetProductsUrl = prodUrl;
    this.UpdateUrl = updateUrl;
  }
}

export class UriParameter {
  public Key: string;
  public Value: string;
}
