import React from 'react'

export default function ProductCard({ product }) {
  return (
    <article className="card-chaplin rounded-2xl overflow-hidden shadow-lg p-4 flex flex-col h-full w-full max-w-sm">
      <div
        className="h-44 w-full bg-center bg-cover rounded-lg"
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      />
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-[var(--chaplin-accent)]">
          {product.name}
        </h3>
        <p className="text-sm mt-2 text-[color:var(--chaplin-cream)] opacity-80">
          {product.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-[var(--chaplin-cream)]">
          ${product.price}
        </span>
      </div>
    </article>
  )
}
