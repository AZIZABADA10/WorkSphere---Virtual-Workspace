const modal = document.getElementById('modalFormAjoute');
const zoneListeExperiences = document.getElementById('listeExperiences');
const zoneEmployeListe = document.getElementById('zoneEmployeListe');

function fermerModal() {
    modal.classList.add('hidden');
}

function afficherModal() {
    modal.classList.remove('hidden');
}


/**La form dyniamique  **/
let indexExper = 1;
zoneListeExperiences.innerHTML = ``;
function ajouterZoneExper() {

    const experItem = document.createElement('div');
    experItem.id=`ex${indexExper}`;
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

/**La récuperation des donnée a partire de la formulaire **/
const formAjoute = document.getElementById('formAjoute');
formAjoute.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomEmp = document.getElementById('nomEmp').value;
    const roleEmp = document.getElementById('role').value;
    const emailEmp = document.getElementById('email').value;
    const teleEmp = document.getElementById('tele').value;
    const localisationEmp = document.getElementById('localisationEmp').value;
    const urlEmp = document.getElementById('urlEmp').value;

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
});

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

