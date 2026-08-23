"use client";

import { useEffect } from "react";
import { useWorkspace } from "./WorkspaceProvider";

const T: Record<string, string> = {
  Dashboard: "Inicio",
  Orders: "Pedidos",
  Invoices: "Facturas",
  Stock: "Inventario",
  Recipes: "Recetas",
  Menu: "Menú",
  Suppliers: "Proveedores",
  Ingredients: "Ingredientes",
  Reports: "Reportes",
  Insights: "Análisis",
  Settings: "Configuración",
  Account: "Cuenta",
  More: "Más",
  "Log out": "Cerrar sesión",
  "Signing out…": "Cerrando sesión…",
  "Install app": "Instalar app",
  "Kitchen control, without the admin": "Control de cocina, sin papeleo",
  "Loading restaurant…": "Cargando restaurante…",
  "Loading workspace…": "Cargando espacio…",
  "No restaurant selected": "Ningún restaurante seleccionado",
  "Kitchen workspace": "Espacio de cocina",
  "Settings, account and tools": "Configuración, cuenta y herramientas",

  Purchasing: "Compras",
  "Spend this month": "Gasto este mes",
  "Stock value": "Valor del inventario",
  "Actual COGS": "Costo real de ventas",
  "Food cost variance": "Variación del costo de alimentos",
  "Theoretical food cost": "Costo teórico de alimentos",
  "Actual vs theoretical": "Real vs teórico",
  "Selected site invoices": "Facturas del sitio seleccionado",
  "Latest selected-site stock": "Último inventario del sitio seleccionado",
  "Purchases and stock movement": "Compras y movimiento de inventario",
  "Actual versus theoretical": "Real frente a teórico",
  "Kitchen home": "Inicio de cocina",
  "What do you need to do?": "¿Qué necesitas hacer?",
  "View insights →": "Ver análisis →",
  "Build and send purchase orders": "Crear y enviar órdenes de compra",
  "Review supplier invoices": "Revisar facturas de proveedores",
  "Count stock and see movements": "Contar inventario y ver movimientos",
  "Cost recipes and prep": "Costear recetas y preparaciones",
  "Spot cost and performance changes": "Detectar cambios de costo y rendimiento",
  "Contacts, products and pricing": "Contactos, productos y precios",
  "COGS, spend and GP reporting": "Reportes de costos, gasto y margen",
  "Upload invoice": "Subir factura",
  "+ Upload invoice": "+ Subir factura",
  "Camera, gallery or file upload": "Cámara, galería o archivo",
  "Needs attention": "Requiere atención",
  "View all →": "Ver todo →",
  "No high-priority issues in this workspace.": "No hay asuntos de alta prioridad en este espacio.",
  "Top supplier spend": "Mayor gasto por proveedor",
  "No supplier spend recorded for this workspace.": "No hay gasto de proveedores registrado para este espacio.",

  "Accounts payable, invoice approvals and supplier spend.": "Cuentas por pagar, aprobación de facturas y gasto con proveedores.",
  "Export CSV": "Exportar CSV",
  Outstanding: "Pendiente por pagar",
  "Open invoices": "Facturas abiertas",
  "Due in 7 days": "Vencen en 7 días",
  Overdue: "Vencidas",
  "Accounts payable": "Cuentas por pagar",
  "Invoice inbox": "Bandeja de facturas",
  open: "abiertas",
  overdue: "vencidas",
  paid: "pagadas",
  all: "todas",
  "Loading…": "Cargando…",
  Refresh: "Actualizar",
  "Loading invoices...": "Cargando facturas…",
  "Fetching records from Supabase.": "Cargando registros del sistema.",
  "No invoices yet": "Todavía no hay facturas",
  "Upload your first supplier invoice.": "Sube tu primera factura de proveedor.",
  Supplier: "Proveedor",
  "Invoice number": "Número de factura",
  Date: "Fecha",
  Due: "Vence",
  Total: "Total",
  Approval: "Aprobación",
  "Order match": "Coincidencia con pedido",
  Payment: "Pago",
  Unknown: "Desconocido",
  "Approving…": "Aprobando…",
  Approve: "Aprobar",
  Approved: "Aprobada",
  unmatched: "sin conciliar",
  matched: "conciliada",
  discrepancy: "diferencia",
  Unpaid: "Sin pagar",
  Scheduled: "Programado",
  Paid: "Pagado",
  Disputed: "En disputa",
  Net: "Neto",
  VAT: "IVA",
  Gross: "Bruto",
  "Payment status": "Estado de pago",
  "Due date": "Fecha de vencimiento",

  Inventory: "Inventario",
  "Count what is actually in the kitchen. The list comes only from this restaurant's catalogue.": "Cuenta lo que realmente hay en cocina. La lista solo usa el catálogo de este restaurante.",
  "New count": "Nuevo conteo",
  "Save draft": "Guardar borrador",
  "Saving…": "Guardando…",
  "Complete count": "Finalizar conteo",
  "Count now": "Contar ahora",
  History: "Historial",
  Counted: "Contado",
  "Current value": "Valor actual",
  "Missing prices": "Precios faltantes",
  "Search ingredient or supplier…": "Buscar ingrediente o proveedor…",
  All: "Todo",
  "No stock items yet": "Todavía no hay artículos de inventario",
  "Upload supplier invoices first. Products will then appear here automatically.": "Primero sube facturas de proveedores. Los productos aparecerán aquí automáticamente.",
  "No supplier": "Sin proveedor",
  "price needed": "precio pendiente",
  "Fresh stock count ready.": "Nuevo conteo de inventario listo.",
  "Stock count saved.": "Conteo de inventario guardado.",

  "New order": "Nuevo pedido",
  "Who are you ordering from?": "¿A qué proveedor vas a pedir?",
  "Choose a supplier, tap quantities and send the PO from Kitchen Insights.": "Elige un proveedor, marca cantidades y envía la orden desde Kitchen Insights.",
  "Recent orders": "Pedidos recientes",
  "Latest purchasing": "Compras recientes",
  Repeat: "Repetir",
  "Send now": "Enviar ahora",
  "Mark sent": "Marcar enviado",
  Receive: "Recibir",
  Complete: "Completar",
  "Tap − / + or choose a quantity.": "Toca − / + o elige una cantidad.",
  "Estimated order": "Pedido estimado",
  items: "artículos",
  "Search product or SKU…": "Buscar producto o SKU…",
  Clear: "Limpiar",
  "Add regulars": "Agregar habituales",
  Order: "Pedido",
  Regular: "Habituales",
  "Product": "Producto",
  "In stock": "En inventario",
  Preferred: "Preferido",
  "Price unavailable": "Precio no disponible",
  Usual: "Habitual",
  "Learned from history": "Aprendido del historial",
  "Regularly ordered": "Pedidos habituales",
  "Audit trail": "Historial",
  "Order history": "Historial de pedidos",
  "Repeat order": "Repetir pedido",
  "Review order →": "Revisar pedido →",
  Review: "Revisar",
  "Check quantities, then send the PO.": "Revisa las cantidades y después envía la orden.",
  "Purchase order": "Orden de compra",
  "Order summary": "Resumen del pedido",
  "Send via": "Enviar por",
  Quantity: "Cantidad",
  Price: "Precio",
  "Line total": "Total de línea",
  "Delivery or order notes": "Notas de entrega o pedido",
  "Delivery instructions or a note for the supplier…": "Instrucciones de entrega o nota para el proveedor…",
  "Send order": "Enviar pedido",
  "Goods in": "Recepción",
  Ordered: "Pedido",
  Received: "Recibido",
  "Matches order": "Coincide con el pedido",
  "Confirm received": "Confirmar recepción",
  Cancel: "Cancelar",
  Draft: "Borrador",
  Sent: "Enviado",
  Completed: "Completado",

  "Recipe costing": "Costeo de recetas",
  "Build prep and menu recipes and calculate live costs from approved invoices.": "Crea recetas de preparación y menú y calcula costos en vivo con facturas aprobadas.",
  "Total recipes": "Recetas totales",
  "Prep and menu recipes": "Recetas de preparación y menú",
  "Yields set": "Rendimientos configurados",
  "Needed for portion costing": "Necesario para costear porciones",
  "Fully costed": "Costeadas por completo",
  "No ingredient prices missing": "Sin precios de ingredientes faltantes",
  "Yield or pricing still incomplete": "Rendimiento o precio aún incompleto",
  "Starts clean": "Empieza vacío",
  "Batch recipes": "Recetas de producción",
  "Prep recipes": "Recetas de preparación",
  "Sauces, marinades, dressings and prep batches.": "Salsas, marinados, aderezos y preparaciones.",
  "Menu dishes": "Platos del menú",
  "Menu recipes": "Recetas del menú",
  "Finished dishes linked to selling prices and menu costing.": "Platos terminados vinculados a precios de venta y costeo del menú.",
  Yield: "Rendimiento",
  "Not set": "Sin definir",
  "Batch cost": "Costo del lote",
  "Yield needed": "Falta rendimiento",
  Costed: "Costeada",
  "Save to cost": "Guardar para costear",

  Analysis: "Análisis",
  "Purchasing, COGS, supplier spend, stock movement and menu margin reporting.": "Compras, costo de ventas, gasto por proveedor, movimiento de inventario y margen del menú.",
  "View insights": "Ver análisis",
  Overview: "Resumen",
  "Purchases by supplier": "Compras por proveedor",
  "COGS & GP": "Costo de ventas y margen",
  "Price changes": "Cambios de precio",
  "Recipe margins": "Márgenes de recetas",
  "No prior comparison": "Sin comparación anterior",
  "Latest completed stock-count period": "Último periodo con conteos completados",
  "Recipe-based food cost": "Costo de alimentos según recetas",
  "Purchasing mix": "Distribución de compras",
  "Spend by supplier": "Gasto por proveedor",
  "Approve invoices to build this chart.": "Aprueba facturas para generar esta gráfica.",

  "Invoice": "Factura",
  "Invoice date": "Fecha de factura",
  Subtotal: "Subtotal",
  Save: "Guardar",
  Edit: "Editar",
  Delete: "Eliminar",
  Add: "Agregar",
  "Add item": "Agregar artículo",
  Back: "Volver",
  Next: "Siguiente",
  Previous: "Anterior",
  Continue: "Continuar",
  Pending: "Pendiente",
  Products: "Productos",
  Category: "Categoría",
  Unit: "Unidad",
  Notes: "Notas",
  Site: "Sitio",
  Team: "Equipo",
  "Invite user": "Invitar usuario",
  Role: "Rol",
  Owner: "Propietario",
  Admin: "Administrador",
  Member: "Miembro",
  Manager: "Gerente",
  Chef: "Chef",
  Viewer: "Solo lectura",
  "Email address": "Correo electrónico",
  Password: "Contraseña",
  "Sign in": "Iniciar sesión",
  "Forgot password?": "¿Olvidaste tu contraseña?",
  "Welcome back": "Bienvenido de nuevo",
  "Sign in to your workspace": "Inicia sesión en tu espacio",
  "Enter your details to continue to Kitchen Insights.": "Ingresa tus datos para continuar a Kitchen Insights.",
  "First time here?": "¿Primera vez aquí?",
  "Activate account": "Activar cuenta",
};

