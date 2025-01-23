import { useState } from 'react'
import Axios from 'axios'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [id, setId] = useState()
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [anios, setAnios] = useState('')

  const [editar, setEditar] = useState(false)

  const [empleadosList, setEmpleadosList] = useState([])

  const agregar = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then((response) => {
      mostrar()
      limpiarCampos()
    })
  }

  const mostrar = () => {
    Axios.get('http://localhost:3001/empleados').then((response) => {
      setEmpleadosList(response.data);
    })
  }

  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then((response) => {
      mostrar()
      limpiarCampos()
      console.log(response)
    })
  }

  const limpiarCampos = () => {
    setEditar(false);
    setNombre('');
    setEdad('');
    setPais('');
    setCargo('');
    setAnios('');
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
  }

  mostrar();

  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input value={nombre} onChange={(event)=>{setNombre(event.target.value)}} type="text" placeholder='Jose Gervasio Artigas'className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input value={edad} onChange={(event)=>{setEdad(event.target.value)}} type="number" placeholder='25'className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input value={pais} onChange={(event)=>{setPais(event.target.value)}} type="text" placeholder='Uruguay'className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input value={cargo}  onChange={(event)=>{setCargo(event.target.value)}} type="text" placeholder='Doctor'className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input value={anios} onChange={(event)=>{setAnios(event.target.value)}} type="text" placeholder='2'className="form-control"/>
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            editar ? 
            <div>
              <button onClick={update} className='btn btn-warning m-2'>Actualizar</button>
              <button onClick={agregar} className='btn btn-info m-2'>Cancelar</button>
            </div>   
            : <button onClick={agregar} className='btn btn-success'>Registrar</button>
          }
          
        </div>
      </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Años de experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={()=> {editarEmpleado(val)}} type="button" className="btn btn-primary btn-info">Editar</button>
                        <button type="button" className="btn btn-primary btn-danger">Eliminar</button>
                      </div>
                      </td>
                    </tr>
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default App