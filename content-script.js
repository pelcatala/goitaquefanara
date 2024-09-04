/*

FUNCIONAMENT
Crea 3 indicadors
Executa codis diferents depenent si està a netflix.com o primevideo.com
Cada 500ms recorre tots els títols
Si l'identificador del títol està a alguna llista afegeix l'indicador corresponent

Carrega d'internet tots els codis i les imatges dels indicadors

*/


// Crear indicador VC
var vc = document.createElement("img")
vc.src = "https://goitaquefanara.cat/img/tools/vc.jpg";
vc.setAttribute("height", "48px")
vc.style.position = "absolute";
vc.style.top = "0px";
vc.style.right = "0px";

// Crear indicador VOSC
var vosc = document.createElement("img")
vosc.src = "https://goitaquefanara.cat/img/tools/vosc.jpg";
vosc.setAttribute("height", "48px")
vosc.style.position = "absolute";
vosc.style.top = "0px";
vosc.style.right = "0px";

// Crear indicador VC i VOSC
var vcvosc = document.createElement("img")
vcvosc.src = "https://goitaquefanara.cat/img/tools/vcvosc.jpg";
vcvosc.setAttribute("height", "48px")
vcvosc.style.position = "absolute";
vcvosc.style.top = "0px";
vcvosc.style.right = "0px";

// Funció que distingeix entre Prime i Netflix
function indicador() {
    if (window.location.host == "www.primevideo.com") {
        prime();
    } else if (window.location.host == "www.netflix.com") {
        netflix();
    }
}
indicador();

// Funció obtenir tots els enllaços dintre d'un element
function obtenirEnllacos(element) {
    const enllacos = element.querySelectorAll('a');
    const enllacosArray = [];
    enllacos.forEach((enllac) => {
      enllacosArray.push(enllac.href);
    });
    return enllacosArray;
}

// Funció que afegeix al catàleg de Prime l'indicador de contingut en català
function prime() {

    // Afegir menú
    setTimeout(function() {
        // Selecciona l'element existent
        var elementExistent = document.querySelector('li.SzkmN2.Q6SIsC[role="presentation"][style="--nav-list-child-index:4"]');
    
        // Crea el nou element
        var nouElement = document.createElement('li');
        nouElement.className = 'SzkmN2 Q6SIsC';
        nouElement.setAttribute('role', 'presentation');
        nouElement.setAttribute('style', '--nav-list-child-index:5');
        nouElement.innerHTML = '<a aria-label="Tot en català" class="_6+KRio Zb6QDS" href="https://goitaquefanara.cat/catalog?p=PRIME_VIDEO" target="_blank"><span class="tvVqux">Tot en català</span></a>';
    
        // Insereix el nou element després de l'element existent
        if (elementExistent && elementExistent.parentNode) {
            elementExistent.parentNode.insertBefore(nouElement, elementExistent.nextSibling);
        }
    }, 1500); // Retard de 1,5 s

    // Posa l'indicador que toca
    function posa(objecte, icona) {
        if (objecte.classList.contains("tst-packshot")) {
            objecte.appendChild(icona.cloneNode(true));
        } else if (objecte.closest(".av-hover-wrapper")) {
            objecte.closest(".av-hover-wrapper").appendChild(icona.cloneNode(true));
        } else {
            objecte.appendChild(icona.cloneNode(true));
        }
    }

    // Enllaç dades
    let url = "https://goitaquefanara.cat/browser/primevideo";

    // Buscar coincidències
    fetch(url)
        .then(res => res.json())
        .then(out => {
            var vcvoscjson = out.vcvosc;
            var vcjson = out.vc;
            var voscjson = out.vosc;
            function busca() {
                var tots = document.querySelectorAll(".tst-packshot, .av-grid-packshot")
                if (tots.length!=0){
                    for (let elem in tots) {
                        if (tots[elem].childNodes?.length && !tots[elem].classList.contains("fet")) {
                            try {
                                const codi = tots[elem].childNodes[0].href.match(/[a-zA-Z0-9]{26}/)[0];
                                if (vcvoscjson.includes(codi)) posa(tots[elem], vcvosc);
                                else if (vcjson.includes(codi)) posa(tots[elem], vc);
                                else if (voscjson.includes(codi)) posa(tots[elem], vosc);
                            } catch { /*console.log(elem)*/ }
                            tots[elem].classList.add("fet");
                        }
                    }
                }
                else {
                    var tots2 = document.querySelectorAll('div[data-testid="packshot"], article[data-testid="standard-hero-card"], article[data-testid="super-carousel-card"]')
                    for (let elem in tots2) {
                        if (tots2[elem].childNodes?.length && !tots2[elem].classList.contains("fet")) {
                            try {
                                const codi = obtenirEnllacos(tots2[elem])[0].match(/[a-zA-Z0-9]{26}/)[0];
                                if (vcvoscjson.includes(codi)) posa(tots2[elem], vcvosc);
                                else if (vcjson.includes(codi)) posa(tots2[elem], vc);
                                else if (voscjson.includes(codi)) posa(tots2[elem], vosc);
                            } catch { /*console.log(elem)*/ }
                            tots2[elem].classList.add("fet");
                        }
                    }
                }
            }
            busca();
            var t = setInterval(busca, 500);
        });
};

// Funció que afegeix al catàleg de Netflix l'indicador de contingut en català
function netflix() {
    if (typeof document.getElementsByClassName("profiles-gate-container")[0] === "undefined") {

        // Afegir menú
        var menunetflix = document.createElement("li")
        menunetflix.setAttribute("class", "navigation-tab")
        menunetflix.innerHTML = '<a href="https://goitaquefanara.cat/catalog?p=NETFLIX" target="_blank">Tot en català</a>';
        if (document.getElementsByClassName("tabbed-primary-navigation").length>0) document.getElementsByClassName("tabbed-primary-navigation")[0].appendChild(menunetflix);

        // Posa l'indicador que toca
        function posa(objecte, icona) {
            objecte.appendChild(icona.cloneNode(true));
        }

        // Enllaç dades
        let url = 'https://goitaquefanara.cat/browser/netflix';

        // Buscar coincidències
        fetch(url)
            .then(res => res.json())
            .then(out => {
                var vcvoscjson = out.vcvosc;
                var vcjson = out.vc;
                var voscjson = out.vosc;
                function busca() {
                    var tots = document.getElementsByClassName("slider-refocus")
                    for (let elem in tots) {
                        if (tots[elem].childNodes?.length && !tots[elem].classList.contains("fet")) {
                            try {
                                const codi = tots[elem].pathname.match(/^[^\d]*(\d+)/)[1];
                                if (vcvoscjson.includes(codi)) posa(tots[elem], vcvosc);
                                else if (vcjson.includes(codi)) posa(tots[elem], vc);
                                else if (voscjson.includes(codi)) posa(tots[elem], vosc);
                            } catch { /*console.log(elem)*/ }
                            tots[elem].classList.add("fet");
                        }
                    }
                }
                busca();
                var t = setInterval(busca, 500);
            });
    }
    else setTimeout(netflix, 250);
};