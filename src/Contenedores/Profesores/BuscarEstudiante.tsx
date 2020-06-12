import React, { useState, useEffect } from 'react';
import { Container, Segment, Grid, Button, Table } from 'semantic-ui-react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type formProps = {
    carreraUsuario: any;
}
const BuscarEstudiante: React.FC<formProps> = (props: formProps) => {

    const [estudiantes, setEstudiante] = useState<any[]>([]);
    const [area, setArea] = useState<any[]>([]);
    const [conocimiento, setConocimiento] = useState<any[]>([]);
    const [areaSeleccionada, setAreaSeleccionada] = useState(0);
    const [cono1, setCono1] = useState(0);
    const [cono2, setCono2] = useState(0);
    const [cono3, setCono3] = useState(0);
    

    useEffect(() => {
        console.log(props.carreraUsuario);
        axios.get('http://localhost:8003/skill?carrera_id=' + props.carreraUsuario + '&tipo_id=1')
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
        axios.get('http://localhost:8003/skill?carrera_id=' + props.carreraUsuario + '&tipo_id=2')
            .then(result => {
                setConocimiento(result.data);
                console.log(conocimiento);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const actualizarAreaSelect = (e: any, { value }: any) => {
        console.log(value);
        setAreaSeleccionada(value);
        console.log('Hola' + areaSeleccionada);
    }
    const actualizarCono1 = (e: any, { value }: any) => {
        console.log(value);
        setCono1(value);
        console.log('Hola c1: ' + cono1);
    }
    const actualizarCono2 = (e: any, { value }: any) => {
        console.log(value);
        setCono2(value);
        console.log('Hola c2: ' + cono2);
    }
    const actualizarCono3 = (e: any, { value }: any) => {
        console.log(value);
        setCono3(value);
        console.log('Hola cono3:' + cono3);
    }

    const buscarEst = async () => {
        await axios.get('http://localhost:8003/busqueda?s1='+areaSeleccionada + '&s2=' + cono1 + '&s3=' + cono2 + '&s4=' + cono3)
        .then(result => {
          setEstudiante(result.data);
        }).catch(error => {
            console.log(error);
            toast.error('            Error');

        }); 
    }
  
    return (
        <div>
            <ToastContainer draggable={false} transition={Zoom} autoClose={8000}/>
            <Container textAlign='center'>
                <h2>Buscar un estudiante</h2>
            </Container>
            <br />
            <br />
            <Container>
                <Segment>
                    <h3>Seleccionar un área</h3>
                    <Grid columns={1} divided>
                        <Grid.Row>
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
                        </Grid.Row>
                    </Grid>
                    <br />
                </Segment>
                <Segment>
                    <h3>Selecciona conocimientos:</h3>
                    <Grid columns={1} divided>
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
                                    onChange={actualizarCono1}
                                />
                                <br/>
                                <br/>
                                <br/>
                                <Dropdown
                                    placeholder='Conocimiento'
                                    options={conocimiento.map(co => ({
                                        key: co.skil_id,
                                        value: co.skill_id,
                                        text: co.nombre
                                    }))}
                                    onChange={actualizarCono2}
                                />
                                <br/>
                                <br/>
                                <br/>
                                <Dropdown
                                    placeholder='Conocimiento'
                                    options={conocimiento.map(co => ({
                                        key: co.skil_id,
                                        value: co.skill_id,
                                        text: co.nombre
                                    }))}
                                    onChange={actualizarCono3}
                                />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                </Segment>
            </Container>
            <br />
            <br />
            <Container textAlign='center'>
                <Button onClick={buscarEst}>Buscar</Button>
            </Container>
            <br />
            <br />
            <Container>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Identificación</Table.HeaderCell>
                            <Table.HeaderCell>Correo</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {estudiantes.map(est => (
                            <Table.Row key={est.user_id}>
                                <Table.Cell>
                                    {est.nombre}
                                </Table.Cell>
                                <Table.Cell>
                                    {est.identificacion}
                                </Table.Cell>
                                <Table.Cell>
                                    {est.correo}
                                </Table.Cell>
                            </Table.Row>
                        )

                        )}
                    </Table.Body>
                </Table>
            </Container>
            <br />
            <br />
        </div>
    );
}

export default BuscarEstudiante;
