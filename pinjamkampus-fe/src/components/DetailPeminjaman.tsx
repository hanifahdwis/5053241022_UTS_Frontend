import type { Peminjaman } from '../types'

type Props = {
  detail: Peminjaman
}

export default function DetailPeminjaman({ detail }: Props) {
  return (
    <div aria-label="Detail peminjaman" role="group">
      <p>Sumber daya ID: {detail.sumber_daya_id}</p>
      <p>Peminjam: {detail.peminjam}</p>
      <p>Tanggal: {detail.tanggal}</p>
      <p>
        Slot {detail.slot_mulai}-{detail.slot_selesai}
      </p>
      <p>Jumlah: {detail.jumlah}</p>
      <p>Status: {detail.status}</p>
    </div>
  )
}