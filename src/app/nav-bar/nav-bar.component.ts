import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'mod-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input("player") player: any;
  @Output("onVideoChange") onVideoChange = new EventEmitter();
  isIn: boolean = false;

  toggleState() {
    this.isIn = !this.isIn;
  }

  setPlayer(name: string): void {
    this.player = name;
    this.onVideoChange.emit(this.player);
  }

}
