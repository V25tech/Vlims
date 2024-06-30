
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-audit-print-new-page',
  templateUrl: './audit-print-new-page.component.html',
  styleUrls: ['./audit-print-new-page.component.scss']
})
export class AuditPrintNewPageComponent {
  constructor(
    private route: ActivatedRoute,
    private commonsvc: CommonService,
    private auditservice: AuditConfiurationService,
    private loader: NgxSpinnerService
  ) { }
  fieldsToShow = [
    { key: 'documenttitle', label: 'Document Title' },
    { key: 'DocumentNumber', label: 'Document Numbe' },
    { key: 'printtype', label: 'Print Type' },
    { key: 'noofcopies', label: 'No Of Copies' },
    { key: 'workflow', label: 'Workflow' },
    { key: 'Template', label: 'Template' },
    { key: 'reason', label: 'Reasons' },
    { key: 'PrintCopy', label: 'PrintCopy' },
    { key: 'CreatedBy', label: 'Printed By' },
    { key: 'ModifiedDate', label: 'Printed Date' },
  ];

  filedsofActivity = [
    { key: 'ModifiedDate', label: 'Initiated Date & Time' },
    //{ key: 'documenttitle', label: 'Activity' },
    { key: 'ModifiedBy', label: 'Activity By' },
    { key: 'Status', label: 'Activity' },
    //  { key: 'reason', label: 'Remarks' }
  ]
  types: AuditConfiguration[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const documentName = this.route.snapshot.queryParams['DocumentName'];
      this.commonsvc.req.type = documentName;
      this.getAuditModuleByName();
    });
  }

  getAuditModuleByName() {
    this.loader.show();
    this.auditservice.getAuditModuleByEntityName(this.commonsvc.req).subscribe((data: any) => {
      debugger
      this.types = data;
      
      this.loader.hide();
    }, error => {
      this.loader.hide();
      console.error('Error fetching audit module:', error);
    });
  }
}
