import { Suspense } from 'react'
import LoginForm from './login-form'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Entrar | Remedin' }

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
