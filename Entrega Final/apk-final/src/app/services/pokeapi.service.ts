// src/app/services/pokeapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  pegar_pokemon_por_id(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);  // Usa ID como parâmetro para pegar um Pokémon específico da API
  }

  lista_de_pokemon_aleatórios(count: number): Observable<any[]> {
    const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 898) + 1); // Gera uma lista de IDs aleatórios usando funções de JavaScript
    const requests = randomIds.map(id => this.pegar_pokemon_por_id(id)); // A função map aplica a função pegar_pokemon_por_id em cada ID da lista
    return forkJoin(requests); // Retorna os resultados
  }
}