const P: Array<[RegExp, string]> = [
  [/^(\d+) suppliers · /, "$1 proveedores · "],
  [/ recorded$/, " registrados"],
  [/^(\d+) products$/, "$1 productos"],
  [/^(\d+) product$/, "$1 producto"],
  [/^(\d+) items$/, "$1 artículos"],
  [/^(\d+) item$/, "$1 artículo"],
  [/^(\d+) ingredients$/, "$1 ingredientes"],
  [/^Used in /, "Usada en "],
  [/ prices missing$/, " precios faltantes"],
  [/ price missing$/, " precio faltante"],
  [/^Every (\d+) days$/, "Cada $1 días"],
  [/^Last /, "Último "],
  [/^Top (\d+)$/, "Top $1"],
  [/ of sales$/, " de ventas"],
  [/ above last month$/, " por encima del mes pasado"],
  [/ below last month$/, " por debajo del mes pasado"],
  [/high-priority issues/g, "asuntos de alta prioridad"],
  [/high-priority issue/g, "asunto de alta prioridad"],
  [/ invoices\b/g, " facturas"],
  [/Purchasing spend decreased/g, "El gasto de compras disminuyó"],
  [/spend decreased/g, "redujo su gasto"],
  [/Recorded supplier spend is/g, "El gasto registrado con proveedores es"],
  [/this month versus/g, "este mes frente a"],
  [/This month/g, "Este mes"],
  [/has been recorded compared with/g, "se ha registrado frente a"],
  [/last month/g, "el mes pasado"],
  [/Estimated total:/g, "Total estimado:"],
  [/Delivery notes/g, "Notas de entrega"],
  [/Purchase order/g, "Orden de compra"],
  [/purchase order/g, "orden de compra"],
  [/Payment status for/g, "Estado de pago de"],
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
  core = T[core] ?? core;
  for (const [pattern, replacement] of P) core = core.replace(pattern, replacement);
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
  if (!(root instanceof Element)) return;
  if (["SCRIPT", "STYLE", "CODE", "PRE"].includes(root.tagName)) return;
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

function reset() {
  document.documentElement.lang = "en";
  delete document.documentElement.dataset.locale;
  delete document.documentElement.dataset.currency;
}

function observe() {
  apply();
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") translateNode(mutation.target);
      mutation.addedNodes.forEach(translateNode);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  return () => observer.disconnect();
}

export function HostTenantLocaleBridge() {
  useEffect(() => {
    if (!isMexicaliHost()) return;
    return observe();
  }, []);
  return null;
}

export function WorkspaceTenantLocaleBridge() {
  const { activeWorkspace } = useWorkspace();
  const mexicali = isMexicaliHost() || activeWorkspace?.organisationName.trim().toLowerCase() === "benditos mexicali";
  useEffect(() => {
    if (!mexicali) {
      reset();
      return;
    }
    return observe();
  }, [mexicali]);
  return null;
}
