import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
  PdfViewerComponent,
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
  FormFieldDataFormat,
  FormFieldPropertiesChangeArgs,
} from '@syncfusion/ej2-angular-pdfviewer';

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

  public serviceUrl!: string;
  public documentPath!: string;

  formData: any;
  showData: boolean = false;


  document: string = 'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf';
  //document: string ='https://localhost:7163/WeatherForecast/form-filling-document.pdf';

  ngOnInit(): void {
    // ngOnInit function
  }

  ngAfterViewInit() {}

  formFieldPropertiesChange(e: FormFieldPropertiesChangeArgs): void {
    this.showData = false;
    var formField = this.pdfviewerControl.retrieveFormFields();
    let txtName = e.field.name;
    if (txtName == 'numOne' || txtName == 'numTwo') {
      let numOne = formField[9].value;
      let numTwo = formField[10].value;

      formField[11].value = String(Number(numOne) + Number(numTwo));

      this.pdfviewerControl.updateFormFieldsValue(formField[11]);
    }
  }

  public validateFormFields() {
    let valid: boolean = false;
    let errorMessage: string = 'Required Field(s): ';
    let forms: any = this.pdfviewerControl.formFieldCollections;
    let flag: boolean = false;
    let radioGroupName: string = '';
    for (var i = 0; i < forms.length; i++) {
      debugger;
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
      this.showData = false;
    } else {
      valid = true;
      this.showData = true;
    }
    return valid;
  }

  onSubmit() {
    this.formData = {};
    //var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    let valid = this.validateFormFields();
    if (valid) {
      var viewer = this.pdfviewerControl;
      viewer
        .exportFormFieldsAsObject(FormFieldDataFormat.Json)
        .then((data: any) => {
          console.log(data);
          this.formData = JSON.parse(data);
        });
    }
  }
}
