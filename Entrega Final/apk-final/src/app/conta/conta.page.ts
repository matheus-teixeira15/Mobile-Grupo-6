import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: false
})
export class ContaPage implements OnInit {
  email: string = '';
  password: string = '';
  isCreatingAccount: boolean = false;

  constructor(private auth: Auth, private router: Router) {}
  
  
  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      // this.router.navigateByUrl('/home');

    } catch (error) {
      alert('Erro no login: ' + (error as any).message);
    }
  }
  
  
  async register() {
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      alert('Usuário criado com sucesso!');
      this.isCreatingAccount = false;
      this.email = '';
      this.password = '';
    } catch (error) {
      alert('Erro ao criar usuário: ' + (error as any).message);
    }
  }


    toggleForm() {
    this.isCreatingAccount = !this.isCreatingAccount;
  }
  

  ngOnInit() {
  }

}



