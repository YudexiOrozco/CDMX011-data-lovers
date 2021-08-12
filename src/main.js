// el archivo main es encargado de todo el html (dom)

import { sendData,  getIdTitles, getIdDirectors} from './data.js';
let allData = sendData();

let filmSelect = document.getElementById('films');
let container = document.getElementById('container');

let directors = document.getElementById('directors');
let infoFilms = document.getElementById('infoFilms');
let orderFilm = document.getElementById('orderFilm');
let orderFilm2 = document.getElementById('orderFilm2');
let order_film = document.getElementById('order_film');
let buttonInicio = document.getElementById('button-inicio');
let btnFilms = document.getElementById('btnFilms');
// let containerSlider = document.getElementById('container-slider');
// let encabezado = document.getElementByI("encabezado");

let allDirectors = getIdDirectors(allData);


btnFilms.addEventListener('click', function() {

  container.style = "display: block";
  slider.style = "display: none";
  btnFilms.style = "display: none";
  filmSelect.style = "display: block";
  directors.style = "display: block";
  order_film.style = "display: block";
  buttonInicio.style = "display: block";

});


let slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function sliderNext() {
  let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function() {
    slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

function sliderPrev() {
  let sliderSection = document.querySelectorAll(".slider-section");
  let sliderSectionLast = sliderSection[sliderSection.length -1];
  slider.style.marginLeft = "0";
  slider.style.transition = "all 0.5s";
  setTimeout(function() {
    slider.style.transition = "none";
    slider.insertAdjacentElement('afterbegin', sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnRight.addEventListener('click', function() {
  sliderNext();
});


btnLeft.addEventListener('click', function() {
  sliderPrev();
});

setInterval(() => {
  sliderNext();
}, 5000);


 
function selectOrder(){

  let option1 = document.createElement('option');
  let option2 = document.createElement('option');

  option1.text = 'Descendente';
  option1.value = 'Ascendente';
  option2.text = 'Ascendente';
  option2.value = 'Descendente';
  order_film.appendChild(option1);
  order_film.appendChild(option2);

  let datosFilm = [];
  

  allData.forEach(film => {
    datosFilm.push({
      title: film.title,
      id: film.id,
      poster: film.poster
    }) 
  
  
  datosFilm.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  })

  

  order_film.addEventListener("change", () => {
  
    let html2 = '';
    let html3 = '';
    let select = (order_film.value);
    container.innerHTML = '';
    orderFilm.innerHTML= '';   
    orderFilm2.innerHTML= '';
    infoFilms.innerHTML = '';


    let data = datosFilm;
    let directorValue = directors.value;

    if(directorValue != 'all') {
      let name = allDirectors[directorValue].name_director;

      data = allData.filter( film => film.director == name)
    }
    
    data.forEach(film => {

      
      if(select === 'Ascendente') {

        html2 += `<div id="wrapper-grid" class="wrapper-grid">
                    <div class="container-2">
                    <img class="img-poster" src="${film.poster}">
                      <div class="capa">
                      <h2 class="film-title">${film.title}</h2>
                      </div>
                  </div>
                </div>`
      }
      
    })
    
    let reverse = data.reverse();
    reverse.forEach(film => {

       if (select === 'Descendente') {
        
          html3 += `<div id="wrapper-grid" class="wrapper-grid">
                      <div class="container-2">
                      <img class="img-poster" src="${film.poster}">
                        <div class="capa">
                        <h2 class="film-title">${film.title}</h2>
                        </div>
                      </div>
                    </div>`
      }

    })
    orderFilm.innerHTML= html2;   
    orderFilm2.innerHTML= html3;
    
    
  });
 })

// console.log(datosFilm)

    
}


selectOrder();
  



//////////////////////////////



function fillSelect() {
  let optionAll = document.createElement('option');
  optionAll.text = 'Filmography';
  optionAll.value = 'all';
  filmSelect.appendChild(optionAll); 

  getIdTitles(allData).forEach(idTitle => {
    let option = document.createElement('option');

    option.text = [idTitle.title]; 
    option.value = idTitle.id; 
    filmSelect.appendChild(option);
  });
  let html = "";
 
  allData.forEach(film => {

    let nuevoElemento = document.createElement("div");
    nuevoElemento.setAttribute("id", film.id)
    nuevoElemento.setAttribute("class", "wrapper-grid")

   html = `<div class="container-2">
              <img class="img-poster" src="${film.poster}">
              <div class="capa">
                <h2 class="film-title">${film.title}</h2>
              </div>
            </div>
            `
  nuevoElemento.innerHTML = html

  container.appendChild(nuevoElemento)
 
  
  nuevoElemento.addEventListener("click", () => {
     allData.forEach(film => {
     
       if (nuevoElemento.id === film.id) {
      
         container.innerHTML = ''
          let element =
          `<div class="divSection">
            <section class="poster-section">
              <img src="${film.poster}">
            </section>
              <h2 class="film-title2">${film.title}</h2>
              <h3 class="description">${film.description}</h3>
              
          </div>
        `

        film.people.forEach(person => {
          element += `<div class="wrapper-grid-people">
                        <div class="container-people">
                        <h2 class="film-title">${person.name}</h2>
                        <img class="img-poster" src="${person.img}">
                      
                        </div>
                      </div>`

        })

        infoFilms.innerHTML = element
        
      }


  })
       

       
  })
      
    });
}

filmSelect.addEventListener("change", function() {
  let getId = (filmSelect.value)
  let html = "";
  
  allData.forEach(film => {
   
    if(getId === film.id) {

      html += `<div id="wrapper-grid" class="wrapper-grid">
                <div class="container-2">
                <img class="img-poster" src="${film.poster}">
                  <div class="capa">
                  <h2 class="film-title">${film.title}</h2>
                  </div>
              </div>
            </div>`
    } else if(getId === "all") {
      html += `<div id="wrapper-grid" class="wrapper-grid">
                <div class="container-2">
                  <img class="img-poster" src="${film.poster}">
                    <div class="capa">
                    <h2 class="film-title">${film.title}</h2>
                    </div>
                </div>
              </div>`
    }
  });
  container.innerHTML = html;
})

//Agregar opciones al select de Directors, que seria 'directors'
function selectDirectors() {
  let optionAll = document.createElement('option');
  optionAll.text = 'Directors';
  optionAll.value = 'all';

  directors.appendChild(optionAll); //creamos las opciones y se las agregamos al padre select


  Object.keys(allDirectors).forEach(idDirector => {
    
    let option = document.createElement('option'); //por cada array recorrido se crea una opcion

    option.text = allDirectors[idDirector].name_director; //text es lo que el usuario ve
    option.value = idDirector; // value, por medio de que valor se evalua el texto. Por id
  
    directors.appendChild(option);//creamos las opciones y se las agregamos al padre select
  });
}

directors.addEventListener("change", function() {
  let idDirector = directors.value; //valor del select. directors es el select
  let html = "";
  let idDirectorFilms = allDirectors[idDirector].id_films; //todos los id de sus peliculas
  
  //que pelicula va impirmir por cada director
  //este recorre toda la data
    container.innerHTML = '';
    orderFilm.innerHTML= '';   
    orderFilm2.innerHTML= '';
    infoFilms.innerHTML = '';
  allData.forEach(film => {

    idDirectorFilms.forEach(idDirectorFilm => {
          
          if(idDirectorFilm === film.id) {

           
            let nuevoElemento = document.createElement("div");
            nuevoElemento.setAttribute("id", film.id)
            nuevoElemento.setAttribute("class", "wrapper-grid")

            html = `<div class="container-2">
            <img class="img-poster" src="${film.poster}">
            <div class="capa">
              <h2 class="film-title">${film.title}</h2>
            </div>
          </div>
          `
          nuevoElemento.innerHTML = html

          container.appendChild(nuevoElemento)

          nuevoElemento.addEventListener("click", () => {

            
             allData.forEach(film => {
             
               if (nuevoElemento.id === film.id) {
              
                 container.innerHTML = ''
                 infoFilms.innerHTML =
                  `<h2 class="film-title">${film.title}</h2>
                   <img src="${film.poster}">
                   <h3 class="description">${film.description}</h3>
                   <ul>${film.people.map((person) => {
                        return `<li>${person.name}</li>`;
                   })}</ul>
                   <div>${film.people.map((person) => {
                    return `<img src="${person.img}">`;
               })}</div>`
               
               }
        
             })
              
            });


            // html += `<div id="wrapper-grid" class="wrapper-grid">
            //             <div class="container-2">
            //             <img class="img-poster" src="${film.poster}">
            //               <div class="capa">
            //               <h2 class="film-title">${film.title}</h2>
            //               </div>
            //           </div>
            //         </div>`
          }  
    });
  });
  
  
  // container.innerHTML = html;

});





fillSelect();
selectDirectors();
