"use strict";
//verification si une clé existe dans le localStorage
ol.innerHTML = (localStorage.getItem('list') != null) ?
    localStorage.getItem('list') : "";

//affiche l'info si aucune tache est en cours
noTache.style.display = (ol.innerHTML == "") ? "block" : "none";

//ajout de l'event del/urgent sur les span issus du storage
const spanDels = document.querySelectorAll(".delete");
for (let span of spanDels) span.onclick = () => del(span);

const spanUrgs = document.querySelectorAll(".urgent");
for (let span of spanUrgs) span.onclick = () => urgent(span);

form.onsubmit = () => {

    const li = document.createElement("li");
    const texte = document.createElement("span");
    texte.classList.add("texte");
    texte.textContent = champ.value; //recupere le texte du champ

    const spanDel = document.createElement("span");
    spanDel.classList.add("material-icons", "delete", "md-24"); //ajout de la classe materiel-icons et delete
    spanDel.textContent = "delete_forever"; //ajout de l'icone poubelle

    const spanUrg = document.createElement("span");
    spanUrg.classList.add("material-icons", "urgent", "md-24"); //ajout de la classe materiel-icons et urgent
    spanUrg.textContent = "stars"; //ajout de l'icone stars

    const spanOpt = document.createElement("span");
    spanOpt.classList.add("spanOpt");

    spanOpt.appendChild(spanUrg);
    spanOpt.appendChild(spanDel); //ajout de la span icone delete à li

    li.appendChild(texte);
    li.appendChild(spanOpt);

    ol.appendChild(li); //ajout du li à ol

    champ.value = ""; // efface le champ
    noTache.style.display = "none"; //enleve la div pas de tache en cours

    //ajout de l'event del et urgent sur les span créées
    spanDel.onclick = () => del(spanDel);
    spanUrg.onclick = () => urgent(spanUrg);

    //Sauvegarde du HTML dans le storage
    localStorage.setItem("list", ol.innerHTML);

    return false; //empeche l'actualisation de la page
    //e.preventDefault(); idem à return false
};

//fonction pour supprimer une tache
function del(el) {
    el.parentElement.parentElement.remove(); //supprime le parent et les enfants
    localStorage.setItem("list", ol.innerHTML); //met à jour le storage
    noTache.style.display = (ol.innerHTML == "") ? "block" : "none"; //met à jour la div tache en cours
}

function urgent(el) {
    el.classList.toggle("gold");
    localStorage.setItem("list", ol.innerHTML); //save
}

//Empeche le resizing à l'apparition du clavier
const metas = document.getElementsByTagName('meta');
metas[1].content = `width=device-width, height=${window.innerHeight} initial-scale=1.0, maximum-scale=5.0,user-scalable=0`;

//Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(registration => {
                console.log(`Service Worker TodoList enregistré!\nRessource: ${registration.scope}`);
            })
            .catch(err => {
                console.log(`Echec de l'enregistrement du Service Worker TodoList: ${err}`);
            });
    });
}

/**Bouton Installation Application*/
// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => 
// {
//     e.preventDefault(); // annuler la banniere par defaut
//     installBtn.classList.add("slide"); //affiche la banniere perso
//     deferredPrompt = e; //enregistrer l'event pour plus tard

//     installBtn.addEventListener('click', (e) => 
//     {
//         deferredPrompt.prompt(); //permettre l'installation
//         installBtn.classList.remove("slide"); //faire disparaitre le bouton

//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') 
//                 installBtn.classList.remove("slide"); //faire disparaitre le bouton

//             deferredPrompt = null; //efface l'event
//       });
//     });
// });

let deferredPrompt;
installBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    installBtn.style.display = 'block';
  
    installBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      installBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });




