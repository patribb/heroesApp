import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  selectedHeroe: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSuggestions( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes)
  }

  optionSelected( event: MatAutocompleteSelectedEvent ) {

    // vlidar si es un string vacío
    if(!event.option.value){
      this.selectedHeroe = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById( heroe.id! )
      .subscribe( heroe => this.selectedHeroe = heroe)
    
  }

}
