/** Mnupilation du DOM  */
const modalFormAjoute = document.getElementById('modalFormAjoute');
const formAjoute = document.getElementById('formAjoute');
let inputUrl = document.getElementById('urlEmp');
let imageProfile = document.getElementById('imageProfile');
let listeExperiences = document.getElementById('listeExperiences');



/** Image de profile par défaut */
inputUrl.addEventListener('input', () => {
    let url = inputUrl.value.trim();
    if (url) {
        imageProfile.setAttribute('src', url);
    } else {
        imageProfile.setAttribute('src', '../assets/iconParDefaut.png');
    }
})


/**Formaulaire d'ajoute d'un employee **/
function afficherModal() {
    modalFormAjoute.classList.remove('hidden');
}
function fermerModal() {
    modalFormAjoute.classList.add('hidden');
    formAjoute.reset();
    imageProfile.setAttribute('src', '../assets/iconParDefaut.png');
    listeExperiences.innerHTML = '';
    experiencesTem = []
}


let employees = JSON.parse(localStorage.getItem('employees')) || [];
let idEmployye = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
let experiencesTem = []
/**Formulaire d'ajoute des employees avce validation des inputs */

formAjoute.addEventListener('submit', (e) => {
    e.preventDefault();

    /** Récuperation des donnée via dom */
    const nomEmp = document.getElementById('nomEmp').value.trim();
    const roleEmp = document.getElementById('role').value.trim();
    const emailEmp = document.getElementById('email').value.trim();
    const teleEmp = document.getElementById('tele').value.trim();
    const urlEmp = document.getElementById('urlEmp').value.trim();



    const nomRegex = /^[a-zA-Z\s]{2,50}$/;
    const regexNom = document.getElementById('regexNom');
    regexNom.innerHTML = '';
    if (!nomRegex.test(nomEmp)) {
        regexNom.innerHTML = `<p class="text-red-600">Le nom doit etre avec les caractaire</p>`;
        return;
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    const regexEmail = document.getElementById('regexEmail');
    regexEmail.innerHTML = '';
    if (!emailRegex.test(emailEmp)) {
        regexEmail.innerHTML = `<p class="text-red-600">Il faut Récepcter le norme d'un email !</p>`;
        return;
    };

    const teleRegex = /^(06|05|07)\d{8}$/;
    const regexTele = document.getElementById('regexTele');
    regexTele.innerHTML = '';
    if (!teleRegex.test(teleEmp)) {
        regexTele.innerHTML = `<p class="text-red-600">Le numéro doit contenir 10 chiffres et commencer par 06 ou 05 ou 07 !</p>`;
        return;
    }


    let employee = {
        id: ++idEmployye,
        nom: nomEmp,
        role: roleEmp,
        email: emailEmp,
        telephone: teleEmp,
        url: urlEmp,
        zoneActuelle: null,
        experiences: [...experiencesTem]
    }

    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    imageProfile.setAttribute('src', '../assets/iconParDefaut.png');
    formAjoute.reset();
    fermerModal();
    Swal.fire({
        title: "Succès !",
        text: `L'employé ${nomEmp} a été ajouté.`,
        icon: "success",
        timer: 1000,
        showConfirmButton: false
    });
});

function ajouterZoneExperiences() {
    const experElement = document.createElement('div');
    experElement.className = 'experience-item border p-2 my-2';
    let experElementId = Date.now();
    experElement.id = `exper-${experElementId}`;
    experElement.innerHTML = `
    <h1 class="text-white font-semibold">Experiences </h1>
    <div  class="flex flex-col gap-2 border-1 border-gray-400">
        <label class="font-semibold font-white">Intitulé de poste: </label>
        <input type="text" class="titreEx rounded"> 
        <div class="regextitre"></div>
        <label class="font-semibold font-white">Entreprise: </label>
        <input type="text" class="EntrepriseEx rounded">
        <div class="regexEntrepriseEx"></div>
        <label class="font-semibold font-white">Description:</label>
        <textarea name=""  class="discriptionEx max-h-[200px]  rounded"></textarea>
        <div class="regexEntrepriseDescription"></div>
        <label class="font-semibold font-white">Date Début:</label>
        <input type="date" class="dateDebutEx rounded">
        <div class="regexDateDebut"></div>
        <label class="font-semibold font-white">Date Fin:</label>
        <input type="date" class="dateFinEx rounded">
        <div class="regexDateFin"></div>
        <div class="buttons flex justify-end mr-1">
            <button type="button" onclick="confermerExperElement(${experElementId})"><i class='bx  bx-check-circle text-xl text-green-900'></i>  </button>
            <button type="button" onclick="supprimerExperElemnt('${experElementId}')"><i class='bx  bx-trash text-xl text-red-900'></i> </button>
        </div>
    </div>
    `;

    listeExperiences.appendChild(experElement);

    console.log('Élément ajouté avec ID:', experElement.id);
}


function confermerExperElement(idExperElementAConfermier) {
    console.log(idExperElementAConfermier);
    const elementAconfermer = document.getElementById(`exper-${idExperElementAConfermier}`);
    console.log(elementAconfermer);

    const titre = elementAconfermer.querySelector('.titreEx').value.trim();
    const entreprise = elementAconfermer.querySelector('.EntrepriseEx').value.trim();
    const description = elementAconfermer.querySelector('.discriptionEx').value.trim();
    const dateDebut = elementAconfermer.querySelector('.dateDebutEx').value;
    const dateFin = elementAconfermer.querySelector('.dateFinEx').value;


    const titeRegex = /^[a-zA-Z\s]{2,50}$/;
    const regextitre =elementAconfermer.querySelector('.regextitre');
    regextitre.innerHTML = '';
    if (!titeRegex.test(titre)) {
        regextitre.innerHTML = `<p class="text-red-600">Le titre obligé et doit etre avec les caractaire</p>`;
        return;
    };

    const entrpriseRegex = /^[a-zA-Z\s]{2,50}$/;
    const regexEntrepriseEx =elementAconfermer.querySelector('.regexEntrepriseEx');
    regexEntrepriseEx.innerHTML = '';
    if (!entrpriseRegex.test(entreprise)) {
        regexEntrepriseEx.innerHTML = `<p class="text-red-600">Le nom est obligé et doit etre avec les caractaire</p>`;
        return;
    };

    const descriptionRegex = /^[a-zA-Z0-9\s]{2,250}$/;
    const regexEntrepriseDescription = elementAconfermer.querySelector('.regexEntrepriseDescription');
    regexEntrepriseDescription.innerHTML = '';
    if (!descriptionRegex.test(description)) {
        regexEntrepriseDescription.innerHTML = `<p class="text-red-600">La description et obligé et doit etre sauf avec les caractaire et les nombres </p>`;
        return;
    };

    const regexDateDebut = elementAconfermer.querySelector('.regexDateDebut');
    regexDateDebut.innerHTML = '';
    if (!dateDebut) {
        regexDateDebut.innerHTML = `<p class="text-red-600">La date debut es obligé`;
        return;
    };

    const regexDateFin = elementAconfermer.querySelector('.regexDateFin');
    regexDateFin.innerHTML = '';
    if (!dateFin) {
        regexDateFin.innerHTML = `<p class="text-red-600">La date debut es obligé`;
        return;
    };

    if (dateFin <= dateDebut) {
        Swal.fire({
            title: "Erreur",
            text: "La date de fin doit être après la date de début !",
            icon: "error"
        });
        return;
    };

    elementAconfermer.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = true;
        input.classList.add('bg-gray-200', 'cursor-not-allowed');
    });

    const buttonsDiv = elementAconfermer.querySelector('.buttons');
    if (buttonsDiv) {
        buttonsDiv.classList.add('hidden');
    };

    const messageValidation = document.createElement('div');
    messageValidation.className = 'flex justify-end mr-1 mt-2';
    messageValidation.innerHTML = `<span class="text-green-800 font-semibold text-lg">✓ Bien Validé</span>`;
    elementAconfermer.appendChild(messageValidation);

    experience = {
        titre,
        entreprise,
        description,
        dateDebut,
        dateFin
    }
    
    experiencesTem.push(experience);
}


function supprimerExperElemnt(idElemtExSupprimer) {
    const elementAsupprimer = document.getElementById(`exper-${idElemtExSupprimer}`);
    //console.log(elementAsupprimer);
    elementAsupprimer.remove();
}