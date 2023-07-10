import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from '../../components/Title'

import './dashboard.css'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../services/firebase";

import {format} from 'date-fns'

const listRef = collection(db, "chamados")

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)

    useEffect(()=> {
        async function loadChamados() {
            const q = query(listRef, orderBy('created', 'desc'), limit(5));

            const querySnapshot = await getDocs(q)

            setChamados([])
            updateState(querySnapshot)

            setLoading(false)
        }
        loadChamados()

        return () => { }
    },[])

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;

        if(!isCollectionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento,

                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            setLastDocs(lastDoc)

            setChamados(chamados => [...chamados, ...lista])
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }


    async function handleMore() {
        setLoadingMore(true)

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5));
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot);
    }



    if(loading) {
        return(
            <div>
                <Header/>

                <div className="content">
                    <Title name="Tickets ">
                            <FiMessageSquare size={25}/>
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Tickets ">
                        <FiMessageSquare size={25}/>
                </Title>

                
                    
                    
                        {
                            chamados.length === 0 ? (
                                <div className="container dashboard">
                                    <span>Nenhum chamdo encontrado...</span>
                                    <Link to={"/new"} className="new">
                                        <FiPlus color="#FFF" size={25}/>
                                        Novo chamado
                                    </Link>
                                </div>
                            ) : (
                                <>
                                <Link to={"/new"} className="new">
                                    <FiPlus color="#FFF" size={25}/>
                                    Novo chamado
                                </Link>

                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Assunto</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Cadastrando em</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            chamados.map((item, index)=> {
                                                return(
                                                <>
                                                    <tr key={index}>
                                                        <td data-aria-label="Cliente">{item.cliente}</td>
                                                        <td data-aria-label="Assunto">{item.assunto}</td>
                                                        <td data-aria-label="Status">
                                                            <span className="badge" style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td data-aria-label="Cadastrado">{item.createdFormat}</td>
                                                        <td data-aria-label="#">
                                                            <button className="action" style={{backgroundColor: '#3583f6'}}>
                                                                <FiSearch color="#FFF" size={17}/>
                                                            </button>
                                                            <button className="action" style={{backgroundColor: '#f6a935'}}>
                                                                <FiEdit2 color="#FFF" size={17}/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                
                                {loadingMore && <h3>Buscando mais Chamados...</h3>}    
                                {!loadingMore && !isEmpty && <button className="btn-more" onClick=      {handleMore}>Buscar mais</button>}
                                

                                </>
                            )
                        }


                
            </div>

        </div>
    )
}