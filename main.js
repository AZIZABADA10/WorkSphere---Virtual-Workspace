/** Mnupilation du DOM  */
const modalFormAjoute = document.getElementById('modalFormAjoute');
const formAjoute = document.getElementById('formAjoute');
let inputUrl = document.getElementById('urlEmp');
let imageProfile = document.getElementById('imageProfile');
let listeExperiences = document.getElementById('listeExperiences');
let zoneListeEmployeesNonAssignes = document.getElementById('zoneListeEmployeesNonAssignes');

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

/** initialisation et récuperation des donnée a partir de localStorage */
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let idEmployye = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
let zoneDeConference = JSON.parse(localStorage.getItem('zoneDeConference')) || [];
let zoneDeServeurs = JSON.parse(localStorage.getItem('zoneDeServeurs')) || [];
let zoneDeSecurite = JSON.parse(localStorage.getItem('zoneDeSecurite')) || [];
let zoneDeReception = JSON.parse(localStorage.getItem('zoneDeReception')) || [];
let zoneDePersonnel = JSON.parse(localStorage.getItem('zoneDePersonnel')) || [];
let zoneDArchives = JSON.parse(localStorage.getItem('zoneDArchives')) || [];


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
    const regexRole = document.getElementById('regexRole');
    regexRole.innerHTML = '';
    if (!roleEmp) {
        regexRole.innerHTML = `<p class="text-red-600">Le role et obligatoire !</p>`;
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
    affichierEmployeesSurNonAssigne();
});

