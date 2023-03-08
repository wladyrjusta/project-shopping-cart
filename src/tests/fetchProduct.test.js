import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('É uma função', () => {
    expect(typeof fetchProduct).toBe('function');    
  });
  it('executada com o argumento MLB1405519561 chama a função fetch', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('executada com o argumento MLB1405519561 chama a função fetch com o ednpoint: https://api.mercadolibre.com/items/MLB1405519561', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('executada com o argumento MLB1405519561 retorna uma estrutura de dados igual ao objeto product que está importado no arquivo de teste', async () => {
    const data = await fetchProduct('MLB1405519561');
    expect(data).toEqual(product);
  });
  it('executada com sem argumento  retorna a mensagem de erro: ID não informado', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  });
});
