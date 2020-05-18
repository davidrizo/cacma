import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    //this.auth.handleAuthCallback();
    console.log('REDIRECCIONANDO con ' + this,this.auth.loggedIn);
  }
}
