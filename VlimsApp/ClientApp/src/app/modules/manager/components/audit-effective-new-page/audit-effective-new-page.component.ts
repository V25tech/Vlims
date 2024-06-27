
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-audit-effective-new-page',
  templateUrl: './audit-effective-new-page.component.html',
  styleUrls: ['./audit-effective-new-page.component.scss']
})
export class AuditEffectiveNewPageComponent {
  fieldsToShow = [
    { key: 'documenttitle', label: 'Document Title' },
    { key: 'documentno', label: 'Document Numbe' },
    { key: 'documenttype', label: 'Document Type' },
    { key: 'department', label: 'Department' },
    { key: 'wokflow', label: 'Workflow' },
    { key: 'template', label: 'Template' },
    { key: 'RevisionNo', label: 'Effective Date:' },
    { key: 'supersedesNo', label: 'Effective Date:' },

  ];

  filedsofActivity = [
    { key: 'ModifiedDate', label: 'Initiated Date & Time' },
    //{ key: 'documenttitle', label: 'Activity' },
    { key: 'ModifiedBy', label: 'Activity By' },
    { key: 'Status', label: 'Activity' },
  //  { key: 'reason', label: 'Remarks' }
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
      const documentName = this.route.snapshot.queryParams['DocumentName'];
      this.commonsvc.req.type = documentName;
      this.getAuditModuleByName();
    });
  }

  getAuditModuleByName() {
    this.loader.show();
    this.auditservice.getAuditModuleByEntityName(this.commonsvc.req).subscribe((data: any) => {
      this.types = data;
      
      this.loader.hide();
    }, error => {
      this.loader.hide();
      console.error('Error fetching audit module:', error);
    });
  }
}
