import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage:Storage) {
    this.storage.create();
  }

  ngOnInit(){
    this.atualizaLista();
  }

  variavel_lista = [[]];
  texto: string = "";
  valor: string = "";
  soma: number = 0;
  aux = 0;

  async Salvar(){
    let Numero = parseInt(this.valor);



    if(!(this.texto == "")){

      this.variavel_lista.forEach(item => {
        if(parseInt(item[0]) > this.aux){
          this.aux = parseInt(item[0]);
        }
      })



      this.aux = this.aux + 1;

      await this.storage.set(this.aux.toString(), [this.texto, this.valor] );
      this.atualizaLista();
      this.soma = this.soma + Numero;
      this.texto = "";
      this.valor = "";

    }

  }

  atualizaLista(){
    this.variavel_lista = [];
    this.storage.forEach((valor, key, index ) =>{
    this.variavel_lista.push([key,valor])
  })
  }



  async Remover(indice){

    await this.storage.remove(indice);
    this.atualizaLista();

  }

  //*ngFor = "let item of variavel_lista" no item
  //[(ngModel)]="texto" no input

}
