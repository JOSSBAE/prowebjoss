document.addEventListener('DOMContentLoaded', function () { 
  const formulario = document.getElementById('formularioGasto');
  const mensajeExito = document.getElementById('mensajeExito');
  const descargarLink = document.getElementById('descargarXML');

  formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío por defecto

    // Obtener valores del formulario
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('concepto').value;
    const cantidad = document.getElementById('monto').value;
    const tipoGasto = document.getElementById('categoria').value;

    // Validación básica
    if (!fecha || !descripcion || !cantidad || !tipoGasto) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear contenido XML
    const xmlContent = `
<?xml version="1.0" encoding="UTF-8"?>
<gastos>
  <gasto>
    <fecha>${fecha}</fecha>
    <descripcion>${descripcion}</descripcion>
    <cantidad>${cantidad}</cantidad>
    <tipoGasto>${tipoGasto}</tipoGasto>
  </gasto>
</gastos>`.trim();

    // Crear Blob y URL para descarga
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Mostrar mensaje de éxito y enlace para descargar XML
    descargarLink.href = url;
    descargarLink.download = 'gasto.xml';
    descargarLink.textContent = 'Descargar archivo XML';
    descargarLink.style.display = 'inline';

    mensajeExito.style.display = 'block';
  });
});
