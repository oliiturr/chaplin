import React from 'react'


export default function Modal({ open, onClose, children, title=''}){
if(!open) return null
return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
<div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
<div className="relative w-full max-w-2xl mx-4 card-chaplin rounded-2xl p-6 z-10">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-semibold">{title}</h3>
<button onClick={onClose} className="px-3 py-1 rounded-md">Cerrar</button>
</div>
<div>{children}</div>
</div>
</div>
)
}