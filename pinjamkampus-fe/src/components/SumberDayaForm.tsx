import { useState } from 'react'
import type { SumberDayaInput } from '../types'

type Props = {
  onSubmit: (input: SumberDayaInput) => Promise<void>
}

export default function SumberDayaForm({ onSubmit }: Props) {
  const [nama, setNama] = useState('')
  const [jenis, setJenis] = useState('ruang')
  const [stok, setStok] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({ nama: nama.trim(), jenis, stok: Number(stok) })
    setNama('')
    setJenis('ruang')
    setStok('')
  }

  return (
    <form onSubmit={handleSubmit}>
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