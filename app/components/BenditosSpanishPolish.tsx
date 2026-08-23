"use client";

import { useEffect } from "react";
import { useWorkspace } from "./WorkspaceProvider";

const EXACT: Record<string, string> = {
  "COST CONTROL": "CONTROL DE COSTOS",
  "MENU COSTING": "COSTEO DE MENÚ",
  "WORKSPACE": "ESPACIO",
  "MOBILE APP": "APP MÓVIL",
  "PERFORMANCE": "RENDIMIENTO",
  "Performance": "Rendimiento",
  "COGS & gross profit": "Costo de ventas y margen bruto",
  "Choose two completed stock counts": "Elige dos conteos de inventario completados",
  "Complete at least two stock counts to choose a COGS period.": "Completa al menos dos conteos de inventario para elegir un periodo de costo de ventas.",
  "Opening stock": "Inventario inicial",
  "Closing stock": "Inventario final",
  "Opening count": "Conteo inicial",
  "Closing count": "Conteo final",
  "Purchases": "Compras",
  "Sales": "Ventas",
  "Actual GP": "Margen bruto real",
  "Theoretical GP": "Margen bruto teórico",
  "GP variance": "Variación de margen",
  "Configured sales figure for GP calculation": "Ventas configuradas para calcular el margen bruto",
  "Waiting for actual COGS": "Esperando el costo real de ventas",
  "Recipe-based target": "Objetivo según recetas",
  "COGS period": "Periodo de costo de ventas",
  "Choose the completed opening and closing stock counts. All approved invoices dated between them are included as purchases.": "Elige los conteos inicial y final completados. Todas las facturas aprobadas entre esas fechas se incluyen como compras.",
  "Supplier spend": "Gasto por proveedor",
  "Full report →": "Reporte completo →",
  "Latest COGS period": "Último periodo de costo de ventas",
  "Choose period →": "Elegir periodo →",
  "No supplier spend yet": "Todavía no hay gasto de proveedores",
  "Supplier spend will appear as invoices are approved.": "El gasto por proveedor aparecerá al aprobar facturas.",
  "No purchase data": "Todavía no hay datos de compras",
  "Approved invoice data will populate this report.": "Las facturas aprobadas alimentarán este reporte.",
  "Invoices": "Facturas",
  "Spend": "Gasto",
  "Share": "Participación",
  "Invoice history": "Historial de facturas",
  "Spend over time": "Gasto a lo largo del tiempo",
  "Last 6 months": "Últimos 6 meses",
  "Invoice dates will create this trend automatically.": "Las fechas de las facturas crearán esta tendencia automáticamente.",
  "Cost movement": "Movimiento de costos",
  "Largest price changes": "Mayores cambios de precio",
  "A second price period is needed for comparison.": "Se necesita un segundo periodo de precios para comparar.",
  "Ingredient price changes": "Cambios de precio de ingredientes",
  "No price movement yet": "Todavía no hay cambios de precio",
  "Price changes will appear once previous supplier prices are stored.": "Los cambios de precio aparecerán cuando haya precios anteriores guardados.",
  "Previous": "Anterior",
  "Current": "Actual",
  "Change": "Cambio",

  "Matched ingredient pricing from approved supplier invoices. Raw invoice descriptions stay in Catalogue and Matching until they are confirmed.": "Precios de ingredientes conciliados desde facturas aprobadas. Las descripciones originales permanecen en Catálogo y Conciliación hasta confirmarse.",
  "Matched master data": "Datos maestros conciliados",
  "Current prices": "Precios actuales",
  "Invoice-derived": "Obtenidos de facturas",
  "Supplying matched ingredients": "Proveedores de ingredientes conciliados",
  "Refresh": "Actualizar",

  "Install Kitchen Insights": "Instalar Kitchen Insights",
  "Add Kitchen Insights to the home screen so it opens like a kitchen app.": "Agrega Kitchen Insights a la pantalla de inicio para abrirlo como una app de cocina.",
  "Order delivery": "Envío de pedidos",
  "Save settings": "Guardar configuración",
  "Organisation name": "Nombre de la organización",
  "Internal order emails": "Correos internos de pedidos",
  "Copies are sent to these contacts when an order is placed.": "Se envían copias a estos contactos cuando se realiza un pedido.",
  "Add contact email": "Agregar correo de contacto",
  "Send order confirmation internally": "Enviar confirmación del pedido internamente",
  "Send directly to supplier": "Enviar directamente al proveedor",
  "Include purchase order PDF": "Incluir PDF de la orden de compra",
  "Include order notes": "Incluir notas del pedido",
  "Order settings": "Configuración de pedidos",

  "Menu items": "Platos del menú",
  "No menu loaded": "Sin menú cargado",
  "Recipes costed": "Recetas costeadas",
  "Average food cost": "Costo promedio de alimentos",
  "Across fully costed dishes": "En platos totalmente costeados",
  "Above target": "Por encima del objetivo",
  "Food cost target": "Objetivo de costo de alimentos",
  "Menu performance": "Rendimiento del menú",
  "Selling price": "Precio de venta",
  "Recipe cost": "Costo de receta",
  "Gross profit": "Margen bruto",
  "Margin": "Margen",

  "No supplier": "Sin proveedor",
  "price needed": "precio pendiente",
  "Search ingredient or supplier…": "Buscar ingrediente o proveedor…",
  "All": "Todo",
};

