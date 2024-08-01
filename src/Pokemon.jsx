import { useEffect } from "react";
import "./index.css"
import { useState } from "react";
import PokemonCards from "./PokemonCards";

export default function Pokemon() {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fetchPokemon = async () => {
        try {
            const response = await fetch(API)
            const data = await response.json();

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const response = await fetch(currPokemon.url);
                const data = await response.json();
                return data;
            });

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);
        } catch (error) {
            console.error();
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    //search funtionality

    const searchData = pokemon.filter((currPokemon) => currPokemon.name.toLowerCase().includes(search.toLowerCase()));

    if(loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if(error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokemon</h1>
                </header>
        
                <div className="pokemon-search">
                    <input type="text" placeholder="Search Pokemon" value={search} onChange={(event) => setSearch(event.target.value)}/>
                </div>

                <div className="extra">
                    <ul className="cards">
                        {searchData.map((currPokemon) => {
                            return (
                                <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
}