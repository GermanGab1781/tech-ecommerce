import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContextProvider } from './firebase';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
function App() {
  return (
    <div className=''>
      <AuthContextProvider>
        <ShoppingCartProvider>
          <BrowserRouter>
            <Navbar />
            <div className='min-h-screen bg-white py-16'><AnimatedRoutes /></div>
            <Footer />
          </BrowserRouter>
        </ShoppingCartProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
