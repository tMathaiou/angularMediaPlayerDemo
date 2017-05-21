import {Component} from "@angular/core";

@Component({
  selector: 'mod-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isIn: boolean = false;

  toggleState() {
    this.isIn = !this.isIn;
  }

}
