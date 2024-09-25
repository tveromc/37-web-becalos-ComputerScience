// const pokemons = []; // tengo un arreglo vacío, es decir lo vamos a 

// tenemos un arreglo de objetos 
//* arreglo original
const pokemons = [
    {nombrePokemon: 'Pikachu', tipoPokemon: 'Eléctrico',fuerzaPokemon: 55, vidaPokemon: 40},
    {nombrePokemon: 'Charmander', tipoPokemon: 'Fuego', fuerzaPokemon:52, vidaPokemon: 39},
    {nombrePokemon: 'Bulbasaur', tipoPokemon: 'Hoja', fuerzaPokemon:49, vidaPokemon: 45},
    {nombrePokemon: 'Squirtle', tipoPokemon: 'Agua', fuerzaPokemon:48, vidaPokemon: 44},
];

//* nuevo arreglo 
// Nuevo arreglo de evoluciones de Pokémon
const pokemonsEvolutions = [
    { nombrePokemon: 'Pikachu', pokemonEvolution: 'Raichu' },
    { nombrePokemon: 'Charmander', pokemonEvolution: 'Charmeleon' },
    { nombrePokemon: 'Bulbasaur', pokemonEvolution: 'Ivysaur' },
    { nombrePokemon: 'Squirtle', pokemonEvolution: 'Wartortle' }
];

pokemons.push({
    nombrePokemon: 'Ditto', 
    tipoPokemon: 'Agua', 
    fuerzaPokemon: 30, 
    vidaPokemon: 25
});

pokemons.push({
    nombrePokemon: 'Charizar', 
    tipoPokemon: 'Fuego', 
    fuerzaPokemon: 70, 
    vidaPokemon: 90
});

pokemons.push({
    nombrePokemon: 'Caterpie', 
    tipoPokemon: 'Bicho', 
    fuerzaPokemon: 23, 
    vidaPokemon: 30
});

// usamos una función para ordernar, está función es conocida como:
// función de comparación  (a,b) => {...}  a & b son dos objetos Pokemons
// a.nombrePokemon => concatenar el nombre del pokemon al objeto a
// b.nombrePokemon => concatenar el nombre del pokemon al objeto b
pokemons.sort((a,b) => {
    if(a.nombrePokemon < b.nombrePokemon){
        return -1;
    }
    if(a.nombrePokemon > b.nombrePokemon){
        return 1;
    }
    return 0;
});


//función, para obtener la lista de pokemons solamente con su nombre y tipo
function getPokemonsList() {
    //map crea un nuevo arreglo a partir de uno existente o del arreglo original.
    return  pokemons.map(pokemon => {
        return { nombrePokemon: pokemon.nombrePokemon, tipoPokemon: pokemon.tipoPokemon}
    });
}

function getFilteredPokemons(){
    // filtrarme los datos que a mi me interesan para mostrar en un arreglo nuevo.
    return pokemons.filter(pokemon => pokemon.tipoPokemon === 'Eléctrico')
}

//función para agregar un nuevo pokemon al arreglo
function setNewPokemon(nombre, tipo, fuerza, vida) {
    pokemons.push(
        {
            nombrePokemon: nombre,
            tipoPokemon: tipo,
            fuerzaPokemon: fuerza,
            vidaPokemon: vida
        }
    )
}

// Función para combinar ambos arreglos y mostrar nombre, evolución y tipo
function getPokemonsEvolution() {
    return pokemons.map(pokemon => {
        const evolucion = pokemonsEvolutions.find(evo => evo.nombrePokemon === pokemon.nombrePokemon);
        return {
            nombrePokemon: pokemon.nombrePokemon,
            pokemonEvolution: evolucion ? evolucion.pokemonEvolution : 'No tiene evolución',
            tipoPokemon: pokemon.tipoPokemon
        };
    });
}


//Agregamos más pokémons de tipo electrico y fuego
setNewPokemon('Electabuzz', 'Eléctrico', 65, 65);
setNewPokemon('Jolteon', 'Eléctrico', 65, 65);
setNewPokemon('Magmar', 'Fuego', 65, 65);
setNewPokemon('Flareon', 'Fuego', 65, 65);

console.log(pokemons);
console.log(`La cantidad de elementos del arreglo pokemons es de: ${pokemons.length}`);
console.log('Lista de pokemons por (nombre y tipo)', getPokemonsList());
console.log('Pokemons de tipo Eléctrico', getFilteredPokemons(), 
            '\n Pokemons de tipo Eléctrico', getFilteredPokemons().length );
console.log('Lista combinada de Pokémon y sus evoluciones:', getPokemonsEvolution());