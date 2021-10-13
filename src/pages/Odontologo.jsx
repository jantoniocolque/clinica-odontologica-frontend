import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap';
import Modal from '../components/Modal/Index';
import postData from '../assets/js/postData';
export default function Odontologo() {
    const [odontologos, setOdontologos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const getData = () => {
        fetch('https://api-clinica-odontologica.herokuapp.com/api/odontologos')
            .then(response => response.json())
            .then(data => {
                setOdontologos(data);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDetail = (event) => {
        history.push("/odontologos/" + event.target.attributes.value.value);
    }

    const handleSave = (event) => {
        const { nombre, apellido, matricula } = event.target
        event.preventDefault();
        const payload = {
            nombre: nombre.value,
            apellido: apellido.value,
            matricula: matricula.value
        }
        postData("https://api-clinica-odontologica.herokuapp.com/api/odontologos", payload)
            .then(data => {
                getData();
                handleClose();
            })
    }

    return (
        <>
            {isLoading && <Spinner className="m-auto" animation="border" />}
            {!isLoading &&
                <>
                    <h2 className="color-blue">Odontologos</h2>
                    <div className="body_lists">
                        <Table bordered className="text-center">
                            <thead>
                                <tr className="text-white">
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Matricula</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {odontologos.map(o => {
                                    return (
                                        <tr key={o.id}>
                                            <td>{o.nombre}</td>
                                            <td>{o.apellido}</td>
                                            <td>{o.matricula}</td>
                                            <td><span onClick={handleDetail}><i value={o.id} class="fas fa-info-circle"></i></span></td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                        <div className="my-5">
                            {odontologos.length === 0 && <h3 className="text-danger text-center"> No se encontraron resultados </h3>}
                        </div>
                        <Button size="md" onClick={handleShow} className="color_button d-block m-auto" active>
                            Nuevo odontologo
                        </Button>

                        {show && <Modal show={show} handleSave={handleSave} handleClose={handleClose} name="odontologo" dataObject={["nombre", "apellido", "matricula"]}></Modal>}
                    </div>
                </>
            }
        </>
    )
}