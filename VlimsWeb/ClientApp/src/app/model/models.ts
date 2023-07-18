//import { BomTree, BusinessObject } from "../builder.model";

export class action {
  public businessObject: any = [];
  public Decision: string = "";
  public field: string = "";
}
export class Attachment {
  public FactorGroupId: string = "";
  public FactorGroupName: string = "";
  public FactorGroupDisplayName: string = "";
  public Id: string = "";
  public Type: string = "";
  public Cardinality: number = 0;
  public Is_Checked: boolean = false;
  public ParentName: string = "";
}
export class Attribute_Type {
  public Type: string = "";
  public Attributes: factorInfo[] = [];
}
export class Attributes {
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Type: string = "Derived";
  public DataType: string = "String";
  public MinValue: string = "";
  public MaxValue: string = "";
  public IsMandatory: string = "No";
  public IsJurisdictionState: string = "No";
  public Id: string = "";
  public DefaultValue: string = "";
  public IsDimension: string = "No";
  public DimensionName: string = "";
  public AttributeType: string = "";
  public ApplicabilityType: string = "Mandatory";
  public SequenceNumber: number = 0;
  public uid: string = "";
  public IsDeleted: boolean = false;
  public IsChecked: string = "false";
  public IsVisible: string = "false";
  public CharacteristicType: string = "";
  public IsCarrier: string = "No";
}
// export class AttributeTypes {
//   public Name: string = "";
//   public DisplayName: string = "";
//   public Type: string = "";
// }
export class AttributeType {
  Name: string;
  DisplayName: string;
  Type: string;
}

export class attributeTypes {
  attributeTypes: AttributeType[];
}
export class BasicDetails {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public isActive: boolean = false;
}

export class BasicInfo {
  public Id: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public DataId: string = "";
  public TableType: string = "";
  public BureauReference: string = "";
  public Type: string = "";
  public Code: string = "";
  public ExternalLookupName:string = "";
  public IsExternalLookup:boolean = true;
  public DeltaLookup: string = "";
  public DeltaReturn: string = "";
  public Minimum: string = "";
  public Maximum: string = "";
  public UnitValue: string = "";
  public DefaultValue : string = "";
}
export class Book {
  public Id: number = 0;
  public ScenarioId: number = 0;
  public ScenarioVersionId: number = 0;
  public Name: string = "";
  public TemplateId: number = 0;
  public ProjectType: number = 2;
  public CreatedOn = new Date();
  public Status: string = "";
  public CreatedBy: string = "";
  public ExecutionStatus: string = "";
}
export class BuilderContextModel {
  public Id: string = "";
  public FactorGroupName: string = "";
}
export class businessObject {
  public FactorGroup = new factorGroupInfo();
  public secondaryContext: boolean = false;
}
export class BusinessTerm {
  public factorID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public DataType: string = "";
  public SourceType: string = "";
  public defaultValue: string = "";
  public FieldType: string = "";
  public valueType: string = "";
  public Value: string = "";
}
export class Cardinality {
  public Single: number = 0;
  public Multiple: number = 1;
}
export class CategoryTypes {
  public Name: string = "";
  public isActive: boolean = false;
}
export class PublishValidation {
  public EntityName: string = "";
  public Type: string = "";
  public WorkspaceName: string = "";
  public ChangeSet: string = "";
}
export class ChangeDetailsModel {
  public Deff_Id: string = "";
  public EntityName: string = "";
  public DisplayName: string = "";
  public ChangeType: string = "";
  public TableType: string = "";
  public ChangeSetId: string = "";
  public Context_Message: string = "";
  public Category_ID: number = 0;
  public IS_CHANGE_MAPPED: string = "";
  public WorkspaceId: string = "";
  public Decision: string = "";
  public CrudIndicator: string = "";
  public Is_Checked: boolean = false;
  public Plv_Id: string = "";
  public UserName: string = "";
  public WorkSpaceDisplayName: string = "";
  public ChangeEventDisplayName: string = "";
  public Is_Defination_Invalid: boolean = false;
  public ErrorMessage: string = "";
  public MODIFIED_BY: string = "";
  public MODIFIED_DATE = new Date();
  public ParentType: string = "";
  public IS_PREVIOUSLY_ADOPTED: number = 0;
  public Message: string = "";
}

export class ScenarioDetails {
  public QuoteId: string = "";
  public ErrorMessage: string = "";
}

export class EditApprovePlanInfo {
  public PlanVersionId: string = "";
  public PlanName: string = "";
  public old_Comp_Id: string = "";
  public Old_Ws_Id: string = "";
  public New_Comp_Id: string = "";
  public New_Ws_Id: string = "";
  public Status: string = "";
  public Id_ctg: number = 0;
  public VersionNumber: string = "";
  public EntityName: string = "";
  public Type: string = "";
  public PlanId: string = "";
  public InvalidDefination: boolean = false;
  public EntityDisplayName: string = "";
  public WorkspaceDisplayName: string = "";
  public ChangeEventDisplayName: string = "";
  public OLD_CST_ID: string = "";
  public ErrorMsg: string = "";
  public CType: string = "";

}
export class PlanDetails {
  public DisplayName: string = "";
  public PlanType: string = "";
  public Version: number = 0;
  public PlanName: string = "";
  public PlanId: string = "";
  public SelectedVersions: any = [];
  public SelectPlanVersion: string = "";
  public PlanVersions: PlvInfo[] = [];
  public SelectedAdoption: string = "";
  //public SelectedEditApproveVersion:EditApprovePlanInfo[]=[];
  public EditapprovePlans: EditApprovePlanInfo[] = [];
  public SelectedEditApprovePlanVersion: EditApprovePlanInfo[] = [];
  //public SelectedEditApprovePlanVersion:string="";
}
export class EditApproveMapping {
  public mappings: EditApprovePlanInfo[] = [];
  public Id_brq: number = 0;
  public Id_cst: string = "";
  public EditApproveType: string = "";
}
export class PlvInfo {
  public Plv_id: string = "";
  public VersionNumber: string = "";
  public Version: number = 0;
}
export class Change {
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
  public SelectedPlan: string = "";
  public SelectedVersion: string = "";
  public SelectedAdopt: string = "";
  public Plans: PlanDetails[] = [];
  public lstEditApprovePlanInfo: any = [];
}
export class ChangeDetailsModelMessages {
  public Deff_Id: string = "";
  public EntityName: string = "";
  public DisplayName: string = "";
  public ChangeType: string = "";
  public TableType: string = "";
  public ChangeSetId: string = "";
  public Context_Message: string = "";
  public Category_ID: number = 0;
  public Is_Checked: boolean = false;
  public IS_CHANGE_MAPPED: string = "";
  public WorkspaceId: string = "";
  public Decision: string = "";
  public CrudIndicator: string = "";
  public Plv_Id: string = "";
  public UserName: string = "";
  public WorkSpaceName: string = "";
  public WorkSpaceDisplayName: string = "";
  public ChangeEventName: string = "";
  public ChangeEventDisplayName: string = "";
  public Is_valid: boolean = false;
}
export class ChangeEventChanges {
  public RateChanges: ChangeDetailsModel[] = [];
  public RuleChanges: ChangeDetailsModel[] = [];
  public FormChanges: ChangeDetailsModel[] = [];
}
export class ChangeSet {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public WorkSpaceId: string = "";
  public Changes: ChangeEventChanges[] = [];
  public isActive: boolean = false;
}
export class ChangeSetModel {
  public ChangesetId: string = "";
  public ChangesetName: string = "";
  public DisplayName: string = "";
  public FillingID: string = "";
  public Description: string = "";
  public Mode: string = "";
  public isPricer: string = "";
  public ChangeEventChanges: ChangeDetailsModel[] = [];
  public WorkspaceId: string = "";
  public ReferenceNumber: string = "";
  public SelectedChanges: ChangeDetailsModel[] = [];
  public isActive: boolean = false;
  public isDeleted: boolean = false;
}
export class columnInfo {
  public name: string = "";
  public value: string = "";
}
export class ColumnsInfo {
  public Name: string = "";
  public Result: string = "";
  public ColumnType: string = "";
  public DataType: string = "";
  public ValueType: string = "";
}
export class CommonWorkSpaceData {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public disableItem: boolean = false;
}
export class condition {
  public field: string = "";
  public businessObject: any = [];
  public conditionalOperator: string = "";
  public operatorField: string = "";
  public operatorFieldSpecified: boolean = false;
  public value: string = "";
  public dataType: string = "";
  public _operator: string = "";
}
export class conditionSetInfo {
  public condition: condition[] = [];
  public action: action[] = [];
  public Status: string = "";
}
export class DecisionDriveDetails {
  public SelectedType: string = "";
  public SelectedEntityType: string = "";
  public SelectedEntity: string = "";
  public SelectedParent: string = "";
  public SelectedAttributeTpe: string = "";
  public SelectedAttribute: string = "";
  public SelectedWorkspace: string = "";
  public SelectedChangeset: string = "";
  public lstEntity: Attachment[] = [];
  public lstParent_Path: ENTITY_PATH[] = [];
  public lstAttributeTypes: Attribute_Type[] = [];
  public lstAttributes: factorInfo[] = [];
  public lstEntityParentPaths: PathEntity[] = [];
  public lstWorkspaces: DropdownHelper[] = [];
  public lstChangeEvents: DropdownHelper[] = [];
  public SelectedEntityobj: Attachment[] = [];
  public SelectedParentobj: ENTITY_PATH[] = [];
  public SelectedAttributeobj: factorInfo[] = [];
  public SelectedOperator: string = "";
  public IsTypeEntity: boolean = true;
}
export class DefinitionContext {
  public RuleDefinition = new RuleDefinition();
  public Ctx = new WorkspaceContext();
  public ProductRuleDef = new PlanFormulaDefinitionInfo();
}
export class Dimension {
  public Name: string = "";
  public DisplayName: string = "";
  public Ws_DataId: string = "";
  public Plan_DataId: string = "";
}
export class DomainCategory {
  public Name: string = "";
  public DisplayName: string = "";
}
export class Ratescategory {
  public Name: string = "";
  public DisplayName: string = "";
}
export class DomainColumn {
  public ColumnName: string = "";
  public FactorName: string = "";
  public FactorId: string = "";
  public DataType: string = "";
  public FactorGroupName: string = "";
  public EntityType: string = "";
  public FactorType: string = "";
  public FactorPath: string = "";
  public InternalName: string = "";
  public Is_Return_Factor: boolean = false;
}
export class DomainColumnInfo {
  public DomainColmnInfoList: DomainColumn[] = [];
  public MappingID: string = "00000000-0000-0000-0000-000000000000";
  public InternalName: string = "";
  public Header: string = "";
}
export class domainTable {
  public Rows: rowinfo[] = [];
}
export class DomainTableContainerModel {
  public domainTableDefinitionInfo = new DomainTableDefinitionInfo();
  public workspaceContext = new WorkspaceContext();
}
export class DomainTableDefinitionInfo {
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Id: string = "";
  public Type: string = "productoptionsfilter";
  public DomainTableType: string = "";
  public ReturnFactor: BusinessTerm[] = [];
  public LookupFactors: rateOrganizationFactor[] = [];
  public LookupTableType: string = "SingleLookup";
  public Mode: string = "New";
  public BureauReference: string = "";
  public domainColumnInfo = new DomainColumnInfo();
  public CreatedBy: string = "";
}
export class DomainTableInfo {
  public Name: string = "";
  public DisplayName: string = "";
  public domainTableType: string = "Others";
  public Description: string = "";
  public LookupFactors: rateOrganizationFactor[] = [];
  public domainTable = new domainTable();
  public ReturnFactor: BusinessTerm[] = [];
  public LookupTableType: string = "SingleLookup";
  public DomainId: string = "00000000-0000-0000-0000-000000000000";
  public DomainTableDataID: string = "00000000-0000-0000-0000-000000000000";
  public Mode: string = "New";
}
export class DomainTableMappingInfo {
  public LKPName: string = "";
  public SelectedEntityType: string = "";
  public SelectedEntity: string = "";
  public SelectedEntityParent: string = "";
  public SelectedEntityAttributeType: string = "";
  public SelectedEntityAttribute: string = "";
  public lstEntityNames: Attachment[] = [];
  public lstParents_Paths: ENTITY_PATH[] = [];
  public lstAttributeTypes: Attribute_Type[] = [];
  public lstAttributes: factorInfo[] = [];
  public lstEntityParentPaths: PathEntity[] = [];
  public isReturnFactor: boolean = false;
}

