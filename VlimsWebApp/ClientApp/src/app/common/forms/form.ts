import { FormDetails, Field, Coverage } from '../formriskfilters/formdetails';

export class Form {
    public Id: string = "";
    public Name: string = "";
    public DisplayName: string = "";
    public Number: string = "";
    public Type: FormType;
    public IsSelected: boolean = false;
    public State: string[] = [];
    public RiskType: EntityType[] = [];
    public RequireAdditionalDetails: boolean = false;
    public IsSubmit: boolean = false;
    public IsAdded: boolean = false;
    public IsDeleted: boolean = false;
    public IsPolicyForm: boolean = false;
    public EditionDate: string = "";
    public SequenceNumber: number = null;
    public PremiumBearing: string = "";
    public RiskIds: string[] = [];
}

export enum FormType {
    Mandatory = "Mandatory",
    Conditional = "Conditional",
    Optional = "Optional"
}

export class EntityType {
    public RiskType: string = "";
    public DisplayName: string = "";
}

export class UrlConfig {
    public GetFormsUrl: string;
    public GetRiskDetailsUrl: string;
    public GetFormDetailsUrl: string;
    public ExecuteFieldsUrl: string;
    public AddScheduleItemUrl: string;
    public CancelScheduleItemUrl: string;
    public EditScheduleItemUrl: string;
    public CancelEditScheduleItemUrl: string;
    public SaveFormDetailsUrl: string;
    public ResetFormDetailsUrl: string;
    public RollbackUrl: string;
    
    constructor(formsUrl: string, risksUrl: string, formDetailsUrl: string, fieldsUrl: string, addSchUrl: string, cancelSchUrl: string, editSchUrl: string, cancelEditSchUrl: string, saveFormDtlsUrl: string, resetFormDtlsUrl: string, rollbackUrl: string) {
        this.GetFormsUrl = formsUrl;
        this.GetRiskDetailsUrl = risksUrl;
        this.GetFormDetailsUrl = formDetailsUrl;
        this.ExecuteFieldsUrl = fieldsUrl;
        this.AddScheduleItemUrl = addSchUrl;
        this.CancelScheduleItemUrl = cancelSchUrl;
        this.EditScheduleItemUrl = editSchUrl;
        this.CancelEditScheduleItemUrl = cancelEditSchUrl;
        this.SaveFormDetailsUrl = saveFormDtlsUrl;
        this.ResetFormDetailsUrl = resetFormDtlsUrl;
        this.RollbackUrl = rollbackUrl;
    }
}

export class ParametersConfig {
    public UriParameters: any;
    public HttpHeaders: any;
    public PageSize: 10;
    public CurrencyFormat: string = "1";
    public DecimalFormat: string = "1";

    constructor() {
        this.HttpHeaders = {};
        this.UriParameters = new UriParameter();
    }
}

export class UriParameter {
    public Key: string;
    public Value: string;
}

/* Get UIFormDetais */

export class UIFormDetails {
    public FormData: FormDetails[] = [];
    public Forms: Form[] = [];
}

export class Details {
    public Details: Field[] = [];
    public Coverages: Coverage[] = [];
    public Forms: Form[] = [];
}


/* End */