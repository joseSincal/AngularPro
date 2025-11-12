import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    OnInit,
    signal,
} from "@angular/core";
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from "../../pokemons/services/pokemons.service";
import { SimplePokemon } from "../../pokemons/interfaces";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "pokemons-page",
    imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
    templateUrl: "./pokemons-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
    private pokemonService = inject(PokemonsService);
    public pokemons = signal<SimplePokemon[]>([]);

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private title = inject(Title);

    public currentPage = toSignal<number>(
        this.route.params.pipe(
            map((params) => params["page"] ?? "1"),
            map((page) => (isNaN(+page) ? 1 : +page)),
            map((page) => Math.max(1, page))
        )
    );

    public loadOnPageChanged = effect(() => {
        this.loadPokemons(this.currentPage());
    });

    // public isLoading = signal(true);

    // private appRef = inject(ApplicationRef);

    // private $appState = this.appRef.isStable.subscribe((isStable) => {
    //     console.log(isStable);
    // });

    // ngOnInit() {
    //     this.loadPokemons();
    //     // setTimeout(() => {
    //     //     this.isLoading.set(false);
    //     // }, 5000);
    // }

    public loadPokemons(page: number = 0) {
        this.pokemonService
            .loadPage(page)
            .pipe(
                // tap(() =>
                //     this.router.navigate([], {
                //         queryParams: { page: pageToLoad },
                //     })
                // ),
                tap(() =>
                    this.title.setTitle(`Pokemon SSR - Page ${page}`)
                )
            )
            .subscribe({
                next: (pokemons) => {
                    // console.log("On init");
                    this.pokemons.set(pokemons);
                },
            });
    }

    // ngOnDestroy(): void {
    //     this.$appState.unsubscribe();
    // }
}
