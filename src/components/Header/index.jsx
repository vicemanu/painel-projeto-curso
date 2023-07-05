import './header.css'
import avatarImg from '../../assets/avatar.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'

export default function Header() {

    const { user } = useContext(AuthContext)

    return(
        <>
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto do usuario" />
            </div>

            <Link></Link>
        </>
    )
}