import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import avatar from '../../assets/avatar.png'
import './profile.css'


export default function Profile() {


    const { user } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Minha conta"> 
                    <FiSettings size={25}/>
                </Title>


                <div className="container">

                    <form className="form-profile">
                        <label className="label-avatar">
                            <span htmlFor="">
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input type="file" accept="image/*" /><br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                            ): (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                            )}
                        </label>

                        <label htmlFor="Nome">Nome</label>
                        <input type="text" id="Nome" placeholder="Seu nome" />

                        <label htmlFor="">Email</label>
                        <input type="text" id="" placeholder="Teste@tesete.com" disabled={true} />

                        <button type="submit">Salvar</button>

                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn">Sair</button>
                </div>
            </div>
        </div>
    )
}