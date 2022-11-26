import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Subjekti} from './Subjekti';
import {Kandidati} from './Kandidati';
import {Shteti} from './Shteti';
import { Qyteti } from './Qyteti';
import { ZipCode } from './ZipCode';
import { Votuesi } from './Votuesi';
import { Administratori } from './Administratori';
import { Edukimi } from './Edukimi';
import { Banka } from './Banka';
import { Komisioneri } from './Komisioneri';
import { Vendvotimi } from './Vendvotimi';
import { KategoriaVecante } from './KategoriaVecante';
import { NumriKandidatit } from './NumriKandidatit';
import { Qendravotimi } from './Qendravotimi';
import { RegjistrimiMediave } from './RegjistrimiMediave';
import {BrowserRouter, Route,Routes, NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        E Voting CRUD
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/subjekti">
              Subjekti
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/kandidati">
              Kandidati
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/shteti">
              Shteti
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/qyteti">
              Qyteti
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/zipcode">
              Zip Kodi
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/votuesi">
              Votuesi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/administratori">
              Administratori
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/edukimi">
              Edukimi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/banka">
              Banka
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/komisioneri">
              Komisioneri
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/vendvotimi">
              Vendvotimi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/kategoriavecante">
              Kategoria Vecante
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/numrikandidatit">
              Numri Kandidatit
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/qendravotimi">
              Qendra Votimit
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/regjistrimimediave">
              Regjistrimi Mediave
            </NavLink>
          </li>
        </ul>


      </nav>
             
      
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/subjekti" element={<Subjekti />} />
        <Route path="/kandidati" element={<Kandidati />} />
        <Route path="/shteti" element={<Shteti />} />
        <Route path="/qyteti" element={<Qyteti />} />
        <Route path="/zipcode" element={<ZipCode />} />
        <Route path="/votuesi" element={<Votuesi />} />
        <Route path="/administratori" element={<Administratori />} />
        <Route path="/edukimi" element={<Edukimi />} />
        <Route path="/banka" element={<Banka />} />
        <Route path="/komisioneri" element={<Komisioneri />} />
        <Route path="/vendvotimi" element={<Vendvotimi />} />
        <Route path="/kategoriavecante" element={<KategoriaVecante />} />
        <Route path="/numrikandidatit" element={<NumriKandidatit />} />
        <Route path="/qendravotimi" element={<Qendravotimi />} />
        <Route path="/regjistrimimediave" element={<RegjistrimiMediave />} />
        </Routes>
        
    </div>
    </BrowserRouter>
  );
}

export default App;