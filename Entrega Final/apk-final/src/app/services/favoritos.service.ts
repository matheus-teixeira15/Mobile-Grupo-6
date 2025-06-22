import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async addFavorito(nome_pokemon: any){
    const user = this.auth.currentUser

    if (!user) {
      return
    }

    const docRef = doc(this.firestore, `users/${user.email}/favoritos/${nome_pokemon}`)
    await setDoc(docRef, { favorito: nome_pokemon })

    console.log(`Pokemon ${nome_pokemon} adicionado aos favoritos.`)

  }

  async removeFavorito(nome_pokemon: any){
    const user = this.auth.currentUser

    if (!user) {
      return
    }

    const docRef = doc(this.firestore, `users/${user.email}/favoritos/${nome_pokemon}`)
    await deleteDoc(docRef)

    console.log(`Pokemon ${nome_pokemon} removido dos favoritos.`)

  }
}
