import type {
  FilterPeminjaman,
  Peminjaman,
  PeminjamanInput,
  SumberDaya,
  SumberDayaInput,
} from '../types'
import { ambilJson, hapus, kirimJson } from './client'

export function getSumberDaya(): Promise<SumberDaya[]> {
  return ambilJson<SumberDaya[]>('/sumber-daya')
}

export function createSumberDaya(input: SumberDayaInput): Promise<SumberDaya> {
  return kirimJson<SumberDaya>('/sumber-daya', 'POST', input)
}

export function getPeminjaman(filter: FilterPeminjaman): Promise<Peminjaman[]> {
  const params = new URLSearchParams()
  if (filter.sumberDayaId) params.set('sumber_daya_id', filter.sumberDayaId)
  if (filter.tanggal) params.set('tanggal', filter.tanggal)
  if (filter.status) params.set('status', filter.status)
  const query = params.toString()
  return ambilJson<Peminjaman[]>(query ? `/peminjaman?${query}` : '/peminjaman')
}

export function getPeminjamanById(id: number): Promise<Peminjaman> {
  return ambilJson<Peminjaman>(`/peminjaman/${id}`)
}

export function createPeminjaman(input: PeminjamanInput): Promise<Peminjaman> {
  return kirimJson<Peminjaman>('/peminjaman', 'POST', input)
}

export function updatePeminjaman(
  id: number,
  input: PeminjamanInput,
): Promise<Peminjaman> {
  return kirimJson<Peminjaman>(`/peminjaman/${id}`, 'PUT', input)
}

export function deletePeminjaman(id: number): Promise<void> {
  return hapus(`/peminjaman/${id}`)
}