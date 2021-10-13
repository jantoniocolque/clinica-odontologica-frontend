import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner, Form, Row, Col } from 'react-bootstrap';
import ModalDropbox from '../components/ModalDropbox/Index';
import postData from '../assets/js/postData';
export default function Turno() {

    const history = useHistory();
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = () => {
        fetch('https://api-clinica-odontologica.herokuapp.com/api/turnos')
            .then(response => response.json())
            .then(data => {
                setTurnos(data);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDetail = (event) => {
        history.push("/turnos/" + event.target.attributes.value.value);
    }

    const handleSave = (event) => {
        const { id_odontologo, id_paciente, fecha, hora } = event.target
        event.preventDefault();
        const payload = {
            id_odontologo: id_odontologo.value,
            id_paciente: id_paciente.value,
            fecha: fecha.value,
            hora: hora.value
        }
        postData("https://api-clinica-odontologica.herokuapp.com/api/turnos", payload)
            .then(data => {
                getData();
                handleClose();
            });
    }

    const handleFilterData = (event) => {
        let hoy = new Date(Date.now());
        const arrayHoy = hoy.toLocaleDateString().split("/");
        hoy = arrayHoy[2] + "-" + (parseInt(arrayHoy[1]) < 10 ? "0" + arrayHoy[1] : arrayHoy[1]) + "-" + arrayHoy[0];
        fetch(`https://api-clinica-odontologica.herokuapp.com/api/turnos/semana?queryFecha=${hoy}`)
            .then(response => response.json())
            .then(data => {
                setTurnos(data);
                setIsLoading(false);
            });
    }

    const handleSubmit = (e) => {
        const { nombre, entidad } = e.target;
        const errors = document.querySelector(".errors");
        e.preventDefault();
        if (entidad.value !== "") {
            fetch(`https://api-clinica-odontologica.herokuapp.com/api/turnos/${entidad.value}?queryNombre=${nombre.value}`)
                .then(response => response.json())
                .then(data => {
                    setTurnos(data);
                    setIsLoading(false);
                    e.target.nombre.value = "";
                })
            errors.innerHTML = "";
        } else {
            errors.innerHTML += '<span class="text-danger">Elija una opcion para buscar</span>';
        }
    }

    return (
        <>
            {isLoading && <Spinner className="m-auto" animation="border" />}
            {!isLoading &&
                <>
                    <h2 className="color-blue">Turnos</h2>
                    <div className="body_lists">
                        <div>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <div className="errors"></div>
                                    <Col className="m-auto text-start">
                                        <Button size="sm" onClick={handleFilterData} className="color_button_aqua m-auto" active>
                                            Semana proxima
                                        </Button>
                                        <Button size="sm" onClick={getData} className=" mx-2 color_button_aqua m-auto" active>
                                            Todos
                                        </Button>
                                    </Col>
                                    <Col className="m-auto d-flex justify-content-end">

                                        <Form.Check type="radio" value="paciente" label="Paciente" className="color-blue" name="entidad" />
                                        <Form.Check type="radio" value="odontologo" label="Odontologo" className="color-blue" name="entidad" />
                                        <input id="inputSearch" type="text" class="form-control" placeholder="Buscar por nombre" name="nombre" />
                                        <button id="buttonSearch" type="submit" class="form-control"><i class="fas fa-search"></i></button>
                                    </Col>

                                </Row>
                            </Form>
                        </div>
                        <Table bordered className="text-center">
                            <thead>
                                <tr className="text-white">
                                    <th>Odontologo</th>
                                    <th>Paciente</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnos.map(t => {
                                    return (
                                        <tr key={t.id}>
                                            <td>{t.odontologo?.nombre} {t.odontologo?.apellido}</td>
                                            <td>{t.paciente?.nombre} {t.paciente?.apellido}</td>
                                            <td>{t.fecha}</td>
                                            <td><span onClick={handleDetail}><i value={t.id} class="fas fa-info-circle"></i></span></td>
                                        </tr>
                                    )
                                }
                                )
                                }
                            </tbody>
                        </Table>
                        <div className="my-5">
                            {turnos.length === 0 && <h3 className="text-danger text-center"> No se encontraron resultados </h3>}
                        </div>
                        <Button size="md" onClick={handleShow} className="color_button d-block m-auto" active>
                            Nuevo turno
                        </Button>

                        {show && <ModalDropbox show={show} handleSave={handleSave} handleClose={handleClose} name="turno"></ModalDropbox>}
                    </div>
                </>
            }
        </>
    )
}