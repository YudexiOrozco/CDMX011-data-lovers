import dataStudio from './data/ghibli/ghibli.js'

export function sendData(){
  return dataStudio.films;
}

//Creando un objeto con un id de cada director con sus peliculas
export function getIdDirectors(films) {
  let directorsHash = {};

    films.forEach(film => {
      let keyDirector = film.director.toLowerCase().replaceAll(' ', '_'); 
      
      if(directorsHash[keyDirector] === undefined) {
        directorsHash[keyDirector] = {}; 
        directorsHash[keyDirector]['name_director'] = film.director; 
        directorsHash[keyDirector]['id_films'] =  []; 
        directorsHash[keyDirector]['id_films'].push(film.id);
        
      }else{
        directorsHash[keyDirector]['id_films'].push(film.id); 
      }
    });

  return(directorsHash);
}

export function filterData(data, idFilm) {
  return data.filter(film => film.id == idFilm)[0]
}

export function sortData(data, sortBy, sortOrder) {
  if(sortOrder === 'Ascendente') {
    data.sort(function (a, b) {
      
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      return 0;
    })
    }    
    
  if (sortOrder === 'Descendente') {
    data.sort(function (a, b) {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return 1;
      }
      return 0;
    })
  }

  return data;
}
