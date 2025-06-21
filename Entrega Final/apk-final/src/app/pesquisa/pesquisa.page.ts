import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
  standalone: false
})
export class PesquisaPage implements OnInit {

  pokemons: any[] = [];
  loading = false;

  constructor(private pokeapi: PokeapiService) { }

  ngOnInit() {
  }

  pokemon_busca(event: Event) {
  const input = event.target as HTMLInputElement;
  const nomeDigitado = input.value.trim().toLowerCase();

  if (!nomeDigitado) {
    this.pokemons = [];  // Limpa a lista se o campo estiver vazio
    return;
  }

  this.loading = true;

  this.pokeapi.pesquisar_pokemon_por_nome(nomeDigitado).subscribe(
    data => {
      this.pokemons = [data];
      this.loading = false;
    },
    error => {
      console.error('Pokémon não encontrado', error);
      this.pokemons = [];
      this.loading = false;
    }
  );
}


}
