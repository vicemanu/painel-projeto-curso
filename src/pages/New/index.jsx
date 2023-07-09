import './new.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { useState } from 'react'

export default function New() {

    const [customers, setCustomers] = useState([])

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')


    function handleOptionChange(e) {
        setStatus(e.target.value)
    }




    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">

                        <label htmlFor="">Clientes</label>
                        <select name="" id="">
                            <option value="1">Mercado teste</option>
                            <option value="2">Mercado teste 2</option>
                        </select>

                        <label htmlFor="">Assunto</label>
                        <select name="" id="">
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label htmlFor="">Status</label>
                        <div className='status'>
                            <label>
                                <input
                                type="radio"
                                name='radio'
                                value={'Aberto'}
                                onChange={handleOptionChange}
                                checked={ status === 'Aberto'}
                                />
                                Em aberto
                            </label>

                            <label>
                                <input
                                type="radio"
                                name='radio'
                                value={'Progresso'}
                                onChange={handleOptionChange}
                                checked={ status === 'Progresso'}

                                />
                                Progresso
                            </label>

                            <label>
                                <input
                                type="radio"
                                name='radio'
                                value={'Atendido'}
                                onChange={handleOptionChange}
                                checked={ status === 'Atendido'}

                                />
                                Atendido
                            </label>                      
                        
                        </div>


                        <label htmlFor="">Complemento</label>
                        <textarea 
                            type="text"
                            placeholder='Descreva seu problema (opcional)'
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        />
                        
                        <button type='submit'>Registrar</button>


                    </form>
                </div>
            </div>
        </div>
    )
}