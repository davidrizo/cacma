import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

// NOT USED
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log('REDIRECCIONANDO con ' + this,this.auth.loggedIn);
  }
}
