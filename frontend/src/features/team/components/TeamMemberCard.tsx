import type { TeamMember } from '../types'
import { TeamPhoto } from './TeamPhoto'

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex aspect-square w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
        <TeamPhoto src={member.photoUrl} alt={member.name} />
      </div>
      <div className="p-4">
        <p className="font-bold text-zinc-900 dark:text-white">{member.name}</p>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Role: {member.role}</p>
        {member.bio && (
          <p className="mt-2 text-sm break-words text-zinc-600 dark:text-zinc-300">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  )
}
