import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

declare var $: any;

interface CarouselImage {
  src: string;
  alt: string;
  text: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  currentSlide = 0;
  loading = false;
  private intervalId: any;
  private token: any = localStorage.getItem('token'); 

  images: CarouselImage[] = [
    { src: 'assets/images/slide/slide1.jpg', alt: 'Imagen 1', text: 'Potencia tu Email Marketing<br>con nuestras herramientas 📢' },
    { src: 'assets/images/slide/slide2.jpg', alt: 'Imagen 2', text: 'Optimiza con nuestro ERP 📊' },
    { src: 'assets/images/slide/slide3.jpg', alt: 'Imagen 3', text: 'Gestiona tu CRM eficientemente<br>y mejora tus relaciones con clientes ✅' }
  ];

  constructor(
    private fb: FormBuilder,
    private _colaboradorService: ColaboradorService,
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.token) {
      this._router.navigate(['/dashboard']);
    }
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 5000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    clearInterval(this.intervalId);
    this.startCarousel();
  }

  login() {
    if (this.loginForm.invalid) {
      if (!this.loginForm.get('email')?.value) {
        $.notify('Debe ingresar el correo electrónico', {
          type: 'danger',
          spacing: 10,
          timer: 2000,
          placement: { from: 'top', align: 'right' },
          delay: 1000,
          animate: { enter: 'animated bounce', exit: 'animated bounce' }
        });
      } else if (!this.loginForm.get('password')?.value) {
        $.notify('Debe ingresar la contraseña', {
          type: 'danger',
          spacing: 10,
          timer: 2000,
          placement: { from: 'top', align: 'right' },
          delay: 1000,
          animate: { enter: 'animated bounce', exit: 'animated bounce' }
        });
      }
      return;
    }

    this.loading = true;
    const user = this.loginForm.value;
    this._colaboradorService.login_admin(user).subscribe(
      response => {
        if (response.data == undefined) {
          $.notify(response.message, {
            type: 'danger',
            spacing: 10,
            timer: 2000,
            placement: { from: 'top', align: 'right' },
            delay: 1000,
            animate: { enter: 'animated bounce', exit: 'animated bounce' }
          });
        } else {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('_id', response.data._id);
          this._router.navigate(['/dashboard']);
        }
        this.loading = false;
      },
      error => {
        $.notify('Error al iniciar sesión', {
          type: 'danger',
          spacing: 10,
          timer: 2000,
          placement: { from: 'top', align: 'right' },
          delay: 1000,
          animate: { enter: 'animated bounce', exit: 'animated bounce' }
        });
        this.loading = false;
      }
    );
  }
}