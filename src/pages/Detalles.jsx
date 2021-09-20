import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ModalWithContent from '../components/ModalWithContent/Index';
import editPaciente from '../assets/js/pacienteEdit';
import editOdontologo from '../assets/js/odontologoEdit';
import deleteElement from '../assets/js/delete';

export default function Detalle(props){
    const history=useHistory();
    const {id} = useParams();
    const [myObject,setMyObject] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const getData=()=>{
        fetch("http://localhost:8081/api/"+props.name+"/"+id)
            .then(response=>response.json())
            .then(data=>{
                setMyObject(data);
                setIsLoading(false);
            })
    }
    useEffect(()=>{
        getData();
    },[])
    
    const handleEdit = ()=>{
        setShow(true);
    }
    
    const handleDelete = ()=>{
        deleteElement(id,props.name).then(data=>{
            console.log(data);
            history.goBack();
        })
    }

    const handleEditPaciente = (event)=>{
        const {nombre,apellido,dni,fechaIngreso,calle,numero,localidad,provincia} = event.target
        event.preventDefault();
        editPaciente(id,nombre.value,apellido.value,dni.value,fechaIngreso.value,myObject.domicilio.id,calle.value,numero.value,localidad.value,provincia.value)
        .then(data=>{       
            getData();
            handleClose(); 
        });
    }

    const handleEditOdontologo = (event)=>{
        const {nombre,apellido,matricula} = event.target
        event.preventDefault();
        editOdontologo(id,nombre.value,apellido.value,matricula.value)
        .then(data=>{       
            getData();
            handleClose(); 
        });
    }

    return(
        <>
            {isLoading && <h2>Cargando...</h2>}
            {!isLoading && 
                <div className="body_lists">
                    <img src={require(`../assets/img/${props.name}.jpg`).default} alt="imagen de clinica" className="imgInfo"/>
                    <ul>
                        {Object.values(myObject).map((o,i)=>{
                            const propertiesObject = Object.keys(myObject);
                            return ((typeof o) =="object")? 
                                    Object.values(o).map((_o,j)=>{
                                        const propertiesObjectOfObject = Object.keys(myObject[propertiesObject[i]]);
                                        return propertiesObjectOfObject[j] !== "id" && <li key={_o+j}>{propertiesObjectOfObject[j].charAt(0).toUpperCase()+ propertiesObjectOfObject[j].slice(1)}: {_o}</li>
                                            
                                    }) 
                                : 
                                <>
                                    {propertiesObject[i].includes("fecha") && <li key={o+i}>Fecha de ingreso: {o.substring(0, 10)}</li>}
                                    {!propertiesObject[i].includes("fecha") && propertiesObject[i] !== "id" && <li key={o+i}>{propertiesObject[i].charAt(0).toUpperCase()+propertiesObject[i].slice(1)}: {o}</li>}
                                </>
                        })}
                    </ul>
                    <div>
                        <Button className="color_button hidden-item item-gap" onClick={handleEdit}>Editar</Button>
                        <Button className="color_button hidden-item" onClick={handleDelete}>Eliminar</Button>
                        <span><i className="fas fa-trash-alt show-item "></i></span>
                        <span><i className="fas fa-edit show-item"></i></span>
                    </div>
                    {show && props.name==="pacientes" && <ModalWithContent show={show} handleSave={handleEditPaciente} handleClose={handleClose} name={props.name} dataObject={myObject}/>}
                    {show && props.name==="odontologos" && <ModalWithContent show={show} handleSave={handleEditOdontologo} handleClose={handleClose} name={props.name} dataObject={myObject}/>}
                </div>
            }
        </>
    )
}