import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../utils/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  public loginInvalid: boolean;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  // get f(){
  //   return this.loginForm.controls;
  // }

  login() {
    this.loginInvalid = false;
    if (this.loginForm.valid) {
      try {
        this.authService.login(this.loginForm.value).subscribe((success) => {
          if (success) {
            this.router.navigate(['/home']);
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
      // this.authService.login(
      //   {
      //     username: this.f.usuario.value,
      //     password: this.f.password.value
      //   }
      // ).subscribe(success =>{
      //   if (success) {
      //     this.router.navigate(['/home']);
      //   }
      // })
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
