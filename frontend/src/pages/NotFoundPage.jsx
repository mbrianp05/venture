import { ArrowLeft, Link2, LogIn, ReceiptText } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../auth-context'
import BrandMark from '../components/BrandMark'
import { Button } from '@/components/ui/button'

function rutaVisible(pathname) {
  let texto = pathname

  try {
    texto = decodeURI(pathname)
  } catch {
    // Una URL mal codificada se muestra tal cual llegó.
  }

  return texto.length > 64 ? `${texto.slice(0, 61)}…` : texto
}

function FondoDorado() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[min(80vh,46rem)] bg-[radial-gradient(90rem_46rem_at_50%_-8rem,rgb(227_189_99/0.11),transparent_72%)]"
    />
  )
}

function NotFoundContent({ user, pathname }) {
  return (
    <div className="relative z-10 w-full max-w-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <span className="select-none text-[10rem] font-semibold leading-[0.85] tracking-tighter text-foreground/[0.05] sm:text-[13rem]">
          404
        </span>
      </div>

      <div className="relative flex flex-col items-center pt-[8.75rem] text-center sm:pt-[11.5rem]">
        <h1 className="text-3xl font-semibold tracking-tight text-highlight sm:text-4xl">
          No encontramos esta página
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          El enlace puede estar incompleto, la página cambió de sitio o el
          producto ya no está en el inventario.
        </p>

        <p className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-muted/25 px-3.5 py-1.5 text-xs text-muted-foreground">
          <Link2 className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate font-mono text-[11px]">
            {rutaVisible(pathname)}
          </span>
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="size-4" />
              Volver al catálogo
            </Link>
          </Button>

          {user ? (
            <Button asChild variant="outline">
              <Link to="/facturas">
                <ReceiptText className="size-4" />
                Ver mis facturas
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/login">
                <LogIn className="size-4" />
                Ingresar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NotFoundPage({ standalone = false }) {
  const { user } = useAuth()
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  if (standalone) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-16">
        <FondoDorado />

        <div className="relative z-10 w-full max-w-xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <BrandMark className="size-6" />
            </span>
            <div>
              <p className="text-lg font-semibold leading-none tracking-tight">
                Venture
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Inventario y facturación
              </p>
            </div>
          </div>

          <NotFoundContent user={user} pathname={pathname} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative grid min-h-[62vh] place-items-center">
      <FondoDorado />
      <NotFoundContent user={user} pathname={pathname} />
    </div>
  )
}
