import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import {routing} from "./app.routing";
import {MediaPlayerService} from "./media-player/media-player.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MediaPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [MediaPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
