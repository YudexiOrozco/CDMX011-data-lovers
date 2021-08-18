import { sortData, filterData, sendData, getIdDirectors } from '../src/data.js';
import { filmsMock, directorsMock } from './dataMock';

describe('obtener todas las peliculas', () => {
  it('retorna las 20 peliculas', () => {
    expect(sendData()).toHaveLength(20);
  })
})

describe('obtener nuevo objeto de cada director con sus peliculas', () => {
  it('retorna un nuevo objecto que agrupa los ids de las peliculas', () => {
    let result = getIdDirectors(filmsMock);

    expect(result).toEqual(directorsMock);
  })
}) 

describe('ordenamiento', () => {
  it('ordena la data de forma ascendente', () => {
    let orderedData = sortData(filmsMock, 'title', 'Ascendente');

    expect(orderedData[0].title).toBe("Castle in the Sky");
  });

  it('ordena la data de forma descendente', () => {
    let orderedData = sortData(filmsMock, 'title', 'Descendente');

    expect(orderedData[0].title).toBe("Whisper of the Heart");
  })
});

describe('filtrado por id de las peliculas', () => {
  it('retorna la pelicula que se esta buscando', () => {
    let idFilm = "ff24da26-a969-4f0e-ba1e-a122ead6c6e3";

    expect(filterData(filmsMock, idFilm).id).toBe(idFilm);
  })
})
