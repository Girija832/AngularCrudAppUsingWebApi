import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../shared/customer.model';
import { AddNewComponent } from '../dialogs/add-new/add-new.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private customerService: CustomerService,
    private authService: AuthService) { }

  customerList: Customer[] = [];
  selected = [];
  dialogRef: any;
  index: number;
  id: number;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.customerService.getAllCustomer();
  }

  addNew(customer = {}, edit = false) {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '320px',
      data: {
        customer,
        edit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
    })
  }

  delete(customer) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        customer
      }

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  addCustomer() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.customerService.dataChange.value.push(this.customerService.getDialogData());
        // this.refreshTable();
      }
    });
  }


  toggle(customer,event: MatCheckboxChange) {
    if (event.checked) {
     this.selected.push(customer);
     console.log('Selected items ===>', this.selected);
   } else {
     const index = this.selected.indexOf(customer);
     if (index >= 0) {
       this.selected.splice(index, 1);
     }
   }
  console.log("IsSelected=>", event.checked);
 }

 exists(customer) {
   return this.selected.indexOf(customer) > -1;
 };

 isIndeterminate() {
   return (this.selected.length > 0 && !this.isChecked());
 };

 isChecked() {
   return this.selected.length === this.customerList.length;
 };

 toggleAll(event: MatCheckboxChange) { 

  if ( event.checked ) {

     this.customerList.forEach(row => {
        // console.log('checked row data=>', row);
        this.selected.push(row)
        console.log('All selected items', this.selected);
        });
  } else {
     this.selected.length = 0 ;
  }
}

logout() {
  this.authService.logout();
}

}
