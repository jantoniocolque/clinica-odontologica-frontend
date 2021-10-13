import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import Modal from '../components/Modal/Index';
import postData from '../assets/js/postData';
export default function Paciente() {
    const history = useHistory();
    const [pacientes, setPacientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = () => {
        fetch('https://api-clinica-odontologica.herokuapp.com/api/pacientes')
            .then(response => response.json())
            .then(data => {
                setPacientes(data);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDetail = (event) => {
        history.push("/pacientes/" + event.target.attributes.value.value);
    }

    const handleSave = (event) => {
        const { nombre, apellido, dni, calle, numero, localidad, provincia } = event.target
        event.preventDefault();
        const payload = {
            nombre: nombre.value,
            apellido: apellido.value,
            dni: dni.value,
            fechaAlta: null,
            calle: calle.value,
            numero: numero.value,
            localidad: localidad.value,
            provincia: provincia.value
        }
        postData("https://api-clinica-odontologica.herokuapp.com/api/pacientes", payload)
            .then(data => {
                getData();
                handleClose();
            });
    }

    return (
        <>
            {isLoading && <Spinner className="m-auto" animation="border" />}
            {!isLoading &&
                <>
                    <h2 className="color-blue">Pacientes</h2>
                    <div className="body_lists">
                        <Table bordered className="text-center">
                            <thead>
                                <tr className="text-white">
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha de alta</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientes.map(p => {
                                    return (
                                        <tr key={p.id}>
                                            <td>{p.nombre}</td>
                                            <td>{p.apellido}</td>
                                            <td>{p?.fechaAlta || <span className="text-danger">Sin asignar</span>}</td>
                                            <td><span onClick={handleDetail}><i value={p.id} class="fas fa-info-circle"></i></span></td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                        <div className="my-5">
                            {pacientes.length === 0 && <h3 className="text-danger text-center"> No se encontraron resultados </h3>}
                        </div>
                        <Button size="md" onClick={handleShow} className="color_button d-block m-auto" active>
                            Nuevo paciente
                        </Button>
                        {show && <Modal show={show} handleSave={handleSave} handleClose={handleClose} name="paciente" dataObject={["nombre", "apellido", "dni"]} dataDomicilio={["calle", "numero", "localidad", "provincia"]}></Modal>}
                    </div>
                </>
            }
        </>
    )
}