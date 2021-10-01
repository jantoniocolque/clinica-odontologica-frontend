import {Modal, Form, Row,Col, Button} from 'react-bootstrap';
import {useState} from 'react';
export default function MyModal(props){
    const [show] = useState(props.show);
    
    const handleClose = () => props.handleClose();

    return(
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={props.handleSave}>
            <Modal.Header  closeButton>
                <Modal.Title className="color-blue">Nuevo {props.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <>
                {props.dataObject.map(object=>{
                    return (object.includes("fecha")? 
                            <>
                                <Row>
                                    <Form.Label column lg={2}>
                                        <b className="text-white">{object.charAt(0).toUpperCase()+ object.slice(1)}</b>
                                    </Form.Label>
                                    <Col>
                                        <Form.Control name={object} type="date"/>
                                    </Col>
                                </Row>
                                <br />
                            </>
                            :
                            <>
                                {object !== "id" &&
                                    <>
                                        <Row>
                                            <Form.Label column lg={2}>
                                                <b className="text-white">{object.charAt(0).toUpperCase()+ object.slice(1)}</b>
                                            </Form.Label>
                                            <Col>
                                                <Form.Control name={object === "contraseña"? "contrasenia": object} type={object ==="contraseña"? "password": "text"}/>
                                            </Col>
                                        </Row>
                                        <br />
                                    </>
                                }
                            </>
                    )
                })}
                {props.dataDomicilio && props.dataDomicilio.map(o=>{
                    return(
                        o !== "id" &&
                        <>
                        <Row>
                            <Form.Label column lg={2}>
                                <b className="text-white">{o.charAt(0).toUpperCase()+ o.slice(1)}</b>
                            </Form.Label>
                            <Col>
                                <Form.Control name={o} type="text"/>
                            </Col>
                        </Row>
                        <br />
                        </>
                    )
                })}
            </>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button className="color_button" type="submit">Aceptar</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}