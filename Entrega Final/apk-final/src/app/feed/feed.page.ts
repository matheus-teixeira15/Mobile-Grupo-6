import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';


import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false
})
export class FeedPage implements OnInit {


  pokemons: any[] = [];
  loading = false;

  constructor(private pokeapi: PokeapiService) {

    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });

   }

  ngOnInit() {
    this.carregaPokemon(); // Pega os Pokémons quando o feed é aberto
  }

  carregaPokemon() {
    this.loading = true;
    this.pokeapi.lista_de_pokemon_aleatórios(20).subscribe(data => {
      this.pokemons = data; // Solicita 20 Pokémons e os armazena em pokemons
      this.loading = false;
    });
  }

  refresh() {
    this.carregaPokemon(); // Se o botão de refresh for apertado, pega novos Pokémons da API
  }

}



