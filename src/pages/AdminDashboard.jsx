import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase.config'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    mainCategory: '',
    subCategory: ''
  })

  // 🔥 Cargar productos desde Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      mainCategory: '',
      subCategory: ''
    })
    setOpenModal(true)
  }

  const openEdit = p => {
    setEditing(p)
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl || '',
      mainCategory: p.mainCategory || '',
      subCategory: p.subCategory || ''
    })
    setOpenModal(true)
  }

  // 📸 Subir imagen a Cloudinary
  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'chaplin')
    data.append('cloud_name', 'dxpycsyjw')

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dxpycsyjw/image/upload`,
        data
      )
      setForm(prev => ({ ...prev, imageUrl: res.data.secure_url }))
    } catch (err) {
      console.error('Error subiendo imagen:', err)
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async e => {
    e.preventDefault()
    try {
      if (editing) {
        const ref = doc(db, 'products', editing.id)
        await updateDoc(ref, { ...form })
      } else {
        await addDoc(collection(db, 'products'), {
          ...form,
          createdAt: serverTimestamp()
        })
      }
      setOpenModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async id => {
    if (!confirm('¿Eliminar producto?')) return
    try {
      await deleteDoc(doc(db, 'products', id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-6 text-[var(--chaplin-cream)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--chaplin-accent)]">
          Admin Dashboard
        </h2>
        <button
          className="btn-chaplin w-full sm:w-auto"
          onClick={openCreate}
        >
          Nuevo producto
        </button>
      </div>

      {/* Tabla responsive */}
      <div className="overflow-x-auto card-chaplin rounded-xl p-4 shadow-md">
        <table className="w-full text-left min-w-[600px]">
          <thead className="text-[var(--chaplin-accent)] border-b border-[rgba(196,159,47,0.2)]">
            <tr>
              <th className="py-2">Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr
                key={p.id}
                className="border-t border-[rgba(196,159,47,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition"
              >
                <td className="py-3">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">Sin imagen</span>
                  )}
                </td>
                <td>{p.name}</td>
                <td className="max-w-[200px] truncate">{p.description}</td>
                <td>${p.price}</td>
                <td>
                  <span className="capitalize">{p.mainCategory}</span>
                  {p.subCategory && (
                    <span className="text-sm opacity-70 block">
                      {p.subCategory}
                    </span>
                  )}
                </td>
                <td className="flex flex-wrap gap-2 py-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-3 py-1 rounded-md border border-[rgba(196,159,47,0.3)] hover:bg-[rgba(196,159,47,0.1)]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 rounded-md border border-red-400 hover:bg-red-500 hover:text-black transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No hay productos aún.
          </p>
        )}
      </div>

      {/* Modal de crear/editar */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editing ? 'Editar producto' : 'Nuevo producto'}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            className="p-3 rounded-md bg-transparent border"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <textarea
            className="p-3 rounded-md bg-transparent border"
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            className="p-3 rounded-md bg-transparent border"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            required
          />

          {/* Categoría */}
          <div>
            <label className="block mb-1 text-sm opacity-80">
              Categoría principal
            </label>
            <select
              className="p-3 rounded-md bg-transparent border w-full"
              value={form.mainCategory}
              onChange={e =>
                setForm({
                  ...form,
                  mainCategory: e.target.value,
                  subCategory: ''
                })
              }
              required
            >
              <option value="">Seleccionar...</option>
              <option value="comidas">Comidas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postres">Postres</option>
            </select>
          </div>

          {/* Subcategoría dinámica */}
          {form.mainCategory && (
            <div>
              <label className="block mb-1 text-sm opacity-80">
                Subcategoría
              </label>
              <select
                className="p-3 rounded-md bg-transparent border w-full"
                value={form.subCategory}
                onChange={e =>
                  setForm({ ...form, subCategory: e.target.value })
                }
              >
                <option value="">Seleccionar...</option>
                {form.mainCategory === 'comidas' && (
                  <>
                    <optgroup label="Almuerzo / Cena">
                      <option value="pizzas">Pizzas</option>
                      <option value="pastas">Pastas</option>
                      <option value="picadas">Picadas</option>
                      <option value="al plato">Al plato</option>
                    </optgroup>
                    <optgroup label="Desayuno / Merienda">
                      <option value="dulce">Dulce</option>
                      <option value="salado">Salado</option>
                    </optgroup>
                  </>
                )}
                {form.mainCategory === 'bebidas' && (
                  <>
                    <optgroup label="Desayuno / Merienda">
                      <option value="cafes">Cafés</option>
                      <option value="licuados">Licuados</option>
                    </optgroup>
                    <optgroup label="Almuerzo / Cena">
                      <option value="con alcohol">Con alcohol</option>
                      <option value="sin alcohol">Sin alcohol</option>
                    </optgroup>
                  </>
                )}
                {form.mainCategory === 'postres' && (
                  <option value="postres">Postres</option>
                )}
              </select>
            </div>
          )}

          {/* Imagen */}
          <div>
            <label className="block text-sm mb-2">Imagen del producto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && (
              <p className="text-sm text-gray-400 mt-1">Subiendo...</p>
            )}
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="preview"
                className="mt-2 w-28 h-28 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md border w-full sm:w-auto"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>
            <button className="btn-chaplin w-full sm:w-auto">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
