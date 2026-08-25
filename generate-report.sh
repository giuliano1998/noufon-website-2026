#!/usr/bin/env bash
# Genera la plantilla del reporte diario (REGLA #3 de CLAUDE.md).
# Uso: ./generate-report.sh   → crea REPORT-AAAA-MM-DD.txt para completar.
set -euo pipefail

FECHA="$(date +%Y-%m-%d)"
ARCHIVO="REPORT-${FECHA}.txt"

if [ -f "$ARCHIVO" ]; then
  echo "⚠️  Ya existe $ARCHIVO — se edita ese, no se pisa."
  exit 0
fi

RAMA="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'sin git')"
COMMITS="$(git log --since=midnight --oneline 2>/dev/null | sed 's/^/  /' || true)"
[ -z "$COMMITS" ] && COMMITS="  (ninguno todavía)"
PENDIENTES="$(git log --oneline origin/main..HEAD 2>/dev/null | sed 's/^/  /' || true)"
[ -z "$PENDIENTES" ] && PENDIENTES="  (nada pendiente de pushear)"

cat > "$ARCHIVO" <<EOF
════════════════════════════════════════════════════════════
  NOUFON BUILD REPORT
════════════════════════════════════════════════════════════

📅 Fecha: ${FECHA}
🌿 Branch: ${RAMA}
✅ Status: [READY FOR REVIEW | BLOCKED — con motivo]

────────────────────────────────────────────────────────────
📝 CAMBIOS REALIZADOS
────────────────────────────────────────────────────────────
[Completar: qué se modificó y por qué]

────────────────────────────────────────────────────────────
🐛 ERRORES ENCONTRADOS Y CORREGIDOS
────────────────────────────────────────────────────────────
[Completar. Si es un error nuevo, sumarlo a "Trampas conocidas"
 en CLAUDE.md para no repetirlo.]

────────────────────────────────────────────────────────────
🔍 TESTING REALIZADO
────────────────────────────────────────────────────────────
[ ] npm run build en verde
[ ] Rutas existentes sin romper (incluidas las 6 históricas .html)
[ ] Responsive: 320 / 480 / 768 / 1920
[ ] Sin credenciales en el código

────────────────────────────────────────────────────────────
📦 COMMITS DE HOY
────────────────────────────────────────────────────────────
${COMMITS}

── Pendientes de pushear ──
${PENDIENTES}

────────────────────────────────────────────────────────────
⚙️  PRÓXIMAS ACCIONES
────────────────────────────────────────────────────────────
[ ]
[ ]
[ ]

════════════════════════════════════════════════════════════
EOF

echo "✅ Creado $ARCHIVO — completalo y commitealo."
