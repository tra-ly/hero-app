import { HeroService } from './../../hero.service';
import { Hero } from './../../hero';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe();
  }
}
