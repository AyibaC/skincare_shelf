import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Home from './pages/home/home.js'; 
import AddProduct from './pages/addProduct/addProduct.js';
import UpdateProduct from './pages/updateProduct/updateProduct';
import NotFound from './pages/notFound/notFound.js';
import { ProductProvider } from './contexts/productContext';
import { ToastProvider } from "react-toast-notifications";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
          faEdit, 
          faTrashAlt, 
          faClock, 
          faCalendarCheck,
          faStickyNote,
          faEyeDropper,
          faCog,
          faFlask,
          faLongArrowAltLeft
      } from '@fortawesome/free-solid-svg-icons';

library.add(
  faEdit, 
  faTrashAlt, 
  faClock, 
  faCalendarCheck,
  faStickyNote,
  faEyeDropper,
  faCog,
  faFlask,
  faLongArrowAltLeft
  );

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <ToastProvider autoDismiss={true}>
            <ProductProvider>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/add" component={AddProduct}/>
                <Route path="/:id" component={UpdateProduct}/>
                <Route path="*" component={NotFound} />
              </Switch>
            </ProductProvider>
          </ToastProvider>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
