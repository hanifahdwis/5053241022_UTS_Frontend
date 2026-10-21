import type { Peminjaman } from '../types'

type Props = {
  items: Peminjaman[]
  onDetail: (id: number) => void
}

export default function PeminjamanList({ items, onDetail }: Props) {
  return (
    <ul aria-label="Daftar peminjaman">
      {items.map((p) => (
        <li key={p.id}>
          <span>{p.peminjam}</span> - <span>{p.tanggal}</span> -{' '}
          <span>
            Slot {p.slot_mulai}-{p.slot_selesai}
          </span>{' '}
          - <span>Jumlah: {p.jumlah}</span> - <span>{p.status}</span>
          <button type="button" onClick={() => onDetail(p.id)}>
            Detail
          </button>
        </li>
      ))}
    </ul>
  )
}