export class ProductSpecificationReportDataEntity {
  public ModelId: number = 0;
  public ModelName: string = "";
  public PlanName: string = "";
  public PlanId: string = "";
  public VersionId: any;
  public Changeset_Id: string = "";
  public Type: string = "";
  public Comments: string = "";
  public EffectiveDateOption: string = "";
  public EffectiveDateFrom = new Date();
  public EffectiveDateTo = new Date();
  public SelectedEntities: any = [];
  public SelectedEntitiesList: any = [];
  public FullReport: boolean = false;
  public Differences: boolean = false;
  public IsWorkSpace: boolean = false;
  public ChangeSetName: string = "";
}

export class DomainTableMapppings {
  public HeaderName: string = "";
  public InternalName: string = "";
  public lstDomainTableMappingsInfo: any = [];
  public isMappingSelected: boolean = false;
}
export class DropdownHelper {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
  public ParentType: string = "";
  public Status: string = "";
  public Is_Checked: boolean = false;
  public BRQ_ID: number = 0;
  public DefID: number = 0;
  public Plv_Id: string = "";
  public Ws_Id: string = "";
  public ChildId: string = "";
  public Childs: DropdownHelper[] = [];
  public BasedOn: string = "";
  public VersionNo: string = "";
}
export class DTMapping {
  public Id: string = "";
  public Name: string = "";
  public lstMappings: DTMappingData[] = [];
  public lstDTMappingsData: any = [];
}
export class DTMappingData {
  public LKPName: string = "";
  public EntityType: string = "";
  public EntityName: string = "";
  public Parent: string = "";
  public AttributeType: string = "";
  public Attribute: string = "";
}
export class DynamicColumn {
  public Name: string = "";
  public HeaderText: string = "";
  public IsSortable: boolean = false;
  public IsFilterable: boolean = false;
  public Width: number = 0;
  public Fields: Field[] = [];
  public Format: string = "";
  public FilterType: string = "";
  public IsVisible: boolean = false;
}
export class DynamicData {
  public Columns: DynamicColumn[] = [];
  public DataJson: string = "";
  public DataId: string = "";
}
export class ENTITY_PATH {
  public ParentDisplayName: string = "";
  public DisplayPath: string = "";
  public CardinalityPath: string = "";
}
export class EnvironmentDataEntity {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Host: string = "";
  public PortNumber: number;
  public EnType: string = "";
  public Status: string = "";
  public Updatedby: string = "";
  public UpdatedDate = new Date();
  public CreatedDate = new Date();
  public CreatedBy: string = "";
  //public Roleid: string = "";
  public Ishttps_Enabled: boolean = false;
  public Env_Basic_Auth_Required: boolean = false;
  public Env_Auth_Username: string = "";
  public Env_Auth_Password: string = "";
  public Category: string = "";
  public Mode: string = "";
  //public RoleData: RolesDataEntity[] = [];
  //public Roles_Status: string = "";
  public PublishGuid: string = "";
  public StoragePath: string = "";
}
export class factorGroupInfo {
  public factorGroupName: string = "";
  public type: string = "";
  public id: string = "";
  public cardinality: number = 0;
}
export class factorInfo {
  public factorName: string = "";
  public displayName: string = "";
  public id: string = "";
  public dataType: string = "";
  public complexTypeName: string = "";
  public cardinality: string = "";
}
export class scenarioFilterFactors {
  public FactorName: string = "";
  public FactorDisplayName: string = "";
  public DataType: string = "";
  public FactorValue: string[] = [];
  public SelectedVal: string[] = [];
  public FactorGroupName_Alias: string = "";
  public FactorGroupName: string = "";
}
export class Field {
  public Name: string = "";
  public DisplayName: string = "";
  public IsRequired: boolean = false;
  public ControlType: string = "";
  public IsActionable: boolean = false;
  public DataType: string = "";
  public Min: string = "";
  public Max: string = "";
  public MaxLength: number = 0;
  public IsEnabled: boolean = false;
  public IsVisible: boolean = false;
  public Format: string = "";
}
export class FreeFlowContext {}
export class GeneralInquireGridEntity {
  public Id: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public PlanName: string = "";
  public UpdatedDate = new Date();
  public UpdatedBy: string = "";
  public VersionNumber: string = "";
  public Launched: string = "";
  public PlvId: string = "";
  public EditApproveType: string = "";
  public ModelId: number = 0;
}
export class globalVariable {
  public GlobalVariable: globalVariableInfo[] = [];
  public Type: string = "";
  public lstName: any = [];
  public lstTypes: string = "";
}
export class globalVariableInfo {
  public name: string = "";
  public displayName: string = "";
  public description: string = "";
  public dataType: string = "";
  public Type: string = "";
  public ID_BLOCK_VAR: string = "";
  public IsArrayType: string = "false";
  public value: string = "";
  public blockname: string = "";
  public IsLoaded: boolean = false;
}
export class GridEntityForInitiative {
  public Id: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public CreatedDate = new Date();
  public StartDate = new Date();
  public EndDate = new Date();
  public ProductName: string = "";
  public CreatedBy: string = "";
  public Status: string = "";
  public DaysLeftToclosure: string = "";
  public PlanName: string = "";
  public UpdatedBy: string = "";
  public UpdatedDate = new Date();
}
export class InitiativesDataEntity {
  public Id_Mdl_Brq: number = 0;
  public Description: string = "";
  public CreatedBy: string = "";
  public STATUS: string = "In Progress";
  public CreatedDate = new Date();
  public StartDate = new Date();
  public EndDate = new Date();
  public Mode: string = "";
  public Implementors: InitiativeUserMapEntity[] = [];
  public Approvers: InitiativeUserMapEntity[] = [];
  public ModelDetails = new BasicDetails();
  public WorkSpaceDetails: BasicDetails[] = [];
  public BaseWorkspaceDetails: BasicDetails[] = [];
  public BasedonDetails = new BasicDetails();
  public PlanDetails = new BasicDetails();
  public MultiplanUpdateDetails: BasicDetails[] = [];
  public PlanType: string = "";
  public IsMultiPlans_Update: boolean = false;
  public Multiplan_Type: string = "";
  public Reviewers: InitiativeUserMapEntity[] = [];
  public LastModifiedBy: string = "";
  public ID_Brq: number = 0;
  public Name_Brq: string = "";
  public LastModifiedDate = new Date();
  public BasedOnPlan: string = "";
  public Edit_Approve_Type: string = "";
  public EditApprovePlans: PlanDetails[] = [];
}

