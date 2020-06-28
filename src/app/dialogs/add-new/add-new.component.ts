import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../shared/customer.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  customer: Customer;
  edit: boolean;
  phonePattern: string = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';
  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)])
  });

  constructor(public dialogRef: MatDialogRef<AddNewComponent>,
    private customerService: CustomerService,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.customer = data.customer;
      this.edit = data.edit;
      if(Object.keys(this.customer).length) {
        this.customerForm.patchValue({
          name: this.customer.name,
          email: this.customer.email,
          address: this.customer.address,
          phone: this.customer.phone
        })
      }
      
     }

  ngOnInit(): void {
    
  }

  save() {
    if(this.edit) {
      this.customerService.updateCustomer(this.customer.id, this.customerForm.value);
    } else {
      this.customerService.createCustomer(this.customerForm.value);
    }
    
  }

}
