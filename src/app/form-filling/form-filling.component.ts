import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
  PdfViewerComponent,
  TextFieldSettings,
  RadioButtonFieldSettings,
  InitialFieldSettings,
  CheckBoxFieldSettings,
  SignatureFieldSettings,
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
  AnnotationService,
  FormFieldsService,
  LoadEventArgs,
  ValidateFormFieldsArgs,
  FormDesignerService,
  FormFieldDataFormat,
} from '@syncfusion/ej2-angular-pdfviewer';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Default PdfViewer Controller
 */
@Component({
  selector: 'app-form-filling',
  templateUrl: 'form-filling.component.html',
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:max-line-length
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    AnnotationService,
    FormFieldsService,
    FormDesignerService,
  ],
  styleUrls: ['form-filling.component.css'],
})
export class FormFillingComponent implements OnInit {
  @ViewChild('pdfviewer')
  public pdfviewerControl!: PdfViewerComponent;
  // @ViewChild('switch')
  // public switch!: SwitchComponent;

  exportedData: any;

  // public document: string =
  //   'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf';

     document: string ='form-filling-document.pdf';
  ngOnInit(): void {
    // ngOnInit function
  }

  ngAfterViewInit(){
    // this.pdfviewerControl.setting
    // var container = document.querySelector('#pdfViewer_pageViewContainer');
    var pdf = this.pdfviewerControl;


  }
  public validateFormFields(e: ValidateFormFieldsArgs): void {
    console.log(e);
    let errorMessage: string = 'Required Field(s): ';
    let forms: any = this.pdfviewerControl.formFieldCollections;
    let flag: boolean = false;
    let radioGroupName: string = '';
    for (var i = 0; i < forms.length; i++) {
      let text: string = '';
      if (forms[i].isRequired == true) {
        if (
          forms[i].type.toString() == 'Checkbox' &&
          forms[i].isChecked == false
        ) {
          text = forms[i].name;
        } else if (forms[i].type == 'RadioButton' && flag == false) {
          radioGroupName = forms[i].name;
          if (forms[i].isSelected == true) flag = true;
        } else if (
          forms[i].type.toString() != 'Checkbox' &&
          forms[i].type != 'RadioButton' &&
          forms[i].value == ''
        ) {
          text = forms[i].name;
        }
        if (text != '') {
          if (errorMessage == 'Required Field(s): ') {
            errorMessage += text;
          } else {
            errorMessage += ', ' + text;
          }
        }
      }
    }
    if (!flag && radioGroupName != '') {
      if (errorMessage == 'Required Field(s): ') errorMessage += radioGroupName;
      else errorMessage += ', ' + radioGroupName;
    }
    if (errorMessage != 'Required Field(s): ') {
      this.pdfviewerControl.showNotificationPopup(errorMessage);
    }
  }

  OnExportJson() {
    //var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    var viewer = this.pdfviewerControl;
    debugger;
    viewer
      .exportFormFieldsAsObject(FormFieldDataFormat.Json)
      .then((data: any) => {
        console.log(data)
        let formData = JSON.parse(data);
        alert(formData.name)
      });
  }

  submit() {
    debugger;
    let errorMessage: string = 'Required Field(s): ';
    let forms: any = this.pdfviewerControl.formFieldCollections;
    console.log(forms);
    let flag: boolean = false;
    let formData: any = [];
    let radioGroupName: string = '';
    for (var i = 0; i < forms.length; i++) {
      formData.push(`${forms[i].name}:${forms[i].value}`);
      let text: string = '';
      if (forms[i].isRequired == false) {
        if (
          forms[i].type.toString() == 'Checkbox' &&
          forms[i].isChecked == false
        ) {
          text = forms[i].name;
        } else if (forms[i].type == 'RadioButton' && flag == false) {
          radioGroupName = forms[i].name;
          if (forms[i].isSelected == true) flag = true;
        } else if (
          forms[i].type.toString() != 'Checkbox' &&
          forms[i].type != 'RadioButton' &&
          forms[i].value == ''
        ) {
          text = forms[i].name;
        }
        if (text != '') {
          if (errorMessage == 'Required Field(s): ') {
            errorMessage += text;
          } else {
            errorMessage += ', ' + text;
          }
        }
      }
    }
    if (!flag && radioGroupName != '') {
      if (errorMessage == 'Required Field(s): ') errorMessage += radioGroupName;
      else errorMessage += ', ' + radioGroupName;
    }
    if (errorMessage != 'Required Field(s): ') {
      this.pdfviewerControl.showNotificationPopup(errorMessage);
    }
  }
}
