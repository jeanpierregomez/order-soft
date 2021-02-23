function updateCategoria(id, nombre) {
    const form = document.forms[0];
    form.action = '/administrador/actualizar-categoria';
    form.elements.namedItem('id').value = id;
    form.elements.namedItem('nombre').value = nombre;
    form.querySelector('#id_cancelar').style.display = 'block';
}

function createCategoria(e) {
    e.style.display = 'none';
    const form = document.forms[0];
    form.action = '/administrador/categorias';
    form.elements.namedItem('id').value = null;
    form.elements.namedItem('nombre').value = '';
}