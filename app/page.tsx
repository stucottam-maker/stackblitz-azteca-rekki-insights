/* =========================================================
   DASHBOARD
   ========================================================= */

.dashboard-page {
  padding-bottom: 48px;
}

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.dashboard-header h1 {
  margin: 4px 0 6px;
  font-size: 34px;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.dashboard-subtitle {
  margin: 0;
  color: #747770;
  font-size: 14px;
}

.dashboard-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard-overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.dashboard-overview-card {
  background: #fff;
  border: 1px solid #e5e3dd;
  border-radius: 14px;
  padding: 17px;
}

.dashboard-overview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dashboard-overview-top span {
  color: #777a74;
  font-size: 11px;
  font-weight: 600;
}

.dashboard-overview-top a {
  color: #d46a32;
  font-size: 9px;
  font-weight: 700;
  text-decoration: none;
}

.dashboard-overview-card > strong {
  display: block;
  margin-top: 13px;
  color: #173f35;
  font-size: 26px;
  line-height: 1;
  letter-spacing: -0.03em;
}

.dashboard-overview-card > p {
  margin: 9px 0 0;
  color: #8b8e87;
  font-size: 10px;
  line-height: 1.4;
}

.dashboard-attention-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  margin-bottom: 16px;
  padding: 18px 20px;

  background: #173f35;
  border-radius: 15px;
  color: #fff;
}

.dashboard-attention-copy {
  display: flex;
  align-items: center;
  gap: 14px;
}

.dashboard-attention-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  width: 38px;
  height: 38px;

  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;

  font-size: 17px;
  font-weight: 800;
}

.dashboard-dark-eyebrow {
  color: rgba(255, 255, 255, 0.5);
}

.dashboard-attention-card h2 {
  margin: 5px 0 4px;
  font-size: 17px;
  line-height: 1.2;
}

.dashboard-attention-card p:last-child {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 11px;
  line-height: 1.45;
}

.dashboard-attention-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  flex: 0 0 auto;

  padding: 9px 12px;

  background: #f0e7d8;
  border-radius: 9px;

  color: #173f35;
  font-size: 10px;
  font-weight: 750;
  text-decoration: none;
}

.dashboard-main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(280px, 0.75fr);
  gap: 16px;
  align-items: start;
  margin-bottom: 16px;
}

.dashboard-side-column {
  display: grid;
  gap: 14px;
}

.dashboard-panel,
.dashboard-cogs-card {
  background: #fff;
  border: 1px solid #e4e2dc;
  border-radius: 15px;
}

.dashboard-panel {
  padding: 18px;
}

.dashboard-panel-header,
.dashboard-cogs-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.dashboard-panel-header h2,
.dashboard-cogs-header h2 {
  margin: 5px 0 0;
  color: #272b27;
  font-size: 18px;
  line-height: 1.2;
}

.dashboard-panel-header > a,
.dashboard-cogs-header > a {
  color: #d46a32;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
}

.dashboard-insight-list {
  display: grid;
  margin-top: 15px;
}

.dashboard-insight-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  padding: 14px 0;

  border-bottom: 1px solid #eeece7;

  color: inherit;
  text-decoration: none;
}

.dashboard-insight-row:last-child {
  border-bottom: 0;
}

.dashboard-insight-main {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  min-width: 0;
}

.dashboard-insight-dot {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border-radius: 999px;
}

.dashboard-insight-dot-high {
  background: #bc553b;
}

.dashboard-insight-dot-medium {
  background: #d08a31;
}

.dashboard-insight-dot-low {
  background: #4e846f;
}

.dashboard-insight-main strong {
  display: block;
  color: #303430;
  font-size: 12px;
  line-height: 1.35;
}

.dashboard-insight-main p {
  margin: 4px 0 0;
  color: #858880;
  font-size: 10px;
  line-height: 1.45;
}

.dashboard-insight-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.dashboard-insight-meta strong {
  color: #173f35;
  font-size: 12px;
}

.dashboard-insight-meta span {
  color: #d46a32;
  font-size: 13px;
}

.dashboard-empty-state {
  padding: 42px 18px;
  text-align: center;
}

