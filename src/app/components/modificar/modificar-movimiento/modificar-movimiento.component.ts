import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-movimiento',
  templateUrl: './modificar-movimiento.component.html',
  styleUrls: ['./modificar-movimiento.component.scss']
})
export class ModificarMovimientoComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectedText: string = null;
  constructor() { }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  getSelectedOptionText(event: Event) {
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;
    this.selectedText = selectElementText;
    console.log(selectElementText)
 }


  ngOnInit(): void {
  }

}
