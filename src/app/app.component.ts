import {Component, SimpleChanges, OnChanges} from "@angular/core";


@Component({
  selector: 'mod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videoPlayer: any;


  videoChanged(e) {
    this.videoPlayer = e;
  }
}
