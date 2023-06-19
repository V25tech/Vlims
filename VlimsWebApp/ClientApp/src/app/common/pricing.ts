export class Pricing {
  public StatePricing = new Policy();
  public RiskGroups: RiskGroup[] = [];
}
export class Policy {
  public HeaderName: string = '';
  public Premium: string = '';
  public AdditionalDetails: AdditionalDetails[] = [];
  public CoverageDetails: CoverageDetails[] = [];
}
export class RiskGroup {
  public Type: string = '';
  public Premium: string = '';
  public RiskDetails: RiskDetails[] = [];
}
export class RiskDetails {
  public HeaderName: string = '';
  public Premium: string = '';
  public RiskGroups: RiskGroup[] = [];
  public AdditionalDetails: AdditionalDetails[] = [];
  public CoverageDetails: CoverageDetails[] = [];
}
export class AdditionalDetails {
  public Name: string = '';
  public Value: string = '';
}
export class CoverageDetails {
  public HeaderName: string = '';
  public Premium: string = '';
}


