import { sortData } from '../src/data.js';
import { filmsMock } from './dataMock';


describe('ordenamiento', () => {
  it('ordena la data de forma ascendente', () => {
    let orderedData = sortData(filmsMock, 'title', 'Ascendente');

    expect(orderedData).toHaveLength(2);
    expect(orderedData[0].title).toBe("Castle in the Sky");
  });
});
