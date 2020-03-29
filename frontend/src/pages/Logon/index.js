import React, { useState } from 'react'
import './style.css'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'
import api from '../../services/api'

export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {

            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')

        } catch (err) {
            alert('Falha no Login, tente novamente')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be The Heroe" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon:</h1>
                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Sua ID..." />
                    <button type="submit" className="button">Entrar</button>
                    <Link to="/register">
                        <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes" />
        </div>
    )
}