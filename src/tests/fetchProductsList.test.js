import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
 it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');  
  });
  it('Ao ser executada com um argumento válido deve chamar a função fetch', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao ser executada com o argumento `computador` deve chamar a função fetch com o seguinte endpoint: `https://api.mercadolibre.com/sites/MLB/search?q=computador`', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Ao ser executada com o argumento `computador` deve retornar uma estrutura de dados semelhante ao objeto computadorSearch', async () => {
    const data = await fetchProductsList('computador');
    expect(data).toEqual(computadorSearch);
  });
  it('Ao ser executada sem argumento deve retornar o erro `Termo de busca não informado`', async () => {    
    await expect(fetchProductsList()).rejects.toThrow(new Error('Termo de busca não informado'));
  });
});
