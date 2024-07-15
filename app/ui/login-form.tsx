// app/ui/login-form.tsx
'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { signIn } from 'next-auth/react'; // Importar signIn de next-auth/react

export default function LoginForm() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Ingresa con Google para continuar.
        </h1>
      </div>
      <LoginButton /> {/* Añadir el botón de login */}
    </form>
  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-full" onClick={() => signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })}>
      Log in with Google <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}