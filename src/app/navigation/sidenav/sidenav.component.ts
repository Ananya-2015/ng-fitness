import { Component, OnInit, EventEmitter ,  Output, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , OnDestroy{
  isAuth = false
  authSubscription :Subscription

  @Output() closeSidenav = new EventEmitter<void>()

  constructor( private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus
    })
  }
  onCloseSidenav(){
    this.closeSidenav.emit()
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

}
