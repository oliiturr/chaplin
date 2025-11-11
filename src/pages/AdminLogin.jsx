import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'


export default function AdminLogin(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()


const handleSubmit = async (e)=>{
e.preventDefault()
setError(null)
try{
await signInWithEmailAndPassword(auth, email, password)
navigate('/admin/dashboard')
}catch(err){
console.error(err)
setError('Credenciales inválidas')
}
}


return (
<div className="max-w-md mx-auto card-chaplin rounded-2xl p-6">
<h2 className="text-2xl font-semibold mb-4">Ingreso Admin</h2>
<form onSubmit={handleSubmit} className="flex flex-col gap-3">
<input className="p-3 rounded-md bg-transparent border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="p-3 rounded-md bg-transparent border" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
{error && <div className="text-red-400">{error}</div>}
<button className="btn-chaplin mt-2">Ingresar</button>
</form>
</div>
)
}