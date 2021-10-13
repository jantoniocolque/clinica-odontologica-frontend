import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import postData from '../assets/js/postData';
export default function Login() {
    const history = useHistory();
    const handleSubmit = (e) => {
        const { email, password } = e.target;
        e.preventDefault();
        if (email.value === "" || password.value === "") {
            let errorAlert = '<strong class="text-danger">Debe completar algo en los campos</strong>'
            document.querySelector('.errors').innerHTML = errorAlert;;
        } else {
            const payload = {
                email: email.value,
                contrasenia: password.value
            }
            postData("https://api-clinica-odontologica.herokuapp.com/api/login", payload)
                .then(data => {
                    if (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                        if (data.tipo === "ADMINISTRADOR") {
                            window.location.assign("/turnos");
                        } else {

                            window.location.assign("/in/turnos");
                        }
                    }
                }).catch(error => {
                    let errorAlert = '<strong class="text-danger">Error en el usuario o contraseña</strong>'

                    document.querySelector('.errors').innerHTML = errorAlert;;
                })
        }

    }
    const handleRegister = () => {
        history.push("/registrarse");
    }
    return (
        <Form className="login" onSubmit={handleSubmit}>
            <h2 className="color-blue my-4">Bienvenido!</h2>
            <div className="errors text-danger">
            </div>
            <Form.Group className="mb-3">
                <Form.Label className="color-blue">Correo electronico</Form.Label>
                <Form.Control type="email" name="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="color-blue">Contraseña</Form.Label>
                <Form.Control type="password" name="password" placeholder="*************" />
            </Form.Group>
            <div className="group_buttons">
                <Button className="color_button" type="submit">Iniciar sesion</Button>
                <Button className="color_button mx-2" onClick={handleRegister}>Registrarse</Button>
            </div>
        </Form>
    )
}