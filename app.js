// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const btn = document.querySelector('.btn');
const input = document.querySelector('#recherche');
const sectionRes = document.querySelector('.resultat');
let containerRes = document.querySelector('.container-res');
const loader = document.querySelector('.loader');

btn.addEventListener('click', (e)=> {
    e.preventDefault();
    let recherche = input.value;
    if(recherche.length < 3 || recherche === "") return;
    containerRes.remove();
    loader.style.display = "block";
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${recherche}`)
        .then((response) => response.json())
        .then(data => {
            loader.style.display = "none";
            data =  data.query.search;
            containerRes = document.createElement('div');
            containerRes.classList.add('.container-res');
            data.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('object');

                let a = document.createElement('a');
                a.innerHTML = `<span class="title">${element.title}</span>https://en.wikipedia.org?curid=${element.pageid}`;
                a.setAttribute('href', `https://en.wikipedia.org?curid=${element.pageid}`);
                a.setAttribute('target', "_blank");
                div.appendChild(a);

                let descr = document.createElement('p');
                descr.classList.add('descr');
                descr.innerHTML = element.snippet;
                div.appendChild(descr);

                let section = document.createElement('section');
                section.classList.add('resultat');
                containerRes.appendChild(div);
                sectionRes.appendChild(containerRes);

                
            });
        })
        .catch((error) => console.log(error))
});