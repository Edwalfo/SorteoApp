import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  salir() {
    this._authService.logout()
      .then(() => {
        this.router.navigate(['/']);

      })
      .catch(error => console.log(error)
      );
  }

}
