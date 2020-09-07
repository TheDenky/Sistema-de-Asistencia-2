import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../utils/services/auth.service';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  public USUARIOUser = "";
  public USUARIO: any;
  public loginInvalid: boolean;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    //private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    this.loginInvalid = false;
    this.USUARIOUser = this.loginForm.value.username;
    if (this.loginForm.valid) {
      try {
        this.usuarioObtener(this.USUARIOUser);
        console.log(this.USUARIOUser);

        this.authService.login(this.loginForm.value).subscribe((success) => {
          if (success) {

            window.location.reload();
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.toastr.error('Rellena todo los campos!', 'Falta llenar algún campo!');
    }
  }

  public usuarioObtener(user: string) {
    this.usuarioService.usuarioLoggedGet(user).subscribe(
      (res) => {
        this.USUARIO = res;
        localStorage.setItem("DATOSUSUARIO", JSON.stringify( this.USUARIO));
      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
