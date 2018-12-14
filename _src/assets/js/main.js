'use strict';

//Crear JSON VACIO
const jason = {
  "palette": 0,
  "typography": 0,
  "name": "",
  "job": "",
  "phone": "",
  "email": "",
  "linkedin": "",
  "github": "",
  "photo": "",
  "skills": []
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
const nameJson = 'name';
const jobJson = 'job';

nameField.addEventListener('keyup', function (e) {
  const preview = e.currentTarget;
  nameCard.innerHTML = preview.value;
  jason.name = nameField.value;
  createStorage(nameJson, nameField.value);
});

puestoField.addEventListener('keyup', (e) => {
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

function getImage(e) {
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

const phoneOrigin = document.querySelector('#phone');
const phoneDest = document.querySelector('.contact-list__tlf');
const mailOrigin = document.querySelector('#email');
const mailDest = document.querySelector('.contact-list__mail');
const linkOrigin = document.querySelector('#linkedin');
const linkDest = document.querySelector('.contact-list__linkedin');
const gitOrigin = document.querySelector('#github');
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
// Llamar a la Api de las Skills + añadir a la local storage
const webApi = 'https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json';
const skillsCont = document.querySelector('.container__skills');
const keyStorage = 'skills';

function writeList(skillsCont, arraySkills) {
  for (let i = 0; i < arraySkills.length; i++) {
    skillsCont.innerHTML += `<label for="${arraySkills[i]}" class= "input-skills"> <input class="maxCheck" id="${arraySkills[i]}" type="checkbox"  value="${arraySkills[i]}" name="skills">${arraySkills[i]}</label>`;
  }
}

function getList() {
  if (getStorage(keyStorage)) {
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

//Aqui viene lo chungo: que se pinten en la tarjeta solo una vez y se
// quite sin rechistar
const skillDest = document.querySelector('.skills__list');
const skillOrigin = document.querySelectorAll('.input-skills');

for (const s of skillOrigin) {
  s.addEventListener('change', checkInputs);
}

// Funcion manejadora del evento click de cada input
// que deshabilita y habilita los checkboxes en función del número de checkboxes checked.
function checkInputs(event) {
  //aqui se crea la lista de la Card
  let cardList = document.createElement('li');
  cardList.className = `skill list__item--${this.innerText}`;
  let cardElement = document.createTextNode(`${this.innerText}`);
  cardList.appendChild(cardElement);
  let cardElementSpecific = document.querySelector(`.list__item--${this.innerText}`);

  //Empieza la fiesta
  if (jason.skills.length < 3 && event.target.checked === true) {
    console.log('Se ha añadido correctamente');
    skillDest.appendChild(cardList);
    jason.skills.push(event.currentTarget.innerText);
    console.log(jason.skills);

  } else {
    console.log('Se ha borrado correctamente');
    event.target.checked = false;

    //AQUI MIRAMOS SI ESTABA DENTRO DE LA LISTA DE LA CARD Y LO BORRAMOS
    if (cardElementSpecific) {
      skillDest.removeChild(cardElementSpecific);
      jason.skills.splice(jason.skills.indexOf(event.target.innerText), 1);
    }
  }
  console.log(jason.skills);

  //Si la lista de inputs seleccionados es igual o mayor a 3, tenemos que deshabilitar los inputs no seleccionados y sino,
  //habilitamos los inputs no seleccionados.
  if (jason.skills.length >= 3) {
    for (let i = 0; i < jason.skills.length; i++) {
      skillOrigin[i].disabled = true;
    }
  } else { //habilito otra vez todos los inputs porque ya no tengo 3 opciones seleccionadas
    for (let i = 0; i < jason.skills.length; i++) {
      skillOrigin[i].disabled = false;
    }
  }
}


//PALETAS

const cardContent = document.querySelector('.section__card-content');
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


//Boton Reset
let labelName = document.querySelector('.form-label--name');
let labelPuesto = document.querySelector('.form-label--puesto');
let allInputsClean = document.querySelectorAll('.form-input');
let infoClean = "";
const reset = document.querySelector('.reset');
function clean() {
  phoneDest.innerHTML = infoClean;
  mailDest.innerHTML = infoClean;
  linkDest.innerHTML = infoClean;
  gitDest.innerHTML = infoClean;
  nameCard.innerHTML = labelName.innerHTML;
  puestoCard.innerHTML = labelPuesto.innerHTML;
  skillDest.innerHTML = infoClean;
  profileImage.style.backgroundImage = "url('https://www.puzzlepassion.com/wp-content/uploads/2017/09/darth_vader.jpg')";
  phoneOrigin.value = infoClean;
  mailOrigin.value = infoClean;
  nameField.value = infoClean;
  puestoField.value = infoClean;
  linkOrigin.value = infoClean;
  gitOrigin.value = infoClean;
}
reset.addEventListener('click', clean);


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
