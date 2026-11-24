"""Limpieza del texto libre que llega desde el cliente.

Los datos que se guardan en PostgreSQL deben ser texto plano: cualquier
etiqueta HTML se descarta y se conserva solo su contenido.
"""

import re

# Se consideran etiquetas los `<...>` que empiezan por letra, `/`, `!` o `?`
# (con o sin espacios internos). Así no se confunden comparaciones como
# `3 < 4` ni se comen texto que solo usa el signo menor que.
_ETIQUETA_HTML = re.compile(r"<[A-Za-z/!?][^>]*>")


def sin_etiquetas(valor):
    """Devuelve el texto sin etiquetas HTML, conservando su contenido."""
    if valor is None:
        return ""
    if not isinstance(valor, str):
        valor = str(valor)
    return _ETIQUETA_HTML.sub("", valor)
