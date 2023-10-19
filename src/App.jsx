import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContextProvider } from './firebase';

function App() {
  return (
    <div >
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
