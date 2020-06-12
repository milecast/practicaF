import React, { useState } from 'react';
import { Image, Segment, Grid, Form, Button, Divider, Container } from 'semantic-ui-react';
import upc from '../assets/upc.png';
import axios from 'axios';

type formProps = {
    funcionEst: any,
    funcionProf: any
}

const MainPage: React.FC<formProps> = (props: formProps) => {
   
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [habilitado, setHabilitado] = useState(true);

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

    const login = () => {
        axios.post('http://localhost:8003/usuario/login?nick=' + usuario + '&password=' + password, '')
        .then(result => {
            if(result.data.rol_id === 1){
                props.funcionEst(result.data.nombre);
            }
            else{
                props.funcionProf(result.data.nombre);
            }
        }).catch(error => {
            console.log(error);
        }); 
    }

    return (
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
                        <input placeholder='Contraseña' onChange={actualizarPassword}/>
                    </Form.Field>
                    <Button onClick={login} disabled={habilitado}>Iniciar sesión</Button>
                </Form>
                </Grid.Column>
            </Grid>

            <Divider vertical />
            </Segment>
        </Container>
    );
}

export default MainPage;
