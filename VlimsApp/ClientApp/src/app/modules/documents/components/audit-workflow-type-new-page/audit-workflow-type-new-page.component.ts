import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-audit-workflow-type-new-page',
  templateUrl: './audit-workflow-type-new-page.component.html',
  styleUrls: ['./audit-workflow-type-new-page.component.scss']
})
export class AuditWorkflowTypeNewPageComponent {
  fieldsToShow = [
    { key: 'workflowName', label: 'Workflow Name:' },
    { key: 'code', label: 'Workflow Code' },
    { key: 'documentstage', label: 'Document Stage' },
    { key: 'documenttype', label: 'Document Type' },
    { key: 'departments', label: 'Department' },
    { key: 'UserID', label: 'Reviewer Name' },
    { key: 'Description', label: 'No.of Reviews' },
    { key: 'Description', label: 'Approver Name' },
    { key: 'Description', label: 'No.of Approvals' },
    { key: 'CreatedBy', label: 'Initiated By' },
    { key: 'CreatedDate', label: 'Initiated On' }
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











