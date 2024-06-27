import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-functional-profile-add-page',
  templateUrl: './functional-profile-add-page.component.html',
  styleUrls: ['./functional-profile-add-page.component.scss']
})
export class FunctionalProfileAddPageComponent {
   fieldsToShow = [
    { key: 'role', label: 'Role Name:' },
    { key: 'roleConfig', label: 'Role Configuration:' },
    { key: 'deptConfig', label: 'Department Configuration:' },
    { key: 'plantMgmt', label: 'Plant Configurationt:' },
    { key: 'userMgmt', label: 'User Configuration:' },
    { key: 'Activatestatus', label: 'Activate/De-Activate:' },
    { key: 'documentTypeConfig', label: 'Document Type Configuration:' },
    { key: 'documentTemplateConfig', label: 'Document Template Configuration:' },
    { key: 'workflowConfig', label: 'Workflow Configuration:' },
    { key: 'documentRequest', label: 'Document Request Configuration:' },
    { key: 'documentPreperation', label: 'Document Preparation Configuration:' },
    { key: 'documentEffective', label: 'Document Effective Configuration:' },
    { key: 'additionalTasks', label: 'Document Repository:' },
    { key: 'workItemsassigned', label: 'Work Assigned To Me:' },
    { key: 'downloadPrint', label: 'Document Print Configuration:' },
    { key: 'docrepository', label: 'Existing Document Request:' },
    { key: 'CreatedBy', label: 'Initiated By:' },
    { key: 'createddate', label: 'Initiated On:' },

  ];
  

  filedsofActivity = [

    
  ]
  constructor(
    private route: ActivatedRoute,
    private commonsvc: CommonService,
    private auditservice: AuditConfiurationService,
    private loader: NgxSpinnerService
  ) { }

  types: AuditConfiguration[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger
      const documentName = this.route.snapshot.queryParams['DocumentName'];
      this.commonsvc.req.type = documentName;
      this.getAuditModuleByName();
    });
  }

  getAuditModuleByName() {
    this.loader.show();
    this.auditservice.getAuditModuleByEntityName(this.commonsvc.req).subscribe((data: any) => {
      this.types = data;
      debugger
      this.loader.hide();
    }, error => {
      this.loader.hide();
      console.error('Error fetching audit module:', error);
    });
  }
}
