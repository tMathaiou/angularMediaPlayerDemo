import { RouterModule, Routes } from '@angular/router';
import {MediaPlayerComponent} from "./media-player/media-player.component";

const APP_ROUTES: Routes = [
  {path: ':videoName', component: MediaPlayerComponent},
  {path: '**', redirectTo:'empowering'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