export class InitiativeUserMapEntity {
  public UserName: string = "";
  public isChecked: boolean = false;
  public isEnabled: boolean = false;
  public UsrId: number = 0;
}
export class lookupFactors {
  public name: string = "";
  public dataType: string = "";
  public keyColumn: boolean = false;
  public valueType: string = "";
  public type: string = "";
  public UOMType: string = "None";
  public axis: string = "Horizontal";
  public roundMethod: string = "None";
}
export class LookuptableContainerModel {
  public lookupTableDefinitionInfo = new LookupTableDefinitionInfo();
  public workspaceContext = new WorkspaceContext();
}
export class LookupTableDefinitionInfo {
  public DisplayName: string = "";
  public Type: string = "";
  public Name: string = "";
  public Description: string = "";
  public internalName: string = "";
  public tableType: string = "";
  public Id: string = "00000000-0000-0000-0000-000000000000";
  public Mode: string = "New";
  public Code: string = "";
  public BureauReference: string = "";
  public ReturnFactor: BusinessTerm[] = [];
  public LookupFactors: rateOrganizationFactor[] = [];
  public Dimensions: BusinessTerm[] = [];
  public LookupTableType: string = "SingleLookup";
  public ExternalLookupName:string = "";
  public IsExternalLookup:boolean = false;
}
export class LookupTableInfo {
  public LookupFactors: rateOrganizationFactor[] = [];
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public defId: string = "";
  public Id: string = "";
  public RateTable = new RateTableInfo();
  public Mode: string = "";
  public ReturnFactor: BusinessTerm[] = [];
  public Dimensions: BusinessTerm[] = [];
  public LookupTableType: string = "SingleLookup";
  public roundMethod: string = "None";
  public IsDataDeleted: boolean = false;
  public ExternalTableData = new ExternalTableData();
  public ExternalLookUp: boolean = false;
  public DeltaLookup: string = "";
  public DeltaReturn: string = "";
  public Minimum: string = "";
  public Maximum: string = "";
  public UnitValue: string = "";
  public DefaultValue : string = "";
}
export class MappingDetails {
  public LKPName: string = "";
  public EntityType: string = "";
  public EntityName: string = "";
  public Parent: string = "";
  public AttributeType: string = "";
  public AttributeName: string = "";
}
export class MappingEntity {
  public Name: string = "";
  public FactorGroupId: string = "";
  public DisplayName: string = "";
  public Paths: ENTITY_PATH[] = [];
  public AttributeTypes: Attribute_Type[] = [];
}
export class MappingsInfo {
  public MappingName: string = "";
  public MappingsDetailsList: MappingDetails[] = [];
}
export class MasterPricerDefinition {
  public BusinessObjects: businessObject[] = [];
  public Id: string = "";
  public Description: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Mode: string = "New";
  public tableType: string = "RatingFlow";
  public CreatedBy: string = "";
  public CreatedDate = new Date();
  public LastModifiedBy: string = "";
  public LastModifiedDate = new Date();
}
export class MasterPricerDefintionContext {
  public pricerInfo = new MasterPricerDefinition();
  public ctx = new WorkspaceContext();
}
export class MasterPricerInfo {
  public businessObjects: businessObject[] = [];
  public Id: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
  public Mode: string = "New";
  public DefID: number = 0;
  public DataId: string = "";
  public LastModifiedBy: string = "";
  public LastModifiedDate = new Date();
}
export class ModelEntity {
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Code: string = "";
  public Type: string = "";
  public FactorGroupId: string = "";
  public FormNumber: string = "";
  public FormEditionDate: string = "";
  public FormType: string = "";
  public AttachmentFormType: string = "";
  public PremiumBearing: string = "No";
  public ScheduledForm: string = "No";
  public Attributes: Attributes[] = [];
  public Attachments: any;
  public Id: string = "";
  public DefID: number = 0;
  public ParentType: string = "";
  public Cardinality: string = "";
  public IsIncludeDefaultAttributes: boolean = false;
  public OfferType: string = "Optional";
  public ModelId: number = 0;
  public IsPackage: boolean = false;
}
export class Navpills_options {
  public text: string = "";
  public value: string = "";
}
export class objUser1 {
  public email: string = "";
  public roleName: string = "";
  public USER_GUID: string = "";
}
export class p_LookuptableDefinitionInfo {
  public p_lookupTable = new LookupTableDefinitionInfo();
  public WorkSpaceID: string = "";
}
export class PathEntity {
  public ParentDisplayName: string = "";
  public DisplayPath: string = "";
  public CardinalityPath: string = "";
}
export class PlanDesignModel {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Parent: string = "";
  public Updatedby: string = "";
  public UpdatedDate = new Date();
  public Type: string = "";
  public BureauReference: string = "";
  public Workspace_ID: string = "";
  public SUBTYPE: string = "";
}
export class PlanDetail {
  public PlanName: string = "";
  public PlanId: string = "";
}
// export class PlanDetails {
//   public DisplayName: string = "";
//   public PlanType: string = "";
//   public Version: number = 0;
//   public PlanName: string = "";
//   public PlanVersions: PlanVersionInfo[] = [];
//   public PlanId: string = "";
//   public SelectedVersions: any = [];
//   public SelectPlanVersion: string = "";
// }
export class PlanVersionInfo {
  public Plv_id: string = "";
  public VersionNumber: string = "";
  public Version: number = 0;
}
export class PlanDeterminationDetails {
  public factorInfo: factorInfo[] = [];
  public UserName: string = "";
  public Name: string = "";
  public Selected_Name: string = "";
  public Selected_Mapping: string = "";
  public LastUpdated = new Date();
}
export class PlanDeterminationFactor {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public ModelId: number = 0;
  public FactorMapping: string = "";
  public PlanId: number = 0;
  public Value: string = "";
  public IsStateFactor: boolean = false;
  public IsCarrierFactor: boolean = false;
  public Description: string = "";
  public Mode: string = "";
}
export class PlanDeterminationFactorPlanMap {
  public Id: number = 0;
  public PlanId: string = "";
  public PlanName: string = "";
  public PlanDeterminationFactors: PlanDeterminationFactor[] = [];
  public HasDependency: boolean = false;
  public Mode: string = "";
  public ModelId: number = 0;
}
export class PlanFactors {
  public FactorId: number = 0;
  public FactorName: string = "";
  public PlanId: string = "";
}
export class PlanFormulaDefinitionInfo {
  public Id: string = "";
  public Description: string = "";
  public DisplayName: string = "";
  public Name: string = "";
  public scopeName: string = "";
  public RuleConditions: RuleCondition[] = [];
  public Category: string = "";
  public RuleAction = new RuleAction();
  public BusinessObject: businessObject[] = [];
  public Mode: string = "";
  public tableType: string = "";
  public ApplicabilityType: string = "";
}
export class PlanInfo {
  public PlanName: string = "";
  public PlanCode: string = "";
  public LastModifiedBy: string = "";
  public Status: string = "Active";
  public PlanType: string = "Product Plan";
  public CreatedBy: string = "";
  public CreatedOn = new Date();
  public ReferPlan: string = "None";
  public PlanMode: string = "";
  public PlanId: string = "";
}
export class PlanNameEntity {
  public PlanNames = new PlanDetails();
}
export class PlanPackage {
  public PackageName: string = "";
  public Plans: Plans[] = [];
  public ModelId: number = 0;
  public Id: string = "";
  public UserName: string = "";
  public Mode: string = "";
  public ImportStatus: string = "";
  public CreatedDate: string = "";
  public PackageJson: string = "";
}
export class Plans {
  public PlanName: string = "";
  public BasedOn: string = "";
  public Version: string = "";
  public PlanVersionID: string = "";
  public Workspace: string = "";
  public Initiative: string = "";
  public PlanId: string = "";
  public ImportType: string = "";
  public PackageName: string = "";
  public VersionList: any[] = [];
  public VersionNo: string = "";
  public Status: string = "";
  public Verson: string = "";
}
export class PlanVersionDeterminationFactor {
  public PlanVersionId: string = "";
  public PlanId: string = "";
  public PlanName: string = "";
  public PlanVersionGuid: string = "";
  public Id: number = 0;
  public PlanvId: string = "";
  public PlanDeterminationFactorMapId: number = 0;
  public Version: string = "";
  public FactorValue: string = "";
  public EfffectiveDate = new Date();
  public ExpiryDate = new Date();
  public Type: string = "";
  public Details: string = "";
  public BrId: number = 0;
  public HasDependency: boolean = false;
  public SelectedEnvironment: number = 0;
  public BasePlanVersionId: number = 0;
  public BaseMappingId: number = 0;
  public IsStagingVersion: boolean = false;
  public SelectedList: any = [];

