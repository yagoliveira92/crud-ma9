import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {

  criarForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    let emailPattern: RegExp;
    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phonePattern: RegExp = /^[0-9]*$/;
    let cpfPattern: RegExp;
    cpfPattern = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

    this.criarForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.maxLength(14), Validators.pattern(cpfPattern)]),
      sexo: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(emailPattern)]),
      emailConfirmacao: this.formBuilder.control('', [Validators.required, Validators.pattern(emailPattern)]),
      data_nasc: this.formBuilder.control('', [Validators.required]),
      phone: this.formBuilder.control('', [Validators.required, Validators.minLength(11), Validators.pattern(phonePattern)]),
    }, {validator: CriarComponent.equalsTo});
  }

  // tslint:disable-next-line:member-ordering
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmacao = group.get('emailConfirmation');
    if (!email || !emailConfirmacao) {
      return undefined;
    }

    if (email.value !== emailConfirmacao.value) {
      return {emailsNotMatch: true};
    }
    return undefined;
  }

  add(formObject: any) {
    const cliente: Cliente = {
      cli_cpf: formObject['cpf'],
      cli_nome: formObject['nome'],
      cli_sexo: formObject['sexo'],
      cli_email: formObject['email'],
      cli_dat_nasc: formObject['data_nasc'],
      cli_phone: formObject['phone']
    };
    this.clienteService.addCliente(cliente)
    .subscribe(response => {
      this.toastr.success('Cadastro realizado com sucesso!');
      this.router.navigate(['/']);
    },
    error => {
      console.log(error);
    });
  }

}
