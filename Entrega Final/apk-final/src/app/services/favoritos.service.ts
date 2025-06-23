import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { deleteDoc, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async addFavorito(nome_pokemon: any, url_imagem: string){
    const user = this.auth.currentUser

    if (!user) {
      return
    }

    const docRef = doc(this.firestore, `users/${user.email}/favoritos/${nome_pokemon}`)
    await setDoc(docRef, { nome_pokemon: nome_pokemon, url_imagem: url_imagem })

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

  async verificarFavorito(nome_pokemon: string): Promise<boolean> {
    const user: any = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user.email}/favoritos/${nome_pokemon}`)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`Pokemon ${nome_pokemon} está nos favoritos.`);
      return true;
    } else {
      console.log(`Pokemon ${nome_pokemon} não está nos favoritos.`);
      return false;
    }
  }
}
