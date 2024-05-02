import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DocPrep_LableMapping, DocumentPreperationConfiguration, DocumentTemplateConfiguration, RequestContext, UserConfiguration, WorkItemsConfiguration, workflowconiguration } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { ToastrService } from 'ngx-toastr';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';


@Component({
    selector: 'app-review-prepation',
    templateUrl: './review-prepation.component.html',
    styleUrls: ['./review-prepation.component.scss']
})
export class ReviewPrepationComponent {


    template = new DocumentTemplateConfiguration();
    isButtonDisabled = false;
    preparation: DocumentPreperationConfiguration = new DocumentPreperationConfiguration();
    lstpreparations: DocumentPreperationConfiguration[] = [];
    selectedFile: any;
    isUploaded: boolean = false;
    departmentsSource = [];
    typeSource = [];
    workflowsSource = [];
    workflowsourcedata: workflowconiguration[] = [];
    docNoType = 'User Defined';
    @ViewChild("fileInput", { static: false })
    InputVar: ElementRef | undefined;
    fileBytes: Uint8Array = new Uint8Array();
    modalRef: BsModalRef | undefined;
    pdfBytes: Uint8Array | undefined;
    safePdfDataUrl: SafeResourceUrl | undefined;
    data: string = '<base64-encoded-data>';
    pdfUrl: string | null = null;
    viewMode: boolean = false;
    editMode: boolean = false;
    requestId: number = 0; workId: number = 0; statuss: string = ''; type: string = ''; iscompleted: boolean = false;
    isreview: boolean = false; isapprove: boolean = false; reviewpendingcount = 0;
    username: string = ''
    workitems: Array<WorkItemsConfiguration> = [];
    finalStatus: string = ''
    toastMsg: string | null = null;
    lstusers: UserConfiguration[] = [];
    stageSource = [
        { label: 'Select Stage', value: '' },
        { label: 'Stage 1', value: 'option2' },
        { label: 'Stage 2', value: 'option3' },
    ];
    document_preparaion_mappings = [
        {
            plantCode: "HP",
            plantName: "Himachal",
            clientInfo: "Accent",
            operatingProcedure: "BATCH PACKING RECORD",
            lables: {
                "documentTitle": "Product Name",
                "documentNumber": "BPR No",
                "revisionNo": "Revision No.",
                "supersedesNo": "BPR Supersedes No."
            }
        },
        {
            plantCode: "HP",
            plantName: "Himachal",
            clientInfo: "Accent",
            operatingProcedure: "BATCH MANUFACTURING RECORD",
            lables: {
                "documentTitle": "Product Name",
                "documentNumber": "BMR No",
                "revisionNo": "Revision No.",
                "supersedesNo": "BMR Supersedes No."
            }
        },
        {
            plantCode: "MP",
            plantName: "Indore",
            clientInfo: "Aurabindo",
            operatingProcedure: "Standard Operating Procedure",
            lables: {
                "documentTitle": "Title",
                "documentNumber": "SOP No.",
                "revisionNo": "Revision No.",
                "supersedesNo": "Supersedes"
            }
        },
        {
            plantCode: "MP",
            plantName: "Indore",
            clientInfo: "Aurabindo",
            operatingProcedure: "Validation Protocol",
            "lables": {
                "documentTitle": "Generic Name",
                "documentNumber": "STP No.",
                "revisionNo": "Revision No.",
                "supersedesNo": "Supersedes No.",
                "reference": "Reference",
                "sampleQuantity": "Sample Quantity",
                "packingInformation": "Packing Information",
                "labelClaim": "Label Claim",
                "productCode": "Product/MaterialCode"
            }
        },
        {
            plantCode: "MP",
            plantName: "Indore",
            clientInfo: "Aurabindo",
            operatingProcedure: "STANDARD TESTING PROCEDURE",
            "lables": {
                "documentTitle": "Generic Name",
                "documentNumber": "STP No.",
                "revisionNo": "Revision No.",
                "supersedesNo": "Supersedes No.",
                "reference": "Reference",
                "sampleQuantity": "Sample Quantity",
                "packingInformation": "Packing Information",
                "labelClaim": "Label Claim",
                "productCode": "Product/MaterialCode"
            }
        },
        {
            plantCode: "MP",
            plantName: "Indore",
            clientInfo: "Aurabindo",
            operatingProcedure: "STANDARD TESTING SPECIFICATION",
            "lables": {
                "documentTitle": "Generic Name",
                "documentNumber": "STP No.",
                "revisionNo": "Revision No.",
                "supersedesNo": "Supersedes No.",
                "reference": "Reference",
                "sampleQuantity": "Sample Quantity",
                "packingInformation": "Packing Information",
                "labelClaim": "Label Claim",
                "productCode": "Product/MaterialCode"
            }
        }
    ]
    templatesSource: Array<DocumentTemplateConfiguration> = [];
    templatesSourceall: Array<DocumentTemplateConfiguration> = [];
    lableMappings: DocPrep_LableMapping | undefined;
    istemplate: boolean = false;
    isworkflow: boolean = false;
    istemplateused: boolean = false;
    isrevision: boolean = false;
    clonetemp: DocumentTemplateConfiguration = new DocumentTemplateConfiguration();
    constructor(private location: Location, private router: Router,
        private workitemssvc: WorkitemsService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private http: HttpClient,
        private userssvc: UsersconfigurationService,
        private modalService: BsModalService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private docPreperationService: DocumentPreperationService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private templateService: DocumentTemplateServiceService) { }

