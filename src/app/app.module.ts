import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MainTableComponent} from './components/main-table/main-table.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {JibComponent} from './components/jib/jib.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DrawerUserDataComponent, SettingsDialog} from './components/drawer-user-data/drawer-user-data.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateJibbyComponent} from './components/create-jibby/create-jibby.component';
import {ProfileHeaderComponent} from './components/profile-header/profile-header.component';
import {MatBadgeModule} from "@angular/material/badge";
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';
import { ChatComponent } from './components/direct-messages/chat/chat.component';
import { MessageComponent } from './components/direct-messages/chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    JibComponent,
    LoginComponent,
    MainComponent,
    DrawerUserDataComponent,
    SettingsDialog,
    CreateJibbyComponent,
    ProfileHeaderComponent,
    DirectMessagesComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
