export const fetchProduct = async (productId) => {
  const PRODUCT_API = `https://api.mercadolibre.com/items/${productId}`;

  if (!productId) {
    throw new Error('ID não informado');
  }

  const response = await fetch(PRODUCT_API);
  const data = await response.json();

  return data;
};

export const fetchProductsList = async (product) => {
  const PRODUCTLIST_API = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  if (!product) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(PRODUCTLIST_API);
  const data = await response.json();

  return data.results;
};
