import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  iniciarSesion: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
  ) {

    this.iniciarSesion = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

  ngOnInit(): void {
  }

  login() {
  
    this._authService.login(this.iniciarSesion.value).then((user) => {
        console.log(user);
        
      this.router.navigate(['/']);
    }).catch(error => console.log(error)
    )

  }

}