const PATTERNS: Array<[RegExp, string]> = [
  [/^BENDITOS MEXICALI has a clean menu workspace with no dishes yet\.$/i, "BENDITOS MEXICALI tiene un espacio de menú limpio y todavía no tiene platos."],
  [/^(\d+) approved invoices in period$/, "$1 facturas aprobadas en el periodo"],
  [/^Purchases (.+)$/, "Compras $1"],
  [/^(.+) GP · (.+) food cost$/, "$1 margen bruto · $2 costo de alimentos"],
  [/^(.+) · (.+) food cost$/, "$1 · $2 costo de alimentos"],
  [/^(\d+) suppliers$/, "$1 proveedores"],
  [/^(\d+) changes$/, "$1 cambios"],
  [/^No menu items yet$/i, "Todavía no hay platos del menú"],
  [/^No dishes yet$/i, "Todavía no hay platos"],
];

function isMexicaliHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname.toLowerCase().startsWith("benditosmexicali.");
}

function translate(value: string) {
  if (!value.trim()) return value;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  let core = value.trim();
  core = EXACT[core] ?? core;
  for (const [pattern, replacement] of PATTERNS) core = core.replace(pattern, replacement);
  core = core.replace(/£(?=\s?\d)/g, "$").replace(/\bGBP\b/g, "MXN");
  return `${leading}${core}${trailing}`;
}

function translateNode(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "CODE", "PRE"].includes(parent.tagName)) return;
    const current = root.nodeValue ?? "";
    const next = translate(current);
    if (next !== current) root.nodeValue = next;
    return;
  }
  if (!(root instanceof Element) || ["SCRIPT", "STYLE", "CODE", "PRE"].includes(root.tagName)) return;
  for (const attr of ["placeholder", "title", "aria-label", "data-label"]) {
    const current = root.getAttribute(attr);
    if (!current) continue;
    const next = translate(current);
    if (next !== current) root.setAttribute(attr, next);
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateNode(node);
    node = walker.nextNode();
  }
}

function apply() {
  document.documentElement.lang = "es-MX";
  document.documentElement.dataset.locale = "es-MX";
  document.documentElement.dataset.currency = "MXN";
  translateNode(document.body);
}

export default function BenditosSpanishPolish() {
  const { activeWorkspace } = useWorkspace();
  const enabled = isMexicaliHost() || activeWorkspace?.organisationName.trim().toLowerCase() === "benditos mexicali";

  useEffect(() => {
    if (!enabled) return;
    apply();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateNode(mutation.target);
        mutation.addedNodes.forEach(translateNode);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [enabled]);

  return null;
}
