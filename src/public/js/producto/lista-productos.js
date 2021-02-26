function getDataHidden() {
    try {
        return document.getElementById('idDataHidden').value;
    } catch (err) {
        return false;
    }
}

async function getProductos(data = getDataHidden()) {
    const categorias = Array.from(document.querySelectorAll('input:checked')).map(item => Number(item.value));
    const url = !data ? `producto/search/0` : `producto/search`;
    let productos = '';
    const body = JSON.stringify({ categorias, data });
    const result = await fetch(`${location.origin}/${url}`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json());
    result.map(producto => {
        productos += `
            <div class="container__products">
        <div class="container__products--details">
            <img class="container__products--img" src="/${producto.imagen}" alt="Producto">
            <div class="container__products--title">
                <p>
                    ${producto.nombre}
                </p>
                <span>
                    ${producto.precio}
                </span>
            </div>
        </div>
        <div class="container__products--options">
            <span>
                ${producto.descripcion}
            </span>
            <form action="" method="post">
                <button name="id_producto" value="">Ver Producto</button>
            </form>
        </div>
    </div>
        `;
    });
    document.getElementById('productosJSON').innerHTML = productos;
}