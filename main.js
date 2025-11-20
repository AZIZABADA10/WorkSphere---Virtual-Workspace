const modal = document.getElementById('modalFormAjoute');
const zoneListeExperiences = document.getElementById('listeExperiences');
const zoneEmployeListe = document.getElementById('zoneEmployeListe');
const zoneListeEmployeesNonAssignes = document.getElementById('zoneListeEmployeesNonAssignes');
const imageProfile = document.getElementById('imageProfile');


const Employees = [];
let id = 1;
let indexExper = 1;
function fermerModal() {
    modal.classList.add('hidden');
}

function afficherModal() {
    modal.classList.remove('hidden');
}

/**La récuperation des donnée a partire de la formulaire **/
const formAjoute = document.getElementById('formAjoute');
formAjoute.addEventListener('submit', (e) => {
    e.preventDefault();
    const Experiences = [];

    const nomEmp = document.getElementById('nomEmp').value.trim();
    const roleEmp = document.getElementById('role').value.trim();
    const emailEmp = document.getElementById('email').value.trim();
    const teleEmp = document.getElementById('tele').value.trim();
    const urlEmp = document.getElementById('urlEmp').value.trim();
    const inputUrl = document.getElementById('urlEmp');
    inputUrl.addEventListener('input', () => {
        const url = inputUrl.value.trim();

        if (url) {
            imageProfile.setAttribute('src', url);
            imageProfile.classList.remove('hidden');
        } else {
            imageProfile.setAttribute('src', "");
            imageProfile.classList.remove('hidden');
        }

    });


    /**La validation des inputs */

    const nomRegex = /^[a-zA-Z\s]{2,50}$/;
    const regexNom = document.getElementById('regexNom');
    regexNom.innerHTML = ''
    if (!nomRegex.test(nomEmp)) {
        regexNom.innerHTML = `<p class="text-red-600">Le nom doit etre avec les caractaire</p>`;
        return;
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    const regexEmail = document.getElementById('regexEmail');
    regexEmail.innerHTML = '';
    if (!emailRegex.test(emailEmp)) {
        regexEmail.innerHTML = `<p class="text-red-600">Il faut Récepcter le norme d'un email !</p>`;
        return;
    };

    const teleRegex = /^(06|05)\d{8}$/;
    const regexTele = document.getElementById('regexTele');
    regexTele.innerHTML = '';
    if (!teleRegex.test(teleEmp)) {
        regexTele.innerHTML = `<p class="text-red-600">Le numéro doit contenir 10 chiffres et commencer par 06 ou 05 !</p>`;
        return;
    }


    const elementExperience = document.querySelectorAll('.elementExperience');
    elementExperience.forEach(element => {

        const titreEx = element.querySelector('.titreEx').value.trim();
        const discriptionEx = element.querySelector('.discriptionEx').value.trim();
        const dateDebutEx = element.querySelector('.dateDebutEx').value.trim();
        const dateFinEx = element.querySelector('.dateFinEx').value.trim();
        const EntrepriseEx = element.querySelector('.EntrepriseEx').value.trim();



        const experienceElement = {
            id: indexExper,
            titreEx: titreEx,
            discriptionEx: discriptionEx,
            dateDebutEx: dateDebutEx,
            dateFinEx: dateFinEx,
            EntrepriseEx: EntrepriseEx
        }
        Experiences.push(experienceElement);
    });

    const Employe = {
        idEmployee: id,
        nom: nomEmp,
        role: roleEmp,
        email: emailEmp,
        telephone: teleEmp,
        localisationActuelle: 'Non assigné',
        status: false,
        url: urlEmp,
        Experiences
    };

    Employees.push(Employe);
    localStorage.setItem('Employees', JSON.stringify(Employees));
    id++;
    formAjoute.reset();
    imageProfile.src = "../assets/iconParDefaut.png";
    modal.classList.add('hidden');
    afficherEmployesNonAssignes();
});

/**La form dyniamique  **/

zoneListeExperiences.innerHTML = ``;
function ajouterZoneExper() {

    const experItem = document.createElement('div');
    experItem.id = `ex${indexExper}`;
    experItem.classList.add('bg-white', 'bg-opacity-30', 'elementExperience', 'p-2', 'rounded', 'm-2');
    experItem.innerHTML = `
    <h1 class="text-white font-semibold">Experiences </h1>
    <div  class="flex flex-col gap-2 border-1 border-gray-400">
    <label class="font-bold font-white">Intitulé de poste: </label>
    <input type="text" class="titreEx rounded"> 
    <label class="font-bold font-white">Entreprise: </label>
    <input type="text" class="EntrepriseEx rounded">
    <label class="font-bold font-white">Description:</label>
    <textarea name="" class="discriptionEx rounded"></textarea>
    <label class="font-bold font-white">Date Début:</label>
    <input type="date" class="dateDebutEx rounded">
    <label class="font-bold font-white">Date Fin:</label>
    <input type="date" class="dateFinEx rounded">
    <div class="flex justify-end mr-1">
    <button onclick="supprimerExper('ex${indexExper}')"><i class='bx  bx-trash text-red-600'></i> </button>
    </div>
    </div>
    `;
    zoneListeExperiences.appendChild(experItem);
    indexExper++;


}

function supprimerExper(idExperAsupprimer) {
    const elementExperience = document.querySelectorAll('.elementExperience');

    elementExperience.forEach(element => {
        //console.log(element.id);
        //console.log( idExperAsupprimer);

        if (element.id === idExperAsupprimer) {
            document.getElementById(idExperAsupprimer).remove();
            //console.log(element.id === idExperAsupprimer);
        }
    });;

    indexExper--;

}

/**
https://i.pravatar.cc/150?img=1
https://i.pravatar.cc/150?img=2
https://i.pravatar.cc/150?img=3
https://i.pravatar.cc/150?img=4
https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&h=200&w=200
https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?crop=faces&fit=crop&h=200&w=200


 */

function afficherEmployesNonAssignes() {
    const listEmployeeNonAssignee = JSON.parse(localStorage.getItem('Employees')) || [];

    zoneListeEmployeesNonAssignes.innerHTML = ``;

    if (listEmployeeNonAssignee.length > 0) {
        listEmployeeNonAssignee.forEach(element => {

            const cartEmployye = document.createElement('div');
            cartEmployye.classList.add('bg-white', 'rounded', 'p-2', 'm-2')
            cartEmployye.innerHTML = `
             <div class="flex ">
                <img src="${element.url ? element.url : "../assets/iconParDefaut.png"}"  class="w-8 h-8 rounded-full">
                
                <h4 class="ml-1 font-semibold">${element.nom}</h4>
            </div>
            <div class="flex justify-between">
                <p class="bg-orange-600 rounded mt-1 px-1">${element.localisationActuelle}</p>
                <p clss="bg-orange-200 rounded mt-1 px-1">${element.role}</p>
            </div>
        `;
            zoneListeEmployeesNonAssignes.appendChild(cartEmployye);
        });
    } else {

        const auccuneEmployees = document.createElement('div');
        auccuneEmployees.innerHTML = `
        <p class="text-red-700 font-bold p-4 lg:mt-56">Auccun Employees a été ajouter pour le moment</p>
        `;
        zoneListeEmployeesNonAssignes.appendChild(auccuneEmployees);
    }
    console.log(listEmployeeNonAssignee);
}

function supprimerEmployee(idEmployeAsupprimer) {
    const listEmployeeNonAssignee = JSON.parse(localStorage.getItem('Employees'));
    const indexEmployeeAsupprimer = listEmployeeNonAssignee.findIndex(emp => emp.idEmployee === idEmployeAsupprimer);
    listEmployeeNonAssignee.splice(indexEmployeeAsupprimer, 1);
    id--;
    localStorage.setItem('Employees', JSON.stringify(listEmployeeNonAssignee));
    afficherEmployesNonAssignes();
};

/*
const role = [
    'Réceptionniste',
    'Technicien IT',
    'Agent de sécurité',
    'Manager',
    'Personnel de nettoyage',
    'Autre'
];
*/

const regleDassignment = {
    zone_de_conference: ['Manager', 'Personnel de nettoyage', 'Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Autre'],
    zone_de_serveurs: ['Technicien IT', 'Manager', 'Personnel de nettoyage'],
    zone_de_securite: ['Agent de sécurité', 'Manager', 'Personnel de nettoyage'],
    zone_de_reception: ['Réceptionniste', 'Manager', 'Personnel de nettoyage'],
    zone_du_personnel: ['Manager', 'Personnel de nettoyage', 'Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Autre'],
    zone_d_archives: ['Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Manager', 'Autre']
};



function ouvrirListeEmployes(zone) {
    const reglePossibleAcetteZone = regleDassignment[zone];
    const EmployePossible = Employees.filter(e =>
        reglePossibleAcetteZone.includes(e.role)
    );

    const listeEmployePossible = document.createElement('div');
    listeEmployePossible.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';

    if (EmployePossible.length !== 0) {
        const employesList = EmployePossible.map(e => `
            <div class="flex gap-2 items-center p-2 border-b">
                <img src="${e.url || '/assets/iconParDefaut.png'}" class="w-8 h-8 rounded-full">
                <div>${e.nom}</div>
                <div>${e.role}</div>
                <button onclick="assignerEmployeeToZone(${e.idEmployee}, '${zone}')" 
                        class="bg-green-500 text-white px-2 py-1 rounded">
                    Assigner
                </button>
            </div>
        `).join('');

        listeEmployePossible.innerHTML = `
            <div class="bg-white p-4 rounded">
                <h3 class="font-bold">Employés disponibles</h3>
                ${employesList}
                <button id="btnConfirm" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Fermer
                </button>
            </div>
        `;
    } else {
        listeEmployePossible.innerHTML = `
            <div class="bg-white p-4 rounded">
                <p class="text-red-600 font-semibold"> Aucun employé autorisé pour cette zone.</p>
                <button id="btnConfirm" class="mt-4 bg-blue-500 text-white px-1 rounded">
                    Fermer
                </button>
            </div>
        `;
    }

    document.body.appendChild(listeEmployePossible);

    document.getElementById('btnConfirm').onclick = () => {
        listeEmployePossible.remove();
    };
}

document.getElementById("closeModal").onclick = () => listeEmployePossible.remove();
document.getElementById("btnConfirm").onclick = () => listeEmployePossible.remove();


function assignerEmployeeToZone(idEmp, zone) {
    const employees = JSON.parse(localStorage.getItem('Employees')) || [];

    const index = employees.findIndex(e => e.idEmployee === idEmp);

    if (index === -1) return;

    employees[index].localisationActuelle = zone;

    localStorage.setItem("Employees", JSON.stringify(employees));

    afficherEmployesNonAssignes();
}


document.addEventListener('DOMContentLoaded', () => {
    const employeesData = localStorage.getItem('Employees');

    if (employeesData) {
        const savedEmployees = JSON.parse(employeesData);
        Employees.push(...savedEmployees);
        if (Employees.length > 0) {
            id = Math.max(...Employees.map(e => e.idEmployee)) + 1;
        }
    }
    afficherEmployesNonAssignes();
});

afficherEmployesNonAssignes();