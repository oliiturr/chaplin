import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `hover:text-[var(--chaplin-accent)] transition ${
      isActive ? 'text-[var(--chaplin-accent)] underline' : ''
    }`;

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between bg-[var(--chaplin-bg)] border-b border-[rgba(196,159,47,0.15)] z-50">
      {/* 🟡 Izquierda: logo + links */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/chaplin.png" alt="Chaplin Restobar" className="h-10 md:h-18" />
          
        </div>

        {/* Links (desktop) */}
        <div className="hidden md:flex gap-6 items-center text-[var(--chaplin-cream)] font-lato">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={linkClass}>
            Carta
          </NavLink>
          {currentUser && (
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </div>
      </div>

      {/* 🟠 Derecha: botones */}
      <div className="hidden md:flex items-center gap-3">
        {currentUser ? (
          <button
            className="btn-chaplin text-sm px-4 py-2"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        ) : (
          <NavLink
            to="/admin"
            className="px-4 py-2 rounded-md border border-[rgba(196,159,47,0.15)] hover:border-[var(--chaplin-accent)] transition"
          >
            Admin
          </NavLink>
        )}
      </div>

      {/* 🔸 Menú hamburguesa (mobile) */}
      <button
        className="md:hidden text-[var(--chaplin-accent)]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 🔹 Menú móvil desplegable */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--chaplin-card)] border-t border-[rgba(196,159,47,0.1)] py-4 flex flex-col items-center gap-4 text-[var(--chaplin-cream)] md:hidden z-40">
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Carta
          </NavLink>
          {currentUser && (
            <NavLink
              to="/admin/dashboard"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          {currentUser ? (
            <button
              className="btn-chaplin text-sm px-4 py-2"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              to="/admin"
              className="px-4 py-2 rounded-md border border-[rgba(196,159,47,0.15)] hover:border-[var(--chaplin-accent)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
