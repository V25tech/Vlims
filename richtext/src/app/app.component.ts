import { Component,OnInit } from '@angular/core';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
//import {form}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  public Editor:any = Editor;
  //config = {
  //  fontSize: {
  //    options: [9, 11, 13, 14, 15, 16, 17, 19, 21],
  //  },
  //  toolbar: ['heading', '|', 'bold', 'italic', 'fontSize'],
  //};
  public onReady(editor: any) {
    editor.config._config.fontSize.options
     editor.config._config.fontSize.options = [
       9,
       11,
       13,
       'default',
       17,
       19,
       21
     ]
     console.log("CKEditor5 Angular Component is ready to use!", editor.config._config.fontSize.options);
   }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.config.get("fontSize")
     console.log(data);
   }
  ngOnInit(): void {

  }
  public model = {
    editorData: '<p>Hello, world!</p>'
};
}
