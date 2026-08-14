import type { TeamMember } from '../types'
import { TeamPhoto } from './TeamPhoto'

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-lg border-2 border-zinc-300 bg-white p-6">
      <div className="flex aspect-square w-40 items-center justify-center overflow-hidden rounded-md bg-zinc-200">
        <TeamPhoto src={member.photoUrl} alt={member.name} />
      </div>
      <p className="mt-4 font-bold text-black">{member.name}</p>
      <p className="mt-0.5 text-xs text-zinc-500">Role: {member.role}</p>
      {member.bio && (
        <p className="mt-2 text-sm break-words text-zinc-600">{member.bio}</p>
      )}
    </div>
  )
}
