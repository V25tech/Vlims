
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-audit-dep-add',
  templateUrl: './audit-dep-add.component.html',
  styleUrls: ['./audit-dep-add.component.scss']
})
export class AuditDepAddComponent {
  fieldsToShow = [
    { key: 'DepartmentName', label: 'Department Name:' },
    { key: 'DepartmentCode', label: 'Department Code:' },
    { key: 'Comments', label: 'Comments:' },
    { key: 'CreatedBy', label: 'Initiated By:' },
    { key: 'CreatedDate', label: 'Initiated Oy:' }
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
