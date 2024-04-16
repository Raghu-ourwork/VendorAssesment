import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  public navItems: any = [];
  public currentRoutes: any = [];
  public subMenuCollapsed: number = 900;
  public currentMenu: any;
  public currentSubMenu: any;
  menus?: any = [];

  public reportName = '';
  public currentsubmenu = '';
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    const body = document.querySelector('body');

    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });

    // this.getMenu();
    // this.currentMenu = localStorage.getItem('currentMenu')
    // this.currentSubMenu = localStorage.getItem('currentSubMenu')
  }

  openSidebar() {
    let body = document.querySelector('body');
    if ((body.classList.contains('sidebar-icon-only'))) {
      body.classList.remove('sidebar-icon-only');
    }
  }
  togleSidebar(i, menuId, subMenuId = 0) {
    if (subMenuId > 0) {
      this.currentMenu = menuId
      this.currentSubMenu = subMenuId
    }

    if (this.subMenuCollapsed != i) {
      this.subMenuCollapsed = i
    } else {
      this.subMenuCollapsed = 900
    }
  }

  logout() {
    this.auth.logoutUser();
  }

  // getMenu(): void {
  //   this.auth.getMenu().subscribe(
  //     res => {
  //       this.menus = res;
  //     }
  //   )
  // }

}
