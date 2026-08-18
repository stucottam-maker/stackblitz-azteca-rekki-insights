"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { supabase } from "../../lib/supabase";

type Relation<T> = T | T[] | null;
type SupplierProductRow = {
  id: string;
  supplier_product_name: string;
  supplier_product_code: string | null;
  price_unit: string | null;
  latest_price: number | null;
  preferred: boolean | null;
  supplier: Relation<{ id: string; name: string }>;
  ingredient: Relation<{ id: string; name: string; category: string | null }>;
};

type ProductView = {
  id: string;
  name: string;
  code: string;
  unit: string;
  price: string;
  preferred: boolean;
  supplier: string;
  ingredient: string;
  category: string;
};

function first<T>(value: Relation<T>): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export default function SupplierCataloguePage() {
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("All");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from("supplier_products")
        .select(`
          id,
          supplier_product_name,
          supplier_product_code,
          price_unit,
          latest_price,
          preferred,
          supplier:suppliers(id,name),
          ingredient:ingredients(id,name,category)
        `)
        .order("updated_at", { ascending: false })
        .limit(1000);

      if (error) throw error;

      setProducts(
        ((data ?? []) as unknown as SupplierProductRow[]).map((row) => {
          const supplierRow = first(row.supplier);
          const ingredientRow = first(row.ingredient);
          return {
            id: row.id,
            name: row.supplier_product_name ?? "",
            code: row.supplier_product_code ?? "",
            unit: row.price_unit ?? "",
            price: row.latest_price === null ? "" : String(row.latest_price),
            preferred: Boolean(row.preferred),
            supplier: supplierRow?.name ?? "Unknown supplier",
            ingredient: ingredientRow?.name ?? "Unmapped ingredient",
            category: ingredientRow?.category ?? "Other",
          };
        })
      );
    } catch (error: any) {
      setMessage(error?.message || "Could not load supplier products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const suppliers = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.supplier))).sort()],
    [products]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const supplierMatch = supplier === "All" || product.supplier === supplier;
      const searchMatch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.ingredient.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query);
      return supplierMatch && searchMatch;
    });
  }, [products, search, supplier]);

  function change(id: string, field: keyof ProductView, value: string | boolean) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  }

  async function save(product: ProductView) {
    setSaving(product.id);
    setMessage("");
    try {
      const { error } = await supabase
        .from("supplier_products")
        .update({
          supplier_product_name: product.name,
          supplier_product_code: product.code || null,
          price_unit: product.unit || null,
          latest_price: product.price.trim() === "" ? null : Number(product.price),
          preferred: product.preferred,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id);
      if (error) throw error;
      setMessage(`${product.name} saved.`);
    } catch (error: any) {
      setMessage(error?.message || "Could not save supplier product");
    } finally {
      setSaving("");
    }
  }

  return (
    <div className="page supplier-catalogue-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Purchasing data</p>
          <h1>Supplier catalogue</h1>
          <p className="page-description">
            Edit the live supplier product catalogue stored in Supabase instead of changing code.
          </p>
        </div>
        <Link href="/suppliers" className="secondary-inline-button">← Suppliers</Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Products</p>
          <p className="stat-value">{loading ? "—" : products.length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Suppliers</p>
          <p className="stat-value">{loading ? "—" : Math.max(0, suppliers.length - 1)}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Preferred</p>
          <p className="stat-value">{loading ? "—" : products.filter((product) => product.preferred).length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Mapped ingredients</p>
          <p className="stat-value">{loading ? "—" : products.filter((product) => product.ingredient !== "Unmapped ingredient").length}</p>
        </article>
      </section>

      <section className="panel">
        <div className="invoice-toolbar">
          <input
            type="search"
            placeholder="Search product, ingredient or SKU…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={supplier} onChange={(event) => setSupplier(event.target.value)}>
            {suppliers.map((name) => <option key={name}>{name}</option>)}
          </select>
          <button className="secondary-button" type="button" onClick={() => void load()}>
            Refresh
          </button>
        </div>

        {message && <div className="notice">{message}</div>}

        {loading ? (
          <div className="empty-table-message">Loading catalogue…</div>
        ) : (
          <div className="catalogue-editor-list">
            {filtered.map((product) => (
              <article className="catalogue-editor-row" key={product.id}>
                <div className="catalogue-editor-heading">
                  <div>
                    <strong>{product.ingredient}</strong>
                    <span>{product.supplier} · {product.category}</span>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={product.preferred}
                      onChange={(event) => change(product.id, "preferred", event.target.checked)}
                    />
                    Preferred
                  </label>
                </div>
                <div className="catalogue-editor-fields">
                  <label>
                    <span>Supplier product</span>
                    <input value={product.name} onChange={(event) => change(product.id, "name", event.target.value)} />
                  </label>
                  <label>
                    <span>SKU / code</span>
                    <input value={product.code} onChange={(event) => change(product.id, "code", event.target.value)} />
                  </label>
                  <label>
                    <span>Price unit</span>
                    <input value={product.unit} onChange={(event) => change(product.id, "unit", event.target.value)} />
                  </label>
                  <label>
                    <span>Latest price</span>
                    <input type="number" step="0.01" inputMode="decimal" value={product.price} onChange={(event) => change(product.id, "price", event.target.value)} />
                  </label>
                  <button className="primary-button" type="button" disabled={saving === product.id} onClick={() => void save(product)}>
                    {saving === product.id ? "Saving…" : "Save"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
