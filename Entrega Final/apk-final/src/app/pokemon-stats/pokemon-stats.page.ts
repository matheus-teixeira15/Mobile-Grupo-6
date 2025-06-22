import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.page.html',
  styleUrls: ['./pokemon-stats.page.scss'],
  standalone: false
})
export class PokemonStatsPage implements OnInit {
  pokemon: any;

  gifUrl: string = '';

  nome_pokemon: string = '';

  type: string = '';
  height: string = '';
  weight: string = '';

  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  sa: number = 0;
  sd: number = 0;
  speed: number = 0;

  logado: boolean = false;
  favoritado: boolean = false;
  aviso_login: boolean = false;

  private readonly typeColors: { [key: string]: { primary: string; secondary: string } } = {
    normal: { primary: '#919AA2', secondary: '#6E787E' },
    fighting: { primary: '#CE416B', secondary: '#A42A54' },
    flying: { primary: '#89AAE3', secondary: '#5E7CE2' },
    poison: { primary: '#B567CE', secondary: '#8E44AD' },
    ground: { primary: '#D97845', secondary: '#A35228' },
    rock: { primary: '#C5B78C', secondary: '#A38C21' },
    bug: { primary: '#91C12F', secondary: '#71BA1E' },
    ghost: { primary: '#5269AD', secondary: '#2F3F7F' },
    steel: { primary: '#5A8EA2', secondary: '#417D94' },
    fire: { primary: '#FF9D55', secondary: '#F08131' },
    water: { primary: '#4A90DA', secondary: '#1D77D1' },
    grass: { primary: '#63BC5A', secondary: '#3EAE49' },
    electric: { primary: '#F4D23C', secondary: '#D9B514' },
    psychic: { primary: '#FA7179', secondary: '#F15687' },
    ice: { primary: '#73CEC0', secondary: '#4CD1C0' },
    dragon: { primary: '#0B6DC3', secondary: '#004B98' },
    dark: { primary: '#5A5465', secondary: '#3A3541' },
    fairy: { primary: '#EC8FE6', secondary: '#E96DE0' },
    stellar: { primary: '#4D4D4D', secondary: '#1A1A1A' },
    default: { primary: '#68A090', secondary: '#4E887A' },
  };

  constructor(private router: Router, private location: Location, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.pokemon = navigation.extras.state['pokemon'] || null;

      this.nome_pokemon = this.pokemon['name'];

      this.gifUrl = this.pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

      if(!this.gifUrl){
        this.gifUrl = this.pokemon['sprites']['other']['showdown']['front_default']
      }

      this.type = this.pokemon['types'][0]['type']['name'];
      this.height = `${this.pokemon['height'] / 10} m`;
      this.weight = `${this.pokemon['weight'] / 10} kg`;

      this.hp = (this.pokemon['stats'][0]['base_stat'] / 255) * 100;
      this.attack = (this.pokemon['stats'][1]['base_stat'] / 255) * 100;
      this.defense = (this.pokemon['stats'][2]['base_stat'] / 255) * 100;
      this.sa = (this.pokemon['stats'][3]['base_stat'] / 255) * 100;
      this.sd = (this.pokemon['stats'][4]['base_stat'] / 255) * 100;
      this.speed = (this.pokemon['stats'][5]['base_stat'] / 255) * 100;
    }

    this.applyTypeColors()
  }

  private applyTypeColors(): void {


    const pokemonType = this.type.toLowerCase();

    const colors = this.typeColors[pokemonType] || this.typeColors['default'];

    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
  }

  voltar() {
    this.pokemon = ''
    this.nome_pokemon = ''
    this.location.back()
  }


  openAlert(){
    this.aviso_login = true
  }

  closeAlert(){
    this.aviso_login = false
  }

  changeFav(){

    if(this.logado){
      this.favoritado = !this.favoritado
    } else {
      this.openAlert()
    }

  }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.logado = true;
    } else {
      this.logado = false;
    }

  }

}