  public CreatedDate: string = "";
  public UpdatedDate: string = "";
  public PlanMappings: PlanVersionDeterminationFactor[] = [];
  public Selected_Plan: string = "";
  public Selected_Version: number = 0;
  public Selected_PlanDeterminations: string = "";
  public Selected_Type: string = "";
  public Selected_EffectiveDate = new Date();
  public Selected_ExpiryDate = new Date("12/31/9998 10:56:44");
  public CreatedBy: string = "";
  public lstfilPlanVersions: UnifiedPlanVersion[] = [];
  public lstfilplanfactors: PlanFactors[] = [];
  public lstfilInitiatives: ReleasePackageEditApproveInitaitivesInfo[] = [];
  public SelectedInitiative: number = 0;
  public SelectedInitiativeName: string = "";
  public Selected_PlanDeterminationName: string = "";
}
export class PricerDefContext {
  public Pricer = new PricerDefinition();
  public Ctx = new WorkspaceContext();
}
export class PricerDefinition {
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Id: string = "";
  public factorgroupId: string = "";
  public Mode: string = "";
  public CreatedBy: string = "";
  public LastModifiedBy: string = "";
  public CreatedDate = new Date();
  public LastModifiedDate = new Date();
  public ContextType: string = "";
  public DataId: string = "";
  public Attachments: any;
  public BusinessObjects: businessObject[] = [];
}
export class ProductEntity {
  public ModelID: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public users: string = "";
  public plans: PlanInfo[] = [];
  public status: string = "";
  public updatedOn = new Date();
  public createdOn = new Date();
  public UpdatedBy: string = "";
  public ProductCode: string = "";
  public AliasName: string = "";
  public Mode: string = "";
  public lstUser: UserEntity[] = [];
  public UserData: UserEntity[] = [];
  public isActive: boolean = false;
  public plansMapped: PlanInfo[] = [];
}
export class ProductOptionsLookUpFactors {
  public LookUpFactorName: string = "";
  public SelectedDataType: string = "";
  public SelectedValueType: string = "";
  public SelectedReturnType: string = "";
  public SelectedLookUpType: string = "";
}
export class ProductRuleDataConetext {
  public Ctx = new WorkspaceContext();
  public freeFlowContextInfo = new FreeFlowContext();
  public ruledata = new rules();
}
export class ProductSpecificationReportRequest {
  public ReportType: string = "";
  public Plan: string = "";
  public EffectiveDate = new Date();
  public Version: string = "";
  public Entities: string = "";
  public EffectiveOption: string = "";
}
export class PublishContext {
  public Type: string = "";
  public Project: string = "";
  public Model: string = "";
  public PlanName: string = "";
  public Environment: string = "";
  public ProjectID: number = 0;
  public ModelID: number = 0;
  public UserId: number = 0;
  public EnvironmentID: number = 0;
  public PlanID: number = 0;
  public BusinessRequestID: number = 0;
  public TestBedName: string = "";
  public Description: string = "";
  public ReleasePlanId: number = 0;
  public VariationId: number = 0;
  public WorkSpaceId: string = "";
}
export class rateOrganizationFactor {
  public name: string = "";
  public valueType: string = "";
  public dataType: string = "";
  public type: string = "Match";
  public axis: string = "None";
}
export class RateTableInfo {
  public Rows: rowinfo[] = [];
}
export class RateTableLookUpColumnsInfo {
  public LookUpColumnName: string = "";
  public SelectedDataType: string = "String";
  public SelectedValueType: string = "Discrete";
  public SelectedReturnType: string = "No";
  public SelectedLookUpType: string = "Match";
  public lookuptableTypeDisable: boolean = false;
  public lstLookupTypes = [
    { text: "Match", value: "Match" },
    { text: "Interpolation", value: "Interpolation" },
    { text: "Extrapolation", value: "Extrapolation" },
    { text: "InterpolationExtrapolation", value: "InterpolationExtrapolation" },
    { text: "StepLookup", value: "StepLookup" },
  ];
  public ColumnTypeDisabled: boolean = false;
  public DataTypeDisabled: boolean = false;
  public SelectedDirection: string = "None";
  public directionDisable: boolean = false;
  public lstDirections = [
    { text: "None", value: "None" },
    { text: "Horizontal", value: "Horizontal" },
    { text: "Vertical", value: "Vertical" },
  ];
  public lstDataTypes = [
    { text: "String", value: "String" },
    { text: "Integer", value: "Integer" },
    { text: "Decimal", value: "Decimal" },
    { text: "DateTime", value: "DateTime" },
  ];
}
export class ReleasePackage {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public ModelId: number = 0;
  public Model: string = "";
  public CreatedDate: string = "";
  public UpdatedDate: string = "";
  public PlanMappings: PlanVersionDeterminationFactor[] = [];
  public Selected_Plan: string = "";
  public Selected_Version: number = 0;
  public Selected_PlanDeterminations: string = "";
  public Selected_Type: string = "";
  public Selected_EffectiveDate = new Date();
  public Selected_ExpiryDate = new Date("12/31/9998");
  public CreatedBy: string = "";
  public lstfilPlanVersions: UnifiedPlanVersion[] = [];
  public lstfilplanfactors: PlanFactors[] = [];
  public IsPowerShellInclude: string = "Yes";
  public modeOfReleasePackage: string = "New";
  public lstPlans: PlanDetail[] = [];
  public EnvironmentID: string = "";
}
export class RoleCategory {
  public Name: string = "";
  public DisplayName: string = "";
  public CenterName: string = "";
  public NoAccess: boolean = false;
  public FullAccess: boolean = false;
  public ReadAccess: boolean = false;
  public CreateUpdateAccess: boolean = false;
}
export class RolePermission {
  public RolePermissionInfo: RolePermissionInfo[] = [];
}
export class RolePermissionInfo {
  public PriorityID:number = 0;
  public Name: string = "";
  public Permission: string = "";
  public Centername: string = "";
  public Displayname: string = "";
}
export class RolesDataEntity {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public Status: string = "";
  public Updatedon = new Date();
  public Mode: string = "";
  public Updatedby: string = "";
  public RolePermission = new RolePermission();
  public RoleClients: any[] = [];
  public CreatedDate = new Date();
  public CreatedBy: string = "";
}
export class rowinfo {
  public Row_Status: string = "";
  public RowInfoList: columnInfo[] = [];
}
export class rule {
  public Item: any = [];
}
export class RuleAction {
  public ActionName: string = "";
  public ActionType: string = "";
  public ActionID: number = 0;
  public Paths: any = [];
  public DisplayPaths: any = [];
  public ParentName: string = "";
  public FactorGroupId: string = "";
}
export class RuleCondition {
  public ConditionFactorGroupName: string = "";
  public FactorName: string = "";
  public DisplayName: string = "";
  public FactorID: string = "";
  public OperatorName: string = "";
  public FactorGroupID: string = "";
  public Path: string = "";
  public DisplayPath: string = "";
  public DataType: string = "";
  public IsEntity: boolean = false;
  public EntityType: string = "";
  public FactorGroupDisplayName: string = "";
  public FactorType: string = "";
  public WorkSpaceID: string = "";
  public ChangeEventId: string = "";
  public DoimanTableId: string = "";
}
export class RuleDefinition {
  public Id: string = "";
  public Description: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public ModeType: string = "";
  public Type: string = "";
  public CreatedBy: string = "";
  public CreatedDate = new Date();
  public LastModifiedBy: string = "";
  public LastModifiedDate = new Date();
  public Dimensions: BusinessTerm[] = [];
  public ContextType: string = "";
  public FactorgroupId: string = "";
  public Attachments: any;
  public tableType: string = "";
  public WorkspaceId: string = "";
  public DataId: string = "";
  public Category: string = "";
  public BusinessObject: businessObject[] = [];
  public ApplicabilityType: string = "";
}
export class rules {
  public Items: rule[] = [];
  public Mode: string = "";
  public Id: string = "";
  public EffectiveDate = new Date();
  public ExpiryDate = new Date();
  public Description: String = "";
  public ruleType: string = "";
  public tableType: string = "";
  public CreatedDate = new Date();
  public Name: string = "";
  public DisplayName: string = "";
  public LastModifiedDate = new Date();
  public isDefault: boolean = false;
  public defId: string = "";
  public Rulexmldata: rule[] = [];
}
export class TablesComparision {
  public BasicInfo = new BasicInfo();
  public ColumnsInfoList: ColumnsInfo[] = [];
  public MappingsInfoList: MappingsInfo[] = [];
  public PlanDefID: string = "";
  public Dimensions: Dimension[] = [];
  public IsValidToCompare: boolean = false;
  public WfDefId: string = "";
  public IsDimensionsExists: boolean = false;
}
export class TableTypes {
  public Name: string = "";
  public DisplayName: string = "";
}
export class TempGL {
  public name: string = "";
  public displayName: string = "";
  public Type: string = "";
}
export class Template {
  public Id: number = 0;
  public Name: string = "";
  public Description: string = "";
  public MappingXml: string = "";
  public ModelId: number = 0;
  public CreatedBy: string = "";
  public UpdatedBy: string = "";
  public CreatedDate = new Date();
  public UpdatedDate = new Date();
  public Status: string = "";
  public Mode: string = "";
  public ModelName: string;
  public SelectedTemplateItems: StructureNode[];
  public RootStructureNode: Array<StructureNode> = null;
}
export class TestBed {
  public TestBedId: string = "";
  public Name: string = "";
  public Description: string = "";
  public Action: string = "";
  public PlanVersionId: string = "";
  public PlanId: string = "";
  public WorkSpaceId: string = "";
  public EnvironmentID: number = 0;
  public Environment: string = "";
  public BusinessRequestId: number = 0;
  public Mode: number = 0;
  public Changes: ChangeDetailsModel[] = [];
  public Status: string = "";
  public CreatedBy: string = "";
  public CreatedDate: string = "";
  public ErrorMessage: PublishValidation[] = [];
  public ModelId: number = 0;
}
export class TestModel {
  public UserId: number = 0;
  public UserName: string = "";
  public DOB = new Date();
}
export class UnifiedPlanVersion {
  public PlanId: string = "";
  public PlanVersionId: string = "";
  public PlanversionGuid: string = "";
  public Version: number = 0;
}
export class ReleasePackageEditApproveInitaitivesInfo {
  public InitiativeName: string = "";
  public id_plv: string = "";
  public id_brq: number = 0;
}
export class UserEntity {
  public UserID: number = 0;
  public UserName: string = "";
  public Password: string = "";
  public DisplayName: string = "";
  public FirstName: string = "";
  public LastName: string = "";
  public Picture: string = "";
  public Email: string = "";
  public IsAdmin: boolean = false;
  public PasswordStatus: boolean = false;
  public Status: string = "";
  public Mode: string = "";
  public USER_GUID: string = "";
  public RoleNames: string = "";
  public IsStatus: boolean = false;
  public Roles: UserRoleData[] = [];
  public RoleData: RolesDataEntity[] = [];
  public CreatedDate = new Date();
  public CreatedBy: string = "";
}
export class UserEntity1 {
  public FirstName: string = "";
  public email: string = "";
  public roleName: string = "Administrator";
  public USER_GUID: string = "";
  public LastName: string = "";
  public UserName: string = "";
  public DisplayName: string = "";
  public PhoneNumber: string = "";
  public status: string = "";
  public Roles: string = "";
  public Provider: string = "local";
  public TwoFactorEnables: boolean = false;
  public TwoFactorEnabled: boolean = false;
}
export class UserRoleData {
  public RoleName: string = "";
}
export class VariableContext {
  public globalvariable = new globalVariableInfo();
  public modelId: number = 0;
  public VariableType: string = "";
  public p_ctx = new WorkspaceContext();
}
export class WhereUsedEntity {
  public EntityName: string = "";
  public EntityType: string = "";
  public DependentEntityName: string = "";
  public DependentEntityType: string = "";
  public EntityDisplayName: string = "";
  public DependentEntityRuleBlockName: string = "";
  public ChangeEventName: string = "";
  public WorkspaceName: string = "";
  public DependentEntityModifiedBy: string = "";
  public DependentEntityModified_Date = new Date();
  public TableType: string = "";
  public Deff_Id: string = "";
  public WorkspaceId: string = "";
}
export class WorkSpace {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public ChangeSets: ChangeSet[] = [];
  public Isexpanded: boolean = false;
}
export class WorkspaceContext {
  public WorkspaceId: string = "00000000-0000-0000-0000-000000000000";
  public ProductId: number = 0;
  public ChangeSetId: string = "00000000-0000-0000-0000-000000000000";
  public CategoryId: number = 0;
  public factorgroupId: string = "00000000-0000-0000-0000-000000000000";
  public Status: string = "";
  public PlanVersionId: string = "00000000-0000-0000-0000-000000000000";
  public UserName: string = "";
}
export class FileAttachmentModel {
  public filepathInfo: GlobalAttachmentFileInfo[] = [];
  public id_ws: string = "";
  public id_brq: number = 0;
}
export class GlobalAttachmentFileInfo {
  public FileName: string = "";
  public FileType: string = "";
  public Filepath: string = "";
  public Data: any[] = [];
}
export class WorkSpaceDetailsModel {
  public Description: string = "";
  public CreatedBy: string = "";
  public Created_Date = new Date();
  public ModifiedBy: string = "";
  public Modified_Date = new Date();
  public Base_Plan_Version_Id_Ws: number = 0;
  public ProductName: string = "";
  public BasePlanData = new WorkSpacePlanDetails();
  public Status: string = "";
  public WorkspaceType: string = "";
  public SelectedWorkSpaces: CommonWorkSpaceData[] = [];
  public SelectedWorkSpaceIDs: string = "";
  public Mode: string = "";
  public ProductId: number = 0;
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public fileUploadPath: string = "";
  public UserID: number = 0;
  public ImportStatus: string = "";
  public ProductCode: string = "";
}
export class WorkSpacePlanDetails {
  public PlanId: string = "";
  public PlanName: string = "";
  public PlanDisplayName: string = "";
}

