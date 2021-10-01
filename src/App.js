import './components/Navbar/style.css';
import './components/Footer/style.css';
import './components/Modal/style.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './pages/Inicio';
import Turno from './pages/Turno';
import Login from './pages/Login';
import Registro from './pages/Registrarse';
import Detalles from './pages/Detalles';
import Paciente from './pages/Paciente';
import Odontologico from './pages/Odontologo';
import Navbar from './components/Navbar/Index';
import Footer from './components/Footer/Index';
import Notfound from './pages/NotFound';
import Contacto from './pages/Contacto';
import TurnoUsuario from './pages/TurnoUsuario';

function App() {
  return (<>
    {
      localStorage.getItem("user")?
        <Router>
          <Navbar />
          <main>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
            <Switch>
              <Route exact path="/" component={Inicio} />
              <Route path="/login" component={Login} />
              <Route path="/registrarse" component={Registro} />
              <Route exact path="/pacientes" component={Paciente} />
              <Route  path="/pacientes/:id"><Detalles name="pacientes" /></Route>
              <Route exact path="/odontologos" component={Odontologico} />
              <Route  path="/odontologos/:id"><Detalles name="odontologos" /></Route>
              <Route exact path="/turnos" component={Turno} />
              <Route path="/in/turnos" component={TurnoUsuario} />
              <Route path="/turnos/:id"><Detalles name="turnos" /></Route>
              <Route path="/contacto" component={Contacto} />
              <Route component={Notfound} />
            </Switch>
          </main>
          <Footer />
        </Router>
        :
        <Router>
          <Navbar />
          <main>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
                <Switch>
                  <Route exact path="/" component={Inicio} />
                  <Route path="/login" component={Login} />
                  <Route path="/registrarse" component={Registro} />
                  <Route path="/contacto" component={Contacto} />
                  <Route component={Notfound} />
                </Switch>
          </main>
          <Footer />
        </Router>
    }</>
  );
}

export default App;