    ngOnInit() {
        this.getusers();

        const user = localStorage.getItem("username");
        if (user != null && user != undefined) {
            this.commonsvc.createdBy = user;
            this.username = user;
        }
        this.route.params.subscribe(params => {
            this.requestId = params['requestId'];
            this.workId = params['workId'];
            this.type = params['type'];
        });
        const urlPath = this.router.url;
        const segments = urlPath.split('/');
        if (this.type == 'view') {
            this.viewMode = true;
            this.getbyId(this.requestId);
            
            this.getworkflowitems();
        }
        else if (this.commonsvc.preperation.dpnid) {
            this.preparation = this.commonsvc.preperation;
            if (this.preparation.template != '' && this.preparation.template != undefined) {
                this.istemplate = true;
            }
            if (this.preparation.wokflow != '' && this.preparation.wokflow != undefined) {
                this.isworkflow = true;
            }
            if (!this.istemplate && this.isrevision)
                this.preparation.status = 'In-Progress';
            this.buildPrepdocument();
            this.onBodyFileExistsCheck();
            this.getLabelMappings();
        }
        else {
            this.location.back();
        }
        this.getdocttemplate();
        this.getworkflowinfo();
        this.getpreparations();
    }
    getpreparations() {
        this.spinner.show();
        this.docPreperationService.getdocumentpreparations(this.commonsvc.req).subscribe((data: any) => {
            this.lstpreparations = data.response;
            this.spinner.hide();
        });
    }
    getbyId(arg0: number) {
        this.spinner.show();
        return this.docPreperationService.getbyId(arg0).subscribe((data: any) => {
            this.preparation = data;
            if (this.preparation.template != '' && this.preparation.template != undefined) {
                this.istemplate = true;
            }
            this.buildPrepdocument();
            this.onBodyFileExistsCheck();
            this.getLabelMappings();
            this.spinner.hide();
        });
    }
    getworkflowinfo() {
        let objrequest: RequestContext = { PageNumber: 1, PageSize: 100, Id: 0 };
        this.spinner.show();
        this.wfservice.getworkflow(this.commonsvc.req).subscribe((data: any) => {
            this.workflowsourcedata = data.Response;
            this.workflowsourcedata = this.workflowsourcedata.filter(o => o.documentstage?.includes("Preparation"));
            this.workflowsourcedata = this.workflowsourcedata.filter(o => o.documenttype?.toLocaleLowerCase() === this.preparation.documenttype.toLocaleLowerCase());
            this.spinner.hide();
        });
    }
    proceed(esign: TemplateRef<any>) {
        // Open the modal
        this.modalRef = this.modalService.show(esign, { class: 'modal-lg' });
    }

