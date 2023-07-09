import Header from "../../components/Header";
import Title from '../../components/Title'

import './dashboard.css'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Dashboard() {

    return(
        <div>
            <Header/>

            <div className="content">
                <Title nome="Tickets ">
                        <FiMessageSquare size={25}/>
                </Title>

                <>
                    <Link to={"/new"} className="new">
                        <FiPlus color="#FFF" size={25}/>
                        Novo chamado
                    </Link>
                    {/* className="container dashboard" */}
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
                        <tr>
                            <td data-aria-label="Cliente">mecardo de esquina</td>
                            <td data-aria-label="Assunto">mecardo de esquina</td>
                            <td data-aria-label="Status">
                                <span className="badge" style={{backgroundColor: "#999"}}>
                                    Em aberto
                                </span>
                            </td>
                            <td data-aria-label="Cadastrado">mecardo de esquina</td>
                            <td data-aria-label="#">
                                <button className="action" style={{backgroundColor: '#3583f6'}}>
                                    <FiSearch color="#FFF" size={17}/>
                                </button>
                                <button className="action" style={{backgroundColor: '#f6a935'}}>
                                    <FiEdit2 color="#FFF" size={17}/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </>
            </div>

        </div>
    )
}