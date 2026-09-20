import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
        Id_villes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
    };
  return (
    <div>
        <h1 className="align-center">Inscription</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange}/>
                <label htmlFor="prenom">Prenom :</label>
                <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pseudo">Pseudo :</label>
                <input type="text" id="pseudo" name="pseudo" value={formData.pseudo} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Adresse email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div> 
                <label htmlFor="Id_villes">Ville:</label>
                <input type="text" id="Id_villes" name="Id_villes" value={formData.Id_villes} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Mots de passe:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            </div>
            <button link="/ProfileImage" type="submit">Inscription</button>
        </form>
    </div>
  )
}

export default Register
