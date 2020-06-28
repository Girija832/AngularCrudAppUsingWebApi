import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from '../shared/customer.model';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = [];
  isError: boolean = false;
  errorMessage: string = '';
  localUrl: string = './assets/customers.json'

  constructor(private http: HttpClient) { }
  // GET METHOD
  getAllCustomer() {
    // let header = new HttpHeaders().set(
    //   'Authorization', localStorage.getItem('access-token')
    // );
    return this.http.get<Customer[]>(AppConstants.ENDPOINT_URL + 'customer').subscribe(res => {
      this.customers = res;
    });
  }

  // POST METHOD
  createCustomer(user: Customer) {
    return this.http.post(AppConstants.ENDPOINT_URL + 'customer', user).subscribe(data => {
      console.log(data);
      this.getAllCustomer();
    },
    (err: HttpErrorResponse) => {
      console.log('Error==>', err)
    });
  }

  // UPDATE, PUT METHOD
  updateCustomer(id: number, user: Customer) {
    return this.http.put(AppConstants.ENDPOINT_URL + 'customer/' + id, user).subscribe(data => {
      console.log('updated data', data);
      this.getAllCustomer();
    },
    (err: HttpErrorResponse) => {
      console.log('error==>', err.error.message);
      this.isError = true;
      this.errorMessage = err.error.message;
    });
  }

  // DELETE METHOD
  deleteCustomer(id: number) {
    return this.http.delete(AppConstants.ENDPOINT_URL + 'customer/' + id).subscribe(data => {
      console.log(data);
      this.getAllCustomer();
    },
    (err: HttpErrorResponse) => {
      console.log('Delete method error==>', err);
    });
  }
}