/** form dynamique pour ajouter une zone d'experience */
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
    ;
}
/**confirmation et validation de experience */
function confermerExperElement(idExperElementAConfermier) {
    //console.log(idExperElementAConfermier);
    const elementAconfermer = document.getElementById(`exper-${idExperElementAConfermier}`);
    //console.log(elementAconfermer);

    const titre = elementAconfermer.querySelector('.titreEx').value.trim();
    const entreprise = elementAconfermer.querySelector('.EntrepriseEx').value.trim();
    const description = elementAconfermer.querySelector('.discriptionEx').value.trim();
    const dateDebut = elementAconfermer.querySelector('.dateDebutEx').value;
    const dateFin = elementAconfermer.querySelector('.dateFinEx').value;


    const titeRegex = /^[a-zA-Z\s]{2,50}$/;
    const regextitre = elementAconfermer.querySelector('.regextitre');
    regextitre.innerHTML = '';
    if (!titeRegex.test(titre)) {
        regextitre.innerHTML = `<p class="text-red-600">Le titre obligé et doit etre avec les caractaire</p>`;
        return;
    };

    const entrpriseRegex = /^[a-zA-Z\s]{2,50}$/;
    const regexEntrepriseEx = elementAconfermer.querySelector('.regexEntrepriseEx');
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

/**supprimer elementexper a partir de zone experience */
function supprimerExperElemnt(idElemtExSupprimer) {
    const elementAsupprimer = document.getElementById(`exper-${idElemtExSupprimer}`);
    //console.log(elementAsupprimer);
    elementAsupprimer.remove();
}

/*affichier les employee non assigee */
function affichierEmployeesSurNonAssigne() {
    let employeesE = JSON.parse(localStorage.getItem('employees')) || [];
    let employeeNonAssigner = employeesE.filter(e => e.zoneActuelle === null)
    zoneListeEmployeesNonAssignes.innerHTML = '';

    if (employeeNonAssigner.length === 0) {

        const carteEmplo = document.createElement('div');
        carteEmplo.innerHTML = `
            <div class="flex justify-center text-red-700 mt-56 ml-2 rounded">
                <p class="font-semibold">Accune employees disponible pour le moment</p>
            </div>
        `;
        zoneListeEmployeesNonAssignes.appendChild(carteEmplo);
    } else {

        employeeNonAssigner.forEach(e => {
            const carteEmplo = document.createElement('div');
            carteEmplo.classList.add('bg-white', 'rounded', 'p-1', 'm-1')
            carteEmplo.innerHTML = `
                <div class="flex bg-white ">
                <img src="${e.url}" class="w-10 h-10 rounded-full">
                <div class="ml-2">
                    <h4 class="font-semibold">${e.nom}</h4>
                    <p class="text-gray-500">${e.role}</p>
                </div>
                </div>
                
            `;
            zoneListeEmployeesNonAssignes.appendChild(carteEmplo);
        });
    }
}

/**filtrages des employyes par zone **/
function filterEmployeesParZone(zone) {
    let employeesE = JSON.parse(localStorage.getItem('employees')) || [];
    let employyesApresFiltrage = [];
    switch (zone) {

        case "zone_de_conference":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Personnel de nettoyage' && e.zoneActuelle === null || e.role === 'Réceptionniste' && e.zoneActuelle === null || e.role === 'Technicien IT' && e.zoneActuelle === null || e.role === 'Agent de sécurité' && e.zoneActuelle === null || e.role === 'Autre' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;
        case "zone_de_serveurs":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Technicien IT' && e.zoneActuelle === null || e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Personnel de nettoyage' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;
        case "zone_de_securite":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Personnel de nettoyage' && e.zoneActuelle === null || e.role === 'Agent de sécurité' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;
        case "zone_de_reception":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Personnel de nettoyage' && e.zoneActuelle === null || e.role === 'Réceptionniste' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;
        case "zone_du_personnel":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Personnel de nettoyage' && e.zoneActuelle === null || e.role === 'Réceptionniste' && e.zoneActuelle === null || e.role === 'Technicien IT' && e.zoneActuelle === null || e.role === 'Agent de sécurité' && e.zoneActuelle === null || e.role === 'Autre' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;
        case "zone_d_archives":
            employyesApresFiltrage = employeesE.filter(e => e.role === 'Manager' && e.zoneActuelle === null || e.role === 'Réceptionniste' && e.zoneActuelle === null || e.role === 'Technicien IT' && e.zoneActuelle === null || e.role === 'Agent de sécurité' && e.zoneActuelle === null || e.role === 'Autre' && e.zoneActuelle === null);
            return employyesApresFiltrage;
            break;

    }

}

/**le employees possible dans un zone */
function ouvrirListeEmployes(zone) {
    let employeeAafficher = filterEmployeesParZone(zone);
    //console.log('Employés à afficher:', employeeAafficher);

    // Création du le modal
    const listeEmployeesPossible = document.createElement('div');
    listeEmployeesPossible.id = 'modalListeEmployees';
    listeEmployeesPossible.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    let contenuModal = `
        <div class="bg-white rounded-lg w-auto h-auto overflow-hidden flex flex-col">
            <div class="flex justify-between items-center gap-4 p-4 border-b">
                <h2 class="text-xl font-bold">Liste des Employés - ${zone}</h2>
                <button onclick="fermerListeEmployes()" class="text-gray-500 text-2xl font-semi-bold">
                    X
                </button>
            </div>
            <div class="p-4 overflow-y-auto flex-1">
    `;

    if (employeeAafficher.length !== 0) {
        //console.log('Employés trouvés:', employeeAafficher);

        employeeAafficher.forEach(em => {
            contenuModal += `        
                <div class="flex justify-between items-center gap-4 border p-2 rounded-xl mb-2 hover:bg-gray-50 transition">
                    <div class="flex items-center gap-3">
                        <img src="${em.url}"  class="w-10 h-10 rounded-full object-cover">
                        <div>
                            <p class="font-semibold text-gray-800">${em.nom}</p>
                            <p class="text-sm text-gray-500">${em.email}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${em.role}</span>
                        <button onclick="assignerEmploye(${em.id}, '${zone}')" 
                                class="bg-green-600 hover:bg-green-700 rounded px-2 py-1 text-white font-medium transition">
                            Assigner
                        </button>
                    </div>
                </div>
                
            `;
        });
    } else {
        //console.log('Aucun employé disponible');
        contenuModal += `
            <div class="flex justify-center items-center bg-red-50 rounded p-6">
                <p class="text-red-600 font-semibold">Aucun employé disponible pour cette zone</p>
            </div>
        `;
    }

    contenuModal += `
                    <button onclick="fermerListeEmployes()" class="text-white px-2 py-1 rounded bg-red-600 mt-2 font-semibold">
                    Annuler
                </button>
            </div>
        </div>
    `;

    listeEmployeesPossible.innerHTML = contenuModal;
    document.body.appendChild(listeEmployeesPossible);
}

/**Fermer modal de liste employees par chaque zone */
function fermerListeEmployes() {
    const modal = document.getElementById('modalListeEmployees');
    modal.remove();
}


function assignerEmploye(idEmplAassigner, zoneAassiger) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    let indexEmployeeAAssigner = employees.findIndex(e => e.id === idEmplAassigner);
    employees[indexEmployeeAAssigner].zoneActuelle = zoneAassiger;
    localStorage.setItem('employees', JSON.stringify(employees));

    switch (zoneAassiger) {
        case "zone_de_conference":
            zoneDeConference.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDeConference', JSON.stringify(zoneDeConference))
            break;
        case "zone_de_serveurs":
            zoneDeServeurs.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDeServeurs', JSON.stringify(zoneDeServeurs))
            break;
        case "zone_de_securite":
            zoneDeSecurite.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDeSecurite', JSON.stringify(zoneDeSecurite))
            break;
        case "zone_de_reception":
            zoneDeReception.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDeReception', JSON.stringify(zoneDeReception))
            break;
        case "zone_du_personnel":
            zoneDePersonnel.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDePersonnel', JSON.stringify(zoneDePersonnel))
            break;
        case "zone_d_archives":
            zoneDArchives.push(employees[indexEmployeeAAssigner]);
            localStorage.setItem('zoneDArchives', JSON.stringify(zoneDArchives))
            break;

    }
    fermerListeEmployes();
    affichierEmployeesSurNonAssigne();
    afficherToutesLesZones();

}


