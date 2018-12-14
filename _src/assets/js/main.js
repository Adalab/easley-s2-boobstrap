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
  "skills":[]
};

//Enviar el JSON y devuelve Card
const paintURL = document.querySelector('.getURL');
const btnCrearTarjeta = document.querySelector('.collapsible__content-button');

function send() {
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(jason),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(urlResponse => urlResponse.json())
    .then(url => {
      paintURL.innerHTML =
      `<p class="twitter-text">La tarjeta ha sido creada:</p>
      <a class="card-link" href="${url.cardURL}" target="_blank">${url.cardURL}</a>
      <a class="link-twitter" href="https://twitter.com/home?status=${url.cardURL}" target="_blank">
      <button class="btn-twitter" type="button"><i class="fab fa-twitter"></i>Compartir en twitter</button></a>`;
      btnCrearTarjeta.style.backgroundColor = '#d5d5d5';
    });
};

btnCrearTarjeta.addEventListener('click', send);
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
    skillsCont.innerHTML += `<label for="${arraySkills[i]}" class= "input-skills"> <input class="maxCheck" id="${arraySkills[i]}" type="checkbox"  value="" name="${arraySkills[i]}">${arraySkills[i]}</label>`;
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


for(const s of skillOrigin){
  s.addEventListener('click', writeSkills);
}

// function checkBoxLimit() {
//   const skillOrigin = document.querySelectorAll('.input-skills');
//   const limit = 3;
// for (let i = 0; i < skillOrigin.length; i++) {
//   skillOrigin[i].onclick = function () {
//     let checkedcount = 0;
//     for (let i = 0; i < skillOrigin.length; i++) {
//        checkedcount += (skillOrigin[i].checked)? 1:0;
//      }
//      if (checkedcount > limit) {
//        alert('Elige un máximo de ' + limit + ' habilidades.');
//        this.checked = false;
//      }
//    }
//  }
// };

function writeSkills(e) {
  const author = e.currentTarget.innerText;

  //aqui hay que meter un if para que compruebe si esta pintado ya + tres maximo
  skillDest.innerHTML += `<li class="skill list__item--html">${author}</li>`;
  //ODIO JAVASCRIPT !!!!!!!!!!!

  jason.skills.push(author);
  console.log(jason);
  // checkBoxLimit();
};


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

porDefecto.addEventListener('click', colorClickD);

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

function fontClickU (e){
  const f = e.currentTarget.value;

  cardContent.classList.add('font-ubuntu');
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.remove('font-comic');
  jason.typography = 3;


}
ubuntu.addEventListener('click', fontClickU);

function fontClickM (e){
  const f = e.currentTarget.value;
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.add('font-monserrat');
  cardContent.classList.remove('font-comic');
  jason.typography = 1;



}

monse.addEventListener('click', fontClickM);

function fontClickC (e){
  const f = e.currentTarget.value;
  cardContent.classList.remove('font-ubuntu');
  cardContent.classList.remove('font-monserrat');
  cardContent.classList.add('font-comic');
  jason.typography = 2;

}

comic.addEventListener('click', fontClickC);


//Boton Reset
let labelName= document.querySelector('.form-label--name');
let labelPuesto = document.querySelector('.form-label--puesto');
let allInputsClean= document.querySelectorAll('.form-input');
let infoClean= "";
const reset = document.querySelector('.reset');
function clean() {
  phoneDest.innerHTML=infoClean;
  mailDest.innerHTML=infoClean;
  linkDest.innerHTML=infoClean;
  gitDest.innerHTML=infoClean;
  nameCard.innerHTML=labelName.innerHTML;
  puestoCard.innerHTML=labelPuesto.innerHTML;
}

reset.addEventListener('click',clean);


//collapsible

const buttonCollapsible = document.querySelectorAll('.collapsible__clickable');
const designContent = document.querySelector('.collapsible__content-design');
const fillContent = document.querySelector('.collapsible__content-fill');
const shareContent = document.querySelector('.collapsible__content-share');

function collapsible(event) {
  const clickableSection = event.currentTarget;
  if (clickableSection.classList.contains('collapsible__design') === true) {
    designContent.classList.toggle('hidden');
  } else if (clickableSection.classList.contains('collapsible__fill') === true) {
    fillContent.classList.toggle('hidden');
  } else {
    shareContent.classList.toggle('hidden');
  }
}
for (let i = 0; i < buttonCollapsible.length; i++) {
  buttonCollapsible[i].addEventListener('click', collapsible);
}
