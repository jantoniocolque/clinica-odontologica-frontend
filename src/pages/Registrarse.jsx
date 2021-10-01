import {Form,Button} from 'react-bootstrap';
import postData from '../assets/js/postData';
export default function Registro(){
    const handleSubmit=(e)=>{
        const  {nombre,apellido,dni,email,emailRepeat,password,calle,numero,localidad,provincia}= e.target;
        const payload = {
            nombre: nombre.value,
            apellido: apellido.value,
            dni: dni.value,
            email:email.value,
            contrasenia:password.value,
            fechaAlta:null,
            calle:calle.value,
            numero:numero.value,
            localidad:localidad.value,
            provincia:provincia.value

        }
        e.preventDefault();
        if(email.value === emailRepeat.value){
            postData("http://localhost:8081/api/register",payload)
            .then(data=>{
                localStorage.setItem("user",JSON.stringify(data))
                window.location.assign("/in/turnos");
            });
        }
    }
    return(
        <Form className="register" onSubmit={handleSubmit}>
            <h2 className="color-blue my-4">Crear usuario</h2>
            <Form.Group className="mb-1 row justify-content-evenly" >
                <Form.Control className="form-control-row" type="text" name="nombre" placeholder="Nombre"/>
                <Form.Control className="form-control-row" type="text" name="apellido" placeholder="Apellido" />
            </Form.Group>
            <Form.Group className="mb-1 row justify-content-evenly" >
                <Form.Control className="form-control-row" type="text" name="dni" placeholder="DNI" />
                <Form.Control className="form-control-row" type="email" name="email" placeholder="Correo electronico" required/>
            </Form.Group>
            <Form.Group className="mb-1 row justify-content-evenly" >
                <Form.Control className="form-control-row" type="email" name="emailRepeat" placeholder="Repita su email" required/>
                <Form.Control className="form-control-row" type="password" name="password" placeholder="Contraseña" required/>
            </Form.Group>
            <h5 className="color-blue">Domicilio</h5>
            <Form.Group className="mb-1 row">
                <Form.Control className="form-control-row" type="text" name="calle" placeholder="Calle" />
                <Form.Control className="form-control-row" type="text" name="numero" placeholder="Numero" />
            </Form.Group>
            <Form.Group className="mb-1 row" >
                <Form.Control className="form-control-row" type="text" name="localidad" placeholder="Localidad" />
                <Form.Control className="form-control-row" type="text" name="provincia" placeholder="Provincia" />
            </Form.Group>
            <div className="group_buttons my-4">
                <Button className="color_button" type="submit">Registrarse</Button>
            </div>
        </Form>
    )
}