function updateIngrediente(ingrediente) {
    const form = document.forms[0];
    form.action = '/administrador/actualizar-ingrediente';
    form.elements.namedItem('id').value = ingrediente.id;
    form.elements.namedItem('nombre').value = ingrediente.nombre;
    form.elements.namedItem('stock').value = ingrediente.stock;
    form.elements.namedItem('precio').value = ingrediente.precio;
    form.querySelector('#id_cancelar').style.display = 'block';
}

function createIngrediente(e) {
    e.style.display = 'none';
    const form = document.forms[0];
    form.action = '/administrador/ingredientes';
    form.elements.namedItem('id').value = null;
    form.elements.namedItem('nombre').value = '';
    form.elements.namedItem('stock').value = '';
    form.elements.namedItem('precio').value = '';
}