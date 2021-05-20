import { Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';

function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
        <NavbarBrand href="/">
          Ristorente con Fusion
        </NavbarBrand>
        </div>
      </Navbar>
      <Menu></Menu>
    </div>
  );
}

export default App;
