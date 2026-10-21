export const BASE_URL = 'http://localhost:8080'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function kirim(path: string, init?: RequestInit): Promise<Response> {
  let res: Response
  try {
    res = await fetch(BASE_URL + path, init)
  } catch {
    throw new ApiError(
      'Gagal menghubungi server. Pastikan server berjalan lalu coba lagi.',
      0,
    )
  }

  if (!res.ok) {
    let pesan = `Terjadi error dari server (${res.status}).`
    try {
      const body = (await res.json()) as { error?: unknown }
      if (typeof body.error === 'string') pesan = body.error
    } catch {
      // body bukan JSON, pakai pesan bawaan
    }
    throw new ApiError(pesan, res.status)
  }

  return res
}

export async function ambilJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await kirim(path, init)
  return (await res.json()) as T
}

export async function kirimJson<T>(
  path: string,
  method: 'POST' | 'PUT',
  body: unknown,
): Promise<T> {
  return ambilJson<T>(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function hapus(path: string): Promise<void> {
  await kirim(path, { method: 'DELETE' })
}

export function pesanError(err: unknown): string {
  return err instanceof Error ? err.message : 'Terjadi error yang tidak diketahui.'
}