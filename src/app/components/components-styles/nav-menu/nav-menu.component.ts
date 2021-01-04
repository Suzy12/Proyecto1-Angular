import { Component, OnInit, Inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  counter = 0;

  constructor(public sidebarservice: SidebarService,
    @Inject(SESSION_STORAGE) public storage: StorageService
    ) { }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {
    this.counter = this.storage.get('current-user-notifications');



  }

}
