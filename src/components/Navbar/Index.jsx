import logo from '../../Antares-clinica.png';
import {Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';
export default function Index(){

    return(
            <Navbar collapseOnSelect fixed='top' expand='sm' variant='light'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Brand><Link to="/"><img src={logo} className="App-logo" alt="logo"/></Link></Navbar.Brand>
                    <Navbar.Collapse id='responsive-navbar-nav' >
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/pacientes"><b>Pacientes</b></Link></Nav.Link>
                            <Nav.Link><Link to="/odontologos"><b>Odontologos</b></Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}