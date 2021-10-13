import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import ModalWithContent from '../components/ModalWithContent/Index';
import ModalEditTurno from '../components/ModalEditTurno/Index';
import editPaciente from '../assets/js/pacienteEdit';
import editOdontologo from '../assets/js/odontologoEdit';
import deleteElement from '../assets/js/delete';
import turnoEdit from '../assets/js/turnoEdit';

export default function Detalle(props) {
    const history = useHistory();
    const { id } = useParams();
    const [myObject, setMyObject] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const getData = () => {
        fetch("https://api-clinica-odontologica.herokuapp.com/api/" + props.name + "/" + id)
            .then(response => response.json())
            .then(data => {
                setMyObject(data);
                setIsLoading(false);
            })
    }
    useEffect(() => {
        getData();
    }, [])

    const handleEdit = () => {
        setShow(true);
    }

    const handleDelete = () => {
        deleteElement(id, props.name).then(data => {
            history.goBack();
        })
    }

    const handleEditPaciente = (event) => {
        const { nombre, apellido, dni, fechaAlta, calle, numero, localidad, provincia } = event.target
        event.preventDefault();
        editPaciente(id, nombre.value, apellido.value, dni.value, fechaAlta.value, myObject.id_domicilio, calle.value, numero.value, localidad.value, provincia.value)
            .then(data => {
                getData();
                handleClose();
            });
    }

    const handleEditOdontologo = (event) => {
        const { nombre, apellido, matricula } = event.target
        event.preventDefault();
        editOdontologo(id, nombre.value, apellido.value, matricula.value)
            .then(data => {
                getData();
                handleClose();
            });
    }

    const handleEditTurno = (event) => {
        event.preventDefault();
        const { fecha, hora, id_paciente, id_odontologo } = event.target
        event.preventDefault();
        turnoEdit(id, fecha.value, hora.value, id_paciente.value, id_odontologo.value)
            .then(data => {
                getData();
                handleClose();
            });
    }
    return (
        <>
            {isLoading && <Spinner className="m-auto" animation="border" />}
            {!isLoading && <>
                <h2 className="color-blue">Detalle de {props.name.substring(0, props.name.length - 1)}</h2>
                <div className="body_lists_details">
                    <img src={require(`../assets/img/${props.name}.jpg`).default} alt="imagen de clinica" className="imgInfo" />
                    <ul>
                        {Object.values(myObject).map((o, i) => {
                            const propertiesObject = Object.keys(myObject);
                            return (o !== null && (typeof o) === "object") ?
                                Object.values(o).map((_o, j) => {
                                    const propertiesObjectOfObject = Object.keys(myObject[propertiesObject[i]]);
                                    return (_o !== null && (typeof _o) === "object") ?
                                        Object.values(_o).map((__o, k) => {
                                            const aux = myObject[propertiesObject[i]];
                                            const properties = Object.keys(aux[propertiesObjectOfObject[j]]);
                                            return (
                                                properties[k] !== "id" && <li className="color-aqua" key={__o + k}><span className="color-blue">{properties[k].charAt(0).toUpperCase() + properties[k].slice(1)}</span>: {__o}</li>
                                            )
                                        })
                                        :
                                        <>
                                            {!propertiesObjectOfObject[j].includes("fecha") && propertiesObjectOfObject[j] !== "id" && <li className="color-aqua" key={_o + j}><span className="color-blue">{propertiesObjectOfObject[j].charAt(0).toUpperCase() + propertiesObjectOfObject[j].slice(1)}</span>: {_o}</li>}
                                            {propertiesObjectOfObject[j].includes("fecha") && <li key={_o + j} className="color-aqua"><span className="color-blue">{propertiesObjectOfObject[j].charAt(0).toUpperCase() + propertiesObjectOfObject[j].slice(1)}</span>: {_o || <span className="text-danger">Sin asignar</span>}</li>}
                                        </>
                                })
                                :
                                <>
                                    {propertiesObject[i].includes("fecha") && <li key={o + i} className="color-aqua"><span className="color-blue">{propertiesObject[i].charAt(0).toUpperCase() + propertiesObject[i].slice(1)}</span>: {o || <span className="text-danger">Sin asignar</span>}</li>}
                                    {!propertiesObject[i].includes("fecha") && propertiesObject[i] !== "id" && !propertiesObject[i].includes("id_") && <li key={o + i} className="color-aqua"><span className="color-blue">{propertiesObject[i].charAt(0).toUpperCase() + propertiesObject[i].slice(1)}</span>: {o}</li>}
                                </>
                        }
                        )}
                    </ul>
                    {show && props.name === "pacientes" && <ModalWithContent show={show} handleSave={handleEditPaciente} handleClose={handleClose} name={"paciente"} dataObject={myObject} />}
                    {show && props.name === "odontologos" && <ModalWithContent show={show} handleSave={handleEditOdontologo} handleClose={handleClose} name={"odontologo"} dataObject={myObject} />}
                    {show && props.name === "turnos" && <ModalEditTurno show={show} handleSave={handleEditTurno} handleClose={handleClose} name={"turno"} dataObject={myObject} />}
                </div>
                <div className="group_buttons">
                    <Button className="color_button item-gap" onClick={handleEdit}>Editar</Button>
                    <Button className="color_button " onClick={handleDelete}>Eliminar</Button>
                </div>
            </>
            }
        </>
    )
}