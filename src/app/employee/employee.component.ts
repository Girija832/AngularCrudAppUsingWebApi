import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee';
import { AddNewComponent } from '../dialogs/add-new/add-new.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public employeeService: EmployeeService) { }

  empList: Employee[] = [];
  dialogRef: any;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployee().subscribe(data => {
      console.log('Data=>', data);
      this.empList = data;
    })
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
    })
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteComponent, {

    })
  }

}
