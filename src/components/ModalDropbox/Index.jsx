import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
export default function ModalDropBox(props) {
    const [show] = useState(props.show);
    const [pacientes, setPacientes] = useState([]);
    const [odontologos, setOdontologos] = useState([]);

    const handleClose = () => props.handleClose();
    const getDataOdontologos = () => {
        fetch("https://api-clinica-odontologica.herokuapp.com/api/odontologos")
            .then(response => response.json())
            .then(data => {
                setOdontologos(data);
            });
    }
    const getDataPacientes = () => {
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
                    <Row>
                        <Form.Label column lg={2}>
                            <b className="text-white">Odontologo</b>
                        </Form.Label>
                        <Col>
                            <Form.Select name="id_odontologo">
                                <option disabled selected hidden>Seleccione una persona</option>
                                {
                                    odontologos.map(o => {
                                        return <option key={o.id} value={o.id}>{o.nombre} {o.apellido}</option>

                                    })
                                }
                            </Form.Select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            <b className="text-white">Paciente</b>
                        </Form.Label>
                        <Col>
                            <Form.Select name="id_paciente">
                                <option disabled selected hidden>Seleccione una persona</option>
                                {
                                    pacientes.map(p => {
                                        return <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>

                                    })
                                }
                            </Form.Select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            <b className="text-white">Fecha</b>
                        </Form.Label>
                        <Col>
                            <Form.Control name="fecha" type="date" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            <b className="text-white">Hora</b>
                        </Form.Label>
                        <Col>
                            <Form.Control name="hora" type="time" />
                        </Col>
                    </Row>
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <Button className="color_button" type="submit">Aceptar</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}