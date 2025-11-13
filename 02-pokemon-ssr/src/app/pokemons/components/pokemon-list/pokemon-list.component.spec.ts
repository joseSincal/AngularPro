import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonListComponent } from "./pokemon-list.component";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";

const mockPokemons: SimplePokemon[] = [
    { id: "1", name: "bulbasaur" },
    { id: "2", name: "ivysaur" },
    { id: "3", name: "venusaur" },
];

describe("PokemonListComponent", () => {
    let fixture: ComponentFixture<PokemonListComponent>;
    let compiled: HTMLElement;
    let component: PokemonListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonListComponent],
            providers: [provideZonelessChangeDetection(), provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
    });

    it("should create the app", () => {
        fixture.componentRef.setInput("pokemons", mockPokemons);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it("should render the pokemon list with 3 pokemon-card", () => {
        fixture.componentRef.setInput("pokemons", mockPokemons);
        fixture.detectChanges();

        expect(compiled.querySelectorAll("pokemon-card").length).toBe(
            mockPokemons.length
        );
    });

    it("should render 'No hay pokemons' when the list is empty", () => {
        fixture.componentRef.setInput("pokemons", []);
        fixture.detectChanges();

        const div = compiled.querySelector("div")!;
        expect(div).toBeDefined();
        expect(div.textContent).toContain("No hay pokemons");
    });
});
