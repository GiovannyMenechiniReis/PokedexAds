import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get('/', function (request:Request, response: Response) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            response.render("index", data);
        });
});


app.get("/pokemon/:name", function (request: Request, response: Response) {
    const pokemonName = request.params.name.toLowerCase(); // Transforme o nome para minúsculas para garantir que funcione
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((pokemonDetails) => {
        response.render("pokemon", { pokemon: pokemonDetails });
      })
      .catch((error) => {
        console.error(error); // Mostra o erro no console para depuração
        response.status(404).send("Pokémon not found");
      });
  });
  


app.listen(3000, function () {
    console.log("Server is running");
})