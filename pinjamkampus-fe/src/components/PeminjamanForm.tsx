import { useState } from 'react'
import type { PeminjamanInput, SumberDaya } from '../types'

type Props = {
  sumberDaya: SumberDaya[]
  onSubmit: (input: PeminjamanInput) => Promise<void>
}

type FormState = {
  sumberDayaId: string
  peminjam: string
  tanggal: string
  slotMulai: string
  slotSelesai: string
  jumlah: string
}

const formKosong: FormState = {
  sumberDayaId: '',
  peminjam: '',
  tanggal: '',
  slotMulai: '1',
  slotSelesai: '1',
  jumlah: '',
}

const DAFTAR_SLOT = [1, 2, 3, 4, 5, 6, 7, 8]

export default function PeminjamanForm({ sumberDaya, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>(formKosong)

  function ubah(field: keyof FormState, nilai: string) {
    setForm((lama) => ({ ...lama, [field]: nilai }))
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    await onSubmit({
      sumber_daya_id: Number(form.sumberDayaId),
      peminjam: form.peminjam.trim(),
      tanggal: form.tanggal,
      slot_mulai: Number(form.slotMulai),
      slot_selesai: Number(form.slotSelesai),
      jumlah: Number(form.jumlah),
    })
    setForm(formKosong)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pj-sd">Sumber daya</label>
        <select id="pj-sd" value={form.sumberDayaId} onChange={(e) => ubah('sumberDayaId', e.target.value)}>
          <option value="">Pilih sumber daya</option>
          {sumberDaya.map((sd) => (
            <option key={sd.id} value={sd.id}>
              {sd.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pj-peminjam">Peminjam</label>
        <input id="pj-peminjam" type="text" value={form.peminjam} onChange={(e) => ubah('peminjam', e.target.value)} />
      </div>
      <div>
        <label htmlFor="pj-tanggal">Tanggal</label>
        <input id="pj-tanggal" type="date" value={form.tanggal} onChange={(e) => ubah('tanggal', e.target.value)} />
      </div>
      <div>
        <label htmlFor="pj-mulai">Slot mulai</label>
        <select id="pj-mulai" value={form.slotMulai} onChange={(e) => ubah('slotMulai', e.target.value)}>
          {DAFTAR_SLOT.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pj-selesai">Slot selesai</label>
        <select id="pj-selesai" value={form.slotSelesai} onChange={(e) => ubah('slotSelesai', e.target.value)}>
          {DAFTAR_SLOT.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pj-jumlah">Jumlah</label>
        <input id="pj-jumlah" type="number" value={form.jumlah} onChange={(e) => ubah('jumlah', e.target.value)} />
      </div>
      <button type="submit">Simpan peminjaman</button>
    </form>
  )
}