import {Modal, Form, Row,Col, Button} from 'react-bootstrap';
import {useState} from 'react';
export default function MyModalWithContent(props){
    const [show] = useState(props.show);
    
    const handleClose = () => props.handleClose();

    return(
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={props.handleSave}>
            <Modal.Header closeButton>
                <Modal.Title className="color-blue">Nuevo {props.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <>
                {Object.values(props.dataObject).map((object,i) =>{
                    const propertiesObject = Object.keys(props.dataObject);
                    return (propertiesObject[i].includes("fecha")? 
                        <>
                            <Row key={object+i}>
                                <Form.Label column lg={2}>
                                    <b className="text-white">{propertiesObject[i].charAt(0).toUpperCase()+ propertiesObject[i].slice(1)}</b>
                                </Form.Label>
                                <Col>
                                    <Form.Control name={propertiesObject[i]} type="date" defaultValue={object}/>
                                </Col>
                            </Row>
                            <br />
                        </>
                        :
                        <>
                            {propertiesObject[i] !== "id" && !propertiesObject[i].includes("id_") &&
                                <>
                                    <Row key={object+i+"fila"}>
                                        <Form.Label column lg={2} key={object+i+"label"}>
                                            <b className="text-white">{propertiesObject[i].charAt(0).toUpperCase()+ propertiesObject[i].slice(1)}</b>
                                        </Form.Label>
                                        <Col>
                                            <Form.Control key={object+i+"input"} name={propertiesObject[i]} type="text" defaultValue={object}/>
                                        </Col>
                                    </Row>
                                    <br />
                                </>
                            }
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