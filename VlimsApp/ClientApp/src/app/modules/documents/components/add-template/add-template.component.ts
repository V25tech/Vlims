import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { TemplateForm } from '../../models/templates';

interface SelectOption {
  name: string;
  value: number;
}

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss'],
})
export class AddTemplateComponent implements OnInit {
  showGrid: boolean = false;
  rows: number = 0;
  cols: number = 0;
  rowsArray: number[] = [];
  colsArray: number[] = [];
  gridData: any = [];

  footerRows: number = 0;
  footerCols: number = 0;
  rowsFooterArray: number[] = [];
  colsFooterArray: number[] = [];
  gridFooterData: any = [];

  selectOptions: SelectOption[] = [
    { name: 'Label', value: 1 },
    { name: 'Field', value: 2 },
    { name: 'Property', value: 3 },
    { name: 'Custom', value: 4 },
  ];

  templateForm: TemplateForm = {
    id: 0,
    templateName: '',
    uniqueCode: 'System Generated',
    description: '',
    docType:'',
    selectedDepartments: [],
    status: '',
  };

  constructor(
    private location: Location,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.rows = 1;
    this.cols = 1;
    this.generateTeplateGrid();

    this.footerRows = 1;
    this.footerCols = 1;
    this.generateFooterGrid();
  }

  addTemplate() {
    //this.documentService.addTemplate(this.templateForm).subscribe(() => {
    this.router.navigate(['/templates']);
    //});
  }

  onCancel() {
    this.location.back();
  }

  generateTeplateGrid() {
    this.showGrid = true;
    // Set the number of rows and columns based on user input
    // this.rows = 5;
    // this.cols = 5;
    this.rowsArray = Array.from({ length: this.rows });
    this.colsArray = Array.from({ length: this.cols });

    this.gridData = [];
    for (let i = 0; i < this.rows; i++) {
      const row: any[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push({ selectedOption: 1, inputValue: '' });
      }
      this.gridData.push(row);
    }
  }

  generateFooterGrid() {
    this.showGrid = true;
    this.rowsFooterArray = Array.from({ length: this.footerRows });
    this.colsFooterArray = Array.from({ length: this.footerCols });

    this.gridFooterData = [];
    for (let i = 0; i < this.footerRows; i++) {
      const row: any[] = [];
      for (let j = 0; j < this.footerCols; j++) {
        row.push({ selectedOption: 1, inputValue: '' });
      }
      this.gridFooterData.push(row);
    }
  }

  getDataFromGrid(): void {
    console.log(this.gridData);
  }
  
}
