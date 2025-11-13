import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { PokeAPIResponse, Pokemon, SimplePokemon } from "../interfaces";

@Injectable({
    providedIn: "root",
})
export class PokemonsService {
    private httpClient = inject(HttpClient);

    public loadPage(page: number): Observable<SimplePokemon[]> {
        // 1, 2, 3, ...
        if (page !== 0) {
            --page;
        }

        page = Math.max(0, page);

        return this.httpClient
            .get<PokeAPIResponse>(
                `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
            )
            .pipe(
                map((resp) => {
                    const simplePokemons: SimplePokemon[] = resp.results.map(
                        (pokemon) => ({
                            id: pokemon.url.split("/").at(-2) ?? "",
                            name: pokemon.name,
                        })
                    );

                    return simplePokemons;
                })
                // tap(console.log)
            );
    }

    public loadPokemon(id: string) {
        return this.httpClient
            .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error("An error occurred:", error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `,
                error.error
            );
        }

        const errorMessage = error.error || "A error occurred";
        return throwError(() => new Error(errorMessage));
    }
}
