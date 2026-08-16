/* =========================================================
   SIDEBAR
   ========================================================= */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  width: 220px;
  padding: 18px 14px;

  background: #173f35;
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  z-index: 40;
}

.sidebar-brand {
  margin-bottom: 22px;
}

.sidebar-brand-link {
  display: flex;
  align-items: center;
  gap: 11px;

  color: #fff;
  text-decoration: none;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  width: 38px;
  height: 38px;

  border-radius: 11px;

  background: #f1e9db;
  color: #173f35;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.sidebar-brand-copy {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.sidebar-brand-copy strong {
  color: #fff;

  font-size: 13px;
  line-height: 1.2;

  white-space: nowrap;
}

.sidebar-brand-copy span {
  margin-top: 3px;

  color: rgba(255, 255, 255, 0.48);

  font-size: 9px;
  line-height: 1.2;

  white-space: nowrap;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;

  gap: 4px;

  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;

  gap: 10px;

  min-height: 42px;

  padding: 8px 10px;

  border-radius: 10px;

  color: rgba(255, 255, 255, 0.66);

  font-size: 12px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.nav-link-active {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  width: 22px;
  height: 22px;

  color: inherit;

  font-size: 15px;
  line-height: 1;
}

.nav-label {
  min-width: 0;

  white-space: nowrap;
}

.sidebar-footer {
  margin-top: 18px;
  padding-top: 14px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-footer-status {
  display: flex;
  align-items: center;

  gap: 9px;

  padding: 6px 4px;
}

.sidebar-status-dot {
  flex: 0 0 auto;

  width: 7px;
  height: 7px;

  border-radius: 999px;

  background: #f29a5a;
}

.sidebar-footer-status div {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.sidebar-footer-status strong {
  color: rgba(255, 255, 255, 0.82);

  font-size: 10px;
}

.sidebar-footer-status span {
  margin-top: 2px;

  color: rgba(255, 255, 255, 0.4);

  font-size: 9px;
}

.main-content {
  margin-left: 220px;
}

/* MOBILE SIDEBAR */

@media (max-width: 768px) {
  .sidebar {
    position: sticky;
    top: 0;
    left: auto;
    bottom: auto;

    width: 100%;
    height: auto;

    padding: 8px 10px;

    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .sidebar-brand {
    margin-bottom: 6px;
  }

  .sidebar-brand-link {
    gap: 8px;
  }

  .sidebar-logo {
    width: 29px;
    height: 29px;

    border-radius: 8px;

    font-size: 9px;
  }

  .sidebar-brand-copy strong {
    font-size: 11px;
  }

  .sidebar-brand-copy span {
    display: none;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: row;

    gap: 5px;

    width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    padding-bottom: 2px;

    scrollbar-width: none;
  }

  .sidebar-nav::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    flex: 0 0 auto;

    min-height: 34px;

    padding: 6px 9px;

    border-radius: 8px;

    font-size: 10px;
  }

  .nav-icon {
    width: 17px;
    height: 17px;

    font-size: 12px;
  }

  .sidebar-footer {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }
}
