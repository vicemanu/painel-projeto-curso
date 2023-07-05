import './App.css'
import RoutesApp from './Routes'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function App() {

  return (
    <>
    <AuthProvider>
      <ToastContainer autoClose={3000}/>
          <RoutesApp/>
    </AuthProvider>
    </>
  )
}


