export class FormDetails {
    public Id: string = "";
    public UId: string = "";
    public CorrelationId: string = "";
    public FormId: string = "";
    public Name: string = "";
    public FormName: string = "";
    public IsAttached : boolean = false;
    public Mode: Mode;
    public Fields: Field[] = [];
    public Coverages: Coverage[] = [];
    public Schedules: Section[] = [];
    public Forms: FormDetails[] = [];
    public Type: EntityType;
    
}

export class Coverage {
    public Id: string = "";
    public Name: string = "";
    public DisplayName: string = "";
    public IsMandatory: boolean = false;
    public IsVisible: boolean = false;
    public IsEnabled: boolean = false;
    public IsSelected: boolean = false;
    public IsAdded: boolean = false;
    public IsDeleted: boolean = false;
    public IsActionable: boolean = false;
    public ProductChoicesIndicator: boolean = false;
    public UIRuleIndicator: boolean = false;
    public Fields: Field[] = [];
    public RuleType: string = "";
    public HelpText: string = "";
    public SequenceNumber: number = null;
}

export class Field {
    public Id: string = "";
    public Name: string = "";
    public DisplayName: string = "";
    public Value: any = null; // type = string
    public UserValue: any = null;
    public IsMandatory: boolean = false;
    public Type: ControlType;
    public OnChangeAction: boolean = false;
    public DataType: string = "";
    public Min: string = "";
    public Max: string = "";
    public IsEnabled: boolean = false;
    public IsVisible: boolean = false;
    public MaxLength: number = null;
    public HelpText: string = "";
    public Format: string = "";
    public RuleType: string = "";
    public ProductChoicesIndicator: boolean = false;
    public UIRuleIndicator: boolean = false;
}

export enum ControlType {
    TextBox = "TextBox",
    TextArea = "TextArea",
    DateTime = "DateTime",
    DatePicker = "DatePicker",
    DropDown = "DropDown",
    CheckBox = "CheckBox",
    CheckBoxList = "CheckBoxList",
    RadioButton = "RadioButton"
}
// Schedules
export class Section {
    public Id: string = "";
    public Name: string = "";
    public Code: string = "";
    public DisplayName: string = "";
    public ScheduleData: Section[] = [];
    public Fields: Field[] = [];
    public ScheduleCoverages: Coverage[] = [];
    public ScheduleFields: Fields[] = [];
    public ScheduleItems: any[] = [];
    public Mode: Mode;
}

export enum Mode {
    Add = "Add",
    Update = "Update",
    Delete = "Delete"
}

export class EntityType {
    public RiskType: string = "";
    public DisplayName: string = "";
}

export class Fields {
    public Field: string = "";
    public Title: string = "";
}

/* Risk Filters */
// export class Risk {
//     public Id: string = "";
//     public UId: string = "";
//     public Name: string = "";
//     public Type: EntityType;
// }

/* End */