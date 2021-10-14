import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
export default function ModalEditTurno(props) {
    const [show] = useState(props.show);
    const [pacientes, setPacientes] = useState([]);
    const [odontologos, setOdontologos] = useState([]);
    const handleClose = () => props.handleClose();
    const getDataPacientes = () => {
        fetch("https://api-clinica-odontologica.herokuapp.com/api/odontologos")
            .then(response => response.json())
            .then(data => {
                setOdontologos(data);
            });
    }
    const getDataOdontologos = () => {
        fetch("https://api-clinica-odontologica.herokuapp.com/api/pacientes")
            .then(response => response.json())
            .then(data => {
                setPacientes(data);
            });
    }
    useEffect(() => {
        getDataPacientes();
        getDataOdontologos();
    }, [])
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={props.handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title className="color-blue">Nuevo {props.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                        {Object.values(props.dataObject).map((object, i) => {
                            const propertiesObject = Object.keys(props.dataObject);
                            return (propertiesObject[i].includes("fecha") ?
                                <>
                                    <Row key={object + i}>
                                        <Form.Label column lg={2}>
                                            <b className="text-white">{propertiesObject[i].charAt(0).toUpperCase() + propertiesObject[i].slice(1)}</b>
                                        </Form.Label>
                                        <Col>
                                            <Form.Control name={propertiesObject[i]} type="date" defaultValue={object} />
                                        </Col>
                                    </Row>
                                    <br />
                                </>
                                :
                                <>
                                    {propertiesObject[i] === "odontologo" &&
                                        <>
                                            <Row>
                                                <Form.Label column lg={2}>
                                                    <b className="text-white">Odontologo</b>
                                                </Form.Label>
                                                <Col>
                                                    <Form.Select name="id_odontologo">
                                                        {
                                                            odontologos.map(o => {
                                                                return (o.id === object.id) ?
                                                                    <option selected key={o.id} value={o.id}>{o.nombre} {o.apellido}</option>
                                                                    :
                                                                    <option key={o.id} value={o.id}>{o.nombre} {o.apellido}</option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                            <br />
                                        </>
                                    }
                                    {propertiesObject[i] === "paciente" &&
                                        <>
                                            <Row>
                                                <Form.Label column lg={2}>
                                                    <b className="text-white">Paciente</b>
                                                </Form.Label>
                                                <Col>
                                                    <Form.Select name="id_paciente">
                                                        {
                                                            pacientes.map(p => {
                                                                return (p.id === object.id) ?
                                                                    <option selected key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
                                                                    :
                                                                    <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                            <br />
                                        </>
                                    }
                                    {propertiesObject[i] === "hora" &&
                                        <>
                                            <Row>
                                                <Form.Label column lg={2}>
                                                    <b className="text-white">Hora</b>
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control name="hora" type="time" defaultValue={object} />
                                                </Col>
                                            </Row>
                                            <br />
                                        </>
                                    }
                                </>
                            )
                        })}
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="color_button" type="submit">Aceptar</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}