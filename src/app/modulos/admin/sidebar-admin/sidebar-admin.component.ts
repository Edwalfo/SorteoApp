import { Component, OnInit } from '@angular/core';
import { CargarScriptService } from 'src/app/services/cargar-script.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {

  constructor(
    private scriptService: CargarScriptService
  ) { }

  ngOnInit(): void {
    this.scriptService.loadScript({ id: 'my-script', url: 'assets/js/scripts.js' })
      .then(data => {
        /*      console.log('script loaded ', data); */
      }).catch(error => console.log(error));

  }

  ngOnDestroy() {
    this.scriptService.removeScript('my-script');
  }




}
