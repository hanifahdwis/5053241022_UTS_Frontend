import type { FilterPeminjaman as Filter, SumberDaya } from '../types'

type Props = {
  filter: Filter
  sumberDaya: SumberDaya[]
  statusOpsi: string[]
  onChange: (filter: Filter) => void
}

export default function FilterPeminjaman({ filter, sumberDaya, statusOpsi, onChange }: Props) {
  return (
    <div>
      <div>
        <label htmlFor="f-sd">Filter sumber daya</label>
        <select id="f-sd" value={filter.sumberDayaId} onChange={(e) => onChange({ ...filter, sumberDayaId: e.target.value })}>
          <option value="">Semua</option>
          {sumberDaya.map((sd) => (
            <option key={sd.id} value={sd.id}>
              {sd.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-tanggal">Filter tanggal</label>
        <input id="f-tanggal" type="date" value={filter.tanggal} onChange={(e) => onChange({ ...filter, tanggal: e.target.value })} />
      </div>
      <div>
        <label htmlFor="f-status">Filter status</label>
        <select id="f-status" value={filter.status} onChange={(e) => onChange({ ...filter, status: e.target.value })}>
          <option value="">Semua</option>
          {statusOpsi.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}