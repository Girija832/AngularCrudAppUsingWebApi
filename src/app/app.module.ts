import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CustomerComponent } from './customer/customer.component';
import { AddNewComponent } from './dialogs/add-new/add-new.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AddNewComponent,
    DeleteComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    AddNewComponent,
    DeleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
