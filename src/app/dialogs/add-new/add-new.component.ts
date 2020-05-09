import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/CustomerModel';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  formData: Customer = new Customer();

  constructor(public dialogRef: MatDialogRef<AddNewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer) {
      console.log('DialogData==>', data)
     }

  ngOnInit(): void {
    console.log('Form', this.formData);
  }

}
