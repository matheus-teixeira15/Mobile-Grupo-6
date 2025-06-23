import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  async login() {
    try {
      await this.authService.login(this.email, this.password);

      this.isLoggedIn = true;

    } catch (error) {
      alert('Erro no login: ' + (error as any).message);
    }
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      alert('Usuário criado com sucesso!');
      this.isCreatingAccount = false;
      this.email = '';
      this.password = '';
    } catch (error) {
      alert('Erro ao criar usuário: ' + (error as any).message);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.isLoggedIn = false;
    } catch (error) {
      alert('Erro ao sair: ' + (error as any).message);
    }
  }

  toggleForm() {
    this.isCreatingAccount = !this.isCreatingAccount;
  }

  irFavoritos() {
    this.router.navigate(['/favoritos']);
  }

  ngOnInit() {}


}



