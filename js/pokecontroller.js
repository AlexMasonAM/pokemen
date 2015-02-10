angular
  .module('pokeApp')
  .controller('PokeController', PokeController);

PokeController.$inject = ['$http' ];

function PokeController($http) {
  var self = this;

  self.text = "hello world";
  self.images = [];
  self.getPokemon = getPokemon;
  self.pokeNumber = 25;

  function getPokemon () {
    $http.get("http://pokeapi.co/api/v1/pokemon/" + self.pokeNumber)
      .success(function(data,status){
        self.images = [];
        self.name = data.name;
        self.abilities = data.abilities;
        console.log(data);
        for(var i = 0; i < data.sprites.length; i++) {
          $http.get("http://pokeapi.co/" + data.sprites[i].resource_uri)
            .success( function(data,status){
              self.images.push("http://pokeapi.co" + data.image);
            });
        }
      })
      .error(function(data,status){
        console.warn(status);
      })

      // IIFE, Initialize Function
      // (function (string) {
      //   console.log(string);})("hello");
  }
  // getPokemon(); //calls the getPokemon function
}