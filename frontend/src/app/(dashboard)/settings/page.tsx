import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your application settings.</p>
      </div>

      <div className="rounded-lg border-2 border-zinc-300 bg-white p-6">
        <p className="text-sm text-zinc-400">Settings will appear here.</p>
      </div>
    </div>
  )
}
