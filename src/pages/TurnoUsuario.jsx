import {useState,useEffect} from 'react';
import { Spinner , Tab,Nav,Col,Row,Form,Table, Button} from 'react-bootstrap';
import postData from '../assets/js/postData';
import deleteElement from '../assets/js/delete';
export default function TurnoUsuario(){
    const [turnos,setTurnos] = useState([]);
    const [paciente,setPaciente] = useState({});
    const [odontologos,setOdontologos] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const getDataOdontologos = ()=>{
        fetch("http://localhost:8081/api/odontologos")
            .then(response=>response.json())
            .then(data=>{
                setOdontologos(data);
            });
    }
    const getDataTurnos = ()=>{
        fetch("http://localhost:8081/api/turnos")
            .then(response=>response.json())
            .then(data=>{
                setTurnos(data);
                setIsLoading(false);
            })
    }

    useEffect(()=>{
        getDataTurnos();
        getDataOdontologos();
        setPaciente(JSON.parse(localStorage.getItem("user")));
    },[])

    const handleDelete = (id)=>{
        deleteElement(id,"turnos").then(data=>{
            getDataTurnos();
        })
    }
    const handleSubmit = (e)=>{
        const tab = document.querySelector("#left-tabs-example-tab-first");
        const {id_odontologo,fecha,hora} = e.target;
        e.preventDefault();
        const payload={
            id_odontologo: id_odontologo.value,
            id_paciente: paciente.id_paciente,
            fecha: fecha.value,
            hora:hora.value
        }
        postData("http://localhost:8081/api/turnos",payload)
            .then(data=>{
                getDataTurnos();
                e.target.reset();
                e.target.id_odontologo.selectedIndex = 0;
                tab.click();
            })
    }
    return(
        <>
            {isLoading && <Spinner className="m-auto" animation="border" />}
                {!isLoading && 
                    <>
                        <h2 className="color-blue my-5">Hola {paciente.nombre} !</h2>
                        <p className="color-blue text-info-turno">Deseamos que tengas la posibilidad de generar un turno de la manera mas sencilla. Ademas podes ver los turnos que tienes registrado como paciente en nuestra clinica y la posibilidad de cancelar cualquier turno</p>
                        <div className="body_lists">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item >
                                        <Nav.Link eventKey="first">Consultar turnos</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                        <Nav.Link eventKey="second" >Pedir turno</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Table  bordered className="text-center">
                                                <thead>
                                                    <tr className="text-white">
                                                        <th>Odontologo</th>
                                                        <th>Fecha</th>
                                                        <th>Hora</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { turnos.map(t =>{
                                                        return (
                                                            <tr key={t.id}>
                                                                <td>{t.odontologo?.nombre} {t.odontologo?.apellido}</td>
                                                                <td>{t.fecha}</td>
                                                                <td>{t.hora}</td>
                                                                <td><span onClick={()=>handleDelete(t.id)}><i class="fas fa-times-circle text-danger"></i></span></td>
                                                            </tr>
                                                        )}
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <Form onSubmit={handleSubmit}>
                                                <Row>
                                                    <Form.Label column lg={2}>
                                                        <b className="color-blue">Odontologo</b>
                                                    </Form.Label>
                                                    <Col>
                                                        <Form.Select name="id_odontologo">
                                                            <option disabled selected >Seleccione un doctor</option>
                                                            {
                                                                odontologos.map(o=>{
                                                                    return <option key={o.id} value={o.id}>{o.nombre} {o.apellido}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Form.Label column lg={2}>
                                                        <b className="color-blue">Fecha</b>
                                                    </Form.Label>
                                                    <Col>
                                                        <Form.Control name="fecha" type="date"/>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Form.Label column lg={2}>
                                                        <b className="color-blue">Hora</b>
                                                    </Form.Label>
                                                    <Col>
                                                        <Form.Control name="hora" type="time"/>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Button className="color_button" type="submit" eventKey="first">Listo</Button>
                                            </Form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                        </div>
                    </>
            }
        </>
    )
}