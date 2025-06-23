import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PokeapiService } from '../services/pokeapi.service';
import { FavoritosService } from '../services/favoritos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  loading: boolean = false;

  constructor(
    private location: Location,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private pokeapiService: PokeapiService,
    private favoritosService: FavoritosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.favoritos = [];
    const user: any = this.auth.currentUser;

    if (!user) {
      this.router.navigate(['/conta']);
    }

    this.loading = true;

    const favoritoRef = collection(
      this.firestore,
      `users/${user.email}/favoritos`
    );
    const docSnapshot = await getDocs(favoritoRef);

    docSnapshot.forEach((doc) => {
      const dados_pokemon: any = doc.data();

      this.favoritos.push(dados_pokemon);
    });

    this.loading = false;

  }

  verStats(nome_pokemon: string) {
    this.pokeapiService
      .pesquisar_pokemon_por_nome(nome_pokemon)
      .subscribe((data: any) => {
        this.router.navigate(['/pokemon-stats'], {
          state: { pokemon: data },
        });
      });
  }

  capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  async removerFavorito(nome_pokemon: string) {
    this.favoritosService.removeFavorito(nome_pokemon)
    this.favoritos = this.favoritos.filter(fav => fav.nome_pokemon !== nome_pokemon)

    const toast = await this.toastController.create({
      message: `${this.capitalizeFirstLetter(nome_pokemon)} foi libertado! 🎾`,
      duration: 3000,
      position: 'bottom',
      color: 'success',
      cssClass: 'pokeball-toast'
    });

    await toast.present();

  }

  voltar() {
    this.location.back();
  }
}
