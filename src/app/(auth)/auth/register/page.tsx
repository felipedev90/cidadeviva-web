'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    setServerError(null)

    const response = await fetch('/api/auth/register', {
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
            src="/images/register/ponte_torta_register.webp"
            alt="Imagem de registro do Cidade Viva"
            fill
            quality={85}
            priority
            className="object-cover object-[20%_center]"
          />
        </div>

        {/* Lado direito — formulário */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8 lg:py-16 bg-primary">
          <div className="max-w-sm mx-auto w-full">
            <Link
              href="/"
              className="text-on-dark/70 text-sm mb-6 inline-block hover:text-on-dark transition-colors"
            >
              <ArrowLeft className="inline-block mr-2" />
              Voltar ao site
            </Link>
            <h1 className="font-display text-4xl font-bold uppercase text-on-dark mb-2">
              Registrar
            </h1>
            <p className="text-on-dark/80 font-sans text-sm mb-10">
              Crie uma conta para acessar o painel do Cidade Viva.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs uppercase tracking-widest text-on-dark">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  {...register('name')}
                  className="border border-border px-4 py-3 font-sans text-sm text-on-dark focus:outline-none focus:border-accent"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs uppercase tracking-widest text-on-dark">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="voce@email.com"
                  {...register('email')}
                  className="border border-border px-4 py-3 font-sans text-sm text-on-dark focus:outline-none focus:border-accent"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs uppercase tracking-widest text-on-dark">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="border border-border px-4 py-3 font-sans text-sm text-on-dark focus:outline-none focus:border-accent"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>

              {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent text-ink font-sans font-bold text-sm uppercase tracking-widest py-4 hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Registrando...' : 'Registrar'}
              </button>
            </form>

            <p className="font-sans text-sm text-center mt-8 text-on-dark/70">
              Já tem conta?{' '}
              <Link
                href="/auth/login"
                className="text-on-dark font-bold hover:text-muted transition-colors"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
