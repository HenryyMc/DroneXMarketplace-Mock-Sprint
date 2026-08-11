'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/dashboard')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-8xl font-bold tracking-tight text-black">Create account</h1>
      </div>

      <div className="border-2 border-zinc-300 rounded-lg p-6 space-y-6">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="displayName" className="text-sm font-medium text-black">
              Name
            </label>
            <input
              id="displayName"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.displayName}
              aria-describedby={errors.displayName ? 'display-name-error' : undefined}
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-100 text-black"
              placeholder="Enter your full name here..."
              {...register('displayName')}
            />
            {errors.displayName && (
              <p id="display-name-error" className="text-xs text-red-500" role="alert">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-100 text-black"
              placeholder="Enter your email here..."
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-100 text-black"
              placeholder="Min. 8 characters, 1 uppercase, 1 number"
              {...register('password')}
            />
            {errors.password && (
              <p id="password-error" className="text-xs text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-black">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-100 text-black"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-xs text-red-500" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          <Link
            href="/auth/signup"
            className="font-medium text-zinc-900 hover:underline dark:text-blue-600">
                Don&apos;t have an account?{' '}
          </Link>
        </p>
      </div>
    </div>
  )
}
