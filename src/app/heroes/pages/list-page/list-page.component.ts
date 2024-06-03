import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor( private heroesService: HeroesServices) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      data => this.heroes = data
    )
  }
}