function affichierEmployeesDansSonZone(listeDeZone, IdZoneSurHtml) {
    const zoneEmp = document.getElementById(IdZoneSurHtml);
    zoneEmp.classList.add(
        "flex", "flex-row", "lg:flex-col",
        "min-h-[40px]", "lg:min-h-[340px]",
        "overflow-x-auto", "lg:overflow-y-auto",
        "p-1", "m-1", "mb-2", "rounded-xl"
    );
    zoneEmp.innerHTML = "";
    listeDeZone.forEach(e => {
        const cartEmp = document.createElement('div');
        cartEmp.classList = "";
        cartEmp.innerHTML = `
            <div class="bg-white grow rounded-full flex justify-between w-36 items-center mb-2 p-1">
                    <div class="flex gap-2">
                        <img src="${e.url}" class="w-8 h-8 rounded-full">
                        <p class="font-semibold">${e.nom}</p>
                    </div>
                    <button class="text-red-600" onclick="retirerEmploye(${e.id}, '${IdZoneSurHtml}')">X</button>
            </div>
        `;

        zoneEmp.appendChild(cartEmp);
    })

}




function retirerEmploye(idARetirer, zoneHtml) {

    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    let empIndex = employees.findIndex(e => e.id === idARetirer);

    employees[empIndex].zoneActuelle = null;
    localStorage.setItem('employees', JSON.stringify(employees));

    switch (zoneHtml) {

        case "listeEmployeesZoneConference":
            zoneDeConference = zoneDeConference.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDeConference', JSON.stringify(zoneDeConference));
            break;

        case "listeEmployeesZoneServeurs":
            zoneDeServeurs = zoneDeServeurs.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDeServeurs', JSON.stringify(zoneDeServeurs));
            break;

        case "listeEmployeesZoneSecurite":
            zoneDeSecurite = zoneDeSecurite.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDeSecurite', JSON.stringify(zoneDeSecurite));
            break;

        case "listeEmployeesZoneReception":
            zoneDeReception = zoneDeReception.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDeReception', JSON.stringify(zoneDeReception));
            break;

        case "listeEmployeesZonePersonnel":
            zoneDePersonnel = zoneDePersonnel.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDePersonnel', JSON.stringify(zoneDePersonnel));
            break;

        case "listeEmployeesZoneArchives":
            zoneDArchives = zoneDArchives.filter(e => e.id !== idARetirer);
            localStorage.setItem('zoneDArchives', JSON.stringify(zoneDArchives));
            break;
    }

    affichierEmployeesSurNonAssigne();
    afficherToutesLesZones();


}

function afficherToutesLesZones() {
    affichierEmployeesDansSonZone(zoneDeConference, "listeEmployeesZoneConference");
    affichierEmployeesDansSonZone(zoneDeServeurs, "listeEmployeesZoneServeurs");
    affichierEmployeesDansSonZone(zoneDeSecurite, "listeEmployeesZoneSecurite");
    affichierEmployeesDansSonZone(zoneDeReception, "listeEmployeesZoneReception");
    affichierEmployeesDansSonZone(zoneDePersonnel, "listeEmployeesZonePersonnel");
    affichierEmployeesDansSonZone(zoneDArchives, "listeEmployeesZoneArchives");
    validationColorDuZone();
}

// let employees = JSON.parse(localStorage.getItem('employees')) || [];
// let idEmployye = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
// let zoneDeConference = JSON.parse(localStorage.getItem('zoneDeConference')) || [];
// let zoneDeServeurs = JSON.parse(localStorage.getItem('zoneDeServeurs')) || [];
// let zoneDeSecurite = JSON.parse(localStorage.getItem('zoneDeSecurite')) || [];
// let zoneDeReception = JSON.parse(localStorage.getItem('zoneDeReception')) || [];
// let zoneDePersonnel = JSON.parse(localStorage.getItem('zoneDePersonnel')) || [];
// let zoneDArchives = JSON.parse(localStorage.getItem('zoneDArchives')) || [];


function validationColorDuZone() {
    const zones = [
        { liste: zoneDeServeurs, idHtml: 'salleServeur' },
        { liste: zoneDeSecurite, idHtml: 'salleSecurité' },
        { liste: zoneDeReception, idHtml: 'salleRéception' },
        { liste: zoneDArchives, idHtml: 'salleDarchives' }
    ];

    zones.forEach(zone => {
        const divZone = document.getElementById(zone.idHtml);
        if (zone.liste.length === 0) {
            divZone.classList.add('bg-red-300'); 
        } else {
            divZone.classList.remove('bg-red-300');  
        }
    });
}




affichierEmployeesSurNonAssigne();
afficherToutesLesZones();
