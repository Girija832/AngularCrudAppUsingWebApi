import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewComponent } from './add-new.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AddNewComponent', () => {
  let component: AddNewComponent;
  const customers = new Customer();
  let customerService: CustomerService;
  let fixture: ComponentFixture<AddNewComponent>;
  // const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule,
        FormsModule ],
      declarations: [ AddNewComponent ],
      providers: [ CustomerService,
        { provide: MAT_DIALOG_DATA, useValue: {
          customer : {},
          edit: false
        } },
        { provide: MatDialogRef, useValue: {} },
        { provide: CustomerService, useValue: {
          updateCustomer: function(id, user) {
            return true;
          },
          createCustomer: function(user) {
            return true;
          }
        }}
      ],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    component.customer = {
      "id": 1,
      "name": "Dominique Perrier",
      "email": "dominiqueperrier@mail.com",
      "address": "Obere Str. 57, Berlin, Germany",
      "phone": 3135555735
  }
    fixture.detectChanges();
    // component.customer = Object.assign({}, customers)
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call save for update customer', () => {
    component.customerForm.patchValue({ 
      "id": 1,
      "name": "Dominique Perrier",
      "email": "dominiqueperrier@mail.com",
      "address": "Obere Str. 57, Berlin, Germany",
      "phone": 3135555735
    })
    component.edit = true
    component.customer.id = 1
    expect(component.save()).toBeUndefined();
  });


  it('should call save for create customer', () => {
    component.customerForm.patchValue({ 
      "id": 1,
      "name": "Dominique Perrier",
      "email": "dominiqueperrier@mail.com",
      "address": "Obere Str. 57, Berlin, Germany",
      "phone": 3135555735
    })
    component.edit = false
    expect(component.save()).toBeUndefined();
  });
});
