document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formularioGasto');
  const mensajeExito = document.getElementById('mensajeExito');
  const descargarLink = document.getElementById('descargarXML');

  formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se envíe por defecto

    // Obtener valores del formulario
    const fecha = document.getElementById('fecha').value;
    const concepto = document.getElementById('concepto').value;
    const monto = document.getElementById('monto').value;
    const categoria = document.getElementById('categoria').value;

    // Validación básica
    if (!fecha || !concepto || !monto || !categoria) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear contenido XML
    const xmlContent = `
<?xml version="1.0" encoding="UTF-8"?>
<gastos>
  <gasto>
    <fecha>${fecha}</fecha>
    <concepto>${concepto}</concepto>
    <monto>${monto}</monto>
    <categoria>${categoria}</categoria>
  </gasto>
</gastos>`.trim();

    // Crear Blob y URL de descarga
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Mostrar mensaje de éxito y enlace de descarga
    descargarLink.href = url;
    descargarLink.download = 'gasto.xml';
    descargarLink.textContent = 'Descargar archivo XML';
    descargarLink.style.display = 'inline';

    mensajeExito.style.display = 'block';
  });
});