"""Slugs legibles para representar productos en la URL."""

import re
import unicodedata

LONGITUD_SLUG = 140


def generar_slug(nombre):
    """Convierte un nombre en un slug ASCII: minúsculas y guiones."""
    texto = unicodedata.normalize("NFKD", str(nombre or ""))
    texto = texto.encode("ascii", "ignore").decode("ascii").lower()
    texto = re.sub(r"[^a-z0-9]+", "-", texto).strip("-")
    texto = texto[:LONGITUD_SLUG].strip("-")
    return texto or "producto"


def posibles_slugs(nombre):
    """Genera el slug base y sus variantes numeradas para buscar uno libre."""
    base = generar_slug(nombre)
    yield base
    sufijo = 1
    while True:
        sufijo += 1
        yield f"{base}-{sufijo}"