    getusers() {

        let objrequest = new RequestContext();
        objrequest.PageNumber = 1; objrequest.PageSize = 50;
        return this.userssvc.getusers(objrequest).subscribe((data: any) => {
            this.lstusers = data.Response;
            //localStorage.setItem("lstusers", this.lstusers.);


        });
    }

    confirmApproval() {
        const username = localStorage.getItem('username') || '';
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
        if (userExists) {

            this.preparation.ModifiedBy = this.username;
            this.preparation.status = this.finalStatus;
            if (this.isapprove && this.reviewpendingcount > 0) {
                this.toastr.error('Reviews Pending');
            }
            else {
                this.toastMsg = this.preparation.status;
                this.savePreparation();
            }

        } else {// Username or password is invalid, display error message
            this.toastr.error('Invalid Username or Password');
        }
    }

    confirmReturn() {
        const username = localStorage.getItem('username') || '';
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
        if (userExists) {
            this.location.back();
            this.preparation.ModifiedBy = this.commonsvc.getUsername();
            this.preparation.status = 'Returned';
            this.toastMsg = this.preparation.status;
            this.savePreparation();
        } else {// Username or password is invalid, display error message
            this.toastr.error('Invalid Username or Password');
        }
    }

    confirmReject() {
        const username = localStorage.getItem('username') || '';
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
        if (userExists) {

            this.preparation.ModifiedBy = this.commonsvc.getUsername();
            this.preparation.status = 'Rejected';
            this.toastMsg = this.preparation.status;
            this.savePreparation();
            //this.location.back();

        } else {// Username or password is invalid, display error message
            this.toastr.error('Invalid Username or Password');
        }
    }

    savePreparation() {
        this.spinner.show();
      if (!this.viewMode && (this.preparation.status == 'Rejected' || this.preparation.status == 'Returned')) {
            this.preparation.status = 'In-Progress';
        }
        if (this.viewMode && this.preparation.status != 'Rejected' && this.preparation.status != 'Returned') {
            this.preparation.ModifiedBy = this.commonsvc.createdBy;
            this.preparation.status = this.finalStatus;
        }
        if (this.lstpreparations != undefined && this.lstpreparations.length > 0) {
            const existingPreparation = this.lstpreparations.find(o => o.documentno.toLowerCase() === this.preparation.documentno.toLowerCase() && o.dpnid != this.preparation.dpnid);
            if (existingPreparation) {
                this.toastr.error("Duplicate Document No.");
                return;
            }
        }
        if (this.istemplateused) {
            debugger
            this.templateService.adddoctemplate(this.clonetemp).subscribe((data: any) => {
            });
        }
        this.toastMsg = this.toastMsg ?? 'Updated';
        if (!this.isButtonDisabled) {
            this.isButtonDisabled = true;
            this.docPreperationService.ManageDocument(this.preparation).subscribe(res => {
                this.commonsvc.preperation = new DocumentPreperationConfiguration();
                this.toastr.success(`Document Preparation ${this.toastMsg}  successfully`);
                this.spinner.hide();
                this.uploadFIle();
                this.location.back();
                this.isButtonDisabled = false;
            }, er => {
                console.log(er);
                this.spinner.hide();
            });
        }
    }

    onCancel() {
        this.location.back();
    }

    closeModel() {
        if (this.modalRef)
            this.modalRef.hide();
    }

