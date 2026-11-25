import { useEffect, useState } from 'react'

/**
 * Retrasa la actualización de un valor hasta que el usuario deja de escribir.
 *
 * Se usa para los filtros de texto: el campo se actualiza al instante, pero
 * el filtrado espera unos milisegundos. Los valores vacíos se aplican de
 * inmediato para que limpiar un filtro no se sienta lento.
 */
export function useDebouncedValue(valor, retraso = 300) {
  const [diferido, setDiferido] = useState(valor)

  useEffect(() => {
    if (valor === '' || valor == null) {
      // oxlint-disable-next-line react/set-state-in-effect -- limpiar el filtro debe ser inmediato
      setDiferido(valor)
      return undefined
    }

    const temporizador = setTimeout(() => setDiferido(valor), retraso)
    return () => clearTimeout(temporizador)
  }, [valor, retraso])

  return diferido
}
