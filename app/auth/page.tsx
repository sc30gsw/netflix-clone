'use client'

import { ErrorMessage } from '@hookform/error-message'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import type Input from '@/components/Input'

type Input = {
  name: string
  email: string
  password: string
}

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>()

  const router = useRouter()

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profile',
      })

      router.push('/profile')
    } catch (err) {
      console.log(err)
    }
  }, [email, password, router])

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    )
    setName('')
    setEmail('')
    setPassword('')
    reset()
  }, [])

  const signUp = useCallback(async () => {
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      })

      login()
    } catch (err) {
      console.log(err)
    }
  }, [email, name, password, login])

  const onSubmit: SubmitHandler<Input> = useCallback(
    (data) => {
      variant === 'login' ? login() : signUp()
      reset()
    },
    [login, reset, signUp, variant],
  )

  return (
    <div className="relative h-full  w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" height={48} width={150} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <div className="relative">
                    <input
                      {...register('name', {
                        required: 'ユーザー名は必須入力です',
                        minLength: {
                          value: 8,
                          message: 'ユーザー名は8文字以上で入力してください',
                        },
                        maxLength: {
                          value: 16,
                          message: 'ユーザー名は16文字以内で入力してください',
                        },
                      })}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
                      placeholder="  "
                    />
                    <label
                      className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      htmlFor="name"
                    >
                      Username
                    </label>
                    <span className="text-red-500">
                      <ErrorMessage errors={errors} name="name" />
                    </span>
                  </div>
                )}
                <div className="relative">
                  <input
                    {...register('email', {
                      required: 'メールアドレスは必須入力です',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'メールアドレスの形式が不正です',
                      },
                    })}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder="  "
                  />
                  <label
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <span className="text-red-500">
                    <ErrorMessage errors={errors} name="email" />
                  </span>
                </div>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'パスワードは必須入力です',
                      minLength: {
                        value: 8,
                        message: 'パスワードは8文字以上で入力してください',
                      },
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/,
                        message:
                          'パスワードは半角英数（記号を含む）で入力してください',
                      },
                    })}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder="  "
                  />
                  <label
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <span className="text-red-500">
                    <ErrorMessage errors={errors} name="password" />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
            </form>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn('google', { callbackUrl: '/profile' })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-89 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profile' })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-89 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
