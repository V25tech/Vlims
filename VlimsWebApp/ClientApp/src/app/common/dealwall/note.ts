
export class BaseDealwallItem {
    public Id: number;
    public RequestId: number;
    public TenantId: number;
    public ApplicationId: number;
    public UserId: number;
    public Description: string;
    public Context: string;
    public CallBackURI: string;
    public EntityType: any;
    public EntityId: any;
}

export class Note extends BaseDealwallItem {
    public Subject: string;
    public Status: string;
    public RequestId: number;
    public TenantId: number;
    public DiaryItemType: string;
    public DiaryItemId: string;
    public CreatedDate: Date;
    public ReminderDate: string;
    public NextReminderDate: string;
    public Dismiss: boolean;
    public ReminderType: number;
    public Priority: string;
    public AssignedTo: string;
    public CreatedBy: string;
    public FileName: string;
    public FileType: string;
    public Url: string;
    public ReferenceId: string;
    public NotesType: string;
    public Attachments: Array<any>;
    public FileNameExt: any;
    public type:any;
    constructor() {
        super();
        this.Subject = '';
        this.Status = '';
        this.RequestId = 0;
        this.TenantId = 0;
        this.ApplicationId = 0;
        this.DiaryItemType = '';
        this.DiaryItemId = '';
        this.Description = '';
        this.ReminderDate = '';
        this.NextReminderDate = '';
        this.Dismiss = false;
        this.ReminderType = 0;
        this.CallBackURI = '';
        this.Context = '';
        this.Priority = '';
        this.AssignedTo = '';
        this.CreatedBy = '';
        this.FileName = '';
        this.FileType = '';
        this.Url = '';
        this.ReferenceId = '';
        this.NotesType = '';
        this.type='';
    }
}
export const notetypes = [
    { 'value': 'Work log', 'text': 'Work log' },
    { 'value': 'Correspondence', 'text': 'Correspondence N.O.C' },
    { 'value': 'Policy Info', 'text': 'Policy Info' },
    { 'value': 'Application', 'text': 'Application' },
    { 'value': 'Supplemental Info', 'text': 'Supplemental Info' },
    { 'value': 'Building Valuation', 'text': 'Building Valuation' },
    { 'value': 'Loss Control/Recs', 'text': 'Loss Control/Recs' },
    { 'value': 'Endorsements', 'text': 'Endorsements' },
    { 'value': 'Financial/D&B', 'text': 'Financial/D&B' },
    { 'value': 'Certificates', 'text': 'Certificates' },
    { 'value': 'Reinsurance', 'text': 'Reinsurance' },
    { 'value': 'Claims/CRU', 'text': 'Claims/CRU' },
    { 'value': 'Rating/Instruction', 'text': 'Rating/Instruction' },
    { 'value': 'IRPM Worksheets', 'text': 'IRPM Worksheets' },
    { 'value': 'WorkSheets', 'text': 'WorkSheets' },
    { 'value': 'Referral', 'text': 'Referral' },
    { 'value': 'Cancellation/Non-Renewal', 'text': 'Cancellation/Non-Renewal' },
    { 'value': 'Loss runs', 'text': 'Loss runs' },
    { 'value': 'Rewrite', 'text': 'Rewrite' },
    { 'value': 'Quotation', 'text': 'Quotation' },
    { 'value': 'Declination', 'text': 'Declination' },
    { 'value': 'Reinstatement', 'text': 'Reinstatement' },
    { 'value': 'Others', 'text': 'Others' },
    { 'value': 'Renewal', 'text': 'Renewal' },
]

export class Attachment extends BaseDealwallItem {
    public DiaryItemType: string;
    public DiaryItemId: string;
    public FileName: string;
    public FileType: string;
    public Type: string;
    public Author: string;
    public Url: string;
    public ReferenceId: string;
    public MetaData: string;
    public FileNameExt: string;
    public Subject: string;
    public Context: string;
    public CallBackURI: string;
    public NotesType: string;
    public File: any;
}
export const documenttypes = [
    { 'value': 'Application', 'text': 'Application' },
    { 'value': 'Building Valuation', 'text': 'Building Valuation' },
    { 'value': 'Cancellation/Non-Renewal', 'text': 'Cancellation / Non - Renewal' },
    { 'value': 'Certificates', 'text': 'Certificates' },
    { 'value': 'Claims/CRU', 'text': 'Claims / CRU' },
    { 'value': 'Correspondence N.O.C', 'text': 'Correspondence N.O.C' },
    { 'value': 'Endorsements', 'text': 'Endorsements' },
    { 'value': 'Financial/D&B', 'text': 'Financial / D & B' },
    { 'value': 'IRPM Worksheets', 'text': 'IRPM Worksheets' },
    { 'value': 'Loss Control/Recs', 'text': 'Loss Control / Recs' },
    { 'value': 'Loss runs', 'text': 'Loss runs' },
    { 'value': 'Others', 'text': 'Others' },
    { 'value': 'Policy Info', 'text': 'Policy Info' },
    { 'value': 'Quotation', 'text': 'Quotation' },
    { 'value': 'Rating/Instruction', 'text': 'Rating / Instruction' },
    { 'value': 'Referral', 'text': 'Referral' },
    { 'value': 'Reinstatement', 'text': 'Reinstatement' },
    { 'value': 'Reinsurance', 'text': 'Reinsurance' },
    { 'value': 'Renewal', 'text': 'Renewal' },
    { 'value': 'Rewrite', 'text': 'Rewrite' },
    { 'value': 'Supplemental Info', 'text': 'Supplemental Info' },
    { 'value': 'Work log', 'text': 'Work log' },
    { 'value': 'Work Sheets', 'text': 'Work Sheets' },
]
export const attachmentsallowfiletypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "text/plain", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/pdf", "image/png", "image/jpeg", "image/jpg", "image/*"];