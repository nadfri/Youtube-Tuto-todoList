"use strict";
//verification si une clé existe dans le localStorage
ul.innerHTML = (localStorage.getItem('list') != null)? 
localStorage.getItem('list') : "";

//affiche l'info si aucune tache est en cours
noTache.style.display = (ul.innerHTML == "")? "block" : "none";

//ajout de l'event del sur les span issus du storage
const spanDel = document.querySelectorAll(".delete");
for(let span of spanDel) span.onclick = () => del(span);

form.onsubmit = () => {

    const li      = document.createElement("li");
    const spanDel = document.createElement("span"); //creation d'une span

    spanDel.classList.add("material-icons", "delete"); //ajout de la classe materiel-icons et delete
    spanDel.textContent = "delete_forever"; //ajout de l'icone poubelle

    li.textContent = champ.value; //li prend le contenu HTML de champ

    li.appendChild(spanDel); //ajout de la span icone delete à li
    ul.appendChild(li); //ajout du li à ul

    champ.value = ""; // efface le champ
    noTache.style.display = "none"; //enleve la div pas de tache en cours

    localStorage.setItem("list", ul.innerHTML);

    //ajout de l'event del sur la span créée
    spanDel.onclick = () => del(spanDel);

    return false; //empeche l'actualisation de la page
    //e.preventDefault(); idem à return false
};

//fonction pour supprimer une tache
function del(el){
    el.parentElement.remove(); //supprime le parent et les enfants
    localStorage.setItem("list", ul.innerHTML); //met à jour le storage
    noTache.style.display = (ul.innerHTML == "")? "block" : "none"; //met à jour la div tache en cours
}



