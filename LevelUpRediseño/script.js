const noticias = {
    1: {
        titulo: "RAIDOU Remastered: The Mystery of the Soulless Army",
        descripcion: "Resuelve el caso del siglo en este clásico imprescindible de ATLUS, ahora completamente remasterizado.",
        imagen: "./imagenes/destacado1.jpg",
        tags: ["PlayStation 5", "RPG Acción"],
        etiquetas: ["./tags iconos/PlayStation 5 icon hd.png", "./tags iconos/RPG Accion icon hd.png"]
    },
    2: {
        titulo: "Clair Obscur: Expedition 33",
        descripcion: "Expedition 33 ya no es el juego mejor calificado de 2025.",
        imagen: "./imagenes/descatado2.jpg",
        tags: ["Xbox One","Xbox Series X", "Aventura"],
        etiquetas: ["./tags iconos/Xbox One icon hd.png","./tags iconos/Xbox Series X icon hd.png", "./tags iconos/RPG Accion icon hd.png"]
    },
    3: {
        titulo: "The House of the Dead 2 Remake",
        descripcion: "Remake confirmado para Nintendo Switch con fecha de estreno.",
        imagen: "./imagenes/descatado3.jpg",
        tags: ["Nintendo Switch", "Horror"],
        etiquetas: ["./tags iconos/Nintendo Switch icon hd.png", "./tags iconos/Horror icon hd.png"]
    }
};

const clasesTags = {
    "Nintendo Switch": "tagNS",
    "Nintendo Switch 2": "tagNS2",
    "Xbox One": "tagXO",
    "Xbox Series X": "tagXSX",
    "PlayStation 4": "tagPS4",
    "PlayStation 5": "tagPS5",
    "PC": "tagPC",
    "Mobile": "tagMB"
};

document.querySelectorAll(".FormatoCard[data-id]").forEach(card => {
    card.addEventListener("mouseenter", () => {
        const id = card.dataset.id;
        const data = noticias[id];

        document.getElementById("tituloDestacado").textContent = data.titulo;
        document.getElementById("descripcionDestacado").textContent = data.descripcion;
        document.getElementById("imagenDestacada").src = data.imagen;

        document.getElementById("tagsDestacado").innerHTML =
            data.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");

        document.getElementById("etiquetasDestacado").innerHTML =
            data.etiquetas.map((etiqueta, i) => {
                const nombre = data.tags[i] || "";
                const claseExtra = clasesTags[nombre] || "";
                return `<div class="etiqueta ${claseExtra}"><img src="${etiqueta}" alt="${nombre}"></div>`;
            }).join(" ");
    });
});

const modal = document.getElementById("modal");
const filtrosBtn = document.getElementById("filtros");
const cerrarModalBtn = document.getElementById("cerrar-modal-btn");
const confirmarModalBtn = document.getElementById("confirmar-modal-btn");
const quitarTodoBtn = document.getElementById("btnQuitarTodo");
const filterTags = document.querySelectorAll('#modal .tag');
const allCards = document.querySelectorAll('.NoticiaSemanal, .ProxLanzCard, .FeedCard');


let selectedTags = new Set();

filtrosBtn.addEventListener('click', () => modal.showModal());

cerrarModalBtn.addEventListener('click', () => {
    modal.close();
});

confirmarModalBtn.addEventListener('click', () => {
    modal.close();
    aplicarFiltros();
    mostrarFiltrosActivos();
});

quitarTodoBtn.addEventListener('click', () => {
    selectedTags.clear();
    filterTags.forEach(t => t.classList.remove('selected'));
    aplicarFiltros();
});

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagText = tag.innerText.trim();

        if (selectedTags.has(tagText)) {
            selectedTags.delete(tagText);
            tag.classList.remove('selected');
        } else {
            selectedTags.add(tagText);
            tag.classList.add('selected');
        }
    });
});

function aplicarFiltros() {
    allCards.forEach(card => {
        const cardTags = Array.from(card.querySelectorAll('.tag')).map(el => el.innerText.trim());

        if (
            selectedTags.size === 0 ||
            [...selectedTags].some(tag => cardTags.includes(tag))
        ) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function mostrarFiltrosActivos() {
    const filtrosActivosSection = document.getElementById('filtros-activos');
    const listaFiltrosActivos = document.getElementById('lista-filtros-activos');

    listaFiltrosActivos.innerHTML = '';

    if (selectedTags.size === 0) {
        filtrosActivosSection.classList.add('hidden');
        return;
    }

    filtrosActivosSection.classList.remove('hidden');

    selectedTags.forEach(tagText => {
        const tagOriginal = Array.from(document.querySelectorAll('#modal .tag')).find(t => t.innerText.trim() === tagText);

        if (tagOriginal) {
            const imgSrc = tagOriginal.querySelector('img')?.src || '';
            const claseExtra = clasesTags[tagText] || '';
            const filtroActivo = document.createElement('div');


            filtroActivo.classList.add('tag', 'filtro-activo', 'animacionSeleccion');
            if (claseExtra) filtroActivo.classList.add(claseExtra);
             
            filtroActivo.innerHTML = `<img src="${imgSrc}" alt="${tagText} icon"> <span>${tagText}</span>`;
            listaFiltrosActivos.appendChild(filtroActivo);
            
            filtroActivo.addEventListener('click', () => {
                selectedTags.delete(tagText);
                tagOriginal.classList.remove('selected');
                aplicarFiltros();
                mostrarFiltrosActivos();
            });
        
        
        }
    });
}