.dashboard-empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  margin: 0 auto 12px;

  background: #eaf2ed;
  border-radius: 999px;

  color: #31725e;
  font-weight: 800;
}

.dashboard-empty-state h3 {
  margin: 0;
  font-size: 14px;
  color: #303430;
}

.dashboard-empty-state p {
  max-width: 430px;
  margin: 7px auto 0;
  color: #858880;
  font-size: 11px;
  line-height: 1.5;
}

.dashboard-side-empty {
  margin: 17px 0 2px;
  color: #858880;
  font-size: 11px;
  line-height: 1.5;
}

.dashboard-supplier-list {
  display: grid;
  margin-top: 12px;
}

.dashboard-supplier-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  padding: 11px 0;
  border-bottom: 1px solid #efede8;
}

.dashboard-supplier-row:last-child {
  border-bottom: 0;
}

.dashboard-supplier-row > div {
  display: flex;
  flex-direction: column;
}

.dashboard-supplier-row > div strong {
  color: #373b37;
  font-size: 11px;
}

.dashboard-supplier-row > div span {
  margin-top: 2px;
  color: #9a9d96;
  font-size: 9px;
}

.dashboard-supplier-row > strong {
  color: #173f35;
  font-size: 11px;
}

.dashboard-status-list {
  display: grid;
  margin-top: 12px;
}

.dashboard-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 11px 0;

  border-bottom: 1px solid #efede8;

  color: inherit;
  text-decoration: none;
}

.dashboard-status-row:last-child {
  border-bottom: 0;
}

.dashboard-status-row span {
  color: #767973;
  font-size: 11px;
}

.dashboard-status-row strong {
  color: #303430;
  font-size: 12px;
}

.dashboard-cogs-card {
  padding: 18px;
}

.dashboard-cogs-grid {
  display: grid;
  grid-template-columns:
    minmax(100px, 1fr)
    32px
    minmax(100px, 1fr)
    32px
    minmax(100px, 1fr)
    32px
    minmax(120px, 1.15fr);

  align-items: center;

  gap: 8px;

  margin-top: 18px;
}

.dashboard-cogs-grid > div:not(.dashboard-cogs-symbol) {
  padding: 13px 14px;

  background: #f8f6f1;
  border-radius: 10px;
}

.dashboard-cogs-grid span {
  display: block;
  color: #858880;
  font-size: 10px;
}

.dashboard-cogs-grid strong {
  display: block;
  margin-top: 5px;
  color: #303430;
  font-size: 15px;
}

.dashboard-cogs-symbol {
  text-align: center;
  color: #9a9d96;
  font-size: 20px;
}

.dashboard-cogs-result {
  background: #eaf1ed !important;
}

.dashboard-cogs-result strong {
  color: #173f35;
  font-size: 17px;
}

@media (max-width: 1100px) {
  .dashboard-overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-main-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-side-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-cogs-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .dashboard-cogs-symbol {
    display: none;
  }

  .dashboard-cogs-result {
    grid-column: span 3;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding-top: 18px !important;
  }

  .dashboard-header {
    display: block;
  }

  .dashboard-header h1 {
    font-size: 28px;
  }

  .dashboard-header-actions {
    margin-top: 16px;
  }

  .dashboard-overview-grid {
    gap: 9px;
  }

  .dashboard-overview-card {
    padding: 14px;
  }

  .dashboard-overview-card > strong {
    font-size: 21px;
  }

  .dashboard-attention-card {
    display: block;
  }

  .dashboard-attention-link {
    margin-top: 14px;
  }

  .dashboard-side-column {
    grid-template-columns: 1fr;
  }

  .dashboard-cogs-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-cogs-result {
    grid-column: auto;
  }
}

@media (max-width: 480px) {
  .dashboard-overview-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-header-actions {
    width: 100%;
  }

  .dashboard-header-actions a {
    flex: 1;
    text-align: center;
  }

  .dashboard-panel {
    padding: 14px;
  }

  .dashboard-insight-row {
    align-items: flex-start;
  }

  .dashboard-insight-meta strong {
    display: none;
  }
}