export class LookupTableImportInfo {
  public LookupFactors: rateOrganizationFactor[] = [];
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public defId: string = "";
  public Id: string = "";
  public RateTable = new RateTableInfo();
  public Mode: string = "";
  public ReturnFactor: BusinessTerm[] = [];
  public Dimensions: BusinessTerm[] = [];
  public LookupTableType: string = "SingleLookup";
  public roundMethod: string = "None";
  public DeltaLookup: string = "";
  public DeltaReturn: string = "";
  public Minimum: string = "";
  public Maximum: string = "";
  public UnitValue: string = "";
  public DefaultValue : string = "";
}
export class DomainTableImportInfo {
  public LookupFactors: rateOrganizationFactor[] = [];
  public Name: string = "";
  public DisplayName: string = "";
  public Description: string = "";
  public defId: string = "";
  public Id: string = "";
  public domainTable = new domainTable();
  public Mode: string = "";
  public ReturnFactor: BusinessTerm[] = [];
  public Dimensions: BusinessTerm[] = [];
  public LookupTableType: string = "SingleLookup";
  public roundMethod: string = "None";
}
export class StructureNode {
  public Id: string;

  public Name: string;

  public DisplayName: string;

  public Type: string;

  public IsRoot: boolean;

  public IsFactor: boolean;

  public DataType: string;

  public FactorGroupName: string;

  public ParentFactorGroupName: string;

  public FactorGroupDisplayName: string;

  public StructureNodes: Array<StructureNode>;

  public IsSelected: boolean;

  public FactorMapping: string;

  public SourceType: string;

  public AttributeType: string;

  public ParentRiskName: string;

  public Path: string;

  public DistinctPath: string;
}

export class IdentityUser {
  public Id: string;
  public Email: string;
  public FirstName: string;
  public isAdmin: string;
  public LastName: string;
  public DisplayName: string;
  public UserName: string;
  public ClientId: string;
  public Roles: any = "Administrator";
  public Admin: any = "No Access";
  public WorkSpace: any = "No Access";
  public ChangeEvents_FormLibrary: any = "No Access";
  public ChangeEvents_Pricer: any = "No Access";
  public ChangeEvents_ProductChoices: any = "No Access";
  public ChangeEvents_ProductModel: any = "No Access";
  public ChangeEvents_ProductRules: any = "No Access";
  public ChangeEvents_Rates: any = "No Access";
  public ChangeEvents_Computations: any = "No Access";
  public ConfigureReports: any = "No Access";
  public Initiatives: any = "No Access";
  public Initiatives_ChangesToApprovedPlans: any = "No Access";
  public Launch: any = "No Access";
  public PlanDesign_FormLibrary: any = "No Access";
  public PlanDesign_Pricer: any = "No Access";
  public PlanDesign_ProductChoices: any = "No Access";
  public PlanDesign_ProductModel: any = "No Access";
  public PlanDesign_ProductRules: any = "No Access";
  public PlanDesign_Rates: any = "No Access";
  public PlanDesign_Computations: any = "No Access";
  public PortfolioInsights: any = "No Access";
  public Products: any = "No Access";
  public PricingFlow: any = "No Access";
  public Test: any = "No Access";
  public WhatIf: any = "No Access";
  public PlanPackageImport: any = "No Access";
  public BookOfBusiness: any = "No Access";
  public Snapshot: any = "No Access";
  public DisplayNameWithRoles: string = "";
  public Portfolio: any = "No Access";
  public Analysis: any = "No Access";

}

export class ProductComparisonEntity {
  public ModelId: string = "";
  public ModelName: string = "";
  public FullReport: boolean = true;
  public DifferencesOnly: boolean = false;
  public ProductA_PlanName: string = "";
  public ProductA_PlanId: string = "";
  public ProductA_EffectiveDateType: string = "";
  public ProductA_FromDate = new Date();
  public ProductA_ToDate = new Date();
  public ProductA_VersionId: string = "";
  public ProductB_PlanName: string = "";
  public ProductB_PlanId: string = "";
  public ProductB_EffectiveDateType: string = "";
  public ProductB_FromDate = new Date();
  public ProductB_ToDate = new Date();
  public ProductB_VersionId: string = "";
  public ReportFormat: string = "pdf";
  public ProductA_StatusSelected: string;
  public ProductB_StatusSelected: string;
  public ProductA_InitiativeSelection: string = "";
  public ProductB_InitiativeSelection: string = "";
}
export class InitativePlans {
  public PlanName: string = "";
  public PlanId: string = "";
  public ProductName: string = "";
  public ProductId: string = "";
  public PlanversionId: string = "";
}
export class ObjDuplicateChanges {
  public EntityName: string = "";
  public ChangeType: string = "";
}

export class SearchEntity {
  public Name: string = "";
  public DisplayName: string = "";
  public Category: string = "";
  public IsChecked: boolean = false;
  public ProductId: number = 0;
  public WorkspaceId: string = "";
  public ChangeGroupId: string = "";
}
export class SearchEntity_Details {
  public Name: string = "";
  public DisplayName: string = "";
  public ChangeEventName: string = "";
  public ChangeEventID: string = "";
  public WorkSpaceName: string = "";
  public CreatedBy: string = "";
  public LastUpdatedOn: string = "";
  public PlanName: string = "";
  public InitiativeName: string = "";
  public EntityId: string = "";
  public Version: string = "";
  public WorkspaceId: string = "";
  public PlanVersionId: string = "";
  public ModelId: number = 0;
}
export class SearchEntity_Details_WhatUsed {
  public Name: string = "";
  public DisplayName: string = "";
  public ChangeEventName: string = "";
  public InitiativeName: string = "";
  public WorkSpaceName: string = "";
  public CreatedBy: string = "";
  public LastUpdatedOn: string = "";
  public AlgorithmName: string = "";
  public RuleBlockName: string = "";
  public AttributeMapped: string = "";
  public ImplementedBy: string = "";
  public ApprovedBy: string = "";
  public PoliciesImpacted: string = "";
}
export class SearchKeyword {
  public Keyword: string = "";
  public CategoryNames: string = "";
  public UserName: string = "";
}

export class SnapShotEntity {
  public Id: string = "";
  public ModelId: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Category: string = "";
  public TotalCount: string = "";
  public UnmappedCount: string = "";
  public WorkspaceName: string = "";
  public WorkspaceDisplayName: string = "";
  public WorkspaceId: string = "";
  public ChangeEventId: string = "";
  public ChangeEventName: string = "";
  public ChangeEventDisplayName: string = "";
  public CreatedBy: string = "";
  public Updatedon: string = "";
  public ParentCategory: string = "";
  public SvgPath: string = "";
}
export class WhatUsedEntityComponents {
  public Name: string = "";
  public DisplayName: string = "";
}
export class NavEntity {
  public DataId: string = "";
  public ChangeName: string = "";
  public ChangeType: string = "";
  public SelectedTab: string = "";
}

