import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../shared/CustomerModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  dialogData: any;

  baseUrl: string = 'http://127.0.0.1:3000/customer';

  getAllCustomer() {
    return this.http.get<Customer[]>('./assets/customers.json');
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(this.baseUrl + '/' + id);
  }

  createCustomer(user: Customer) {
    return this.http.post(this.baseUrl, user).subscribe(data => {
      this.dialogData = user;
    },
    (err: HttpErrorResponse) => {
      console.log('Error==>', err)
    });
  }

  updateCustomer(user: Customer) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  getDialogData() {
    return this.dialogData;
  }
}
