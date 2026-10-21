import { useEffect, useState } from 'react'

import {
  createPeminjaman,
  createSumberDaya,
  getPeminjaman,
  getPeminjamanById,
  getSumberDaya,
} from './api/pinjam'

import DetailPeminjaman from './components/DetailPeminjaman'
import FilterPeminjaman from './components/FilterPeminjaman'
import PeminjamanForm from './components/PeminjamanForm'
import PeminjamanList from './components/PeminjamanList'
import SumberDayaForm from './components/SumberDayaForm'
import SumberDayaList from './components/SumberDayaList'

import type {
  FilterPeminjaman as Filter,
  Peminjaman,
  PeminjamanInput,
  SumberDaya,
  SumberDayaInput,
} from './types'

const STATUS_FILTER = [
  'diajukan',
  'disetujui',
  'ditolak',
  'selesai',
  'dibatalkan',
]
const filterKosong: Filter = { sumberDayaId: '', tanggal: '', status: '' }

export default function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([])
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([])
  const [filter, setFilter] = useState<Filter>(filterKosong)
  const [detail, setDetail] = useState<Peminjaman | null>(null)

  useEffect(() => {
    getSumberDaya().then(setSumberDaya)
  }, [])

  useEffect(() => {
    getPeminjaman(filter).then(setPeminjaman)
  }, [filter])

  async function handleSimpanSumberDaya(input: SumberDayaInput) {
    await createSumberDaya(input)
    setSumberDaya(await getSumberDaya())
  }

  async function handleSimpanPeminjaman(input: PeminjamanInput) {
    await createPeminjaman(input)
    setPeminjaman(await getPeminjaman(filter))
  }

  async function handleDetail(id: number) {
    setDetail(await getPeminjamanById(id))
  }

  return (
    <main>
      <h1>PinjamKampus</h1>

      <section>
        <h2>Tambah sumber daya</h2>
        <SumberDayaForm onSubmit={handleSimpanSumberDaya} />
        <SumberDayaList items={sumberDaya} />
      </section>

      <section>
        <h2>Ajukan peminjaman</h2>
        <PeminjamanForm sumberDaya={sumberDaya} onSubmit={handleSimpanPeminjaman} />
      </section>

      <section>
        <h2>Peminjaman</h2>
        <FilterPeminjaman
          filter={filter}
          sumberDaya={sumberDaya}
          statusOpsi={STATUS_FILTER}
          onChange={setFilter}
        />
        <PeminjamanList items={peminjaman} onDetail={handleDetail} />
        {detail && <DetailPeminjaman detail={detail} />}
      </section>
    </main>
  )
}