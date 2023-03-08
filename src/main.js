import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

const sectionProducts = document.querySelector('.products');
const loading = document.createElement('h2');
const elementError = document.createElement('h2');

const setLoadPageMessage = () => {
  loading.className = 'loading';
  loading.innerText = 'Carregando...';
  sectionProducts.appendChild(loading);
};

const removeLoadPageMessage = () => {
  sectionProducts.removeChild(loading);
};

const createSectionProductsList = async () => {
  try {
    const product = await fetchProductsList('computador');
    for (let index = 0; index < product.length; index += 1) {
      sectionProducts.appendChild(createProductElement(product[index]));
    }
  } catch (error) {
    elementError.className = 'error';
    elementError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    return sectionProducts.appendChild(elementError);
  }
};

setLoadPageMessage();
await createSectionProductsList();
removeLoadPageMessage();

const cartList = document.querySelector('.cart__products');
const addToCartBtn = document.querySelectorAll('.product__add');

addToCartBtn.forEach((btn) => btn.addEventListener('click', () => {
  const product = btn.parentNode;
  const id = product.firstElementChild.innerText;
  saveCartID(id);
  cartList.appendChild(product);
}));

const savedCartIds = getSavedCartIDs();

const savedProductsPromises = savedCartIds.map((id) => fetchProduct(id));

const savedProductsObj = await Promise.all(savedProductsPromises);

savedProductsObj.forEach((productObj) => {
  cartList.appendChild(createCartProductElement(productObj));
});

document.querySelector('.cep-button').addEventListener('click', searchCep);
