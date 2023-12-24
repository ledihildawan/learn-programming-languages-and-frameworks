import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [ApiService],
  declarations: [AppComponent],
})
export class AppModule {}
