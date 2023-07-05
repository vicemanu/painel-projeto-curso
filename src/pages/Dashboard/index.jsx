import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/Header";

export default function Dashboard() {

    const { logout } = useContext(AuthContext)

    async function handleLougout() {
        await logout();
    }

    return(
        <div>
            <Header/>
            pagina deshboard
            <button onClick={handleLougout}>Sair da conta</button>
        </div>
    )
}