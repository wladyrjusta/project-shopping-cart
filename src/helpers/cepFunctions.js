export const getAddress = async (cep) => {
  const AWESOME_API = `https://cep.awesomeapi.com.br/json/${cep}`;

  const BRASIL_API = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const cepLength = 8;

  if (!cep || cep.length < cepLength || cep.length > cepLength) {
    throw new Error('CEP não encontrado');
  }

  const apiCepResponse = async (api) => {
    const response = await fetch(api);
    const data = await response.json();

    return data;
  };

  const result = await Promise
    .any([apiCepResponse(AWESOME_API), apiCepResponse(BRASIL_API)]);

  return result;
};

export const searchCep = async () => {
  const cepInput = document.querySelector('.cep-input');
  const addressSpan = document.querySelector('.cart__address');

  try {
    const endereço = await getAddress(cepInput.value);
    const { address, district, city, state } = endereço;
    addressSpan.innerHTML = `${address} - ${district} - ${city} - ${state}`;
  } catch (error) {
    addressSpan.innerHTML = 'CEP não encontrado';
  }
};
