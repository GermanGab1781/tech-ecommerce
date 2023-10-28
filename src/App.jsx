import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContextProvider } from './firebase';

function App() {
  return (
    <div className=''>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-screen py-16 px-16'><AnimatedRoutes /></div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
