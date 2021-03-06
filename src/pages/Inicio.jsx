import { Carousel, Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function Home() {
    const [user, setUser] = useState("");
    useEffect(() => {
        let usuario = JSON.parse(localStorage.getItem("user"));
        if (usuario !== null) {
            setUser(usuario);
        }
    }, [])
    return (
        <div className="home">
            <Carousel variant="dark" className="my-1">
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={require("../assets/img/carousel_one.jpg").default}
                        alt="First slide"
                    />
                    <Carousel.Caption >
                        <h3 className="text-white">Clinicas</h3>
                        <p className="text-white">Contamos con la mas alta tecnologia y herramientas sanitizadas para dar el mejor servicio</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={require("../assets/img/carousel_two.jpg").default}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5 className="text-white">Clinicas</h5>
                        <p className="text-white">Contamos con la mas alta tecnologia y herramientas sanitizadas para dar el mejor servicio</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={require("../assets/img/carousel_three.jpg").default}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5 className="text-white">Clinicas</h5>
                        <p className="text-white">Contamos con la mas alta tecnologia y herramientas sanitizadas para dar el mejor servicio</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <h2 className="text-white">Servicios impartidos</h2>
            <div className="d-flex cards">
                <Col>
                    <Card
                        key='1'
                        text='white'
                        style={{ width: '18rem' }}
                        className="mb-2 m-auto"
                    >
                        <Card.Header>Implantes dentales</Card.Header>
                        <Card.Body>
                            <Card.Title><img src={require("../assets/img/implante.jpg").default} width="135px" height="135px" alt="imagen de implante"></img></Card.Title>
                            <Card.Text>
                                Los implantes dentales son sustitutos artificiales de las ra??ces de los dientes naturales. Est??n hechos de titanio, un metal altamente compatible con el cuerpo humano y que no causa da??o en el organismo.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        key='1'
                        text='white'
                        style={{ width: '18rem' }}
                        className="mb-2 m-auto"
                    >
                        <Card.Header>Blanqueamiento dental</Card.Header>
                        <Card.Body>
                            <Card.Title><img src={require("../assets/img/blaqueamiento.jpg").default} width="135px" height="135px" alt="imagen de blanqueamiento"></img></Card.Title>
                            <Card.Text>
                                Las t??cnicas de blanqueamiento dental, encuadradas dentro de la Odontolog??a Est??tica, constituyen actualmente uno de los recursos con mejores expectativas dentro de los tratamientos est??ticos sencillos y conservadores.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        key='1'
                        text='white'
                        style={{ width: '18rem' }}
                        className="mb-2 m-auto"
                    >
                        <Card.Header>Endodoncia</Card.Header>
                        <Card.Body>
                            <Card.Title><img src={require("../assets/img/endodoncia.jpg").default} width="135px" height="135px" alt="imagen de endodoncia"></img></Card.Title>
                            <Card.Text>
                                La endodoncia o tratamiento de conducto se realiza cuando por alguna causa el nervio de la pieza dentaria ha sido afectado, puede se por un fractura o caries penetrante.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        key='1'
                        text='white'
                        style={{ width: '18rem' }}
                        className="mb-2 m-auto"
                    >
                        <Card.Header>Odontopediatria</Card.Header>
                        <Card.Body>
                            <Card.Title><img src={require("../assets/img/odontopediatria.jpg").default} width="135px" height="135px" alt="imagen de odontopediatria"></img></Card.Title>
                            <Card.Text>
                                Las visitas regulares al odont??logo durante la infancia (odontopediatr??a) han de comenzar desde que el ni??o tiene dos a??os incluso antes, no solo las posibles caries deben ser detectadas sino tambien los posibles trastornos en el crecimiento de los maxilares y la erupcion de los dientes.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            <br />
            <Button className="color_button" type="submit" size="lg"><Link to={user !== "" ? user.tipo === "ADMINISTRADOR" ? "turnos" : "/in/turnos" : "/login"} className="text-white">Pedir turno</Link></Button>
            <div className="info-turnos my-5">
                <p className="text-white">En Antares, somos un grupo de profesionales que desea poner a su disposici??n la m??s alta tecnolog??a en equipos, instrumental, bioseguridad y materiales de ??ltima generaci??n para garantizar su satisfacci??n a trav??s de su salud dental y la belleza de su sonrisa. Contamos con profesionales altamente capacitados con una formaci??n continua en los avances de la odontolog??a moderna para brindarles trabajos est??ticos odontol??gicos de excelencia. La mayor tecnolog??a en implantes dentales, blanqueamiento dental, ESTETICA dental, ortodoncia, en Buenos Aires y La Plata.</p>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}