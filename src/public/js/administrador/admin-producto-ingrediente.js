async function getIngredientes(id) {
    const ingredientes = Array.from(document.querySelectorAll('input:checked')).map(item => Number(item.value));
    if (ingredientes.length) {
        const data = JSON.stringify({ id, ingredientes });
        const result = await fetch(`${location.origin}/administrador/agregar-ingredientes`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json());
        if (result) {
            success("Ingredientes agregados correctamente!");
            setTimeout(() => {
                return window.location.replace(`${location.origin}/administrador/productos`);
            }, 1500);
            return;
        } else {
            return error("Ha ocurrido un error interno :c");
        }
    }
    error("Debe seleccionar al menos un ingrediente");
}