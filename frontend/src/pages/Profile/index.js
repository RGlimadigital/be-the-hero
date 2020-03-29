import React, { useState, useEffect } from 'react'
import './style.css'
import logoImage from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profiles', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (msg) {
            alert('Erro ao deletar um caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero" />
                <span>Bem vindo(a), {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}> <FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}
            </ul>

        </div>
    )
}
