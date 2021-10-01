import logo from '../../Antares-clinica.png';
import {Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { useState,useEffect} from 'react';
export default function Index(){
    const [user,setUser] = useState("");
    
    useEffect(()=>{
        const data = localStorage.getItem("user");
        if(data){
            setUser(JSON.parse(data))
        }
        
    },[])
    const handleLogout =()=>{
        localStorage.clear();
        window.location.assign("/");
    }
    return(
            <Navbar collapseOnSelect fixed='top' expand='sm' variant='light'>
                <Container className="links">
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Brand><Link to="/"><img src={logo} className="App-logo" alt="logo"/></Link></Navbar.Brand>
                    <Navbar.Collapse id='responsive-navbar-nav' >
                        <Nav className="mr-auto">
                            {user?.tipo === "ADMINISTRADOR"?
                                <>
                                    <Nav.Link><Link to="/turnos"><b>Turnos</b></Link></Nav.Link>
                                    <Nav.Link><Link to="/pacientes"><b>Pacientes</b></Link></Nav.Link>
                                    <Nav.Link><Link to="/odontologos"><b>Odontologos</b></Link></Nav.Link>
                                </>
                                :
                                user?.tipo === "INVITADO" &&  <Nav.Link><Link to="/in/turnos"><b>Turnos</b></Link></Nav.Link>
                                   
                            }
                            <Nav.Link><Link to="/contacto"><b>Contacto</b></Link></Nav.Link>
                            {user !== ""?
                                <a onClick={handleLogout} className="d-md-none"><b>Cerrar sesion</b></a>
                                :
                                <>
                                    <Nav.Link><Link className="d-md-none" to="/login"><span><i className="fas fa-user"></i></span>    <b>Iniciar sesion</b></Link></Nav.Link>
                                    <Nav.Link><Link className="d-md-none" to="/registrarse"><span><i className="fas fa-clipboard-list"></i>    </span><b>Registrarse</b></Link></Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Container className="d-md-block loginRegister">
                    <span className="color-blue">{user!==""?  
                        <>
                            {user?.tipo === "ADMINISTRADOR" && <h4 className="color-blue d-inline mx-4">Hola ADMIN</h4>}
                            <a onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> </a>
                        </>
                        : 
                        <>
                            <Link to="/login"><span className="color-blue"><i className="far fa-user-circle"></i></span></Link>     |        <Link to="/registrarse"><span className="color-blue"><i className="fas fa-clipboard-list"></i></span></Link>
                        </>
                    }</span>
                </Container>
            </Navbar>
    )
}