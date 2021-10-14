import { Form, Button, Col } from 'react-bootstrap';

export default function Contacto() {
    return (<>
        <h2 className="color-blue">Contacto</h2>
        <div className="d-flex justify-content-center align-items-center contact">

            <Col>
                <p className="color-blue">Como llegar</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.0015409020157!2d-58.42940568417558!3d-34.57882756368979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM0JzQzLjgiUyA1OMKwMjUnMzguMCJX!5e0!3m2!1ses-419!2sar!4v1632954049892!5m2!1ses-419!2sar" width="500px" height="350px" allowfullscreen="" loading="lazy"></iframe>
            </Col>
            <Col>
                <Form className="mx-5 color-blue">
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombre y apellido</Form.Label>
                        <Form.Control type="text" placeholder="Homer simpsons" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Consultas</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Quiero realizar un tratamiento" />
                    </Form.Group>
                    <Button className="color_button" type="submit">Enviar</Button>
                </Form>
            </Col>
            <Col className="text-start contact-info">
                <p className="color-blue"><i class="fas fa-home"></i>Sede Palermo: Av. Siempre viva 123</p>
                <p className="color-blue"><i class="fas fa-phone"></i>(+54) 11 4844-4444</p>
                <p className="color-blue"><i class="fab fa-whatsapp"></i>+54911010101</p>
            </Col>
        </div>
    </>
    )
}