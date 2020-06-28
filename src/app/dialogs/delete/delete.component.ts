import { Component, OnInit, Inject, Optional } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../shared/customer.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  customer: Customer;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    private customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.customer = data.customer;
     }

  ngOnInit(): void {
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customer.id);
  }

}
