import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';
import Loading from '../components/Loading';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ main: '', sub: '' });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const filtered = products.filter(p => {
    if (filter.sub) return p.subCategory === filter.sub;
    if (filter.main) return p.mainCategory === filter.main;
    return true;
  });

  if (loading) return <Loading />;

  return (
    <section className="container mx-auto px-4 py-10 text-[var(--chaplin-cream)]">
      <h2 className="text-3xl md:text-4xl font-cinzel text-[var(--chaplin-accent)] text-center mb-8">
        Nuestra Carta
      </h2>

      {/* 🟡 FILTROS */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <select
          className="p-2 w-full md:w-60 border border-[rgba(196,159,47,0.2)] rounded-md bg-[var(--chaplin-card)] text-[var(--chaplin-cream)]"
          value={filter.main}
          onChange={e => setFilter({ main: e.target.value, sub: '' })}
        >
          <option value="">Todas las categorías</option>
          <option value="comidas">Comidas</option>
          <option value="bebidas">Bebidas</option>
          <option value="postres">Postres</option>
        </select>

        {filter.main && (
          <select
            className="p-2 w-full md:w-60 border border-[rgba(196,159,47,0.2)] rounded-md bg-[var(--chaplin-card)] text-[var(--chaplin-cream)]"
            value={filter.sub}
            onChange={e => setFilter({ ...filter, sub: e.target.value })}
          >
            <option value="">Todas las subcategorías</option>

            {filter.main === 'comidas' && (
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

            {filter.main === 'bebidas' && (
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

            {filter.main === 'postres' && (
              <option value="postres">Postres</option>
            )}
          </select>
        )}
      </div>

      {/* 🟠 LISTADO DE PRODUCTOS */}
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6 justify-items-center
        "
      >
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">
            No hay productos en esta categoría.
          </p>
        ) : (
          filtered.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
