'use strict';
//Boton Reset
let infoClean = '';
const reset = document.querySelector('.reset');

function clean() {
  phoneDest.innerHTML = infoClean;
  mailDest.innerHTML = infoClean;
  linkDest.innerHTML = infoClean;
  gitDest.innerHTML = infoClean;
  nameCard.innerHTML = 'Nombre Apellido';
  jobCard.innerHTML = 'Front-End developer';
  profileImage.style.backgroundImage = "url('https://www.puzzlepassion.com/wp-content/uploads/2017/09/darth_vader.jpg')";
  phoneOrigin.value = infoClean;
  mailOrigin.value = infoClean;
  nameField.value = infoClean;
  jobField.value = infoClean;
  linkOrigin.value = infoClean;
  gitOrigin.value = infoClean;
  //colores y fuente en tarjeta
  cardContent.classList.add('font-comic', 'default-pallete');
  cardContent.classList.remove('font-ubuntu', 'font-monserrat', 'orange-palette', 'blue-palette');
  //colores y fuente en formulario
  const checkRadio = document.querySelectorAll('.radio');
  for (let i = 0; i < checkRadio.length; i++) {
   checkRadio[i].checked= false;
 }
  //skills en tarjeta
  skillDest.innerHTML = infoClean;
  //skills en formulario
  const checkList = document.querySelectorAll('.maxCheck');
  for (let i = 0; i < checkList.length; i++) {
   checkList[i].checked= false;
 }
}
reset.addEventListener('click', clean);
