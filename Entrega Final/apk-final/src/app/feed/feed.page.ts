import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';


import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false
})
export class FeedPage implements OnInit {


  pokemons: any[] = [];
  loading = false;

  constructor(private pokeapi: PokeapiService, private router: Router) {

    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });

  }

  ngOnInit() {
    this.carregaPokemon(); // Pega os Pokémons quando o feed é aberto
  }

  carregaPokemon(event?: any) {
    this.loading = true;
    this.pokeapi.lista_de_pokemon_aleatórios(20).subscribe(data => { // Solicita 20 Pokémons e os armazena em pokemons
      this.pokemons = data;
      this.loading = false;

      if (event) {
        event.target.complete(); // Fecha o ícone de refresh
      }
    });
  }

  refresh(event: any) {
    this.carregaPokemon(event); // Se o usuário arrastar a tela pra baixo, ativa o refresh e pega novos Pokémons da API;
  }

  verStats(pokemon: Object){
    this.router.navigate(['/pokemon-stats'], {
      state: {pokemon: pokemon}
    })
  }

}



