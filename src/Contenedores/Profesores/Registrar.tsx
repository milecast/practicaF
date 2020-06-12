import React, { useState } from 'react';
import { Container, Segment, Grid, Button, Input, Radio } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type formProps = {
    carreraUsuario: any;
}

const Registrar: React.FC<formProps> = (props: formProps) => {

    const [conocimiento, setConocimiento] = useState('');
    const [area, setArea] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [rolid, setRolid] = useState(0);
    const [carreraid, setCarreraid] = useState(0);
    const [skillid, setSkillId] = useState(0);

    const actualizarConocimiento = (e: any) => {
        setConocimiento(e.target.value);
    }

    const actualizarArea = (e: any) => {
        setArea(e.target.value);
    }

    const actualizarNombre = (e: any) => {
        setNombreUsuario(e.target.value);
    }

    const actualizarID = (e: any) => {
        setIdentificacion(e.target.value);
    }

    const actualizarCorreo = (e: any) => {
        setCorreo(e.target.value);
    }

    const actualizarNick = (e: any) => {
        setNick(e.target.value);
    }

    const actualizarPassword = (e: any) => {
        setPassword(e.target.value);
    }

    const agregarConocimiento = () => {
        axios.post('http://localhost:8003/skill/registro', JSON.parse('{"nombre":"' + conocimiento + '", "tipo_id":2}')).
            then(result => {
                console.log(result.data.skill_id);
                axios.post('http://localhost:8003/filtro/registro', JSON.parse('{"carrera_id":' + props.carreraUsuario + ', "skill_id":' + result.data.skill_id + '}'))
                toast.success('          Agregado');
            }

            )
            .catch(error => {
                console.log(error);
                toast.error('            Error');
            });
    }

    const agregarArea = () => {
        axios.post('http://localhost:8003/skill/registro', JSON.parse('{"nombre":"' + area + '", "tipo_id":1}'))
            .then(result => {
                console.log(result.data.skill_id);
                axios.post('http://localhost:8003/filtro/registro', JSON.parse('{"carrera_id":' + props.carreraUsuario + ', "skill_id":' + result.data.skill_id + '}'))
                toast.success('          Agregado');
            }

            )
            .catch(error => {
                console.log(error);
                toast.error('            Error');
            });
    }

    const registrar = () => {
        axios.post('http://localhost:8003/usuario/registro', JSON.parse('{"nombre":"' + nombreUsuario + '", "nick":"' + nick + '", "password":"' + password + '", "identificacion":"' + identificacion + '", "correo":"' + correo + '", "rol_id":' + rolid + ', "carrera_id":' + carreraid + '}'))
            .then(result => {
                toast.success('          Registrado');

            })    
            .catch(error => {
                console.log(error);
                toast.error('            Error');
            });
    }

    return (
        <div>
            <ToastContainer draggable={false} transition={Zoom} autoClose={8000}/>
            <Container textAlign='center'>
                <h2>Registrar nueva área</h2>
            </Container>
            <br />
            <br />
            <Container>
                <Segment>
                    <h3>Nombre del área</h3>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Área' onChange={actualizarArea} />
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Button onClick={agregarArea}>Agregar</Button>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                </Segment>
                <br />
                <br />
                <Container textAlign='center'>
                    <h2>Registrar nuevo conocimiento</h2>
                </Container>
                <br />
                <br />
                <Segment>
                    <h3>Nombre del conocimiento</h3>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Conocimiento' onChange={actualizarConocimiento} />
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Button onClick={agregarConocimiento}>Agregar</Button>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                </Segment>
                <br />
                <br />
                <Container textAlign='center'>
                    <h2>Registrar nuevo usuario</h2>
                </Container>
                <br />
                <br />
                <Segment>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Nombre del estudiante:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Nombre' onChange={actualizarNombre} />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Nombre del usuario:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Username' onChange={actualizarNick} />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Contraseña:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Contraseña' onChange={actualizarPassword} type='password' />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Identificación:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Identificación' onChange={actualizarID} />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Correo:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Input placeholder='Correo' onChange={actualizarCorreo} />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Rol:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Grid columns={2} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Radio label='Estudiante' value='1' checked={carreraid === 1} onChange={() => { setCarreraid(1) }} />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Radio label='Profesor' value='0' checked={carreraid === 0} onChange={() => { setCarreraid(0) }} />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <label>Carrera:</label>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='center'>
                                    <Grid columns={2}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Radio label='Sistemas' value='1' checked={rolid === 1} onChange={() => { setRolid(1) }} />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Radio label='Telecomunicaciones' value='0' checked={rolid === 0} onChange={() => { setRolid(0) }} />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                    <Container textAlign='center'>
                        <Button onClick={registrar}>Registrar</Button>
                    </Container>
                    <br />
                </Segment>
                <br />
                <br />
                <br />
            </Container>
        </div>
    );
}

export default Registrar;