export class WhatUsedEntity {
  public EntityId: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
  public AttributeName: string = "";
  public BlockName: string = "";
  public UpdatedOn: string = "";
  public CreatedBy: string = "";
  public Description: string = "";
  public Parent: string = "";
  public WorkSpaceId: string = "";
}
export class RateTableCompareEntity {
  public ID: string = "";
  public Name: string = "";
  public DisplayName: string = "";
  public ParentId: string = "";
  public VersionNo: string = "";
  public Childs: RateTableCompareEntity[] = [];
}

export class NavigationDetails {
  public wsID: string = "";
  public csID: string = "";
  public Tab: string = "";
}
export class Report {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public PrimaryContext: string = "";
  public ReportType: string = "";
  public ProductCode: string = "";
  public ModelId: number = 0;
  public CreatedBy: string = "";
  public CreatedDate = new Date();
  public UpdatedBy: string = "";
  public UpdatedDate = new Date();
  public Status: string = "";
  public ProjectType: number = 2;
  public EntityType: string = "Risk";
  public MetaXml: string = "";
  public AttributeMappings: AttributeMapping[] = [];
  public ReportOutputs: ReportsOutput[] = [];
  public Mode: string = "New";
}
export class AttributeMapping {
  public Index: string = "";
  public ColumnType: string = "";
  public IsFilterFactor: boolean = false;
  public IsGridFactor: boolean = false;
  public IsPolicyFactor: boolean = false;
  public EntityType: string = "";
  public Entity = new ReportsDatabaseDBTable();
  public MappedColumn = new ReportsDatabaseDBTableColumn();
  public ParentName: string = "";
  public ProductType: string = "";
  public KPISequence: number = 0;
  public MapIndexSequence: number = 0;
}
export class ReportsOutput {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public IncludeInReport: boolean = false;
}
export class ReportsDatabaseDBTable {
  public name: string = "";
  public displayname: string = "";
  public tablename: string = "";
  public iscoverage: string = "";
  public parentName: string = "";
  public relationtype: string = "";
  public columns: ReportsDatabaseDBTableColumn[] = [];
  public filtercolumn: ReportsDatabaseDBTableColumn[] = [];
}
export class ReportsDatabaseDBTableColumn {
  public tablecolumnName: string = "";
  public id: string = "";
  public name: string = "";
  public DisplayName: string = "";
  public FactorType: string = "";
  public DataType: string = "";
  public ControlType: string = "";
  public configurationId: string = "";
  public range: string = "";
  public isFilterFactor: string = "";
  public isGridFactor: string = "";
  public isPolicyFactor: string = "";
  public Mappedcolumn: string = "";
  public AttributeType: string = "";
  public IsRateFactor: string = "";
  public IsPolicyAttribute: string = "";
  public KPISequence: number = 0;
  public MapIndexSequence: number = 0;
}
export class Scenario {
  public ISOSceID: number = 0;
  public ISOLOB: string = "";
  public Id: number = 0;
  public ChangeSetMappingId: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public File: string = "";
  public EnvironmentId: number = 0;
  public TemplateId: number = 0;
  public CombineBook: boolean = false;
  public BrId: number = 0;
  public CreatedBy: string = "";
  public CreatedDate = new Date();
  public ModelId: number = 0;
  public CompareWith: string = "";
  public ChangeSets: ChangeSet[] = [];
  public Document: string = "";
  public BasePlanTestBedName: string = "";
  public BasePlanVersionGuid: string = "";
  public ProposedPlanVersionGuid: string = "";
  public BookName: string = "";
  public BookId: number = 0;
  public ProjectType: number = 2;
  public EffectiveDates: any = [];
  public IsPremiumBook: boolean = true;
  public IsSaveResponse: boolean = true;
  public IsDatesFromUI: boolean = true;
  public IsDatesFromBoth: boolean = false;
  public Carriers: any = [];
  public ScenarioVersions: ScenarioVersion[] = [];
  public ModelName: string = "";
  public TemplateName: string = "";
  public EnvironmentName: string = "";
  public BaseScenarioId: number = 0;
  public IsBatchExecution: boolean = false;
  public ExecutionType: string = "";
  public DefinitionStatus: string = "";
  public IFScenarioGuid: string = "";
  public OldScenarioId: number = 0;
  public ScenarioExecutionMode: string = "";
  public IsRuleApplied: boolean = false;
  public PlanName: string = "";
  public FileType: string = "";
  public FileName: string = "";
  public fileUploadPath: string = "";
  public TestBedObj: TestBed = new TestBed();
  public IRRules: InputRuleBlocks = new InputRuleBlocks();
}
export class ScenarioVersion {
  public ScenarioId: number = 0;
  public BookId: number = 0;
  public ISOSceId: number = 0;
  public ISOLOB: string = "";
  public ISOPremium: number = 0;
  public ISOGrossPremium: number = 0;
  public EffectiveDate = new Date();
  public NumberOfPolicies: string = "";
  public ImpactedPolicies: string = "";
  public BenchMarkPremium: string = "";
  public BenchMarkPremiumForPolicy: string = "";
  public Erroredchargedpremium: string = "";
  public ErrorPolicy: string = "";
  public MatchedPolicycount: string = "";
  public ManualPremComparableToISO_CE: string = "";
  public Rateoverridepremium: string = "";
  public Rateoverridepolicy: string = "";
  public comparedPremiumprod2: string = "";
  public BookPremium: string = "";
  public Displacement: string = "";
  public DisplacementPercentage: string = "";
  public Carrier: string = "";
  public Premium: string = "";
  public IsDatesFromUI: boolean = false;
  public IsDatesFromBoth: boolean = false;
  public ProductName: string = "";
  public ProductDisplayName: string = "";
  public ComputedGrossPremium: string = "";
  public CurrentManualPremium: string = "";
  public CurrentChargedPremium: string = "";
  public ProposedManualPremium: string = "";
  public OffBalance: string = "";
  public OffBalancePercentage: string = "";
  public ProposedManualImapact: string = "";
  public ProposedManualImapactPerc: string = "";
}
export class WhatIfScenarioResult {
  public BasePlanTestbedName: string = "";
  public ProposePlanTestbedName: string = "";
  public BasePlanVersionGuid: string = "";
  public ProposePlanVersionGuid: string = "";
  public CreatedBy: string = "";
  public BasePremium: string = "";
  public Changesets: string = "";
  public CreatedDate = new Date();
  public Displacement: string = "";
  public DisplacementPercentage: string = "";
  public ProposedPremium: string = "";
  public ScenarioId: number = 0;
  public ScenarioName: string = "";
  public ScenarioStatus: string = "";
  public IsChecked: boolean = false;
  public Host: string = "";
  public Port: string = "";
  public ImgSource: string = "";
  public TemplateId: number = 0;
  public Bookid: number = 0;
  public ISOSceID: number = 0;
  public ISOLOB: string = "";
  public ISOProductCode: string = "";
  public IsSaveResponse: string = "";
  public BaseScenarioId: number = 0;
  public Product: string = "";
  public IFScenarioGuid: string = "";
  public IsExistingScenarioDeleted: boolean = false;
  public ScenarioExecutionMode: string = "";
  public ChargedPremium: string = "";
  public OffBalance: string = "";
  public OffBalancePercentage: string = "";
  public CWImpact: string = "";
  public Planname: string = "";
  public ProductCode: string = "";
  public OffBalanceWithPercentage: string = "";
  public DisplacementWithPercentage: string = "";
}
export class ReportMappings {
  public lstAttributeType: Attribute_Type[] = [];
  public lstMappedColumns: factorInfo[] = [];
  public Name: string = "";
  public DisplayType: string = "";
  public UsedAsType: string = "";
  public SelectedEntity: string = "";
  public SelectedAttributeType: string = "";
  public SelectedMappingColumn: string = "";
}
export class DatabaseDB {
  public tables: ReportsDatabaseDBTable[] = [];
  public IsEdited: string = "";
}

export class RuleFactor {
  public FactorGroupName: string = "";
  public FactorGroupNameAlias: string = "";
  public FactorName: string = "";
  public FactorDisplayName: string = "";
}

