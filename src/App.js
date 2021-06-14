import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.js'; 
import AddProduct from './pages/addProduct/addProduct.js';
import NotFound from './pages/notFound/notFound.js';
import { ProductProvider } from './contexts/productContext';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="App">
      <Router>
      <ToastProvider autoDismiss={true}>
          <ProductProvider>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path="/add" component={AddProduct}/>
              <Route path="*" component={NotFound} />
            </Switch>
          </ProductProvider>
        </ToastProvider>
      </Router>
    </div>
  );
}

export default App;
