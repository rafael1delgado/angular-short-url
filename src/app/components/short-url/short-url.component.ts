import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textoError: string;

  constructor(private __shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textoError = '';
  }

  ngOnInit(): void {
  }

  procesarUrl() {
    if (this.nombreUrl === '') {
      this.error('Por favor ingresa una URL.')
      return;
    }
    this.urlProcesada = false;
    this.loading = true;
    this.__shortUrlService.getUrlShort(this.nombreUrl).subscribe(data => {
      this.loading = false;
      this.urlProcesada = true;
      this.urlShort = data.link;
    }, error => {
      console.log(error);
      this.loading = false;
      this.nombreUrl = '';
      if(error.error.description === 'The value provided is invalid.') {
        this.error('La URL ingresada es inválida.');
      }
    });
  }

  error(valor: string) {
    this.mostrarError = true;
    this.textoError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
}
