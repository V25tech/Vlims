
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration, DocumentPreperationConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'app-audit-preparation-new-page',
  templateUrl: './audit-preparation-new-page.component.html',
  styleUrls: ['./audit-preparation-new-page.component.scss']
})
export class AuditPreparationNewPageComponent {

  fieldsToShow = [
    { key: 'documenttitle', label: 'Title' },
    { key: 'documentno', label: 'SOP No.' },
    { key: 'documenttype', label: 'Document Type' },
    { key: 'department', label: 'Department' },
    { key: 'wokflow', label: 'Workflow' },
    { key: 'template', label: 'Template' },
    { key: 'RevisionNo', label: 'Revision No.' },
    { key: 'supersedesNo', label: 'Supersedes' },
    { key: 'template', label: 'View Document' },
    { key: 'details', label: 'Document Details' }
  ];

  filedsofActivity = [
    { key: 'ModifiedDate', label: 'Initiated Date & Time' },
    //{ key: 'documenttitle', label: 'Activity' },
    { key: 'ModifiedBy', label: 'Activity By' },
    { key: 'Status', label: 'Activity' },
  //  { key: 'reason', label: 'Remarks' }
  ]
  groupedRecords: { [key: number]: any[] } = {};
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
      this.groupRecordsByRevisionNumber();
      this.loader.hide();
    }, error => {
      this.loader.hide();
      console.error('Error fetching audit module:', error);
    });
  }
  groupRecordsByRevisionNumber() {
    this.types.forEach((record: any) => {
      let revisionNumber = record.RevisionNumber;
      if (!this.groupedRecords[revisionNumber]) {
        this.groupedRecords[revisionNumber] = [];
      }
      this.groupedRecords[revisionNumber].push(record);
    });
  }
}
