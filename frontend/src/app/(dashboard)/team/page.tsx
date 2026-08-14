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
      <div className="rounded-lg bg-zinc-50 px-4 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black">Meet the Team</h1>
        <p className="mt-2 text-xl text-zinc-500">Capstone Group 65</p>
      </div>

      {teamMembers.length === 0 ? (
        <p className="py-16 text-center text-lg font-semibold text-red-500">
          No team members available
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}
