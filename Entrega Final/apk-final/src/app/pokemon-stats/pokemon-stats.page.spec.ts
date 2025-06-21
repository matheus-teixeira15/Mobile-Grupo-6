import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonStatsPage } from './pokemon-stats.page';

describe('PokemonStatsPage', () => {
  let component: PokemonStatsPage;
  let fixture: ComponentFixture<PokemonStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
