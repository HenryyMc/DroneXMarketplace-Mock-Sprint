import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'
import { teamMembers } from '@/features/team/data'
import { TeamMemberCard } from '@/features/team/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Team',
}

export default async function TeamPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-50 px-4 py-8 text-center dark:bg-zinc-900/40">
        <h1 className="text-2xl font-bold tracking-tight">Meet the Team</h1>
        <p className="mt-1 text-sm text-zinc-500">Capstone Group 65</p>
      </div>

      {teamMembers.length === 0 ? (
        <p className="py-16 text-center text-sm font-medium text-red-600">
          No team members available
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}
