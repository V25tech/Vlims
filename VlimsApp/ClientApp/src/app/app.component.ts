import { Component, OnInit,HostListener, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from "./modules/authentication/services/login.service";
import { CommonService } from './shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ExistingDocumentRequest, RequestContext } from './models/model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExistingDocumentRequestService } from './modules/services/existing-document-request.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DocumentManagementSystem';
  isNavOpen: boolean = false;
  isLoggedIn: boolean = false;
  existingDocDatasource: ExistingDocumentRequest[] = [];
  @ViewChild('template') template: TemplateRef<HTMLDivElement> | undefined
  modalRef: BsModalRef | undefined;
  
  constructor(private loginService:LoginService,
    private commonsvc:CommonService,
    private loginsvc:LoginService,
    private toastr:ToastrService,
    private modalService: BsModalService,
    private existingDocumentRequestService: ExistingDocumentRequestService
    ){
      //this.checkSessionTimeoutPeriodically();
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  ngOnInit() {
    this.loginService.loginStatusChanged$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if(status)
        this.existingDocumentAll()
    });
    this.checkSessionTimeoutPeriodically();    
  }

  toggleSidenav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  onLoginSuccess() {
    console.log('from emitter');
    this.isLoggedIn = true;
  }
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetSessionTimeout() {
    this.commonsvc.resetSessionTimeout(30);
  }

  checkSessionTimeoutPeriodically() {
    setInterval(() => {
      console.log('checking');
      if (this.commonsvc.isSessionExpired()) {
        this.toastr.info('Thank you for using our application. You have been successfully logged out.', 'Session Timeout');
        this.loginService.logout();
      }
    }, 30000); // Check every minute (adjust interval as needed)
  }

  
  existingDocumentAll(){
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.existingDocumentRequestService.GetExistingDocumentAll(objrequest).subscribe((data: any) =>{
      //console.log(data?.response); 
      let filterdbyreviewDate = data?.response.filter((p:any) => p.reviewDate);
      
      filterdbyreviewDate = filterdbyreviewDate.filter((item:ExistingDocumentRequest) => {
        const currentDate = new Date();
        const reviewDatePlus15Days = new Date();
        reviewDatePlus15Days.setDate(currentDate.getDate() + 15);
  
        //currentDate.setDate(currentDate.getDate() - 10);
        // Parse reviewDate string to Date object
        const reviewDate = new Date(item.reviewDate??'');
  
        return (reviewDate > currentDate && reviewDate < reviewDatePlus15Days);
      });
      filterdbyreviewDate.forEach((item: any) => {    
        const reviewDate:Date = new Date(item.reviewDate??'');
        item.reviewCountDownValue = this.calculateDiff(reviewDate)
      })
      this.existingDocDatasource = filterdbyreviewDate;
      console.log(filterdbyreviewDate);
      this.openViewer()
    });
  }

  calculateDiff(dateSent: Date){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

  openViewer(): void {   
    if (this.template !== undefined && this.existingDocDatasource && this.existingDocDatasource.length>0) { 
      this.modalRef = this.modalService.show(this.template, { class: 'modal-lg' });    
    }
  }

  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }
}
