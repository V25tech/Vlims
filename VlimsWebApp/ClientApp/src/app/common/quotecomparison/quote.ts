export class Quote {
  TotalPremium: number = 0;
  IntialPremium: number = 0;
  InstallmentPremium: number = 0;
  Coverages: Array<Coverage> = [];
  Description: string = "";
  LongDescription: string = "";
  constructor() {

  }
}
class BaseCoverage {
  Id: string = "";
  Name: string = "";
  DisplayName: string = "";
  IsEnabled: boolean = true;
  IsVisible: boolean = true;
  IsMandatory: boolean = true;
  IsActionable: boolean = true;
}

class Coverage extends BaseCoverage {
  IsSelected: boolean = false;
  HelpText: string = "";
  Attributes: any = [];
}


class Attribute extends BaseCoverage {
  UserValue: any;
  Values: Array<AttributeOption>;
  IsDTxInvalid: boolean = true;
}

class AttributeOption {
  value: any;
  text: string;
}
