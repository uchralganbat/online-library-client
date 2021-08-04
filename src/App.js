import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Settings from './Pages/Settings';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Context/auth';
import { AuthRoute, ProtectedRoute} from './Util/AuthRoute';
import Footer from './Components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <AuthRoute exact path='/home' component={Home} />
          <AuthRoute exact path='/settings' component={Settings} />
          <ProtectedRoute exact path='/' component={Login} />
          <ProtectedRoute exact path='/register' component={Register} />    
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
