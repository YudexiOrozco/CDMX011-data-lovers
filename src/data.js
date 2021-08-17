import dataStudio from './data/ghibli/ghibli.js'

export function sendData(){
  return dataStudio.films;
}

//función para obtener el id y título de cada pelicula
export function getIdTitles(films) {
  let idTitles = [];

  films.forEach(film => {
    idTitles.push({
      id: film.id,
      title: film.title
    });
  });

  // idTitles.sort(function (a, b) {
  //   if (a.title > b.title) {
  //     return 1;
  //   }
  //   if (a.title < b.title) {
  //     return -1;
  //   }
  //   return 0;

  // })

 return (idTitles);
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

export function createHtmlFilm(data) {
  let html = '';

  data.forEach(film => {
    html += `<div id="wrapper-grid" class="wrapper-grid">
                <div class="container-2">
                <img class="img-poster" src="${film.poster}">
                  <div class="capa">
                  <h2 class="film-title">${film.title}</h2>
                  <img class="img-hoja" ${'src=images/hoja.png'}>
                  <p class="release-date">${'Release Date:'+' '+film.release_date}</p>
                  </div>
              </div>
              </div>`
  })
  return html;
}
