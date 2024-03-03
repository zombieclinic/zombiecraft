let selectedMobName = null;
let mobData = [];

function generateMobNamesList() {
    fetch('mobhead.json')
        .then(response => response.json())
        .then(data => {
            mobData = data;

            const mobNames = data.map(mob => mob.name);

            let mobList = document.querySelector('#mobList');
            if (!mobList) {
                mobList = document.createElement('ul');
                mobList.id = 'mobList';
            } else {
                mobList.innerHTML = '';
            }

            mobNames.forEach(name => {
                const listItem = document.createElement('li');
                listItem.textContent = name;
                listItem.dataset.name = name; // Set dataset for later retrieval
                listItem.addEventListener('click', () => selectMob(name));
                listItem.classList.add('mob-name'); // Add CSS class
                mobList.appendChild(listItem);
            });

            const article = document.querySelector('article');
            article.innerHTML = '';
            article.appendChild(mobList);
        })
        .catch(error => {
            const article = document.querySelector('article');
            article.innerHTML = 'Error fetching data. Please try again later.';
            console.error('Error fetching JSON:', error);
        });
}

function selectMob(name) {
    if (selectedMobName === name) {
        return; // If already selected, do nothing
    }

    // Deselect old mob if exists
    const oldSelected = document.querySelector(`#mobList li[data-name="${selectedMobName}"]`);
    if (oldSelected) {
        oldSelected.classList.remove('selected');
    }

    // Update selected mob
    selectedMobName = name;

    // Highlight selected mob
    const selectedMob = document.querySelector(`#mobList li[data-name="${name}"]`);
    selectedMob.classList.add('selected');

    // Display loot chances for the selected mob
    displayLootChances(name);
}

function displayLootChances(mobName) {
    const mob = mobData.find(mob => mob.name === mobName);

    const article = document.querySelector('article');
    article.innerHTML = `<h2>${mob.name} Loot Chances</h2>`;
    article.innerHTML += `<p>Chance: ${mob.chance}</p>`;
    article.innerHTML += `<p>Looting Multiplier: ${mob.lootingMultiplier}</p>`;
}

function clearArticleContent() {
    const article = document.querySelector('article');
    article.innerHTML = '';
}

document.getElementById('mobHeadsButton').addEventListener('click', generateMobNamesList);

document.getElementById('donationButton').addEventListener('click', () => {
    const article = document.querySelector('article');
    article.innerHTML = `
        <h2>Donate via PayPal</h2>
        <p>Please consider supporting us through PayPal:</p>
        <a href="https://www.paypal.com/paypalme/yarpreston" class="donate-link">Become a supporter</a>
        <img src="imgs/qu_code.png" alt="paypalpng" title="zombies pay pal" width="500" height="500" >
    `;
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        const article = document.querySelector('article');
        article.innerHTML = `
            <h2>Download</h2>
            <p>Click the link below to download the "ZOMBIE Mob HEAD VERSION 8" addon:</p>
            <a href="zombiehead8s.mcaddon" download>Zombie Heads Addon</a>
        `;
    });
});

const otherButtons = document.querySelectorAll('aside button:not(#mobHeadsButton):not(#donationButton)');
otherButtons.forEach(button => {
    button.addEventListener('click', clearArticleContent);
});