export class Ratingvalues {
  public ValueName: string = "";
}
export class InputRuleBlocks {
  public ModelId: number = 0;
  public LOB: string = "";
  public ISOSceId: number = 0;
  public Rules: InputRuleBlock[] = [];
  public SenerioID: Array<number> = [];
  public ProjectType: number = 2;
  public CreatedBy: string = "";
}
export class listofIntegers {
  public integerList: number = 0;
}
export class InputRuleBlocks1 {
  public Rules: InputRuleBlock[] = [];
}
export class PolicyGridSummeryMetrics {
  public RulebuilderInfoList: RuleBuilderInfo[] = [];
  public inputRuleBlocks = new InputRuleBlocks();
  public Rateoverridepolicy: string = "";
  public RateoverridePremium: string = "";
}
export class InputRuleBlock {
  public isDirty: boolean = false;
  public isEditedColumn: boolean = false;
  public SelectedValues: Array<string> = [];
  public ImpactPolices: string = "";
  public ImpactPremium: string = "";
  public ParameterName: string = "";
  public ParameterDisplayName: string = "";
  public RateOverrideComputedPrem_Renewal_PE: string = "";
  public ISOPremium: string = "";
  public ParentAliasName: string = "";
  public ParentName: string = "";
  public Values: Array<string> = [];
  public IsValuesRequest: boolean = false;
  public IsPremiumRequest: boolean = false;
  public selectedRisks: string = "";
  public totalRisks: string = "";
  public ImpactedRisk: string = "";
  public Operator: string = "";
  public MinPremPolicies: string = "";
  public MinPremPremium: string = "";
  public MinPremComputedPrem: string = "";
  public MinPremRisks: string = "";
  public RenewalPolicies: string = "";
  public RenewalPremium: string = "";
  public RenewalComputedPrem: string = "";
  public RenewalRisks: string = "";
  public RenewalISOPremium: string = "";
  public RateOverridePolicies_Renewal: string = "";
  public RateOverridePremium_Renewal: string = "";
  public MinPremPolicies_Renewal: string = "";
  public MinPremPremium_Renewal: string = "";
  public MinPremComputedPrem_Renewal: string = "";
  public MinPremRisks_Renewal: string = "";
  public ISOMatchedPremium_MP: string = "";
  public NBPolicies: string = "";
  public NBPremium: string = "";
  public NBComputedPrem: string = "";
  public NBRisks: string = "";
  public NBISOPremium: string = "";
  public MinPremPolicies_PE: string = "";
  public MinPremPremium_PE: string = "";
  public MinPremComputedPrem_PE: string = "";
  public RateOverridePolicies_PE: string = "";
  public RateOverridePremium_PE: string = "";
  public RateOverrideComputedPrem_PE: string = "";
  public ImpactPolices_PE: string = "";
  public MinPremRisks_PE: string = "";
  public RateOverrideRisks_PE: string = "";
  public selectedRisks_PE: string = "";
  public totalRisks_PE: string = "";
  public RenewalPolicies_PE: string = "";
  public RenewalPremium_PE: string = "";
  public RenewalComputedPrem_PE: string = "";
  public RenewalRisks_PE: string = "";
  public NBPolicies_PE: string = "";
  public NBPremium_PE: string = "";
  public NBISOPremium_PE: string = "";
  public RenewalISOPremium_PE: string = "";
  public NBComputedPrem_PE: string = "";
  public NBRisks_PE: string = "";
  public NBRateOverridePolicies: string = "";
  public NBRateOverridePremium: string = "";
  public NBMatchedPolicycount: string = "";
  public MinPremPolicies_Renewal_PE: string = "";
  public MatchedPolicycount_Renewal: string = "";
  public MatchedPolicycount_MP: string = "";
  public comparedPremiumprod2_MP: string = "";
  public comparedPremiumprod2forpolicy_MP: string = "";
  public NBcomparedPremiumprod2: string = "";
  public comparedPremiumprod2forpolicy_renwal: string = "";
  public comparedPremiumprod2_renewal: string = "";
  public NBcomparedPremiumprod2forpolicy: string = "";
  public MinPremPremium_Renewal_PE: string = "";
  public MinPremComputedPrem_Renewal_PE: string = "";
  public MinPremRisks_Renewal_PE: string = "";
  public RateoverridePolicies_MP: string = "";
  public Rateoverridepremium_MP: string = "";
  public RateOverridePolicies_Renewal_PE: string = "";
  public RateOverridePremium_Renewal_PE: string = "";
  public RateOverrideRisks_Renewal_PE: string = "";
  public ImpactedRisk_PE: string = "";
  public ImpactPremium_PE: string = "";
  public CurrentChargedManual: string = "";
  public CurrentCharged: string = "";
  public ImpactPolicy: string = "";
  public OffBalance: string = "";
  public OffBalancePercentage: string = "";

  public ForegroundColorOffBal: string = "";
  public ForegroundColorOffBalPer: string = "";
}

export class RuleBuilderInfo {
  public SerialNumber_SNO: string = "";
  public Details_col0: string = "";
  public Calc_Formula: string = "";
  public InforceBook_col1: string = "";
  public FilteredBook_col2: string = "";
  public FilteredRenewal_FBRenewal: string = "";
  public FilteredNew_FtNew: string = "";
  public MpPoliciesOnFilteredBook_MPRenewal: string = "";
  public FilteredPercentageTotal_col3: string = "";
  public MpPercentageOfFilteredBook_col4: string = "";
  public Carrier: string = "";
  public EffectiveDate: string = "";
}
export class PolicySelectionCriteriaGrid {
  public selectedRatingVariable: string = "";
  public selectedOperator: string = "";
  public selectedValue: Ratingvalues[] = [];
  public lstRatingVariables: RuleFactor[] = [];
  public CurrentCharged: string = "";
  public CurrentManual: string = "";
  public OffBalance: string = "";
  public OffBalancePercentage: string = "";
  public lstRatingValues: Ratingvalues[] = [];
  public TotRisks: string = "";
  public SelectedRisks: string = "";
  public CurrentChargedManual: string = "";
  public ImpactPolicy: string = "";
  public ISOPremium: string = "";
  public Policies: string = "";
  public MinPremPolicies: string = "";
  public MinPremPremium: string = "";
  public MinPremComputedPrem: string = "";
  public MinPremRisks: string = "";
  public RenewalPolicies: string = "";
  public RenewalPremium: string = "";
  public RenewalComputedPrem: string = "";
  public RenewalRisks: string = "";
  public RenewalISOPremium: string = "";
  public MinPremPolicies_Renewal: string = "";
  public MinPremPremium_Renewal: string = "";
  public MinPremComputedPrem_Renewal: string = "";
  public MinPremRisks_Renewal: string = "";
  public NBPolicies: string = "";
  public NBPremium: string = "";
  public NBComputedPrem: string = "";
  public NBRisks: string = "";
  public MinPremPolicies_PE: string = "";
  public MinPremPremium_PE: string = "";
  public MinPremComputedPrem_PE: string = "";
  public RateOverridePolicies_PE: string = "";
  public RateOverridePremium_PE: string = "";
  public RateOverrideComputedPrem_PE: string = "";
  public ImpactPolices_PE: string = "";
  public MinPremRisks_PE: string = "";
  public RateOverrideRisks_PE: string = "";
  public selectedRisks_PE: string = "";
  public totalRisks_PE: string = "";
  public RenewalPolicies_PE: string = "";
  public RenewalPremium_PE: string = "";
  public RenewalComputedPrem_PE: string = "";
  public RenewalRisks_PE: string = "";
  public NBPolicies_PE: string = "";
  public NBPremium_PE: string = "";
  public NBISOPremium_PE: string = "";
  public RenewalISOPremium_PE: string = "";
  public NBComputedPrem_PE: string = "";
  public NBRisks_PE: string = "";
  public MinPremPolicies_Renewal_PE: string = "";
  public MinPremPremium_Renewal_PE: string = "";
  public MinPremComputedPrem_Renewal_PE: string = "";
  public MinPremRisks_Renewal_PE: string = "";
  public RateOverridePolicies_Renewal_PE: string = "";
  public RateOverridePremium_Renewal_PE: string = "";
  public RateOverrideComputedPrem_Renewal_PE: string = "";
  public RateOverrideRisks_Renewal_PE: string = "";
  public ImpactedRisk_PE: string = "";
  public NBRateOverridePolicies: string = "";
  public RateOverridePolicies_Renewal: string = "";
  public RateoverridePolicies_MP: string = "";
  public NBRateoverridepremium: string = "";
  public Rateoverridepremium_Renewal: string = "";
  public Rateoverridepremium_MP: string = "";
  public NBMatchedPolicycount: string = "";
  public MatchedPolicycount_Renewal: string = "";
  public MatchedPolicycount_MP: string = "";
  public ISOMatchedPremium_MP: string = "";
  public comparedPremiumprod2_MP: string = "";
  public NBcomparedPremiumprod2forpolicy: string = "";
  public comparedPremiumprod2forpolicy_renwal: string = "";
  public comparedPremiumprod2forpolicy_MP: string = "";
  public NBcomparedPremiumprod2: string = "";
  public comparedPremiumprod2_renewal: string = "";
  public ImpactPremium_PE: string = "";
}
export class WhatIF_NavigationDetails {
  public ScenID: number = 0;
  public BookID: number = 0;
  public modelID: number = 0;
  public ScenIds: string = "";
  public username: string = "";
  public BookName: string = "";
  public IsPremiumBook: boolean = false;
}
export class EntityNavDetails {
  public ID: string = "";
  public Type: string = "";
  public Name: string = "";
  public RouteName: string = "";
  public SelectedTab: string = "";
  public WsID: string = "";
  public isBOM:boolean=false
}

export class AppSettings {
  public currencyType: string = "$";
  public baseUrl: string = "";
  public IsReportVisible: boolean = false;
  public IsPackageWebJob: boolean = false;
  public IsWhatiFEnabled: boolean = false;
  public IsBookImportWebJob: boolean = false;
  public IsPlanPackage: boolean = false;
  public IsScenarioWebJob: boolean = false;
}

export class ScenarioDetails_APIObject {
  public scenarioIds: number[] = [];
  public lob: number = 0;
  public ReportType: string = "";
  public ReportName: string = "";
  public projectType: number = 2;
  public mapperType: string = "";
  public gridFactors: string[] = [];
  public coverages: CoverageDetails[] = [];
  public forms: FormDetails[] = [];
  public Pageno: number = 0;
  public PageSize: number = 0;
  public ISOSceId: number = 0;
  public ISOProductCode: string = "";
  public CreatedBy: string = "";
  public whatIfReport: WhatIfReport = new WhatIfReport();
  public p_disCond: string = "";
  public p_premCnd: string = "";
  public p_filterconditions: FilterCondition[] = [];
}

export class FilterCondition {
  public AliasName: string = "";
  public FactorName: string = "";
  public FactorgroupName: string = "";
  public DataType: string = "";
  public FactorDisplayName: string = "";
  public FactorValues: string[] = [];
}

