//PALETAS
'use strict';
const cardContent = document.querySelector('.section__card-content');
const byDflt = document.querySelector('.default');
const orange = document.querySelector('.orange');
const blue = document.querySelector('.blue');

function colorClickO(e) {
  const palette = e.target;
  cardContent.classList.add('orange-palette');
  cardContent.classList.remove('default-palette');
  cardContent.classList.remove('blue-palette');
  jason.palette = 2;

}
orange.addEventListener('click', colorClickO);

function colorClickD(e) {
  const palette = e.target;
  cardContent.classList.remove('orange-palette');
  cardContent.classList.add('default-palette');
  cardContent.classList.remove('blue-palette');
  jason.palette = 1;
}

byDflt.addEventListener('click', colorClickD);

function colorClickB(e) {
  const palette = e.target;
  cardContent.classList.remove('orange-palette');
  cardContent.classList.remove('default-palette');
  cardContent.classList.add('blue-palette');
  jason.palette = 3;
}

blue.addEventListener('click', colorClickB);


//aplicamos las tipografias

const ubuntu = document.querySelector('#ubuntu');
const comic = document.querySelector('#comic');
const monse = document.querySelector('#monserrat');

function fontClickU(e) {
  const f = e.currentTarget.value;

  cardContent.classList.add('font-ubuntu');
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.remove('font-comic');
  jason.typography = 3;
}
ubuntu.addEventListener('click', fontClickU);

function fontClickM(e) {
  const f = e.currentTarget.value;
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.add('font-monserrat');
  cardContent.classList.remove('font-comic');
  jason.typography = 1;
}

monse.addEventListener('click', fontClickM);

function fontClickC(e) {
  const f = e.currentTarget.value;
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.add('font-comic');
  jason.typography = 2;
}
comic.addEventListener('click', fontClickC);

