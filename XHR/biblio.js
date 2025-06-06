let proveedores = [];

function descargaArchivo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./datos.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const xmlDoc = xhr.responseXML;
      const proveedorNodes = xmlDoc.getElementsByTagName("cliente");

      proveedores = [];
      for (let i = 0; i < proveedorNodes.length; i++) {
        proveedores.push({
          empresa: proveedorNodes[i].getElementsByTagName("nombre")[0].textContent,
          rubro: proveedorNodes[i].getElementsByTagName("sector")[0].textContent,
          observaciones: proveedorNodes[i].getElementsByTagName("notas")[0].textContent.trim()
        });
      }

      mostrarProveedores();
    }
  };
  xhr.send();

  const guardados = localStorage.getItem("proveedores");
  if (guardados) {
    proveedores = JSON.parse(guardados);
    mostrarProveedores();
  }
}

function mostrarProveedores() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "<h2>Lista de Proveedores</h2>";
  const ul = document.createElement("ul");

  proveedores.forEach((proveedor, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Empresa:</strong> ${proveedor.empresa}<br>
      <strong>Rubro:</strong> ${proveedor.rubro}<br>
      <strong>Observaciones:</strong> ${proveedor.observaciones}<br>
      <button onclick="editarProveedor(${index})">Editar</button>
      <button onclick="borrarProveedor(${index})">Borrar</button>
    `;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);
}

function editarProveedor(index) {
  const proveedor = proveedores[index];
  document.getElementById("empresa").value = proveedor.empresa;
  document.getElementById("rubro").value = proveedor.rubro;
  document.getElementById("observaciones").value = proveedor.observaciones;
  document.getElementById("index").value = index;
}

function borrarProveedor(index) {
  proveedores.splice(index, 1);
  mostrarProveedores();
}

function guardarProveedor() {
  const empresa = document.getElementById("empresa").value;
  const rubro = document.getElementById("rubro").value;
  const observaciones = document.getElementById("observaciones").value;
  const index = document.getElementById("index").value;

  const nuevoProveedor = { empresa, rubro, observaciones };

  if (index === "") {
    proveedores.push(nuevoProveedor);
  } else {
    proveedores[parseInt(index)] = nuevoProveedor;
  }

  document.getElementById("formulario").reset();
  document.getElementById("index").value = "";
  mostrarProveedores();
}

function guardarEnLocalStorage() {
  localStorage.setItem("proveedores", JSON.stringify(proveedores));
  alert("Proveedores guardados en el navegador.");
}

function exportarComoXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<proveedores>\n';

  proveedores.forEach(proveedor => {
    xml += `  <proveedor>\n`;
    xml += `    <empresa>${proveedor.empresa}</empresa>\n`;
    xml += `    <rubro>${proveedor.rubro}</rubro>\n`;
    xml += `    <observaciones><![CDATA[${proveedor.observaciones}]]></observaciones>\n`;
    xml += `  </proveedor>\n`;
  });

  xml += '</proveedores>';

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "proveedores.xml";
  a.click();
  URL.revokeObjectURL(url);
}

window.onload = descargaArchivo;
