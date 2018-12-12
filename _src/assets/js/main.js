'use strict';

//Crear JSON VACIO
const jason = {
  "palette": 0,
  "typography": 0,
  "name": "",
  "job": "",
  "phone":"",
  "email":"",
  "linkedin": "",
  "github": "",
  "photo": "",
  "skills":["", "", ""]
};

//NOMBRE Y PUESTO

const nameField = document.querySelector('#name');
const puestoField = document.querySelector('#puesto');
const nameCard = document.querySelector('.h1-description');
const puestoCard = document.querySelector('.text-description');
const nameJson ='name';
const jobJson ='job';

nameField.addEventListener('keyup', function(e){
  const preview = e.currentTarget;
  nameCard.innerHTML = preview.value;
  jason.name = nameField.value;
  createStorage(nameJson, nameField.value);
});

getStorage(nameJson);

puestoField.addEventListener('keyup', (e)=>{
  const preview = e.currentTarget;
  puestoCard.innerHTML = preview.value;
  jason.job = puestoField.value;
  createStorage(jobJson, puestoField.value);
});

//IMAGEN

const fr = new FileReader();
const imageBtn = document.querySelector('.btn--img');
const fileField = document.querySelector('#img-selector');
const profileImage = document.querySelector('.profile-pic');
const divPreviewImage = document.querySelector('.uploadFile');

function getImage(e){
  const myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}

function writeImage() {
profileImage.style.backgroundImage = `url(${fr.result})`;
divPreviewImage.style.backgroundImage = `url(${fr.result})`;
jason.photo = fr.result;
}

function fakeFileClick() {
  fileField.click();
}

imageBtn.addEventListener('click', fakeFileClick);
fileField.addEventListener('change', getImage);

//LINKS MEDIA

const phoneOrigin = document.querySelector ('#phone');
const phoneDest = document.querySelector ('.contact-list__tlf');
const mailOrigin = document.querySelector ('#email');
const mailDest = document.querySelector ('.contact-list__mail');
const linkOrigin = document.querySelector ('#linkedin');
const linkDest = document.querySelector ('.contact-list__linkedin');
const gitOrigin = document.querySelector ('#github');
const gitDest = document.querySelector('.contact-list__github');

function writeMe(e) {
  const author = e.currentTarget.value;
  const destCommon = e.currentTarget.getAttribute('data-common');
  const destIco = e.currentTarget.getAttribute('data-ico');
  const dataDest = e.currentTarget.getAttribute('data-dest');
  document.querySelector(dataDest).innerHTML = `<a class="link-media" href="${destCommon}${author}"><i class="${destIco}"></i></a>`;
  jason.phone = phoneOrigin.value;
  jason.email = mailOrigin.value;
  jason.linkedin = linkOrigin.value;
  jason.github = gitOrigin.value;
  console.log(jason);
}

phoneOrigin.addEventListener('keyup', writeMe);
mailOrigin.addEventListener('keyup', writeMe);
linkOrigin.addEventListener('keyup', writeMe);
gitOrigin.addEventListener('keyup', writeMe);

//SKILLS
// Llamar a la Api de las Skills
const webApi = 'https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json';
const skillsCont = document.querySelector('.container__skills');
const keyStorage = 'skills';

function writeList(skillsCont, arraySkills) {
  for (let i = 0; i < arraySkills.length; i++) {
    skillsCont.innerHTML += `<label for="${arraySkills[i]}" class= "input-skills"> <input class="maxCheck" id="${arraySkills[i]}" type="checkbox" value="" name="${arraySkills[i]}">${arraySkills[i]}</label>`;
  }
}

function getList() {
  if(getStorage(keyStorage)) {
    let arraySkills = JSON.parse(getStorage(keyStorage));
    writeList(skillsCont, arraySkills);
  } else {
    fetch(webApi)
      .then(response => response.json())
      .then(data => {
        let arraySkills = data.skills;
        writeList(skillsCont, arraySkills);
        createStorage(keyStorage, JSON.stringify(arraySkills));
      }
      );
  }
}

function createStorage(key, value) {
  localStorage.setItem(key, value);
}

function getStorage(key) {
  return localStorage.getItem(key);
}

getList(webApi);

const skillDest = document.querySelector('.skills__list');
const skillOrigin = document.querySelectorAll('.input-skills');
console.dir(skillOrigin);

function writeSkills(e) {
  const author = e.currentTarget.innerText;
  console.dir(author);
  skillDest.innerHTML = `<li class="skill list__item--html">${author}</li>`;
}

skillOrigin.addEventListener('click', writeSkills);


//PALETAS

const cardContent = document.querySelector('.section__card-content');
// const orangePalette = document.querySelector('.orange-palette');
const porDefecto = document.querySelector('.default');
const orange = document.querySelector('.orange');
const blue = document.querySelector('.blue');

function colorClickO(e) {
  const palette = e.target;
  cardContent.classList.add('orange-palette');
  cardContent.classList.remove('default-palette');
  cardContent.classList.remove('blue-palette');
  jason.palette = orange.value;
  console.log(jason);
}
orange.addEventListener('click', colorClickO);

function colorClickD(e) {
  const palette = e.target;
  cardContent.classList.remove('orange-palette');
  cardContent.classList.add('default-palette');
  cardContent.classList.remove('blue-palette');
}

porDefecto.addEventListener('click', colorClickD);

function colorClickB(e) {
  const palette = e.target;
  cardContent.classList.remove('orange-palette');
  cardContent.classList.remove('default-palette');
  cardContent.classList.add('blue-palette');
}

blue.addEventListener('click', colorClickB);

//TIPOGRAFIAS

const monserrat = document.querySelector('.monserrat');
const ubuntu = document.querySelector('.ubuntu');
const comic = document.querySelector('.comic');

function typoClickA(e) {
  const typo = e.target;
  cardContent.classList.add('font-monserrat');
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.remove('font-comic');
}
monserrat.addEventListener('click', typoClickA);

function typoClickB(e) {
  const typo = e.target;
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.add('font-ubuntu');
  cardContent.classList.remove('font-comic');
  console.log(typoClickB);
}
ubuntu.addEventListener('click', typoClickB);

function typoClickC(e) {
  const typo = e.target;
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.add('font-comic');
}

comic.addEventListener('click', typoClickC);
