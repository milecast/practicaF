import React, { useState, useEffect } from 'react';
import './App.css';
import { Image, Segment, Grid, Form, Button, Divider, Container, Header } from 'semantic-ui-react';
import universidad from './assets/universidad.png';
import upc from './assets/upc.png';
import Estudiantes from './Contenedores/Estudiantes/Estudiantes';
import Logged from './Contenedores/Profesores/Logged';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [logueado, setLogueado] = useState(false);
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState('');

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [habilitado, setHabilitado] = useState(true);
  const [datosUsuario, setDatosUsuario] = useState(0);
  const [carreraDato, setCarreraDato] = useState(0);
  const [usuarioid, setUsuarioid] = useState(0);


  useEffect(()=>{
    
    if(datosUsuario === 1){
      console.log(nombre);
      console.log(carreraDato);
      inicioEstudiante();
    }
    else if(datosUsuario === 2)
    {
      console.log(nombre);
      console.log(carreraDato);
      inicioProfesor();
    }
  }, [carreraDato, nombre]); 

  const actualizarUsuario = (e: any) => {
      setUsuario(e.target.value);
      if(usuario !== '' && password !== ''){
          setHabilitado(false);
      }
  }

  const actualizarPassword = (e: any) => {
      setPassword(e.target.value);
      if(usuario !== '' && password !== ''){
          setHabilitado(false);
      }
  }

  const login = async () => {
        await axios.post('http://localhost:8003/usuario/login?nick=' + usuario + '&password=' + password, '')
        .then(result => {
          //console.log(result);
            setDatosUsuario(result.data.rol_id);
            setNombre(result.data.nombre);
            setCarreraDato(result.data.carrera_id);
            setUsuarioid(result.data.usuario_id);
            
        }).catch(error => {
          toast.error('            Credenciales invalidas');
            console.log(error);
        }); 
    }
  
  const inicioEstudiante = () => {
    
    //console.log(nombre);
    setLogueado(true);
    setRol('estudiante');
  }

  const inicioProfesor = () => {
    
    //console.log(nombre);
    setLogueado(true);
    setRol('profesor');
  }

  const cierreSesion = () => {
    setLogueado(false);
    setDatosUsuario(0);
    setNombre('');
  }

  return (
    <div >
      <ToastContainer draggable={false} transition={Zoom} autoClose={8000}/>
      <Header as='h3' block inverted >
        <Image src={universidad} size='massive'/>
        Universidad Piloto de Colombia- Prácticas profesionales
      </Header>
      {
        logueado === false ?
        (
          <Container>
            <br />
            <br />
            <br />
            <br />
            <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column >
                <Image src={upc} size='medium' centered/>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                <Form>
                    <Form.Field>
                        <label>Usuario</label>
                        <input placeholder='Usuario' onChange={actualizarUsuario}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Contraseña</label>
                        <input placeholder='Contraseña' onChange={actualizarPassword} type='password'/>
                    </Form.Field>
                    <Button onClick={login} disabled={habilitado}>Iniciar sesión</Button>
                </Form>
                </Grid.Column>
            </Grid>

            <Divider vertical />
            </Segment>
        </Container>
        )
        :
        (rol === 'estudiante'?
        <Estudiantes funcionCierre={cierreSesion} carrera={carreraDato} nombre1={nombre} usuarioId={usuarioid}></Estudiantes>
        :
        <Logged funcionCierre={cierreSesion} carrera={carreraDato} nombre1={nombre}></Logged>)
      }
    </div>
  );
}

export default App;
