import {Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Modal from '../components/Modal/Index';
import save from '../assets/js/pacienteSave';
export default function Paciente(){
    const history = useHistory();
    const [pacientes,setPacientes] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData= ()=>{
        fetch('http://localhost:8081/api/pacientes')
            .then(response=>response.json())
            .then(data=>{
                setPacientes(data);
                setIsLoading(false);
        });
    }

    useEffect(()=>{
        getData();
    },[])

    const handleDetail = (event)=>{
        history.push("/pacientes/"+event.target.attributes.value.value);
    }

    const handleSave = (event)=>{
        const {nombre,apellido,dni,fechaIngreso,calle,numero,localidad,provincia} = event.target
        event.preventDefault();
        save(nombre.value,apellido.value,dni.value,fechaIngreso.value,calle.value,numero.value,localidad.value,provincia.value)
        .then(data=>{       
            getData();
            handleClose(); 
        });
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
                            <th>Fecha de ingreso</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map(p =>{
                            let date = p.fechaIngreso.substring(0, 10);
                            return (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.apellido}</td>
                                    <td>{date}</td>
                                    <td><span onClick={handleDetail}><i value={p.id} class="fas fa-info-circle"></i></span></td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </Table>

                <Button size="md" onClick={handleShow} className="color_button d-block m-auto" active>
                    Nuevo paciente
                </Button>
                {show && <Modal show={show} handleSave={handleSave} handleClose={handleClose} name="paciente" dataObject={Object.keys(pacientes[0])} dataDomicilio={Object.keys(pacientes[0].domicilio)}></Modal>}
                </div>
            }
        </>
    )
}