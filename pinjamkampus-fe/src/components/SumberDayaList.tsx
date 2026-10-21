import type { SumberDaya } from '../types'

type Props = {
  items: SumberDaya[]
}

export default function SumberDayaList({ items }: Props) {
  return (
    <ul aria-label="Daftar sumber daya">
      {items.map((sd) => (
        <li key={sd.id}>
          <span>{sd.nama}</span> - <span>{sd.jenis}</span> - <span>Stok: {sd.stok}</span>
        </li>
      ))}
    </ul>
  )
}