/* =========================================================
   INSIGHTS
   ========================================================= */

.insights-page {
  padding-bottom: 48px;
}

.insights-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.insights-header h1 {
  margin: 4px 0 6px;
  font-size: 34px;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.insights-subtitle {
  margin: 0;
  color: #72756f;
  font-size: 14px;
}

.page-eyebrow {
  margin: 0;
  color: #8a8d87;
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.insights-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.insights-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.insight-summary-card {
  background: #fff;
  border: 1px solid #e5e3dd;
  border-radius: 14px;
  padding: 18px;
}

.insight-summary-label {
  display: block;
  margin-bottom: 13px;
  color: #7b7e78;
  font-size: 12px;
  font-weight: 600;
}

.insight-summary-value {
  color: #193c34;
  font-size: 27px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: -0.03em;
}

.insight-summary-card p {
  margin: 9px 0 0;
  color: #8a8d87;
  font-size: 11px;
  line-height: 1.45;
}

.attention-panel {
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

.attention-panel-copy {
  display: flex;
  align-items: center;
  gap: 15px;
}

.attention-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  font-size: 18px;
  font-weight: 800;
}

.attention-eyebrow {
  margin: 0 0 5px;
  color: rgba(255, 255, 255, 0.58);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.attention-panel h2 {
  margin: 0;
  font-size: 17px;
  line-height: 1.2;
}

.attention-panel-copy p:last-child {
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.attention-impact {
  flex: 0 0 auto;
  text-align: right;
}

.attention-impact span {
  display: block;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 10px;
}

.attention-impact strong {
  font-size: 21px;
}

.insights-performance-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.performance-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 64px;
  padding: 14px 16px;
  background: #f5f3ed;
  border: 1px solid #e4e1d9;
  border-radius: 12px;
}

.performance-card span {
  color: #747770;
  font-size: 11px;
}

.performance-card strong {
  color: #183d34;
  font-size: 18px;
}

.metric-negative {
  color: #b34d35 !important;
}

.metric-positive {
  color: #31725e !important;
}

.insights-content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.75fr);
  gap: 16px;
  align-items: start;
}

.insights-main-panel,
.insights-side-card {
  background: #fff;
  border: 1px solid #e4e2dc;
  border-radius: 15px;
}

.insights-main-panel {
  padding: 20px;
}

.insights-panel-header,
.insights-side-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.insights-panel-header h2,
.insights-side-header h2 {
  margin: 5px 0 0;
  color: #222622;
  font-size: 18px;
  line-height: 1.2;
}

.insights-count {
  color: #8a8d86;
  font-size: 11px;
}

.insights-filter-bar {
  display: flex;
  gap: 7px;
  margin: 18px 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.insights-filter-bar::-webkit-scrollbar {
  display: none;
}

.insight-filter-button {
  flex: 0 0 auto;
  border: 1px solid #dedbd4;
  background: #fff;
  color: #686b65;
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.insight-filter-button-active {
  background: #173f35;
  border-color: #173f35;
  color: #fff;
}

.insight-card-list {
  display: grid;
  gap: 10px;
}

.insight-card {
  border: 1px solid #e6e3dc;
  border-radius: 13px;
  padding: 16px;
}

.insight-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.insight-card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.insight-severity,
.insight-category {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 9px;
  line-height: 1;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.insight-severity-high {
  background: #fae9e4;
  color: #9d412c;
}

.insight-severity-medium {
  background: #fff0db;
  color: #9b641d;
}

.insight-severity-low {
  background: #e9f2ed;
  color: #3d705e;
}

.insight-category {
  background: #f2f1ed;
  color: #787b74;
}

.insight-card-metric {
  color: #173f35;
  font-size: 17px;
  line-height: 1;
}

.insight-card h3 {
  margin: 13px 0 6px;
  color: #252925;
  font-size: 15px;
  line-height: 1.25;
}

.insight-card > p {
  margin: 0;
  color: #747770;
  font-size: 12px;
  line-height: 1.55;
}

.insight-impact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding: 9px 10px;
  background: #f8f6f1;
  border-radius: 8px;
  color: #797c75;
  font-size: 10px;
}

.insight-impact-row strong {
  color: #343934;
  font-size: 12px;
}

.insight-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 13px;
}

.insight-action-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #d46a32;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}

.insight-action-link:hover {
  text-decoration: underline;
}

.insights-empty-state {
  padding: 44px 20px;
  text-align: center;
}

.insights-empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin: 0 auto 13px;
  border-radius: 50%;
  background: #eaf2ed;
  color: #31725e;
  font-size: 17px;
  font-weight: 800;
}

.insights-empty-state h3 {
  margin: 0;
  color: #303530;
  font-size: 15px;
}

.insights-empty-state p {
  max-width: 430px;
  margin: 7px auto 0;
  color: #81847d;
  font-size: 12px;
  line-height: 1.5;
}

.show-more-insights {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border: 0;
  background: transparent;
  color: #d46a32;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.insights-sidebar-panel {
  display: grid;
  gap: 14px;
}

.insights-side-card {
  padding: 17px;
}

.insights-side-header a {
  color: #d46a32;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
}

.insights-side-empty {
  margin: 18px 0 3px;
  color: #858881;
  font-size: 11px;
  line-height: 1.5;
}

.supplier-spend-list {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.supplier-spend-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.supplier-spend-heading span {
  min-width: 0;
  color: #404440;
  font-size: 11px;
  font-weight: 600;
}

.supplier-spend-heading strong {
  color: #242824;
  font-size: 11px;
}

.supplier-spend-track {
  width: 100%;
  height: 5px;
  overflow: hidden;
  background: #eeece6;
  border-radius: 999px;
}

.supplier-spend-bar {
  height: 100%;
  background: #d46a32;
  border-radius: inherit;
}

.supplier-spend-row small {
  display: block;
  margin-top: 5px;
  color: #a0a29d;
  font-size: 9px;
}

.coverage-list {
  display: grid;
  margin-top: 13px;
}

.coverage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid #efede8;
}

.coverage-row:last-child {
  border-bottom: 0;
}

.coverage-row span {
  color: #787b75;
  font-size: 11px;
}

.coverage-row strong {
  color: #303530;
  font-size: 12px;
}

.coverage-row-total {
  margin-top: 3px;
  padding-top: 14px;
}

.coverage-row-total strong {
  color: #173f35;
  font-size: 15px;
}

@media (max-width: 1100px) {
  .insights-summary-grid,
  .insights-performance-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .insights-content-grid {
    grid-template-columns: 1fr;
  }

  .insights-sidebar-panel {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .insights-page {
    padding-top: 18px !important;
  }

  .insights-header {
    display: block;
  }

  .insights-header h1 {
    font-size: 28px;
  }

  .insights-header-actions {
    margin-top: 16px;
  }

  .insights-summary-grid,
  .insights-performance-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .insight-summary-card {
    padding: 14px;
  }

  .insight-summary-value {
    font-size: 21px;
  }

  .attention-panel {
    align-items: flex-start;
    display: block;
  }

  .attention-impact {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    text-align: left;
  }

  .insights-main-panel {
    padding: 14px;
  }

  .insights-sidebar-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .insights-summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .insights-performance-grid {
    grid-template-columns: 1fr;
  }

  .performance-card {
    min-height: 54px;
  }

  .insights-header-actions {
    width: 100%;
  }

  .insights-header-actions a {
    flex: 1;
    text-align: center;
  }
}
