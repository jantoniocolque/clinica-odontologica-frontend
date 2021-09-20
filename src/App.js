import './components/Navbar/style.css';
import './components/Footer/style.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './pages/Inicio';
import Detalles from './pages/Detalles';
import Paciente from './pages/Paciente';
import Odontologico from './pages/Odontologico';
import Navbar from './components/Navbar/Index';
import Footer from './components/Footer/Index';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/pacientes" component={Paciente} />
            <Route  path="/pacientes/:id"><Detalles name="pacientes" /></Route>
            <Route exact path="/odontologos" component={Odontologico} />
            <Route  path="/odontologos/:id"><Detalles name="odontologos" /></Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
