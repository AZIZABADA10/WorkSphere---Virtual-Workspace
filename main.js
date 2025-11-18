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
    experItem.classList.add('bg-white', 'bg-opacity-50','elementExperience');
    experItem.innerHTML = `
    <h1>Experiences ${indexExper} </h1>
    <div id="ex${indexExper}" class="flex flex-col gap-2 border-1 border-gray-400">
    <label class="font-bold font-white">Titre: </label>
    <input type="text" class="titreEx"> 
    <label class="font-bold font-white">Description:</label>
    <input type="text" class="discriptionEx"> 
    <label class="font-bold font-white">Date Début:</label>
    <input type="date" class="dateDebutEx">
    <label class="font-bold font-white">Date Fin:</label>
    <input type="date" class="dateFinEx">
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

        const experienceElement = {
            id:indexExper,
            titreEx:titreEx,
            discriptionEx:discriptionEx,
            dateDebutEx:dateDebutEx,
            dateFinEx:dateFinEx
        }
        Experiences.push(experienceElement);
    });

    const Employe = {
        id:id,
        nom:nomEmp,
        role:roleEmp,
        email:emailEmp,
        telephone:teleEmp,
        localisationActuelle:localisationEmp,
        url:urlEmp,
        Experiences
    };

    Employees.push(Employe);
    localStorage.setItem('Employees',JSON.stringify(Employees));
    id++;
    formAjoute.reset();
});

zoneEmployeListe.createElement='';
function afficherEmploye() {
    
}