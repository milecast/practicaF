import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type formProps = {
    funcionCierre: any
    carrera: any;
    nombre1: any;
    usuarioId: any;
}

const Estudiantes: React.FC<formProps> = (props: formProps) => {

    const [area, setArea] = useState<any[]>([]);
    const [conocimiento, setConocimiento] = useState<any[]>([]);
    const [areaSeleccionada, setAreaSeleccionada] = useState(0);

    useEffect(() => {
        console.log(props.carrera);
        axios.get('http://localhost:8003/skill?carrera_id=' + props.carrera + '&tipo_id=1')
            .then(result => {
                console.log(result);
                setArea(result.data);
                console.log(area);

            }

            ).catch(error => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        axios.get('http://localhost:8003/skill?carrera_id=' + props.carrera + '&tipo_id=2')
            .then(result => {
                setConocimiento(result.data);
                console.log(conocimiento);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const cierreSesion = () => {
        props.funcionCierre();
    }

    const actualizarAreaSelect = (e: any, { value }: any) => {
        console.log(value);
        setAreaSeleccionada(value);
        console.log('Hola' + areaSeleccionada);
    }

    const registrarFormulario = async () => {
        await axios.post('http://localhost:8003/formulario/registro', JSON.parse('{"usuario_id":' + props.usuarioId + ', "skill_id":' + areaSeleccionada + '}'))
            .then(result => {
                toast.success('          Agregado');
            }

            )
            .catch(error => {
                toast.error('            Error');
                console.log(error);
            });
    }

    return (
        
        <Container>
            <ToastContainer draggable={false} transition={Zoom} autoClose={8000}/>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Container textAlign='left'>
                            <h3>Nombre: {props.nombre1}</h3>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        <Container textAlign='right'>
                            <Button onClick={cierreSesion}>Cerrar sesión</Button>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment>
                <h3>Agrega área</h3>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Container textAlign='center'>
                                <Dropdown
                                    placeholder='Area'
                                    options={area.map(ar => ({
                                        key: ar.skil_id,
                                        value: ar.skill_id,
                                        text: ar.nombre
                                    }))}
                                    onChange={actualizarAreaSelect}
                                />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign='center'>
                                <Button onClick={registrarFormulario}>Agregar</Button>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
            </Segment>
            <Segment>
                <h3>Agrega conocimiento</h3>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Container textAlign='center'>
                                <Dropdown
                                    placeholder='Conocimiento'
                                    options={conocimiento.map(co => ({
                                        key: co.skil_id,
                                        value: co.skill_id,
                                        text: co.nombre
                                    }))}
                                    onChange={actualizarAreaSelect}
                                />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign='center'>
                                <Button onClick={registrarFormulario}>Agregar</Button>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
            </Segment>
        </Container>
    );
}

export default Estudiantes;
