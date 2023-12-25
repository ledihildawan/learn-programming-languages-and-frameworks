import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { TodoService } from './todos/todo.service';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ListComponent } from './todos/components/list/list.component';
import { TodosComponent } from './todos/todos.component';
import { SessionService } from './session.service';
import { FooterComponent } from './todos/components/footer/footer.component';
import { HeaderComponent } from './todos/components/header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ListItemComponent } from './todos/components/list-item/list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [ApiService, AuthService, TodoService, SessionService],
  declarations: [
    AppComponent,
    ListComponent,
    TodosComponent,
    FooterComponent,
    HeaderComponent,
    SignInComponent,
    ListItemComponent,
  ],
})
export class AppModule {}
