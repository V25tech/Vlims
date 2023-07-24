import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateForm} from '../../models/templates';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  templatesDatasource: TemplateForm[] = [];
  constructor(private router:Router) {}

  ngOnInit() {
    
  }

  navigateToAddTemplate(): void {
    this.router.navigate(['/templates/add']);
  }

  filterTable(event:any) {
    // Filter the data based on the templateName column
   const filterValue = event?.target.value
    this.templatesDatasource = this.templatesDatasource.filter(item => item.templateName.toLowerCase().includes(filterValue.toLowerCase()));
  }



  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else {
      return '';
    }
  }
}
