import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { TemplateForm } from '../../models/templates';
import { DocumentTemplateConfiguration, DocumentTypeConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarSettingsModel, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';



interface SelectOption {
  name: string;
  value: number;
}
interface stage {
  label:string;
  value:string;
}
interface Page {
  text: string;
  pagenumber: number;
  pagetype: string;
  bodyData: BodyDataElement[][];
  header:string;
  footer:string;
  istext:boolean;
  isgrid:boolean;
  istextposition:boolean;
  isheader:boolean;
  isfooter:boolean;
}
interface BodyDataElement {
  selectedOption: number;
  inputValue: string;
}
@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService],
  //encapsulation: ViewEncapsulation.None

})
export class AddTemplateComponent implements OnInit {

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'FormatPainter', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|',
      'CreateTable','|',
      'Image', '|', 'FullScreen']
  };
  public fontFamily = {
    default: 'Times New Roman',
    width: '60px',
  };

  public pasteCleanupSettings: object = {
    prompt: true,
    plainText: false,
    keepFormat: false,
    deniedTags: ['a'],
    deniedAttrs: ['class', 'title', 'id'],
    allowedStyleProps: ['color', 'margin', 'font-size']
  };
  public size = {
    default: '12pt',
    items: [
      { text: '10', value: '10pt' },
      { text: '12', value: '12pt' },
      { text: '14', value: '14pt' },
      { text: '16', value: '16pt' },
      { text: '18', value: '18pt' },
      { text: '24', value: '24pt' },
      { text: '36', value: '36pt' },
      { text: '42', value: '42pt' }]
  };

  public quickToolbarSettings: QuickToolbarSettingsModel = {
    table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles']
  };

  stageSource:stage[] = [
    { label: 'Title', value: 'Title' },
    { label: 'SOP No.', value: 'Preparation' },
    { label: 'Revision No.', value: 'Effective' },
    { label: 'Supersedes', value: 'Print' },
    { label: 'Department', value: 'Print' },
    { label: 'Page No.', value: 'Print' },
    { label: 'Effective Date', value: 'Print' },
    { label: 'Review Date', value: 'Print' },
    { label: 'Prepared By', value: 'Print' },
    { label: 'Checked By', value: 'Print' },
    { label: 'Approved By', value: 'Print' },
    { label: 'Signature', value: 'Print' },
    { label: 'Date', value: 'Print' },
    { label: 'Name', value: 'Print' },
    { label: 'Designation', value: 'Print' },
    { label: 'Department', value: 'Print' },
    { label: 'Custom', value: 'Print' },
  ];
  selectedStage:stage[]=[];
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  isButtonDisabled = false;
  html = '';html1='';html2='';
  numOfPages: number = 1;
  pages: Page[] = [{ text: '', pagenumber: 1, pagetype: 'text', bodyData: [],istext:false,isgrid:false,istextposition:false,isheader:true,isfooter:true,header:'',footer:'' }];
  currentPage: number = 0;
  id:number=0;
  title:string='New Document Template';
  typesDatasource: DocumentTypeConfiguration[] = [];
  selectedtype=new DocumentTypeConfiguration();
  templateForm=new DocumentTemplateConfiguration();
  templatecloneForm=new DocumentTemplateConfiguration();
  grid:DocumentTemplateConfiguration[]=[];
  showGrid: boolean = false;
  rows: number = 0;bodyrows:number=1;
  cols: number = 0;bodycols:number=2;
  headerRow:number=0;
  headerColumn:number=0;
  headerrowarray:number[]=[];
  headercolarray:number[]=[];
  rowsArray: number[] = [];
  colsArray: number[] = [];
  gridData: any = [];
  headerData:any=[];
  bodyData:any=[];
  footerRows: number = 0;
  footerCols: number = 0;
  rowsFooterArray: number[] = [];
  colsFooterArray: number[] = [];
  gridFooterData: any = [];
  isSumbited = false;
  isprep=false;
  segments:string[]=[]
  preptempid:number=0
  selectOptions: SelectOption[] = [
    { name: 'Label', value: 1 },
     { name: 'Value', value: 2 },
    // { name: 'Property', value: 3 },
    // { name: 'Custom', value: 4 },
  ];
  viewMode:boolean=false;editMode:boolean=false;isbody:boolean=false;
  // templateForm: TemplateForm = {
  //   id: 0,
  //   templateName: '',
  //   uniqueCode: 'System Generated',
  //   description: '',
  //   docType:'',
  //   selectedDepartments: [],
  //   status: '',
  // };



  constructor(private toastr: ToastrService,
    private location: Location,
    private doctypeservice:DocumentTypeServiceService,
    private loader:NgxSpinnerService,
    private commonsvc:CommonService,
    private templatesvc:DocumentTemplateServiceService,
    private router: Router,private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      html: new FormControl('', Validators.required)
    });
    this.form1= this.fb.group({
      html1: new FormControl('', Validators.required)
    });
    this.form2= this.fb.group({
      html2: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    debugger
    const urlPath = this.router.url;
    this.segments = urlPath.split('/');
    let lastSegment=''
    const value=this.segments.filter(o=>o==='prep')
      if(value!=null && value!=undefined && value.length>0){
        this.isprep=true;
        lastSegment = this.segments[this.segments.length - 3];
      }
      else{
     lastSegment = this.segments[this.segments.length - 2];
      }
      //lastSegment = this.segments[this.segments.length - 2];
    this.rows = 1;
    this.cols = 2;
    this.generateTeplateGrid();
    this.footerRows = 1;
    this.footerCols = 2;
    this.generateFooterGrid();
    this.headerRow=1;
    this.headerColumn=1;
    this.generateheaderrow();
   
    //  this.generateP();

    if(urlPath.includes("add"))
    {
     let addcount=parseInt(this.segments[this.segments.length - 1],10);
     addcount++;
    this.templateForm.Uniquecode="Temp "+addcount;  
    this.templateForm.Pages=1;
    }
    else if(lastSegment=="edit")
    {
      this.title='Edit Document Template';
      this.editMode=true;
        let id=parseInt(this.segments[this.segments.length-1],10);
        this.id=id;
        //this.getbyId(id);
    }
    else if(lastSegment=="view")
    {
      ;
      this.title='View Document Template';
      this.viewMode=true;
        let ide=this.segments[this.segments.length-1];
        this.getbyId(parseInt(this.segments[this.segments.length - 1]));
    }
    else if(lastSegment=="prep"){
      
      this.title='Edit Document Template';
      this.editMode=true;
      this.isbody=true;
      this.isprep=true;
        let id=parseInt(this.segments[this.segments.length-2],10);
        this.id=id;
    }
    else if(lastSegment=="body")
    {
      this.title='Edit Document Template';
      this.editMode=true;
      this.isbody=true;
        let id=parseInt(this.segments[this.segments.length-1],10);
        this.id=id;
        //this.getbyId(id);
    }
    this.getTemplates();
    this.getdocumenttypeconfig();
  }
  
  //config: any = {
  //  airMode: false,
  //  tabDisable: true,
  //  popover: {
  //    table: [
  //      ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
  //      ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
  //    ],
  //    image: [
  //      ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
  //      ['float', ['floatLeft', 'floatRight', 'floatNone']],
  //      ['remove', ['removeMedia']]
  //    ],
  //    link: [['link', ['linkDialogShow', 'unlink']]],
  //    air: [
  //      [
  //        'font',
  //        [
  //          'bold',
  //          'italic',
  //          'underline',
  //          'strikethrough',
  //          'superscript',
  //          'subscript',
  //          'clear'
  //        ]
  //      ]
  //    ]
  //  },
  //  height: '200px',
  //  uploadImagePath: '/api/upload',
  //  toolbar: [
  //    ['misc', ['undo', 'redo']],
  //    [
  //      'font',
  //      [
  //        'bold',
  //        'italic',
  //        'underline',
  //        'strikethrough',
  //        'superscript',
  //        'subscript',
  //        'clear'
  //      ]
  //    ],
  //    ['fontsize', ['fontname', 'fontsize', 'color']],
  //    ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
  //    ['insert', ['table', 'picture', 'link', 'video', 'hr']],
  //    ['customButtons', ['testBtn']]
  //  ]
  //};

  generateP():BodyDataElement[] {
    
    const bodyData: BodyDataElement[] = [];
    for (let i = 0; i <this.bodyrows; i++) {
      const row: BodyDataElement[] = [];
      for (let j = 0; j < this.bodycols; j++) {
        if (j !== 0 && j % 2 !== 0)
        {
          row.push({ selectedOption: 2, inputValue: '' });
        }
        else {
        row.push({ selectedOption: 1, inputValue: '' });
        }
      }
      bodyData.push(...row);
    }
    console.log('data',bodyData);
    //this.pages[this.currentPage].bodyData=this.bodyData;
    return bodyData;
  }
  generateheaderrow() {
    
    this.showGrid = true;
    // Set the number of rows and columns based on user input
    // this.rows = 5;
    // this.cols = 5;
    this.headerrowarray = Array.from({ length: this.headerRow });
    this.headercolarray = Array.from({ length: this.headerColumn });
    this.headerData = [];
    for (let i = 0; i < this.headerRow; i++) {
      const row: any[] = [];
      for (let j = 0; j < this.headerColumn; j++) {
        if (j !== 0 && j % 2 !== 0)
        {
          row.push({ selectedOption: 2, inputValue: '' });
        }
        else {
        row.push({ selectedOption: 1, inputValue: '' });
        }
      }
      console.log(row);
      this.headerData.push(row);
    }
  }

  getbyIdClone()
  {
    let cloneid=parseInt(this.segments[this.segments.length-1],10)
        this.preptempid=cloneid;
    this.loader.show();
    this.templatesvc.getbyId(cloneid).subscribe((data1:any)=>{
      this.templatecloneForm=data1;
        if(this.templatecloneForm.Page!=null && this.templatecloneForm.Page.length>0){
          //this.templateForm.Page=this.templatecloneForm.Page;
          this.pages=this.templatecloneForm.Page;
          }
          else{
            this.pages[0].text="";
          }
     
      this.loader.hide();
    },(error:any)=>{

    });
  }
  getbyId(id:number)
  {
    this.loader.show();
    this.templatesvc.getbyId(id).subscribe((data:any)=>{
      debugger
      this.templateForm=data;
      if(this.typesDatasource.length>0)
      {
      let obj=this.typesDatasource.filter(p=>p.Documenttypename==this.templateForm.documenttype);
      this.selectedtype=obj[0];
      }
      this.rows=parseInt(this.templateForm.rows,10);
      this.cols=parseInt(this.templateForm.columns,10);
      this.footerRows=parseInt(this.templateForm.footerrows,10);
      this.footerCols=parseInt(this.templateForm.footercolumns,10);
      this.gridData=this.templateForm.headerTable;
      this.gridFooterData=this.templateForm.footerTable;
      this.headerData=this.templateForm.titleTable;
      if(this.templateForm.Page!=null && this.templateForm.Page.length>0){
      this.pages=this.templateForm.Page;
      }
      this.loader.hide();
      if(this.isprep){
        this.getbyIdClone();
      }
    },(error:any)=>{
      this.loader.hide();
    });
  }
  getbyName(name:string)
  {
    this.loader.show();
    this.templatesvc.getdoctemplatebyname(name).subscribe((data:any)=>{
      this.templateForm=data;
      if(this.typesDatasource.length>0)
      {
      let obj=this.typesDatasource.filter(p=>p.Documenttypename==this.templateForm.documenttype);
      this.selectedtype=obj[0];
      }
      this.rows=parseInt(this.templateForm.rows,10);
      this.cols=parseInt(this.templateForm.columns,10);
      this.footerRows=parseInt(this.templateForm.footerrows,10);
      this.footerCols=parseInt(this.templateForm.footercolumns,10);
      this.gridData=this.templateForm.headerTable;
      this.gridFooterData=this.templateForm.footerTable;
      this.loader.hide();
    },(error:any)=>{
      this.loader.hide();
    });
  }
  getTemplates() {
    this.loader.show();
      return this.templatesvc.getdocttemplate(this.commonsvc.req).subscribe((data: any) => {
        this.grid = data.Response;
        this.loader.hide();
      });
  }
  addTemplate() {
    this.loader.show();
    this.templateForm.documenttype=this.selectedtype.Documenttypename;
    this.templateForm.titleTable=this.headerData;
    this.templateForm.headerTable=this.gridData;
    this.templateForm.footerTable=this.gridFooterData;
    this.templateForm.rows=this.rowsArray.length.toString();
    this.templateForm.columns=this.colsArray.length.toString();
    this.templateForm.footerrows=this.rowsFooterArray.length.toString();
    this.templateForm.footercolumns=this.colsFooterArray.length.toString();
    this.templateForm.Page=this.pages;
    if(this.editMode)
    {
      this.templateForm.ModifiedBy=this.commonsvc.getUsername();
      if (!this.isButtonDisabled) {
        this.isButtonDisabled = true;
        if(this.isprep){
          const formm=this.templateForm;
          //this.templatecloneForm.Page=this.templateForm.Page;
          this.templateForm=new DocumentTemplateConfiguration();
          this.templatecloneForm.Page=this.pages;
          this.templateForm=this.templatecloneForm
        }
        debugger
      this.templatesvc.updatedoctemplate(this.templateForm).subscribe((data:any)=>{
        this.toastr.success('Document Template Updated Successfully!', 'Updated.!');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled = false;
    }, (error:any) => {
      this.loader.hide();
    });
  }
    }
    else
    { 
      if(!this.isduplicate())
      {
        this.templateForm.CreatedBy=this.commonsvc.getUsername();
        this.templateForm.ModifiedBy=this.commonsvc.getUsername();
        if (!this.isButtonDisabled) {
          this.isButtonDisabled = true;
      this.templatesvc.adddoctemplate(this.templateForm).subscribe((data:any)=>{ 
        this.toastr.success('Document Template Registered Successfully!', 'Saved.!');
        this.loader.hide();
        this.location.back();
        this.isButtonDisabled = false;
      }, (error:any) => {
        this.loader.hide();
      });
    }
  }
    }
  }
  isduplicate() {
    if (this.grid != null && this.grid.length > 0) {
      const type = this.grid.find(p => p.Templatename == this.templateForm.Templatename);
      if (type != null || type != undefined) {
        this.toastr.error('Duplicate Entity');
        this.loader.hide();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
    if(this.cols % 2 !==0)
    {
      
      this.cols=this.cols+1;
    }
    this.gridData = [];
    for (let i = 0; i < this.rows; i++) {
      const row: any[] = [];
      for (let j = 0; j < this.cols; j++) {
        if (j !== 0 && j % 2 !== 0)
        {
          row.push({ selectedOption: 2, inputValue: '' });
        }
        else {
        row.push({ selectedOption: 1, inputValue: '' });
        }
      }
      console.log(row);
      this.gridData.push(row);
    }
  }
  addNewRow() {
    if (this.gridData.length > 0) {
      const lastRow = this.gridData[this.gridData.length - 1];
      const newRow = [...lastRow]; // Clone the last row's data

      // Apply your custom logic for the new row here
      newRow.forEach((cell, colIndex) => {
        if (colIndex !== 0 && colIndex % 2 !== 0) {
          newRow[colIndex] = { selectedOption: 2, inputValue: '' };
        } else {
          newRow[colIndex] = { selectedOption: 1, inputValue: '' };
        }
      });

      this.gridData.push(newRow);
    } else {
      // If no rows exist, generate a new row using your existing method
      this.generateTeplateGrid();
    }
  }
  addfooterRow() {
    if (this.gridFooterData.length > 0) {
      const lastRow = this.gridFooterData[this.gridFooterData.length - 1];
      const newRow = [...lastRow]; // Clone the last row's data

      // Apply your custom logic for the new row here
      newRow.forEach((cell, colIndex) => {
        if (colIndex !== 0 && colIndex % 2 !== 0) {
          newRow[colIndex] = { selectedOption: 2, inputValue: '' };
        } else {
          newRow[colIndex] = { selectedOption: 1, inputValue: '' };
        }
      });

      this.gridFooterData.push(newRow);
    } else {
      // If no rows exist, generate a new row using your existing method
      this.generateTeplateGrid();
    }
  }

  // Delete a row at the specified index from the gridData array
  deleteRow(rowIndex: number) {
    if(this.gridData.length>1){
    this.gridData.splice(rowIndex, 1);
    }
  }
  deletefooterRow(rowIndex: number) {
    if(this.gridFooterData.length>1){
    this.gridFooterData.splice(rowIndex, 1);
    }
  }
  deletebodyRow(rowIndex: number) {
    if(this.pages[this.currentPage].bodyData.length>1){
    this.pages[this.currentPage].bodyData.splice(rowIndex, 1);
    }
  }

  generateFooterGrid() {
    this.showGrid = true;
    this.rowsFooterArray = Array.from({ length: this.footerRows });
    this.colsFooterArray = Array.from({ length: this.footerCols });
    if(this.footerCols % 2 !==0)
    {
      
      this.footerCols=this.footerCols+1;
    }
    this.gridFooterData = [];
    for (let i = 0; i < this.footerRows; i++) {
      const row: any[] = [];
      for (let j = 0; j < this.footerCols; j++) {
        if (j !== 0 && j % 2 !== 0)
        {
          row.push({ selectedOption: 2, inputValue: '' });
        }
        else {
        row.push({ selectedOption: 1, inputValue: '' });
        }
      }
      this.gridFooterData.push(row);
    }
  }

  getDataFromGrid(): void {
    console.log(this.gridData);
  }
  getdocumenttypeconfig() {
    this.loader.show();
      return this.doctypeservice.getdoctypeconfig(this.commonsvc.req).subscribe((data: any) => {
        this.typesDatasource = data.Response;
        if(this.editMode){
          this.getbyId(this.id);
        }
        this.loader.hide();
      }, (error:any) => {
        this.loader.hide();
      });
  }
  approve() {
    ;
    this.templateForm.Status = 'Approved'   
    this.templatesvc.updatedoctemplate(this.templateForm).subscribe((data:any)=>{
      this.loader.hide();
    }, (error:any) => {
      this.loader.hide();
    });
  }
  reinitiative() {
    this.templateForm.Status = 'Re-Initiated'    
    this.templatesvc.updatedoctemplate(this.templateForm).subscribe((data:any)=>{
      this.loader.hide();
    }, (error:any) => {
      this.loader.hide();
    });
  }
  reject() {
    this.templateForm.Status = 'Rejected'    
    this.templatesvc.updatedoctemplate(this.templateForm).subscribe((data:any)=>{
      this.loader.hide();
    }, (error:any) => {
      this.loader.hide();
    });
  }

  generatePages() {
    this.pages=[];
    this.pages = Array.from({ length: this.templateForm.Pages }, (_, index) => (
      {
        text: '',
        pagenumber: index,
        pagetype: 'text',
        bodyData: [] ,// Initialize bodyData with an empty row
        istext:false,
        isgrid:false,
        istextposition:false,
        isheader:true,
        isfooter:true,
        header:'',
        footer:''
      }));
    this.currentPage = 0;
  }
  // Method to set the page type and bodyData for a specific page
setPageTypeAndBodyData(pageIndex: number, pageType: string) {
  
  if (pageType === 'grid') {
    this.pages[pageIndex].pagetype = 'grid';
    this.pages[pageIndex].bodyData.push(this.generateP());
    // if(this.pages[pageIndex].bodyData!=null){
    //   this.pages[pageIndex].bodyData.forEach(p=>{
    //     p.forEach(o=>{
    //       if(o.)
    //     })
    //   });
    // }
  } else {
    this.pages[pageIndex].pagetype = 'text';
    this.pages[pageIndex].bodyData = [];
  }
  console.log(this.pages);
}

  prevPage() {
    
    console.log(this.currentPage)
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    
    if (this.currentPage < this.templateForm.Pages - 1) {
      this.currentPage++;
    }
  }
  getPlaceholder(row: number, col: number): string {
    
    const flatIndex = row * 4 + col;
    return this.pages[this.currentPage].bodyData[flatIndex][col].selectedOption === 1
      ? 'Enter label'
      : 'Enter Value';
  }
  addbodyRow() {
    if (this.pages[this.currentPage].bodyData.length > 0) {
      const lastRow = this.pages[this.currentPage].bodyData[this.pages[this.currentPage].bodyData.length - 1];
      const newRow = [...lastRow]; // Clone the last row's data

      // Apply your custom logic for the new row here
      newRow.forEach((cell, colIndex) => {
        if (colIndex !== 0 && colIndex % 2 !== 0) {
          newRow[colIndex] = { selectedOption: 2, inputValue: '' };
        } else {
          newRow[colIndex] = { selectedOption: 1, inputValue: '' };
        }
      });

      this.pages[this.currentPage].bodyData.push(newRow);
    } else {
      // If no rows exist, generate a new row using your existing method
      //this.generateTeplateGrid();
    }
  }
  addbodyNewText() {

    if (this.pages[this.currentPage].bodyData.length > 0) {
      const lastRow = this.pages[this.currentPage].bodyData[this.pages[this.currentPage].bodyData.length - 1];
      const newRow = [...lastRow]; // Clone the last row's data

      // Apply your custom logic for the new row here
      // if(newRow.length>0)
      // {
      //   newRow=newRow[0];
      // }
      newRow.forEach((cell, colIndex) => {
        if (colIndex !== 0 && colIndex % 2 !== 0) {
          newRow[colIndex] = { selectedOption: 2, inputValue: '' };
        } else {
          newRow[colIndex] = { selectedOption: 1, inputValue: '' };
        }
      });

      this.pages[this.currentPage].bodyData.push(newRow);
    } else {
      // If no rows exist, generate a new row using your existing method
      //this.generateTeplateGrid();
    }
  }
  addtext(){
    //this.pages[this.currentPage].isoption=true;
  }
  deleteoption(){
    // this.pages[this.currentPage].isoption=false;
    // this.pages[this.currentPage].optiontext='';
  }
  enablegrid(isrow:boolean=false){
    if(isrow){
    if(!this.pages[this.currentPage].istext)
    {
      this.pages[this.currentPage].istextposition=false;
    }
    this.pages[this.currentPage].isgrid=true;
    this.pages[this.currentPage].bodyData.push(this.generateP());
  }else{
    if(!this.pages[this.currentPage].istext)
    {
      this.pages[this.currentPage].istextposition=false;
    }
    this.pages[this.currentPage].isgrid=true;
    this.pages[this.currentPage].bodyData=[];
    this.pages[this.currentPage].bodyData.push(this.generateP());
  }
  }
  enableheader(){
    this.pages[this.currentPage].isheader = !this.pages[this.currentPage].isheader;
    console.log('header',this.pages[this.currentPage].isheader);
    //this.pages[this.currentPage].isheader=true;
  }
  enablefooter(){
    this.pages[this.currentPage].isfooter = !this.pages[this.currentPage].isfooter;
    console.log('footer',this.pages[this.currentPage].isfooter)
    //this.pages[this.currentPage].isfooter=true;
  }
  enabletext(){
    if(!this.pages[this.currentPage].isgrid)
    {
      this.pages[this.currentPage].istextposition=true;
    }
    this.pages[this.currentPage].istext=true;
  }
  deletetext(){
    this.pages[this.currentPage].istextposition=false;
    this.pages[this.currentPage].istext=false;
    this.pages[this.currentPage].text='';
  }
  deletegrid(){
    this.pages[this.currentPage].isgrid=false;
    this.pages[this.currentPage].istextposition=true;
    this.pages[this.currentPage].bodyData=[];
  }
  onLogoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loader.show();
      this.templatesvc.uploadImage(file).subscribe((data:any)=> {
          console.log('image',data.Message);
          this.templateForm.header=data.Message;
          this.loader.hide();
          //console.log('Image uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
  onDeleteFile(): void {
   
    this.templateForm.header = '';
    
  }
  onLogoUpload1(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loader.show();
      this.templatesvc.uploadImage(file).subscribe((data:any)=> {
          
          console.log('image',data.Message);
          this.templateForm.footer=data.Message;
          this.loader.hide();
          //console.log('Image uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
  onDeleteFile1(): void {
   
    this.templateForm.footer = '';
    
  }
}
