import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  onQuienesSomosAnchorClick() {
    const x = document.querySelector('#about');
    if (x) {
      x.scrollIntoView();
    }
  }
}
