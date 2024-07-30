import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditConfiguration } from 'src/app/models/model';
import { AuditConfiurationService } from 'src/app/modules/services/audit-module-service.service';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-audit-user-mananagement-add-page',
  templateUrl: './audit-user-mananagement-add-page.component.html',
  styleUrls: ['./audit-user-mananagement-add-page.component.scss'],
  providers: [DatePipe]
})
export class AuditUserMananagementAddPageComponent {
  fieldsToShow = [
    { key: 'FirstName', label: 'First Name' },
    { key: 'LastName', label: 'Last Name' },
    { key: 'UserID', label: 'User ID' },
    { key: 'Department', label: 'Department' },
   
    { key: 'Role', label: 'Role' },
    { key: 'Doj', label: 'Date of Joining' },
    { key: 'Empid', label: 'Employee ID' },
    { key: 'EmailId', label: 'E-Mail ID' },

  ];

  filedsofActivity = [

    
  ]
  constructor(
    private route: ActivatedRoute,
    private commonsvc: CommonService,
    private auditservice: AuditConfiurationService,
    private loader: NgxSpinnerService,
    private datePipe: DatePipe

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
      data.forEach((item: any) => {
        item.EntityInfo.Doj = this.datePipe.transform(new Date(item.EntityInfo.Doj), 'dd/MM/yyyy')!;
      })
      this.types = data;
      
      this.loader.hide();
    }, error => {
      this.loader.hide();
      console.error('Error fetching audit module:', error);
    });
  }

}
