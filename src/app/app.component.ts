import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//APP component principal para a página de CRUD
export class AppComponent {

  public cadastroForm: FormGroup;
  public title: string = 'Amigo Secreto da Família Kenoby';
  public isCadastroHidden: boolean = true;
  public amigos: Array<any> = [];
  public amigoCadastro;
  public sorteioSucesso = true;

  constructor (private _formBuilder: FormBuilder, private _http: HttpService) {}

  //Método init onde se busca os participantes e inicia o form de cadastro
  ngOnInit() {
    this.cadastroForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]]
    });
    this._http.getAllAmigos().then((result: Array<any>) => {
      this.amigos = result;
    }).catch(err => {
      console.log(err);
    })
  }

  update(amigo) {
    this._http.atualizarAmigo(amigo).then(result => {
      console.log('success');
    }).catch(err => {
      console.log(err);
    })
  }

  toogleFormularioCadastro() {
    if(this.isCadastroHidden) {
      this.isCadastroHidden = false;
    }
    else {
      this.isCadastroHidden= true;
    }
    this.cadastroForm.reset();
  }

  deletarAmigo(amigo) {
    this._http.deletarAmigo(amigo._id).then(result => {
      for(let count = 0; count < this.amigos.length; count++) {
        if(this.amigos[count]._id === amigo._id) {
          this.amigos.splice(count, 1);
          break;
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }

  cadastrarAmigo() {
    const payload = {
      email: this.cadastroForm.get('email').value,
      nome: this.cadastroForm.get('nome').value
    }
    this._http.createAmigo(payload).then(result => {
      this.amigos.push(result);
      this.cadastroForm.reset();
    }).catch(err => {
      console.log(err);
    })
  }

  sortear() {
    this._http.sortear().then(result => {
      this.sorteioSucesso = false;
      setTimeout(() => {
        this.sorteioSucesso = true;
      }, 3000)
    }, err => {
      console.log(err);
    })
  }

}
