import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import avatar from '../../assets/avatar.png'
import './profile.css'


export default function Profile() {


    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const [nome, setNome] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];


            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                alert("envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
            }
        }
    }

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

                            <input type="file" accept="image/*" onChange={handleFile} /><br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                            ): (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                            )}
                        </label>

                        <label htmlFor="Nome">Nome</label>
                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} id="Nome" placeholder="Seu nome" />

                        <label htmlFor="">Email</label>
                        <input type="text" id="" value={email} disabled={true} />

                        <button type="submit">Salvar</button>

                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={e => logout()}>Sair</button>
                </div>
            </div>
        </div>
    )
}