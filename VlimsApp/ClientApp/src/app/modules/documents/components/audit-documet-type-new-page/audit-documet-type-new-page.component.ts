import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-audit-documet-type-new-page',
  templateUrl: './audit-documet-type-new-page.component.html',
  styleUrls: ['./audit-documet-type-new-page.component.scss']
})
export class AuditDocumetTypeNewPageComponent implements OnInit {

  fieldsToShow = [
    { key: 'Documenttypename', label: 'Document Type Name' },
    { key: 'documenttypeprefix', label: 'Document Type Prefix' },
    { key: 'Assigntodepartment', label: 'Assign To Department' },
    { key: 'Description', label: 'Comments' }
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
