import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

// Services
import { LocalStorageService } from './services/local-storage.service';
import { NotificationService } from './services/notification.service';
import { TodosService } from './services/todos.service';

// Components
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [
    LocalStorageService,
    NotificationService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
