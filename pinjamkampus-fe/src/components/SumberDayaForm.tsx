import { useState } from 'react'
import { pesanError } from '../api/client'
import type { SumberDayaInput } from '../types'

type Props = {
  onSubmit: (input: SumberDayaInput) => Promise<void>
}

export default function SumberDayaForm({ onSubmit }: Props) {
  const [nama, setNama] = useState('')
  const [jenis, setJenis] = useState('ruang')
  const [stok, setStok] = useState('')
  const [error, setError] = useState('')

async function handleSubmit(e: React.SubmitEvent) {
  e.preventDefault()
  setError('')

  const namaBersih = nama.trim()
  const angkaStok = Number(stok)

  if (!namaBersih) {
    setError('Nama sumber daya wajib diisi.')
    return
  }
  
  try {
    await onSubmit({
      nama: namaBersih,
      jenis,
      stok: angkaStok,
    })
    setNama('')
    setJenis('ruang')
    setStok('')
  } catch (err) {
    setError(pesanError(err))
  }
}
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="sd-nama">Nama sumber daya</label>
        <input id="sd-nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
      </div>
      <div>
        <label htmlFor="sd-jenis">Jenis</label>
        <select id="sd-jenis" value={jenis} onChange={(e) => setJenis(e.target.value)}>
          <option value="ruang">ruang</option>
          <option value="alat">alat</option>
        </select>
      </div>
      <div>
        <label htmlFor="sd-stok">Stok</label>
        <input id="sd-stok" type="number" value={stok} onChange={(e) => setStok(e.target.value)} />
      </div>
      <button type="submit">Simpan sumber daya</button>
    </form>
  )
}