export class CoverageDetails {
  public CoverageName: string = "";
  public CoverageDisplayName: string = "";
  public ParentRiskName: string = "";
}
export class FormDetails {
  public FormName: string = "";
  public FormDisplayName: string = "";
  public ParentRiskName: string = "";
}
export class WhatIfReport {
  public Id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public PrimaryContext: string = "";
  public ReportType: string = "";
  public ProductCode: string = "";
  public AttributeMappings: AttributeMapping[] = [];
  public ReportOutputs: ReportsOutput[] = [];
  public ModelId: number = 0;
  public ReferenceProductModelId: number = 0;
  public CreatedBy: string = "";
  public CreatedDate = new Date();
  public UpdatedBy: string = "";
  // public UpdatedDate = new Date();
  public Status: string = "";
  public ProjectType: number = 2;
  public EntityType: string = "";
  public ReportProductType: string = "";
  public ScnIds: number[] = [];
  public ModelName: string = "";
}
export class ModelEntityVersionUI extends ModelEntity {
  formInfo: FormInfo[];
  referenceDataInfo: ReferenceDataInfo[];
}

export class CommonInfo {
  current: string;
  previous: string;
  matchStatus: string;
}

export class ReferenceDataInfo extends CommonInfo {
  attributeName: string;
}

export class FormInfo extends CommonInfo {
  name: string;
}
export class Plan {
  public PlanId: string = "";
  public PlanName: string = "";
  public Version: number = 0;
  public PlanVersionGuid: string = "";
}
export class ReleasePlans {
  public Name: string = "";
  public Environment: string = "";
  public CreatedDate = new Date();
  public CreatedBy: string = "";
  public ModelId: number = 0;
  public EnvironmentId: number = 0;
  public Status: string = "";
  public Model: string = "";
  public Plans: Plan[] = [];
  public ReleaseId: number = 0;
  public Description: string = "";
}
export class Versions {
  public PlanId: string = "";
  public Version: number = 0;
  public PlanVersionId: string = "";
  public Version_S: string = "";
  public Status: string = "";
  public IsStaging: boolean = false;
  public IsEditApptove: boolean = false;
}
export class PlanVersions {
  public PlanId: string = "";
  public PlanName: string = "";
  public Versions = new Versions();
}
export class PublishPlan {
  public PlanId: string = "";
  public PlanName: string = "";
  public ModelId: number = 0;
  public Type: string = "";
  public Versions: Versions[] = [];
}
// export class FormInfo {
//   public Name: string = "";
//   public Previous: string = "";
//   public Current: string = "";
//   public MatchStatus: string = "";
// }
export class ScenarioInfo {
  public ScenarioGuid: string = "";
  public ID_SCE: number = 0;
  public ScenarioName: string = "";
  public IsDatesFromUI: string = "";
  public ChangeSetId: string = "";
  public ProductInfo: [];
  public BookInfo: [];
  public ExecutionType: string = "";
}
export class Risk_Entity {
  public FactorGroupId: string = "";
  public id: number = 0;
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
  public Parents: Attachment[] = [];
  public ParentName: string = "";
  public Is_Checked: boolean = false;
}

export class ScenarioVersions {
  public ScenarioId: number = 0;
  public BookId: number = 0;
  public ISOSceId: number = 0;
  public ISOLOB: string = "";
  public ISOPremium: number = 0;
  public ISOGrossPremium: number = 0;
  public EffectiveDate = new Date();
  public NumberOfPolicies: string = "";
  public ImpactedPolicies: string = "";
  public BenchMarkPremium: string = "";
  public BenchMarkPremiumForPolicy: string = "";
  public Erroredchargedpremium: string = "";
  public ErrorPolicy: string = "";
  public MatchedPolicycount: string = "";
  public ManualPremComparableToISO_CE: string = "";
  public Rateoverridepremium: string = "";
  public Rateoverridepolicy: string = "";
  public comparedPremiumprod2: string = "";
  public BookPremium: string = "";
  public Displacement: string = "";
  public DisplacementPercentage: string = "";
  public Carrier: string = "";
  public Premium: string = "";
  public IsDatesFromUI: boolean = false;
  public IsDatesFromBoth: boolean = false;
  public ProductName: string = "";
  public ProductDisplayName: string = "";
  public ComputedGrossPremium: string = "";
  public CurrentManualPremium: string = "";
  public CurrentChargedPremium: string = "";
  public ProposedManualPremium: string = "";
  public OffBalance: string = "";
  public OffBalancePercentage: string = "";
  public ProposedManualImapact: string = "";
  public ProposedManualImapactPerc: string = "";
}
export class ExternalTableData{
  public Id : string = "00000000-0000-0000-0000-000000000000";
  public SourceLookupName:string = "" ;
  public TargetLookupName: string = "";
  public ColumnMappings: ColumnMapping[] = [];
}
export class ColumnMapping{
  public SourceColumn:string ="";
  public TargetColumn:string = "";
}

export class BOMDesignModel {
  public ID:string="00000000-0000-0000-0000-000000000000";
  public Name:string="";
  public DisplayName:string="";
  public Parent:string="";
  public Updatedby:string="";
  public UpdatedDate=new Date();
  public Type:string="";
  public BureauReference:string="";
  public Category_ID:string="";
  public Workspace_ID:string="00000000-0000-0000-0000-000000000000";
  public SUBTYPE:string="";

}

export class BOMProductEntity {
  public ProductName: string=""
  public ProductId: number = 0;
  public fileUploadPath: string = "";
  public UpdatedBy:string=""
  public Updatedon: string=""
}

export class BomFactorGroup {
  public FactorGroupName: string = "";
  public FgDisplayName: string = "";
  public FgId: string = "";
  public Cardinality: string = "";
  public IsRoot: boolean = false;
  public FgDescription: string = "";
  public Type: string = "";
  public Parent: string = "";
  public OldFGName:string = "";
}

export class BomFactor {
  public FName: string = "";
  public FDisplayName: string = "";
  public FId: string = "";
  public FDescription: string = "";
  public SequenceNumber: number = 0;
  public Cardinality: string = "";
  public SourceType: string = "";
  public FieldType: string = "";
  public Type: string = "";
  public IsValueTable: boolean = false;
  public IsVisible: boolean = false;
  public AttributeType: string = "";
  public IsMandatory: string = "No";
  public IsRatingWorkSheet: boolean = false;
  public IsDimension: string = "No";
  public IsJurisdictionState: string = "No";
  public IsCarrier: boolean = false;
  public DataType: string = "String";
}
export class BOType {
  public BOName: string = "";
  public BODisplayName: string = "";
}
export class BomObject {
  public BomName: string = "";
  public BomDisplayName: string = "";
  public Cardinality: string = "";
  public IsRoot: boolean = false;
  public BomFactorGroupId: string = "";
  public Type: string = "";
  public Parent: string = "";
}
export class AttributeTypes {
  public Name: string = "";
  public DisplayName: string = "";
  public Type: string = "";
}
  export class RequestContext{
    public PageNumber:number;
    public PageSize: number;
    public Id: number | null;
  }
  export class dashboardconfiguration {
  dCId: string;
  documentMasterId: string;
  createdBy: string;
  createdDate: string | null;
  modifiedBy: string;
  modifiedDate: string | null;
  Status: string | null;
}

export class DocumentTypeConfiguration {
  DTCId: string;
  DocumentMasterId: string;
  Documenttypename: string;
  documenttypeprefix: string;
  Description: string;
  Assigntodepartment: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string | null;
}
export class DocumentRequestConfiguration {
  DTCId: string;
  DocumentMasterId: string;
  documenttype: string;
  department: string;
  Description: string;
  Approvedby: string;
  ApprovedOn: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string;
  Purpose: string;
  ApprovalsCount: number;  
}

export class DocumentPreperationConfiguration {
  DTCId: string;
  DocumentMasterId: string;
  Documenttype: string;
  AssignedtoGroup: string;
  Approvedby: string;
  ApprovedOn: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string;
  DocumentTitle: string;
  DocumentNo: string;
  Department: string;
  Template: string;
  Workflow: string;
  Details: string;
  Document: string;
}
export class DocumentEffectiveConfiguration {
  DTCId: string;
  DocumentTitle: string;
  DocumentNo: string;
  DocumentType: string;
  Department: string;
  Document: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string;
}
export class DocumentAdditionalTasks {
  DTCId: string;
  DocumentTitle: string;
  DocumentNo: string;
  DocumentType: string;
  Department: string;
  Document: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string;
}

export class noticationconfiguration {
  nCId: string;
  documentMasterId: string;
  createdBy: string;
  createdDate: string | null;
  modifiedBy: string;
  modifiedDate: string | null;
  Status: string | null;
}
export class workflowconiguration {
  WFCId: string;
  DocumentMasterId: string;
  documentstage: string;
  documenttype: string;
  department: string;
  reviewsCount: number | null;
  approvalsCount: number | null;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string | null;
}
export class DocumentTemplateConfiguration {
  DTID: string;
  DocumentMasterId: string;
  Templatename: string;
  Uniquecode: string;
  documenttype: string;
  header: string;
  rows: string;
  columns: string;
  footer: string;
  footerrows:string;
  footercolumns:string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
  Status: string | null;
}
export class DepartmentConfiguration {
  DPCFId: string;
  HierarchyManagementId: string;
  DepartmentName: string;
  DepartmentCode: string;
  Comments: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
}
export class RoleConfiguration {
  ROCFId: string;
  HierarchyManagementId: string;
  Role: string;
  Department: string;
  Comments: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
}
export class UserConfiguration {
  UCFId: string;
  UserManagementID: string;
  FirstName: string;
  LastName: string;
  UserID: string;
  Department: string;
  Role: string;
  Doj: string;
  Empid: number | null;
  EmailId: string;
  Activedirectory: string;
  Standarduser: string;
  CreatedBy: string;
  CreatedDate: string | null;
  ModifiedBy: string;
  ModifiedDate: string | null;
}
export class WorkItemsConfiguration {
  TaskType: string;
  Stage: string;
  AssignedtoGroup: string;
  InitiatedBy: string;
  InitiatedOn: string; 
  Status: string;
  DueDate: string;
}
