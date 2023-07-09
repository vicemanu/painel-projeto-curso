import './new.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { list } from 'firebase/storage'
import { toast } from 'react-toastify'


const listRef = collection(db, "customers")


export default function New() {

    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customersSelected, setCustomersSelected] = useState(0)

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')

    useEffect(()=> {
        async function loalCustomers() {
            const querySnapshot = await getDocs(listRef)
            .then((snapshot)=> {
                let lista = []

                snapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })


                if(snapshot.docs.size === 0) {
                    setCustomers([{id: '1', nomeFantasia: 'FREELA'}])
                    setLoadCustomers(false)
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false)
            })
            .catch(error => {
                console.log(error)
                setLoadCustomers(false);
                setCustomers([{id: '1', nomeFantasia: 'FREELA'}])
            })
        }
        loalCustomers()
    },[])




    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value  )
    }

    function handleChangeCustomer(e) {
        setCustomersSelected(e.target.value)
    }

   async function handleRegister(e) {
        e.preventDefault()

        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customersSelected].nomeFantasia,
            clienteId: customers[customersSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then( () => {
            toast.success("Chamado registrado")
            setComplemento('')
            setCustomersSelected(0)
        }
            
        )
        .catch(error => {
            console.log(error)
            toast.error("ops erro ao registrar")
        })
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form onSubmit={handleRegister} className="form-profile">

                        <label htmlFor="">Clientes</label>
                        {
                            loadCustomers ? (
                                <input type='text' disabled={true} value={"Carregando..."} />
                            ) : (
                                <select value={customersSelected} onChange={handleChangeCustomer}>
                                    {
                                        customers.map((item, index) => {
                                            return(
                                                <option key={index} value={index}>
                                                    {item.nomeFantasia}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            )
                        }


                        <label htmlFor="">Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect} name="" id="">
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