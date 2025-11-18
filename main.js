const modal = document.getElementById('modalFormAjoute');
const zoneListeExperiences = document.getElementById('listeExperiences');
const zoneEmployeListe = document.getElementById('zoneEmployeListe');
const zoneListeEmployeesNonAssignes = document.getElementById('zoneListeEmployeesNonAssignes');


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

    const nomEmp = document.getElementById('nomEmp').value.trim();
    const roleEmp = document.getElementById('role').value.trim();
    const emailEmp = document.getElementById('email').value.trim();
    const teleEmp = document.getElementById('tele').value.trim();
    const localisationEmp = document.getElementById('localisationEmp').value.trim();
    const urlEmp = document.getElementById('urlEmp').value.trim();

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
        const EntrepriseEx = document.querySelector('.EntrepriseEx');




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
        id: id,
        nom: nomEmp,
        role: roleEmp,
        email: emailEmp,
        telephone: teleEmp,
        localisationActuelle: localisationEmp,
        url: urlEmp,
        Experiences
    };

    Employees.push(Employe);
    localStorage.setItem('Employees', JSON.stringify(Employees));
    id++;
    formAjoute.reset();
    modal.classList.add('hidden');
    afficherEmployesNonAssignes();
});

/**La form dyniamique  **/
let indexExper = 1;
zoneListeExperiences.innerHTML = ``;
function ajouterZoneExper() {

    const experItem = document.createElement('div');
    experItem.id = `ex${indexExper}`;
    experItem.classList.add('bg-white', 'bg-opacity-30', 'elementExperience', 'p-2', 'rounded', 'm-2');
    experItem.innerHTML = `
    <h1 class="text-white font-semibold">Experiences ${indexExper} </h1>
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

const Employees = [];
const Experiences = [];
let id = 1;


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
                <img src="${element.url}"  class="w-8 h-8 rounded-full">
                
                <h4 class="ml-1 font-semibold">${element.nom}</h4>
            </div>
            <div class="flex justify-between">
                <p class="bg-orange-600 rounded mt-1 px-1">${element.localisationActuelle}</p>
                <button onclick="supprimerEmployee('${element.id}')" ><i class='bx  bx-trash text-red-600'></i></button>
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
    const indexEmployeeAsupprimer = listEmployeeNonAssignee.findIndex(emp => emp.id === idEmployeAsupprimer);
    listEmployeeNonAssignee.splice(indexEmployeeAsupprimer,1);
    localStorage.setItem('Employees',JSON.stringify(listEmployeeNonAssignee));
    afficherEmployesNonAssignes(); 
};




afficherEmployesNonAssignes();