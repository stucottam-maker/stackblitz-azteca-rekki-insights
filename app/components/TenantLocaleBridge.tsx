"use client";

import { useEffect } from "react";
import { useWorkspace } from "./WorkspaceProvider";

const EXACT_TRANSLATIONS: Record<string, string> = {
  "Dashboard": "Inicio",
  "Orders": "Pedidos",
  "Invoices": "Facturas",
  "Stock": "Inventario",
  "Recipes": "Recetas",
  "Menu": "Menú",
  "Suppliers": "Proveedores",
  "Ingredients": "Ingredientes",
  "Reports": "Reportes",
  "Insights": "Análisis",
  "Settings": "Configuración",
  "Account": "Cuenta",
  "More": "Más",
  "Log out": "Cerrar sesión",
  "Signing out…": "Cerrando sesión…",
  "Install app": "Instalar app",
  "Kitchen control, without the admin": "Control de cocina, sin papeleo",
  "Loading restaurant…": "Cargando restaurante…",
  "Loading workspace…": "Cargando espacio…",
  "No restaurant selected": "Ningún restaurante seleccionado",
  "Kitchen workspace": "Espacio de cocina",
  "Settings, account and tools": "Configuración, cuenta y herramientas",
  "Spend this month": "Gasto este mes",
  "Stock value": "Valor del inventario",
  "Actual COGS": "Costo real de ventas",
  "Food cost variance": "Variación del costo de alimentos",
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
  "Camera, gallery or file upload": "Cámara, galería o archivo",
  "Needs attention": "Requiere atención",
  "View all →": "Ver todo →",
  "No high-priority issues in this workspace.": "No hay asuntos de alta prioridad en este espacio.",
  "Purchasing": "Compras",
  "Top supplier spend": "Mayor gasto por proveedor",
  "No supplier spend recorded for this workspace.": "No hay gasto de proveedores registrado para este espacio.",
  "Recipe costing": "Costeo de recetas",
  "Build prep and menu recipes and calculate live costs from approved invoices.": "Crea recetas de preparación y menú y calcula costos en vivo con facturas aprobadas.",
  "Total recipes": "Recetas totales",
  "Prep and menu recipes": "Recetas de preparación y menú",
  "Yields set": "Rendimientos configurados",
  "Needed for portion costing": "Necesario para costear porciones",
  "Fully costed": "Costeadas por completo",
  "No ingredient prices missing": "Sin precios de ingredientes faltantes",
  "Yield or pricing still incomplete": "Rendimiento o precio aún incompleto",
  "Batch recipes": "Recetas de producción",
  "Prep recipes": "Recetas de preparación",
  "Purchase orders": "Órdenes de compra",
  "New order": "Nuevo pedido",
  "Send order": "Enviar pedido",
  "Receive": "Recibir",
  "Received": "Recibido",
  "Draft": "Borrador",
  "Sent": "Enviado",
  "Complete": "Completar",
  "Completed": "Completado",
  "Supplier": "Proveedor",
  "Quantity": "Cantidad",
  "Unit price": "Precio unitario",
  "Estimated total": "Total estimado",
  "Delivery notes": "Notas de entrega",
  "Search": "Buscar",
  "Search ingredients": "Buscar ingredientes",
  "Search suppliers": "Buscar proveedores",
  "Search recipes": "Buscar recetas",
  "Invoice": "Factura",
  "Invoice date": "Fecha de factura",
  "Invoice number": "Número de factura",
  "Total": "Total",
  "Subtotal": "Subtotal",
  "VAT": "IVA",
  "Save": "Guardar",
  "Cancel": "Cancelar",
  "Edit": "Editar",
  "Delete": "Eliminar",
  "Add": "Agregar",
  "Add item": "Agregar artículo",
  "Back": "Volver",
  "Next": "Siguiente",
  "Previous": "Anterior",
  "Continue": "Continuar",
  "Review": "Revisar",
  "Approve": "Aprobar",
  "Approved": "Aprobado",
  "Pending": "Pendiente",
  "Price": "Precio",
  "Product": "Producto",
  "Products": "Productos",
  "Category": "Categoría",
  "Unit": "Unidad",
  "Notes": "Notas",
  "Site": "Sitio",
  "Team": "Equipo",
  "Invite user": "Invitar usuario",
  "Role": "Rol",
  "Owner": "Propietario",
  "Admin": "Administrador",
  "Member": "Miembro",
  "Manager": "Gerente",
  "Chef": "Chef",
  "Viewer": "Solo lectura",
  "Email address": "Correo electrónico",
  "Password": "Contraseña",
  "Sign in": "Iniciar sesión",
  "Forgot password?": "¿Olvidaste tu contraseña?",
  "Welcome back": "Bienvenido de nuevo",
  "Sign in to your workspace": "Inicia sesión en tu espacio",
  "Enter your details to continue to Kitchen Insights.": "Ingresa tus datos para continuar a Kitchen Insights.",
  "First time here?": "¿Primera vez aquí?",
  "Activate account": "Activar cuenta",
};

const PHRASE_TRANSLATIONS: Array<[RegExp, string]> = [
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
];

function isMexicaliHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname.toLowerCase().startsWith("benditosmexicali.");
}

function translateText(value: string) {
  if (!value.trim()) return value;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const core = value.trim();
  let translated = EXACT_TRANSLATIONS[core] ?? core;
  for (const [pattern, replacement] of PHRASE_TRANSLATIONS) {
    translated = translated.replace(pattern, replacement);
  }
  translated = translated.replace(/£(?=\s?\d)/g, "$").replace(/\bGBP\b/g, "MXN");
  return `${leading}${translated}${trailing}`;
}

function translateElement(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "CODE", "PRE"].includes(parent.tagName)) return;
    const current = root.nodeValue ?? "";
    const next = translateText(current);
    if (next !== current) root.nodeValue = next;
    return;
  }

  if (!(root instanceof Element)) return;
  if (["SCRIPT", "STYLE", "CODE", "PRE"].includes(root.tagName)) return;

  for (const attr of ["placeholder", "title", "aria-label"]) {
    const current = root.getAttribute(attr);
    if (!current) continue;
    const next = translateText(current);
    if (next !== current) root.setAttribute(attr, next);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateElement(node);
    node = walker.nextNode();
  }
}

function applyMexicaliPresentation() {
  document.documentElement.lang = "es-MX";
  document.documentElement.dataset.locale = "es-MX";
  document.documentElement.dataset.currency = "MXN";
  translateElement(document.body);
}

function resetPresentation() {
  document.documentElement.lang = "en";
  delete document.documentElement.dataset.locale;
  delete document.documentElement.dataset.currency;
}

export function HostTenantLocaleBridge() {
  useEffect(() => {
    if (!isMexicaliHost()) return;
    applyMexicaliPresentation();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateElement(mutation.target);
        mutation.addedNodes.forEach(translateElement);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);
  return null;
}

export function WorkspaceTenantLocaleBridge() {
  const { activeWorkspace } = useWorkspace();
  const mexicali =
    isMexicaliHost() ||
    activeWorkspace?.organisationName.trim().toLowerCase() === "benditos mexicali";

  useEffect(() => {
    if (!mexicali) {
      resetPresentation();
      return;
    }

    applyMexicaliPresentation();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateElement(mutation.target);
        mutation.addedNodes.forEach(translateElement);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [mexicali]);

  return null;
}
