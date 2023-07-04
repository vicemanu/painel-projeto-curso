import "./signup.css"
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault();

        if(name!= "" && email != "" && password!= "") {
            ""
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="logo do sistema de chamados" />
                </div>
                <form onSubmit={handleSubmit} >
                    <h1>Register</h1>

                    <input 
                    type="text" 
                    placeholder='digite seu nome' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />

                    <input 
                    type="text" 
                    placeholder='email@email.com' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                    type="password" 
                    placeholder='**********' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit">Acessar</button>
                </form>

                <Link to="/">Já possui uma conta? faça login</Link>
            </div>
        </div>
    )
}