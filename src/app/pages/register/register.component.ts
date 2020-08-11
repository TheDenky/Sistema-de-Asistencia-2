
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/utils/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      this.registerService
        .register({
          username: this.f.username.value,
          estado: this.f.estado.value,
          tipo: this.f.tipo.value,
          password: this.f.password.value,
        })
        .subscribe((success) => {
          if (success) {
            this.router.navigate(['/home']);
          } else {
            console.log('Registration failed');
          }
        });
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }
}
