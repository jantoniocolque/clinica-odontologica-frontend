import {Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import Modal from '../components/Modal/Index';
export default function Odontologo(){
    const [odontologos,setOdontologos] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const getData= ()=>{
        fetch('http://localhost:8081/api/odontologos')
        .then(response=>response.json())
        .then(data=>{
            setOdontologos(data);
            setIsLoading(false);
        });
    }

    useEffect(()=>{
        getData();
    },[])

    const handleDetail = (event)=>{
        history.push("/odontologos/"+event.target.attributes.value.value);
    }

    const handleSave = (event)=>{
        const {nombre,apellido,matricula} = event.target
        event.preventDefault();
        fetch("http://localhost:8081/api/odontologos",{
            method: "POST",
            body: JSON.stringify({
                nombre: nombre.value,
                apellido: apellido.value,
                matricula: matricula.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            getData();
            handleClose();
        })
    }

    return(
        <>
            {isLoading && <p>Esta cargando...</p>}
            {!isLoading && 
                <div className="body_lists">
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Matricula</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {odontologos.map(o =>{
                            return (
                                <tr key={o.id}>
                                    <td>{o.nombre}</td>
                                    <td>{o.apellido}</td>
                                    <td>{o.matricula}</td>
                                    <td><span onClick={handleDetail}><i value={o.id} class="fas fa-info-circle"></i></span></td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </Table>

                <Button size="md" onClick={handleShow} className="color_button d-block m-auto" active>
                    Nuevo odontologo
                </Button>

                {show && <Modal show={show} handleSave={handleSave} handleClose={handleClose} name="odontologo" dataObject={Object.keys(odontologos[0])}></Modal>}
                </div>
            }
        </>
    )
}