// --- BASE DE DATOS DE PRODUCTOS ---
const productosDB = {
    "chamarra-mezclilla": {
        titulo: "Chamarra de Mezclilla Premium",
        precio: 899,
        categoria: "CHAMARRAS",
        descripcion: "Confeccionada en 100% algodón de alto gramaje con acabado desgastado estilo vintage. Corte moderno regular fit ideal para cualquier época del año.",
        imagen: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
    },
    "playera-oversize": {
        titulo: "Playera Oversize Negra",
        precio: 349,
        categoria: "PLAYERAS",
        descripcion: "Playera de corte holgado confeccionada en algodón peinado transpirable. Diseño de hombros caídos para un estilo urbano y relajado.",
        imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
    },
    "pantalon-cargo": {
        titulo: "Pantalón Cargo Gris Streetwear",
        precio: 699,
        categoria: "PANTALONES",
        descripcion: "Pantalón cargo con múltiples bolsillos funcionales, ajuste elástico en tobillos y tela resistente de gabardina de uso rudo.",
        imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
    },
    "sudadera-capucha": {
        titulo: "Sudadera Hoodie Minimalista",
        precio: 599,
        categoria: "SUDADERAS",
        descripcion: "Sudadera con gorro ajustable y afelpado interior ultra suave. Cuenta con bolsa frontal tipo canguro y puños acanalados.",
        imagen: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"
    },
    "vestido-casual": {
        titulo: "Vestido Casual Algodón",
        precio: 749,
        categoria: "VESTIDOS",
        descripcion: "Vestido corto tejido de algodón fresco y elástico. Silueta entallada que destaca la figura sin perder comodidad durante el día.",
        imagen: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
    },
    "chaqueta-rompevientos": {
        titulo: "Chaqueta Rompevientos Urbana",
        precio: 999,
        categoria: "CHAQUETAS",
        descripcion: "Chaqueta liviana repelente al agua con forro interior de malla. Incluye cierre frontal hermético y capucha desplegable.",
        imagen: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop"
    }
    ,"playera-estampada-hombre": { titulo: "Playera Estampada Street", precio: 399, categoria: "PLAYERAS", descripcion: "Playera urbana de algodón con estampado frontal.", imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" }
    ,"pantalon-jogger-hombre": { titulo: "Jogger Urbano Negro", precio: 649, categoria: "PANTALONES", descripcion: "Jogger cómodo de corte moderno para uso diario.", imagen: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop" }
    ,"sudadera-hombre": { titulo: "Sudadera Urbana Beige", precio: 699, categoria: "SUDADERAS", descripcion: "Sudadera casual de estilo urbano y ajuste relajado.", imagen: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=800&auto=format&fit=crop" }
};

// --- ESTADO DEL CARRITO ---
var carrito = [];
try {
    carrito = JSON.parse(localStorage.getItem("carrito_urbanwear")) || [];
} catch (e) {
    carrito = [];
}

function actualizarBadge() {
    var badges = document.querySelectorAll('.cart-btn .badge');
    var total = carrito.reduce(function(sum, item) { return sum + item.cantidad; }, 0);
    badges.forEach(function(b) { b.textContent = total; });
}

// --- FUNCIÓN GLOBAL DE AGREGAR AL CARRITO ---
window.agregarAlCarrito = function(id, talla) {
    talla = talla || "M";
    var prod = productosDB[id];
    if (!prod) {
        prod = productosDB["chamarra-mezclilla"];
        id = "chamarra-mezclilla";
    }

    var existe = carrito.find(function(item) { return item.id === id && item.talla === talla; });
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            titulo: prod.titulo,
            precio: prod.precio,
            talla: talla,
            cantidad: 1
        });
    }

    try {
        localStorage.setItem("carrito_urbanwear", JSON.stringify(carrito));
    } catch (e) {}

    actualizarBadge();
    alert('¡"' + prod.titulo + '" (Talla: ' + talla + ') se agregó al carrito!');
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', function() {
    actualizarBadge();

    var tallaSeleccionada = "M";

    // 1. CARGAR DETALLES DEL PRODUCTO
    var imgEl = document.getElementById('product-img');
    var titleEl = document.getElementById('product-title');
    var priceEl = document.getElementById('product-price');
    var tagEl = document.getElementById('product-tag');
    var descEl = document.getElementById('product-desc');
    var btnAddCart = document.getElementById('btn-add-cart');

    if (imgEl && titleEl) {
        var urlParams = new URLSearchParams(window.location.search);
        var currentId = urlParams.get('id');

        if (!currentId || !productosDB[currentId]) {
            currentId = "chamarra-mezclilla";
        }

        var prod = productosDB[currentId];
        titleEl.textContent = prod.titulo;
        priceEl.textContent = "$" + prod.precio + ".00 MXN";
        tagEl.textContent = prod.categoria;
        descEl.textContent = prod.descripcion;
        imgEl.src = prod.imagen;
        imgEl.alt = prod.titulo;

        // Selección interactiva de Tallas
        var chips = document.querySelectorAll('.chip');
        chips.forEach(function(chip) {
            chip.addEventListener('click', function(e) {
                e.preventDefault();
                chips.forEach(function(c) { c.classList.remove('active'); });
                this.classList.add('active');
                tallaSeleccionada = this.textContent.trim();
            });
        });

        // Evento directo del botón Agregar al Carrito
        if (btnAddCart) {
            btnAddCart.onclick = function(e) {
                e.preventDefault();
                window.agregarAlCarrito(currentId, tallaSeleccionada);
            };
        }
    }

    // 2. FILTROS DE CATÁLOGO
    var cards = document.querySelectorAll('.product-card');
    var checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    var slider = document.querySelector('.price-slider');
    var maxPriceLabel = document.querySelector('.max-price-val');
    var btnLimpiar = document.querySelector('.btn-clear');
    var resultsCount = document.querySelector('.results-count');
    var generoInicial = new URLSearchParams(window.location.search).get('genero');

    // Mostrar y seleccionar únicamente las categorías disponibles para la sección elegida.
    checkboxes.forEach(function(cb) {
        var categoria = cb.getAttribute('data-cat');
        var tieneProductos = Array.from(cards).some(function(card) {
            return card.getAttribute('data-category') === categoria &&
                (!generoInicial || card.getAttribute('data-gender') === generoInicial);
        });
        cb.checked = tieneProductos;
        cb.closest('label').style.display = tieneProductos ? '' : 'none';
    });

    function filtrar() {
        if (!cards.length) return;

        var genero = new URLSearchParams(window.location.search).get('genero');
        var catsChecked = Array.from(checkboxes)
            .filter(function(cb) { return cb.checked; })
            .map(function(cb) { return cb.getAttribute('data-cat'); });

        var maxP = slider ? parseInt(slider.value) : 1500;
        var visibles = 0;

        cards.forEach(function(card) {
            var cat = card.getAttribute('data-category');
            var price = parseInt(card.getAttribute('data-price'));

            var coincideGenero = !genero || card.getAttribute('data-gender') === genero;
            if (catsChecked.indexOf(cat) !== -1 && price <= maxP && coincideGenero) {
                card.style.display = 'block';
                visibles++;
            } else {
                card.style.display = 'none';
            }
        });

        if (resultsCount) {
            resultsCount.textContent = "Mostrando " + visibles + " de " + cards.length + " productos";
        }
    }

    checkboxes.forEach(function(cb) { cb.addEventListener('change', filtrar); });
    filtrar();

    if (slider) {
        slider.addEventListener('input', function(e) {
            if (maxPriceLabel) maxPriceLabel.textContent = "$" + e.target.value + " MXN";
            filtrar();
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function() {
            checkboxes.forEach(function(cb) {
                var categoria = cb.getAttribute('data-cat');
                cb.checked = Array.from(cards).some(function(card) {
                    return card.getAttribute('data-category') === categoria &&
                        (!generoInicial || card.getAttribute('data-gender') === generoInicial);
                });
            });
            if (slider) slider.value = 1500;
            if (maxPriceLabel) maxPriceLabel.textContent = "$1,500 MXN";
            filtrar();
        });
    }

    // 3. VENTANA DEL CARRITO: permite revisar, borrar y pedir
    function guardarCarrito() {
        localStorage.setItem("carrito_urbanwear", JSON.stringify(carrito));
        actualizarBadge();
    }

    function crearVentana(id, titulo) {
        var anterior = document.getElementById(id);
        if (anterior) anterior.remove();
        var modal = document.createElement('div');
        modal.id = id;
        modal.className = 'uw-modal';
        modal.innerHTML = '<div class="uw-modal-box" role="dialog" aria-modal="true"><button class="uw-close" type="button" aria-label="Cerrar">×</button><h2>' + titulo + '</h2><div class="uw-modal-content"></div></div>';
        modal.addEventListener('click', function(e) { if (e.target === modal || e.target.classList.contains('uw-close')) modal.remove(); });
        document.body.appendChild(modal);
        return modal;
    }

    function mostrarCarrito() {
        var modal = crearVentana('uw-cart-modal', 'Tu carrito de compras');
        var content = modal.querySelector('.uw-modal-content');
        if (!carrito.length) {
            content.innerHTML = '<p class="uw-empty">Tu carrito está vacío.</p><button class="uw-primary" type="button" data-close>Seguir comprando</button>';
            content.querySelector('[data-close]').onclick = function(){ modal.remove(); };
            return;
        }
        content.innerHTML = '<div class="uw-cart-items"></div><div class="uw-cart-total"></div><div class="uw-cart-actions"><button class="uw-danger" type="button" id="uw-clear-cart">Borrar carrito</button><button class="uw-primary" type="button" id="uw-order-cart">Pedir</button></div>';
        var list = content.querySelector('.uw-cart-items');
        carrito.forEach(function(item, index) {
            var row = document.createElement('div'); row.className = 'uw-cart-row';
            var details = document.createElement('div');
            details.innerHTML = '<strong></strong><span></span><small></small>';
            details.querySelector('strong').textContent = item.titulo;
            details.querySelector('span').textContent = 'Talla: ' + item.talla + ' · Cantidad: ' + item.cantidad;
            details.querySelector('small').textContent = '$' + (item.precio * item.cantidad).toFixed(2) + ' MXN';
            var remove = document.createElement('button'); remove.className='uw-remove'; remove.type='button'; remove.textContent='Quitar';
            remove.onclick = function(){ carrito.splice(index,1); guardarCarrito(); mostrarCarrito(); };
            row.appendChild(details); row.appendChild(remove); list.appendChild(row);
        });
        var total = carrito.reduce(function(sum, item){ return sum + item.precio * item.cantidad; }, 0);
        content.querySelector('.uw-cart-total').textContent = 'Total: $' + total.toFixed(2) + ' MXN';
        content.querySelector('#uw-clear-cart').onclick = function(){ carrito=[]; guardarCarrito(); mostrarCarrito(); };
        content.querySelector('#uw-order-cart').onclick = function(){
            var pedido = carrito.map(function(i){ return i.titulo + ' / Talla ' + i.talla + ' / x' + i.cantidad; }).join('\n');
            alert('Pedido preparado:\n' + pedido + '\nTotal: $' + total.toFixed(2) + ' MXN\nContacta a la tienda para completar la compra.');
        };
    }

    document.querySelectorAll('.cart-btn').forEach(function(btn) {
        btn.onclick = function(e) { e.preventDefault(); mostrarCarrito(); };
    });

    // 4. BUSCADOR con resultados seleccionables
    function mostrarBusqueda() {
        var modal = crearVentana('uw-search-modal', 'Buscar prendas');
        var content = modal.querySelector('.uw-modal-content');
        content.innerHTML = '<input class="uw-search-input" type="search" placeholder="Busca playeras, pantalones, sudaderas..." aria-label="Buscar prendas"><div class="uw-search-results"></div>';
        var input = content.querySelector('.uw-search-input');
        var results = content.querySelector('.uw-search-results');
        function buscar() {
            var term = input.value.trim().toLocaleLowerCase('es');
            results.innerHTML = '';
            if (!term) { results.innerHTML = '<p class="uw-empty">Escribe el nombre o categoría de una prenda.</p>'; return; }
            var encontrados = Object.keys(productosDB).filter(function(key) {
                var p = productosDB[key];
                return (p.titulo + ' ' + p.categoria + ' ' + p.descripcion).toLocaleLowerCase('es').includes(term);
            });
            if (!encontrados.length) { results.innerHTML = '<p class="uw-empty">No se encontraron prendas.</p>'; return; }
            encontrados.forEach(function(key) {
                var p = productosDB[key]; var item = document.createElement('button');
                item.type='button'; item.className='uw-search-result';
                item.innerHTML='<span></span><strong></strong>';
                item.querySelector('span').textContent=p.categoria;
                item.querySelector('strong').textContent=p.titulo + ' · $' + p.precio + ' MXN';
                item.onclick=function(){ window.location.href='detalle.html?id='+encodeURIComponent(key); };
                results.appendChild(item);
            });
        }
        input.addEventListener('input', buscar);
        buscar(); input.focus();
    }
    document.querySelectorAll('.icon-btn[aria-label="Buscar"]').forEach(function(btn) {
        btn.onclick = function(e) { e.preventDefault(); mostrarBusqueda(); };
    });
});