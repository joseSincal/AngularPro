import { RenderMode, ServerRoute } from "@angular/ssr";

const TOTAL_POKEMONS = 10;

export const serverRoutes: ServerRoute[] = [
    {
        path: "pokemon/:id",
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() {
            const pokemonNameList = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
            ).then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon list");
                }
                return response.json();
            });

            const pokemonList = pokemonNameList.results.map(
                (pokemon: { name: string }) => ({ id: pokemon.name })
            );
            return pokemonList;
        },
    },
    {
        path: "pokemons/page/:page",
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() {
            return Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1).map(
                (id) => ({
                    page: id.toString(),
                })
            );
        },
    },
    {
        path: "**",
        renderMode: RenderMode.Server,
    },
];
