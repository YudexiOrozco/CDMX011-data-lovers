import dataStudio from './data/ghibli/ghibli.js'
//es resoponsable de toda la logica

export function sendData(){
  return dataStudio.films;
}
// let data = sendData();

// const hayaoDirector = data.filter(film => film.director == 'Hayao Miyazaki' )
// const peopleHayo = hayaoDirector.filter(people => people.name)

// function people(films) {
//   peopleDirectors = {};

//   films.forEach(film => {
//     let titleFilm = film.title.toLowerCase().replaceAll(' ', '_'); 
//     peopleDirectors[director] = {};
//     peopleDirectors[director][]

//   })


// }


// let data = sendData();


// function filterPeople(film) {
//  let person = [];
//  for (let i = 0; i < film.length; i++) {
//    let people = film[i].people;
//    for (let i in people) {
//      if(people[i].specie === 'Cat') {
//        person.push(people[i].name)
//      }
//    }
//  }
//  console.log(person);
// }
// filterPeople(data)


//función para obtener el id y título de cada pelicula
export function getIdTitles(films) {
  let idTitles = [];

  films.forEach(film => {
    // console.log(film.id, film.title);
    idTitles.push({
      id: film.id,
      title: film.title
    });
  });

  idTitles.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;

  })

 return (idTitles);
}



export function getIdDirectors(films) {

  let directorsHash = {};

    films.forEach(film => {
      //creando la llave del objeto, en minusculas y sin espacios.
      let keyDirector = film.director.toLowerCase().replaceAll(' ', '_'); 
      //como es la primera pelicula que se consulta del ciclo, no existe la llave en directorHash
      //film.director: nombre completo sin transformaciones.
      if(directorsHash[keyDirector] === undefined) {
        directorsHash[keyDirector] = {}; 
        directorsHash[keyDirector]['name_director'] = film.director; 
        directorsHash[keyDirector]['id_films'] =  []; 
        directorsHash[keyDirector]['id_films'].push(film.id);
        
      }else{
        //este paso sucede cuando ya se le ha creado una key al director y se necesita agregar un nuevo id de pelicula al mismo director en id_films
        //esto sucede cuando el director tiene mas de una pelicula
        directorsHash[keyDirector]['id_films'].push(film.id); 
      }
    });

  return(directorsHash);
}
