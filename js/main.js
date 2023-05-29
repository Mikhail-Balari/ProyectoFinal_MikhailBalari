import Swal from "sweetalert2";

// Creo un objeto para manejar el almacenamiento en el local storage.
const storage = {
  save: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
  };
  
  // Array para almacenar los datos de los pacientes.
  let pacientes = [];
  
  // Función para guardar los datos de los pacientes en el Storage.
  function guardarPacientes() {
  storage.save('pacientes', pacientes);
  }
  
  // Función para recuperar los datos de los pacientes del Storage.
  function recuperarPacientes() {
  const pacientesGuardados = storage.get('pacientes');
  if (pacientesGuardados) {
  pacientes = pacientesGuardados;
  }
  }

  // Array para almacenar los datos de los turnos.
  let turnos = [];
  
  // Función para mostrar la lista de turnos en el HTML.
  function mostrarListaTurnos() {
    let listaTurnos = document.getElementById('turnero');
    listaTurnos.innerHTML = '';
    for (let i = 0; i < turnos.length; i+=1) {
      let pacienteNombre = turnos[i].pacienteNombre;
      let pacienteApellido = turnos[i].pacienteApellido;
      let dia = turnos[i].dia;
      let hora = turnos[i].hora;
      let tr = document.createElement('tr');
      let th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.innerHTML = `${i+1}`;
      let tN = document.createElement('td');
      let tA = document.createElement('td');
      let tD = document.createElement('td');
      let tH = document.createElement('td');
      tN.innerHTML = `${pacienteNombre}`;
      tA.innerHTML = `${pacienteApellido}`;
      tD.innerHTML = `${dia}`;
      tH.innerHTML = `${hora}`; 
      tr.innerHTML = th.outerHTML + tN.outerHTML + tA.outerHTML + tD.outerHTML + tH.outerHTML;
      listaTurnos.appendChild(tr);
    }
  }
  
  // Función para mostrar una notificación al paciente al asignar turno.
  function mostrarNotificacion() {
   new Swal({
      title: "Turno guardado",
      text: "El turno ha sido guardado exitosamente",
      icon: "success",
      button: "Aceptar"
    });
  }

  // Función para procesar el formulario cuando el paciente ingresa sus datos.
  function procesarFormulario(event) {
      event.preventDefault();
      
      // Variables para obtener los valores ingresados por el usuario en el formulario.
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const edad = document.getElementById('edad').value;
      const dia = document.getElementById('dia').value;
      const hora = document.getElementById('hora').value;
      
      // Valido los datos.
      if (!nombre || !apellido || !edad || !dia || !hora) {
      alert('Por favor complete los campos');
      return;
      }
      
      // Agrego el paciente al array y lo guardo en el Storage.
      pacientes.push({ nombre, apellido, edad, dia, hora });
      guardarPacientes();

      // Muestro la notificación del turno guardado con éxito.
      mostrarNotificacion();

      // Asigno el turno al paciente y lo agrego a la lista de turnos.
      const pacienteNombre = `${nombre}`;
      const pacienteApellido = `${apellido}`;
      turnos.push({ pacienteNombre, pacienteApellido, dia, hora });
      mostrarListaTurnos();
      
      // Limpio el formulario.
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('edad').value = '';
      document.getElementById('dia').value = '';
      document.getElementById('hora').value = '';
}

  // Función para inicializar la aplicación.
  function inicializar() {
  recuperarPacientes();
  mostrarListaTurnos();
  document.getElementById('formulario').addEventListener('submit', procesarFormulario);
  }
  
  // Llamo a la función para inicializar la aplicación.
  inicializar();

