'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    setServerError(null)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      setServerError(error.error)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-border">
      {/* Lado esquerdo — imagem */}
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-137.5">
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 z-10" />
          <Image
            src="/images/login/jundiai_login.webp"
            alt="Imagem de login do Cidade Viva"
            fill
            quality={85}
            priority
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover object-[20%_center]"
          />
        </div>

        {/* Lado direito — formulário */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 bg-surface">
          <div className="max-w-sm mx-auto w-full">
            <Link
              href="/"
              className="text-muted text-sm mb-6 inline-block hover:text-primary transition-colors"
            >
              <ArrowLeft className="inline-block mr-2" />
              Voltar ao site
            </Link>
            <h1 className="font-display text-4xl font-bold uppercase text-ink mb-2">Entrar</h1>
            <p className="text-ink font-sans text-sm mb-10">Acesse o painel do Cidade Viva.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs uppercase tracking-widest text-ink">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="voce@email.com"
                  {...register('email')}
                  className="border border-border px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs uppercase tracking-widest text-ink">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="border border-border px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>

              {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-on-dark font-sans font-bold text-sm uppercase tracking-widest py-4 hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <p className="font-sans text-sm text-center mt-8 text-muted">
              Não tem conta?{' '}
              <Link href="/auth/register" className="text-ink font-bold hover:text-primary">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