    openViewer(template: TemplateRef<any>): void {

        // if (this.pdfBytes) {
        //   const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
        //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
        //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
        //   debugger

        //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
        // }
        this.getUrl(template);
    }
    getUrl(template: TemplateRef<any>): void {
        this.templateService.geturl().subscribe((data: any) => {
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data + '#toolbar=0') as string;
            this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
        })
    }

    // Function to convert base64 to Blob
    private b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    getTemplate() {
        let id = 0;
        const obj = this.templatesSource.find(o => o.Templatename === this.preparation.template);
        if (obj != null && obj != undefined) {
            id = parseInt(obj.DTID);
        }
        this.templateService.getTemplate(this.preparation.template, parseInt(this.preparation.dpnid)).subscribe((data: any) => {
            this.template = data;
        }, er => {

        });
    }
    istemplatecheck(event: any) {
        debugger
        this.spinner.show();
        this.istemplateused = false;
        this.templateService.isduplicate(this.preparation.template).subscribe((data: any) => {
            this.istemplateused = Boolean(data);
            if (this.istemplateused) {
                this.gettemplatebyId();
            }
            this.spinner.hide();
        })
    }
    getShortUniqueId(): string {
        // Generate a timestamp
        const timestamp = Date.now().toString(36);

        // Generate a random number (4 characters)
        const randomNumber = Math.random().toString(36).substr(2, 4);

        // Combine timestamp and random number to form the unique identifier
        const uniqueId = timestamp + randomNumber;

        return uniqueId;
    }
    gettemplatebyId() {
        this.spinner.show();
        let id = this.templatesSource.find(o => o.Templatename.toLowerCase() === this.preparation.template.toLowerCase())?.DTID;
        if (id != '' && id != undefined) {
            this.templateService.getbyId(parseInt(id)).subscribe((data: any) => {
                this.clonetemp = data;
                this.clonetemp.PreparationId = parseInt(this.preparation.dpnid);
                this.clonetemp.Isclone = true;
                this.clonetemp.Templatename += "--" + this.getShortUniqueId();
                if (!this.preparation.isRevision) {
                    this.clonetemp.Page = []
                }
                this.spinner.hide();
            });
        }
    }
    checkduplicatetemplate(template: TemplateRef<any>) {
        this.templateService.isduplicate(this.preparation.template).subscribe((data: any) => {
            const isduplicate = Boolean(data);
            // if (isduplicate) {
            //   this.toastr.error('Template used in multiple preparations unable to view document');
            // } else {
            //   this.previewtemplate(template);
            // }
            this.previewtemplate(template);
        })
    }
    previewtemplate(template: TemplateRef<any>) {
        this.spinner.show(); let id = 0;
        let obj = this.templatesSource.find(o => o.Templatename === this.preparation.template);
        if (obj != null && obj != undefined) {
            id = parseInt(obj.DTID);
        }
        this.templateService.getTemplate(this.preparation.template, parseInt(this.preparation.dpnid)).subscribe((data: any) => {
            // this.docPreperationService.previewtemplate(id).subscribe((data: any) => {
            this.fileBytes = data;
            this.pdfBytes = this.fileBytes;
            this.spinner.hide();
            this.openViewer(template);
        }, er => {
            this.spinner.hide();
        });
    }

    getdocttemplate() {
        this.spinner.show();
        this.templateService.getdocttemplate(this.commonsvc.req).subscribe((data: any) => {

            this.templatesSource = data.Response;
            this.templatesSourceall = data.Response;
            this.templatesSource = this.templatesSource.filter(o => o.documenttype.toLowerCase() === this.preparation.documenttype.toLowerCase());
            // if (this.preparation.template == null || this.preparation.template == undefined || this.preparation.template == '') {

            //   const filter = this.templatesSource.find(o => !o.IsParent);
            //   this.templatesSource = filter ? [filter] : [];
            //   this.spinner.hide();
            // }
            // else
            // { this.spinner.hide();}
            this.spinner.hide();
        });
    }
    getworkflowitems() {
        this.spinner.show();
        const user = localStorage.getItem("username");
        if (user != null && user != undefined) {
            this.commonsvc.createdBy = user;
        }
        return this.workitemssvc.getworkitems(this.commonsvc.req).subscribe((data: any) => {

            this.workitems = data.Response;
            if (this.workitems.length > 0) {
                this.workitems = this.workitems.filter(p => p.ReferenceId == this.requestId && p.TaskType == 'Preparation');
                if (this.workitems) {
                    this.workitems.sort((a, b) => a.WITId - b.WITId);
                    const work = this.workitems.filter(o => o.WITId == this.workId);
                    this.statuss = work[0].ActionType;
                    this.iscompleted = work[0].IsCompleted;
                    const totalreviewcount = this.workitems.filter(o => o.ActionType === this.statuss).length;
                    const totalapprovecount = this.workitems.filter(o => o.ActionType === this.statuss).length;
                    this.reviewpendingcount = this.workitems.filter(o => o.ActionType === 'Review' && o.IsCompleted == false).length;
                    const reviewedcount = this.workitems.filter(o => o.ActionType === this.statuss && o.IsCompleted).length;
                    const approvedcount = this.workitems.filter(o => o.ActionType === this.statuss && o.IsCompleted).length;
                    const countt = totalreviewcount - reviewedcount;
                    const approvecountt = totalapprovecount - approvedcount;
                    if (this.statuss === 'Review') {
                        this.isreview = true;
                        if (countt === 1 || countt == 0) {
                            this.finalStatus = 'Reviewed';
                        } else if (countt > 1) {
                            this.finalStatus = 'Pending Review';
                        } else if (countt === totalreviewcount) {
                            this.finalStatus = 'Pending Review';
                        }
                    } else {
                        if (approvecountt === 1 || approvecountt == 0) {
                            this.isapprove = true;
                            this.finalStatus = 'Approved';
                        } else if (countt > 1) {
                            this.finalStatus = 'Pending Approve';
                        } else if (countt === totalreviewcount) {
                            this.finalStatus = 'Pending Approve';
                        }
                    }
                }
            }
            this.spinner.hide();
        });
    }
    edittemplate(template: string) {
        debugger
        const obj = this.templatesSource.find(o => o.Templatename === template);
        const isclone = this.templatesSourceall.find(o => o.PreparationId == parseInt(this.preparation.dpnid));
        if (isclone != null && isclone != undefined && obj != null && obj != undefined) {
            this.router.navigate(['/templates/body/prep', obj?.DTID, isclone.DTID]);
        }
        else {
            if (obj != null && obj != undefined) {
                this.router.navigate(['/templates/body', obj.DTID]);
            }
        }
    }

    getLabelMappings() {
        debugger
        let exist = this.document_preparaion_mappings.find((p: any) => p.operatingProcedure.toLowerCase() == this.preparation.documenttype.toLowerCase());
        if (exist) {
            this.lableMappings = exist.lables as DocPrep_LableMapping;
        }
    }

    buildPrepdocument() {
        if (!this.preparation.prepdocument) {
            this.preparation.prepdocument = {
                labelClaim: '',
                packingInformation: '',
                revisionNo: '',
                sampleQuantity: '',
                supersedesNo: '',
                productCode: '',
                reference: ''
            };
        }
    }

    onBodyFileExistsCheck(){
      this.templateService.checkFileExist(this.preparation.documentno)
      .subscribe(
        (response: any) => { this.isUploaded = response;},
        (ex) => {
          console.error('Error uploading file:', ex);
          this.isUploaded = false;
        }
      );
    }
  
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    uploadFIle(){
      if (!this.selectedFile) {
        console.error('No file selected.');
        return;
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.templateService.upload(formData, this.preparation.documentno)
        .subscribe(
          (response: any) => {
  
            this.preparation.path = response.filePath;
            this.preparation.document = response.filePath;
            this.commonsvc.preperation = this.preparation;
            this.isUploaded = true; // Set upload status to true after successful upload
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
    }
    onDeleteFile(): void {
      this.selectedFile = null;
      this.isUploaded = false;
      if (this.InputVar) this.InputVar.nativeElement.value = "";
      this.spinner.show();
      this.templateService.deleteFile(this.preparation.documentno)
      .subscribe(
        (response: any) => {         
          this.isUploaded = !response;
          this.spinner.hide();
        },
        (ex) => {
          console.error('Error uploading file:', ex);
          this.isUploaded = false;
          this.spinner.hide();
  
        }
      );
    }
  
}
