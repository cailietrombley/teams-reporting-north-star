(function () {
  'use strict';

  /* ================================================================
     MOCK DATA — Evergreen Harvest Co. franchise locations
     ================================================================ */
  const LOCATIONS = [
    {
      name: 'Living Root Kitchen NJ',
      brand: 'Living Root Kitchen',
      state: 'NJ',
      color: '#1C6FE4',
      dailySends: 48,
      openRate: 38.2,
      clickRate: 8.2,
      deliverability: 97.5,
      bounceRate: 2.1,
      unsubRate: 0.4,
      contacts: 4820,
      newContacts: 126,
      prevOpenDelta: 2.1,
      prevClickDelta: 0.8,
      prevSendsMult: 0.92,
      prevDelivDelta: -0.3,
    },
    {
      name: 'Living Root Kitchen NY',
      brand: 'Living Root Kitchen',
      state: 'NY',
      color: '#1C6FE4',
      dailySends: 52,
      openRate: 36.8,
      clickRate: 7.1,
      deliverability: 96.8,
      bounceRate: 2.4,
      unsubRate: 0.6,
      contacts: 5340,
      newContacts: 98,
      prevOpenDelta: 1.5,
      prevClickDelta: 0.5,
      prevSendsMult: 0.88,
      prevDelivDelta: -0.5,
    },
    {
      name: 'Greenway Market CT',
      brand: 'Greenway Market',
      state: 'CT',
      color: '#2B88F0',
      dailySends: 35,
      openRate: 34.5,
      clickRate: 5.8,
      deliverability: 95.2,
      bounceRate: 2.8,
      unsubRate: 0.8,
      contacts: 3210,
      newContacts: 87,
      prevOpenDelta: -0.3,
      prevClickDelta: 0.2,
      prevSendsMult: 1.05,
      prevDelivDelta: -0.8,
    },
    {
      name: 'Greenway Market MA',
      brand: 'Greenway Market',
      state: 'MA',
      color: '#2B88F0',
      dailySends: 42,
      openRate: 40.1,
      clickRate: 5.5,
      deliverability: 97.1,
      bounceRate: 1.9,
      unsubRate: 0.5,
      contacts: 4150,
      newContacts: 142,
      prevOpenDelta: 4.2,
      prevClickDelta: 1.1,
      prevSendsMult: 0.95,
      prevDelivDelta: 0.2,
    },
    {
      name: 'Greenway Market RI',
      brand: 'Greenway Market',
      state: 'RI',
      color: '#2B88F0',
      dailySends: 12,
      openRate: 28.3,
      clickRate: 2.2,
      deliverability: 91.4,
      bounceRate: 3.6,
      unsubRate: 1.8,
      contacts: 1890,
      newContacts: 23,
      prevOpenDelta: -2.5,
      prevClickDelta: -0.8,
      prevSendsMult: 1.1,
      prevDelivDelta: -2.1,
    },
    {
      name: 'PureField Produce VT',
      brand: 'PureField Produce',
      state: 'VT',
      color: '#5BA3F5',
      dailySends: 8,
      openRate: 25.1,
      clickRate: 1.8,
      deliverability: 88.2,
      bounceRate: 4.1,
      unsubRate: 2.2,
      contacts: 1240,
      newContacts: 15,
      prevOpenDelta: -3.1,
      prevClickDelta: -1.2,
      prevSendsMult: 1.15,
      prevDelivDelta: -3.5,
    },
    {
      name: 'PureField Produce ME',
      brand: 'PureField Produce',
      state: 'ME',
      color: '#5BA3F5',
      dailySends: 15,
      openRate: 29.6,
      clickRate: 2.8,
      deliverability: 92.0,
      bounceRate: 3.2,
      unsubRate: 1.5,
      contacts: 2080,
      newContacts: 34,
      prevOpenDelta: -1.2,
      prevClickDelta: -0.3,
      prevSendsMult: 0.98,
      prevDelivDelta: -1.8,
    },
    {
      name: 'Greenway Market NH',
      brand: 'Greenway Market',
      state: 'NH',
      color: '#2B88F0',
      dailySends: 22,
      openRate: 33.4,
      clickRate: 4.6,
      deliverability: 94.8,
      bounceRate: 2.5,
      unsubRate: 0.9,
      contacts: 2760,
      newContacts: 56,
      prevOpenDelta: 0.8,
      prevClickDelta: 0.4,
      prevSendsMult: 1.02,
      prevDelivDelta: -0.6,
    },
  ];

  /* ================================================================
     CAMPAIGN DATA — campaigns per location
     ================================================================ */
  const CAMPAIGNS = [
    { id: 'c1', name: 'Weekly Newsletter', type: 'Newsletter' },
    { id: 'c2', name: 'Spring Promo Blast', type: 'Promotional' },
    { id: 'c3', name: 'Welcome Series', type: 'Automation' },
    { id: 'c4', name: 'Re-engagement Flow', type: 'Automation' },
    { id: 'c5', name: 'Holiday Sale Invite', type: 'Promotional' },
    { id: 'c6', name: 'Monthly Recap', type: 'Newsletter' },
  ];

  // Deterministic campaign-level metrics derived from each location's baseline
  function buildCampaignRows(locations) {
    const rows = [];
    const campaignMultipliers = {
      c1: { sendShare: 0.30, openMult: 1.05, clickMult: 0.90, delivMult: 1.00, bounceMult: 0.95, unsubMult: 0.80 },
      c2: { sendShare: 0.20, openMult: 0.85, clickMult: 1.25, delivMult: 0.99, bounceMult: 1.15, unsubMult: 1.30 },
      c3: { sendShare: 0.15, openMult: 1.20, clickMult: 1.40, delivMult: 1.01, bounceMult: 0.80, unsubMult: 0.60 },
      c4: { sendShare: 0.10, openMult: 0.75, clickMult: 0.70, delivMult: 0.98, bounceMult: 1.30, unsubMult: 1.50 },
      c5: { sendShare: 0.15, openMult: 1.10, clickMult: 1.15, delivMult: 1.00, bounceMult: 1.05, unsubMult: 1.10 },
      c6: { sendShare: 0.10, openMult: 0.95, clickMult: 0.85, delivMult: 1.00, bounceMult: 1.00, unsubMult: 0.90 },
    };
    locations.forEach(loc => {
      CAMPAIGNS.forEach(camp => {
        const m = campaignMultipliers[camp.id];
        const sends = Math.max(5, Math.floor(loc.sends * m.sendShare));
        rows.push({
          // campaign-specific fields
          campaignId: camp.id,
          campaignName: camp.name,
          campaignType: camp.type,
          locationName: loc.name,
          // carry through location fields for filtering/display
          name: camp.name + ' — ' + loc.name,
          brand: loc.brand,
          state: loc.state,
          color: loc.color,
          sends: sends,
          openRate: +Math.min(99, Math.max(5, loc.openRate * m.openMult)).toFixed(1),
          clickRate: +Math.min(50, Math.max(0.2, loc.clickRate * m.clickMult)).toFixed(1),
          deliverability: +Math.min(100, Math.max(70, loc.deliverability * m.delivMult)).toFixed(1),
          bounceRate: +Math.min(15, Math.max(0.1, loc.bounceRate * m.bounceMult)).toFixed(1),
          unsubRate: +Math.min(8, Math.max(0.05, loc.unsubRate * m.unsubMult)).toFixed(1),
          contacts: loc.contacts,
          newContacts: Math.floor(loc.newContacts * m.sendShare),
          prevOpenDelta: +(loc.prevOpenDelta * m.openMult * 0.8).toFixed(1),
          prevClickDelta: +(loc.prevClickDelta * m.clickMult * 0.8).toFixed(1),
          prevSends: Math.floor(sends * loc.prevSendsMult),
          prevOpenRate: +(loc.openRate * m.openMult + loc.prevOpenDelta).toFixed(1),
          prevClickRate: +(loc.clickRate * m.clickMult + loc.prevClickDelta).toFixed(1),
          prevDeliverability: +(loc.deliverability * m.delivMult + loc.prevDelivDelta).toFixed(1),
          prevDelivDelta: loc.prevDelivDelta,
          prevSendsMult: loc.prevSendsMult,
        });
      });
    });
    return rows;
  }

  /* ================================================================
     STATE
     ================================================================ */
  let activeDays = 30;
  let activeDatePreset = '30';      // tracks which tab is active ('7','30','90','ytd','365','custom')
  let customDateStart = null;
  let customDateEnd = null;
  let activeMetric = 'clickRate';   // used for sorting
  let sortAsc = false;              // false = descending (default), true = ascending
  let searchTerm = '';
  let activeLocation = 'all';
  let activeCampaign = 'all';       // campaign filter value
  let activeFilters = [];           // multi-select filter values
  let viewMode = 'table';
  let scaledData = [];
  let scaledCampaignData = [];      // campaign-level rows
  let groupBy = 'campaign';         // 'location' | 'campaign'
  let updateFilterTags = () => {}; // assigned in initMultiSelect

  /* ================================================================
     DOM REFS
     ================================================================ */
  const $ = id => document.getElementById(id);
  const $locationFilter = $('filter-location');
  const $campaignFilter = $('filter-campaign');
  const $searchFilter = $('filter-search');

  /* ================================================================
     HELPERS
     ================================================================ */
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function fmtPct(n) { return n.toFixed(1) + '%'; }
  function fmtNum(n) { return n.toLocaleString(); }

  /* ================================================================
     DISMISSED ALERTS — persisted in localStorage
     Each key is "locationName::alertSeverity::truncatedMessage"
     ================================================================ */
  let dismissedAlerts = new Set();
  function loadDismissedAlerts() {}
  function alertKey() { return ''; }
  function dismissAlert() {}
  function undoDismiss() {
    if (false) {
      lastDismissed = null;
      hideToast();
      refresh();
    }
  }

  /* ================================================================
     TOAST NOTIFICATION
     ================================================================ */
  let toastTimer = null;

  function showToast(message, showUndo) {
    clearTimeout(toastTimer);
    $('toast-message').textContent = message;
    $('toast-undo').style.display = showUndo ? '' : 'none';
    $('toast').classList.add('show');
    toastTimer = setTimeout(hideToast, 5000);
  }

  function hideToast() {
    clearTimeout(toastTimer);
    $('toast').classList.remove('show');
  }

  /* ================================================================
     SPARKLINE — tiny SVG trend chart for cards
     ================================================================ */
  function sparklineSvg(values, w, h, color) {
    if (values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const step = w / (values.length - 1);
    const points = values.map((v, i) => (i * step).toFixed(1) + ',' + (h - ((v - min) / range) * (h - 2) - 1).toFixed(1));
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="' + points.join(' ') + '"/></svg>';
  }

  // Generate fake sparkline data from location stats (deterministic)
  function getSparklineData(r) {
    const seed = r.name.length + r.sends;
    const pts = [];
    let v = r.openRate - 4;
    for (let i = 0; i < 7; i++) {
      v += ((seed * (i + 1) * 17) % 7 - 3) * 0.5;
      pts.push(Math.max(0, v));
    }
    pts.push(r.openRate); // end at actual value
    return pts;
  }

  /* ================================================================
     ACTIVE FILTER PILLS — shows removable tags for applied filters
     ================================================================ */
  function renderActiveFilters() {
    const $el = $('active-filters');
    if (!$el) return;

    const pills = [];

    if (activeDatePreset !== '30') {
      const dateNames = { '7': '7 days', '90': '90 days', 'ytd': 'YTD', '365': '1 year', 'custom': 'Custom range' };
      pills.push({ label: dateNames[activeDatePreset] || activeDatePreset, type: 'date' });
    }
    if (activeLocation !== 'all') {
      pills.push({ label: activeLocation, type: 'location' });
    }
    // Channel filter (All Activity tab)
    var chFilterVal = ($('filter-channel') || {}).value || 'all';
    if (activeChannel === 'all' && chFilterVal !== 'all') {
      pills.push({ label: chFilterVal.charAt(0).toUpperCase() + chFilterVal.slice(1), type: 'channel', value: chFilterVal });
    }
    if (activeChannel !== 'all') {
      if (activeCampaign !== 'all') {
        pills.push({ label: activeCampaign, type: 'campaign' });
      }
      activeFilters.forEach(f => {
        const name = f.startsWith('brand:') ? f.replace('brand:', '') : {
          'attention': 'Needs attention', 'strong': 'Strong performers',
          'average': 'Average', 'inactive': 'Low activity',
          'high-bounce': 'High bounce', 'low-deliv': 'Low deliverability',
          'high-unsub': 'High unsub'
        }[f] || f;
        pills.push({ label: name, type: 'filter', value: f });
      });
    }
    if (searchTerm) {
      pills.push({ label: '"' + searchTerm + '"', type: 'search' });
    }

    if (pills.length === 0) {
      $el.hidden = true;
      return;
    }

    $el.hidden = false;
    let html = '<span class="active-filters-label">Active:</span>';
    pills.forEach(p => {
      html += '<span class="af-pill" data-af-type="' + p.type + '"' + (p.value ? ' data-af-value="' + esc(p.value) + '"' : '') + '>' +
        esc(p.label) +
        '<button class="af-pill-remove" data-af-type="' + p.type + '"' + (p.value ? ' data-af-value="' + esc(p.value) + '"' : '') + ' type="button" title="Remove">&times;</button>' +
      '</span>';
    });
    html += '<button class="af-clear" id="af-clear-all" type="button">Clear all</button>';
    $el.innerHTML = html;
  }

  /* ================================================================
     SKELETON LOADING — show placeholders during data refresh
     ================================================================ */
  let prevResultCount = null;
  let prevFilterSignature = null;

  function showSkeleton() {
    const grid = $('loc-grid');
    if (!grid) return;
    let html = '';
    for (let i = 0; i < 4; i++) {
      html += '<div class="skeleton-card">' +
        '<div class="skeleton-line skeleton-line--short"></div>' +
        '<div class="skeleton-line skeleton-line--tall"></div>' +
        '<div class="skeleton-line skeleton-line--med"></div>' +
        '<div class="skeleton-line"></div>' +
        '<div class="skeleton-line skeleton-line--med"></div>' +
      '</div>';
    }
    grid.innerHTML = html;
  }

  // Scale data for the active date range
  function scaleData() {
    const factor = activeDays <= 7 ? 1.06 : activeDays <= 30 ? 1.0 : 0.96;
    scaledData = LOCATIONS.map(loc => {
      const sends = Math.floor(loc.dailySends * activeDays);
      const openRate = +(loc.openRate * factor).toFixed(1);
      const clickRate = +(loc.clickRate * factor).toFixed(1);
      return {
        ...loc,
        sends,
        openRate,
        clickRate,
        deliverability: loc.deliverability,
        bounceRate: loc.bounceRate,
        prevSends: Math.floor(sends * loc.prevSendsMult),
        prevOpenRate: openRate + loc.prevOpenDelta,
        prevClickRate: clickRate + loc.prevClickDelta,
        prevDeliverability: loc.deliverability + loc.prevDelivDelta,
      };
    });
    // Build campaign-level data from scaled location data
    scaledCampaignData = buildCampaignRows(scaledData);
  }

  /** Returns the active dataset based on groupBy */
  function getActiveData() {
    return groupBy === 'campaign' ? scaledCampaignData : scaledData;
  }

  /* ================================================================
     FILTER LOGIC — multi-select performance filters
     ================================================================ */
  const PERF_FILTERS = {
    'attention':    r => r.clickRate < 3 || r.deliverability < 90,
    'strong':       r => r.sends >= 100 && r.clickRate >= 6,
    'average':      r => r.sends >= 100 && r.clickRate >= 3 && r.clickRate < 6,
    'inactive':     r => r.sends < 100,
    'high-bounce':  r => r.bounceRate > 4,
    'low-deliv':    r => r.deliverability < 90,
    'high-unsub':   r => r.unsubRate > 2,
  };

  function getFiltered() {
    const search = searchTerm.toLowerCase();
    const data = getActiveData();
    return data.filter(r => {
      // Location dropdown — for campaign view, match on locationName or name
      if (activeLocation !== 'all') {
        if (groupBy === 'campaign') {
          if (r.locationName !== activeLocation) return false;
        } else {
          if (r.name !== activeLocation) return false;
        }
      }
      // Campaign dropdown — filter by campaign name
      if (activeCampaign !== 'all') {
        if (groupBy === 'campaign') {
          if (r.campaignName !== activeCampaign) return false;
        }
      }
      // Text search — also match campaign name, location name, brand
      if (search) {
        const haystack = (r.name + ' ' + (r.brand || '') + ' ' + (r.campaignName || '') + ' ' + (r.locationName || '') + ' ' + (r.campaignType || '')).toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      // Multi-select filters (OR within each category)
      if (activeFilters.length) {
        const perfFilters = activeFilters.filter(f => !f.startsWith('brand:'));
        const brandFilters = activeFilters.filter(f => f.startsWith('brand:')).map(f => f.replace('brand:', ''));
        let passPerf = perfFilters.length === 0;
        if (!passPerf) {
          passPerf = perfFilters.some(f => PERF_FILTERS[f] && PERF_FILTERS[f](r));
        }
        let passBrand = brandFilters.length === 0;
        if (!passBrand) {
          passBrand = brandFilters.includes(r.brand);
        }
        if (!passPerf || !passBrand) return false;
      }
      return true;
    });
  }

  // Metric value quality class
  function metricClass(key, val) {
    const t = {
      openRate: { good: 35, ok: 25, warn: 20 },
      clickRate: { good: 6, ok: 4, warn: 2.5 },
      deliverability: { good: 95, ok: 90, warn: 85 },
      bounceRate: { good: 1.5, ok: 2.5, warn: 4.0 },
      unsubRate: { good: 0.5, ok: 1.0, warn: 2.0 },
    }[key];
    if (!t) return 'ok';
    const inverted = key === 'bounceRate' || key === 'unsubRate';
    if (inverted) {
      if (val <= t.good) return 'good';
      if (val <= t.ok) return 'ok';
      if (val <= t.warn) return 'warn';
      return 'bad';
    }
    if (val >= t.good) return 'good';
    if (val >= t.ok) return 'ok';
    if (val >= t.warn) return 'warn';
    return 'bad';
  }

  function statusBadge() { return ''; }

  function changeBadge(cur, prev, inverted) {
    if (!prev) return '';
    const pct = ((cur - prev) / Math.abs(prev) * 100);
    const dir = pct >= 0 ? 'up' : 'down';
    // For inverted metrics (bounce, unsub), going up is bad → swap color class
    const colorDir = inverted ? (dir === 'up' ? 'down' : 'up') : dir;
    const sign = pct >= 0 ? '+' : '';
    const arrow = pct >= 0 ? '↑' : '↓';
    return '<div class="kpi-change kpi-change--' + colorDir + '">' + arrow + ' ' + sign + pct.toFixed(1) + '% vs prev</div>';
  }

  /* ================================================================
     SCOPE TOOLBAR
     ================================================================ */
  function getDateLabel() {
    if (activeDatePreset === 'custom' && customDateStart && customDateEnd) {
      const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return fmt(customDateStart) + ' – ' + fmt(customDateEnd);
    }
    if (activeDatePreset === 'ytd') return 'Year to date';
    if (activeDays === 365) return 'Last 1 year';
    return 'Last ' + activeDays + ' days';
  }

  /** Push the current date label into every place that shows the active range */
  var lastSyncedDateLabel = '';
  function syncDateBadge() {
    const label = getDateLabel();
    // Summary panel badge (hidden — header removed, but keep text updated for other uses)
    const $summaryDate = $('summary-date-text');
    if ($summaryDate) $summaryDate.textContent = label;
    const $badge = $('summary-date-badge');
    if ($badge) {
      // Keep hidden — summary header has been removed
      lastSyncedDateLabel = label;
    }
  }

  function updateScope(rows) {
    const count = rows.length;
    const dateLabel = getDateLabel();
    const isSingle = activeLocation !== 'all';
    const isCampaign = groupBy === 'campaign';
    const entityLabel = isCampaign ? 'campaign' : 'account';
    const entityLabelPlural = isCampaign ? 'campaigns' : 'accounts';

    // Only update hero title when on the email tab
    if (activeChannel === 'email') {
      const $title = $('hero-title');
      if ($title) {
        $title.textContent = isSingle ? activeLocation : 'Email Performance';
      }
    }

    // Update hero subtitle / scope meta
    let scopeText;
    if (isSingle && !isCampaign) {
      const loc = rows[0];
      const brand = loc ? loc.brand : '';
      scopeText = (brand ? brand + ' · ' : '') + 'Email · ' + dateLabel;
    } else {
      scopeText = count + ' ' + (count !== 1 ? entityLabelPlural : entityLabel) + ' · Email · ' + dateLabel;
    }
    $('scope-meta').textContent = scopeText;

    // Update date badge on summary panel
    syncDateBadge();
  }

  /* ================================================================
     KPI STRIP — with animated value transitions
     ================================================================ */
  let prevKpiValues = {};

  function animateValue(el, start, end, duration, formatter) {
    const startTime = performance.now();
    el.classList.add('counting');
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      el.textContent = formatter(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.classList.remove('counting');
      }
    }
    requestAnimationFrame(tick);
  }

  function renderKpis(rows) {
    const n = rows.length || 1;
    const totalSent = rows.reduce((s, r) => s + r.sends, 0);
    const prevTotalSent = rows.reduce((s, r) => s + r.prevSends, 0);
    const avgOpen = rows.reduce((s, r) => s + r.openRate, 0) / n;
    const prevOpen = rows.reduce((s, r) => s + r.prevOpenRate, 0) / n;
    const avgClick = rows.reduce((s, r) => s + r.clickRate, 0) / n;
    const prevClick = rows.reduce((s, r) => s + r.prevClickRate, 0) / n;
    const avgDeliv = rows.reduce((s, r) => s + r.deliverability, 0) / n;
    const prevDeliv = rows.reduce((s, r) => s + r.prevDeliverability, 0) / n;
    const avgBounce = rows.reduce((s, r) => s + r.bounceRate, 0) / n;
    const avgUnsub = rows.reduce((s, r) => s + r.unsubRate, 0) / n;
    const prevUnsub = rows.reduce((s, r) => s + (r.unsubRate + (r.prevOpenDelta > 0 ? 0.1 : -0.1)), 0) / n;

    const totalDelivered = Math.round(totalSent * (avgDeliv / 100));
    const prevDelivered = Math.round(prevTotalSent * (prevDeliv / 100));
    const totalBounced = Math.round(totalSent * (avgBounce / 100));
    const totalUnsubs = Math.round(totalSent * (avgUnsub / 100));

    const tiles = [
      { key: 'sends', label: 'Emails sent', value: fmtNum(totalSent), change: changeBadge(totalSent, prevTotalSent), iconClass: 'kpi-icon--sends',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' },
      { key: 'deliverability', label: 'Delivered', value: fmtNum(totalDelivered), change: changeBadge(totalDelivered, prevDelivered), iconClass: 'kpi-icon--deliv',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>' },
      { key: 'openRate', label: 'Open rate', value: fmtPct(avgOpen), change: changeBadge(avgOpen, prevOpen), iconClass: 'kpi-icon--open',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/><line x1="2" y1="4" x2="10" y2="11"/></svg>' },
      { key: 'clickRate', label: 'Click rate', value: fmtPct(avgClick), change: changeBadge(avgClick, prevClick), iconClass: 'kpi-icon--click',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>' },
      { key: 'bounceRate', label: 'Bounced', value: fmtNum(totalBounced), change: '', iconClass: 'kpi-icon--bounce',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' },
      { key: 'unsubRate', label: 'Unsubscribed', value: fmtNum(totalUnsubs), change: '', iconClass: 'kpi-icon--unsub',
        svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>' },
    ];

    const sortArrow = '<svg class="kpi-sort-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';

    const newKpiValues = {
      sends: totalSent, openRate: avgOpen, clickRate: avgClick, deliverability: totalDelivered, bounceRate: totalBounced, unsubRate: totalUnsubs,
    };

    $('kpi-strip').innerHTML = tiles.map(t => {
      const isActive = t.key === activeMetric;
      return '<div class="kpi-tile' + (isActive ? ' kpi-tile--sorted' : '') + '" data-sort="' + t.key + '" role="button" tabindex="0" title="Sort by ' + t.label + '" aria-label="' + t.label + ': ' + t.value + '. Click to sort.">' +
        '<div class="kpi-top-row">' +
          '<span class="kpi-icon ' + t.iconClass + '">' + t.svg + '</span>' +
          '<span class="kpi-label">' + t.label + (isActive ? ' ' + sortArrow : '') + '</span>' +
        '</div>' +
        '<div class="kpi-body">' +
          '<span class="kpi-value"><span class="kpi-value-num" data-kpi-key="' + t.key + '">' + t.value + '</span>' + t.change + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    // Animate values if they changed
    tiles.forEach(t => {
      const prev = prevKpiValues[t.key];
      const cur = newKpiValues[t.key];
      if (prev !== undefined && prev !== cur) {
        const el = $('kpi-strip').querySelector('[data-kpi-key="' + t.key + '"]');
        if (el) {
          const isCount = (t.key === 'sends' || t.key === 'deliverability' || t.key === 'bounceRate' || t.key === 'unsubRate');
          const fmt = isCount ? v => fmtNum(Math.round(v)) : v => fmtPct(v);
          animateValue(el, prev, cur, 600, fmt);
        }
      }
    });
    prevKpiValues = newKpiValues;

    // --- KPI Health Tinting ---
    tiles.forEach(t => {
      const tile = $('kpi-strip').querySelector('[data-sort="' + t.key + '"]');
      if (!tile) return;
      tile.classList.remove('kpi-tile--health-good','kpi-tile--health-ok','kpi-tile--health-warn','kpi-tile--health-bad');
      let health = 'ok';
      if (t.key === 'openRate') {
        if (avgOpen >= 35) health = 'good'; else if (avgOpen >= 25) health = 'ok'; else if (avgOpen >= 20) health = 'warn'; else health = 'bad';
      } else if (t.key === 'clickRate') {
        if (avgClick >= 6) health = 'good'; else if (avgClick >= 4) health = 'ok'; else if (avgClick >= 2.5) health = 'warn'; else health = 'bad';
      }
      if (health !== 'ok') tile.classList.add('kpi-tile--health-' + health);
    });

    // Wire up KPI tile clicks for sorting
    $('kpi-strip').querySelectorAll('.kpi-tile[data-sort]').forEach(tile => {
      tile.addEventListener('click', () => {
        if (activeMetric === tile.dataset.sort) {
          sortAsc = !sortAsc;
        } else {
          activeMetric = tile.dataset.sort;
          sortAsc = false;
        }
        refresh();
      });
    });

    // Render funnel and comparison panels
    renderFunnel(totalSent, totalDelivered, avgOpen, avgClick);
    renderComparison(avgOpen, avgClick);
  }

  /* ================================================================
     FUNNEL VISUALIZATION — Sent → Delivered → Opened → Clicked
     ================================================================ */
  function renderFunnel(totalSent, totalDelivered, avgOpen, avgClick) {
    var $body = $('ep-funnel-body');
    if (!$body) return;

    var opened = Math.round(totalSent * (avgOpen / 100));
    var clicked = Math.round(totalSent * (avgClick / 100));
    var delivPct = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(0) : 0;
    var openPct = avgOpen.toFixed(0);
    var clickPct = avgClick.toFixed(0);

    var steps = [
      { cls: 'sent', label: 'Sent', count: fmtNum(totalSent), pct: '100%' },
      { cls: 'delivered', label: 'Delivered', count: fmtNum(totalDelivered), pct: delivPct + '%' },
      { cls: 'opened', label: 'Opened', count: fmtNum(opened), pct: openPct + '%' },
      { cls: 'clicked', label: 'Clicked', count: fmtNum(clicked), pct: clickPct + '%' },
    ];

    $body.innerHTML = steps.map(function(s) {
      return '<div class="ep-funnel-step ep-funnel-step--' + s.cls + '">' +
        '<span class="ep-funnel-step-label">' + s.label + '</span> ' +
        '<span class="ep-funnel-step-value">' + s.count + ' (' + s.pct + ')</span>' +
      '</div>';
    }).join('');
  }

  /* ================================================================
     COMPARISON PANELS — open/click rate vs industry average
     ================================================================ */
  function renderComparison(avgOpen, avgClick) {
    var INDUSTRY_OPEN = 21.5;
    var INDUSTRY_CLICK = 2.6;

    var $openBody = $('ep-comparison-open-body');
    if ($openBody) {
      var openDiff = avgOpen - INDUSTRY_OPEN;
      var openSign = openDiff >= 0 ? '+' : '';
      var openBarW = Math.min(100, (avgOpen / 60) * 100);

      $openBody.innerHTML =
        '<div class="ep-comp-industry">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>' +
          openSign + Math.abs(openDiff).toFixed(0) + '% vs industry average' +
        '</div>' +
        '<div class="ep-comp-row">' +
          '<span class="ep-comp-label">Your open rate</span>' +
          '<div class="ep-comp-bar-wrap"><div class="ep-comp-bar" style="width:' + openBarW.toFixed(1) + '%"></div></div>' +
          '<span class="ep-comp-val">' + avgOpen.toFixed(1) + '%</span>' +
        '</div>';
    }

    var $clickBody = $('ep-comparison-click-body');
    if ($clickBody) {
      var clickDiff = avgClick - INDUSTRY_CLICK;
      var clickSign = clickDiff >= 0 ? '+' : '';
      var clickBarW = Math.min(100, (avgClick / 15) * 100);
      var ctoRate = avgOpen > 0 ? (avgClick / avgOpen * 100) : 0;
      var ctoBarW = Math.min(100, (ctoRate / 30) * 100);

      $clickBody.innerHTML =
        '<div class="ep-comp-industry">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>' +
          clickSign + Math.abs(clickDiff).toFixed(0) + '% vs industry average' +
        '</div>' +
        '<div class="ep-comp-row">' +
          '<span class="ep-comp-label">Your click rate</span>' +
          '<div class="ep-comp-bar-wrap"><div class="ep-comp-bar" style="width:' + clickBarW.toFixed(1) + '%"></div></div>' +
          '<span class="ep-comp-val">' + avgClick.toFixed(1) + '%</span>' +
        '</div>' +
        '<div class="ep-comp-row">' +
          '<span class="ep-comp-label">Your click-to-open rate</span>' +
          '<div class="ep-comp-bar-wrap"><div class="ep-comp-bar" style="width:' + ctoBarW.toFixed(1) + '%"></div></div>' +
          '<span class="ep-comp-val">' + ctoRate.toFixed(0) + '%</span>' +
        '</div>';
    }
  }

  /* ================================================================
     HEALTH HEADLINE — instant "how are we doing?" verdict
     ================================================================ */
  function renderHealthHeadline() {}

  function renderTrendSummary() {}

  function renderPriorityActions() {}

  function renderNoticeBar() {}

  function getLocationAlerts() { return { actions: [], wins: [] }; }
  function getLocationStatus() { return { label: '', cls: 'strong' }; }

  /* ================================================================
     SORTING HELPER
     ================================================================ */
  function sortRows(rows) {
    const key = activeMetric;
    const dir = sortAsc ? 1 : -1;
    if (key === 'name') {
      return [...rows].sort((a, b) => dir * a.name.localeCompare(b.name));
    }
    const isInverted = key === 'bounceRate' || key === 'unsubRate';
    return [...rows].sort((a, b) => {
      const diff = a[key] - b[key];
      return isInverted ? dir * diff : -dir * diff;
    });
  }

  function buildTableAlerts() { return ''; }

  /* ================================================================
     LOCATION CARDS
     ================================================================ */
  /* ================================================================
     LEADERBOARD STRIP — top & bottom performers snapshot
     ================================================================ */
  function renderLeaderboard() {}
  function renderInlineLeaders() {}

  function renderCards() {}

  /* ================================================================
     PERFORMANCE TABLE — no rank numbers
     ================================================================ */
  function renderTable(rows) {
    const sorted = sortRows(rows);

    // Always include compare column in thead
    const theadRow = $('perf-table').querySelector('thead tr');
    const existingCompareTh = theadRow.querySelector('.compare-th');
    if (!existingCompareTh) {
      const th = document.createElement('th');
      th.className = 'compare-th';
      th.style.width = '40px';
      th.textContent = '';
      theadRow.insertBefore(th, theadRow.firstChild);
    }

    // Update first column header label
    const nameTh = theadRow.querySelector('th[data-sort="name"] .th-label');
    if (nameTh) nameTh.textContent = groupBy === 'campaign' ? 'Campaign' : 'Account';

    const colSpan = 10;

    if (!sorted.length) {
      const emptyEntityTbl = groupBy === 'campaign' ? 'campaigns' : 'accounts';
      $('perf-tbody').innerHTML = '<tr><td colspan="' + colSpan + '">' +
        '<div class="empty-state">' +
          '<div class="empty-state-icon">🔍</div>' +
          '<div class="empty-state-title">No ' + emptyEntityTbl + ' match your filters</div>' +
          '<div class="empty-state-desc">Try broadening your search, removing a filter, or selecting a different date range.</div>' +
          '<button class="empty-state-btn" onclick="document.getElementById(\'btn-reset-filters\').click()">Reset all filters</button>' +
        '</div>' +
      '</td></tr>';
      return;
    }

    $('perf-tbody').innerHTML = sorted.map(r => {
      const isSelected = compareAll || compareSelected.has(r.name);
      const compareTd = '<td class="compare-cell"><button class="table-compare-btn' + (isSelected ? ' selected' : '') + '" data-compare="' + esc(r.name) + '" type="button"><span class="table-compare-check">' + (isSelected ? '✓' : '') + '</span></button></td>';

      const nameCellContent = groupBy === 'campaign'
        ? '<a class="table-name-link" data-drilldown="' + esc(r.name) + '" href="#" title="View individual emails"><div class="table-name-primary">' + esc(r.campaignName) + '</div><div class="table-name-sub">' + esc(r.locationName) + ' · ' + esc(r.campaignType) + '</div></a>'
        : '<a class="table-name-link" data-drilldown="' + esc(r.name) + '" href="#" title="View individual emails">' + esc(r.name) + '</a>';

      return '<tr class="' + (isSelected ? ' row--compared' : '') + '" data-loc="' + esc(r.name) + '">' +
        compareTd +
        '<td>' + nameCellContent + '</td>' +
        '<td class="num">' + fmtNum(r.sends) + '</td>' +
        '<td class="num">' + fmtPct(r.openRate) + '</td>' +
        '<td class="num">' + fmtPct(r.clickRate) + '</td>' +
        '<td class="num">' + fmtPct(r.deliverability) + '</td>' +
        '<td class="num">' + fmtPct(r.bounceRate) + '</td>' +
        '<td class="num">' + fmtPct(r.unsubRate) + '</td>' +
      '</tr>';
    }).join('');

    // Wire up drilldown links
    $('perf-tbody').querySelectorAll('.table-name-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const entityName = link.dataset.drilldown;
        if (entityName) openDrilldown(entityName);
      });
    });
  }

  function colorForClass(cls) {
    return { good: '#1C6FE4', ok: '#9CA3AF', warn: '#6B7280', bad: '#4B5563' }[cls] || '#9CA3AF';
  }

  function setSortedColumn() {
    const sortKey = activeMetric;
    // Column indices after the compare checkbox column (index 0 is compare-cell)
    const colIndexMap = { name: 1, sends: 2, openRate: 3, clickRate: 4, deliverability: 5, bounceRate: 6 };
    const sortedColIdx = colIndexMap[sortKey];

    // Update header classes
    document.querySelectorAll('#perf-table th[data-sort]').forEach(th => {
      const isActive = th.dataset.sort === sortKey;
      th.classList.toggle('sorted', isActive);
      th.classList.toggle('sort-asc', isActive && sortAsc);
      th.classList.toggle('sort-desc', isActive && !sortAsc);
    });

    // Highlight sorted column cells
    document.querySelectorAll('#perf-tbody tr:not(.table-row-detail) td').forEach(td => {
      td.classList.remove('col-sorted');
    });
    if (sortedColIdx !== undefined) {
      document.querySelectorAll('#perf-tbody tr:not(.table-row-detail)').forEach(tr => {
        const td = tr.children[sortedColIdx];
        if (td) td.classList.add('col-sorted');
      });
    }
  }

  /* ================================================================
     VIEW MODE TOGGLE
     ================================================================ */
  function setViewMode(mode) {
    viewMode = 'table';
    if (compareViewActive) {
      compareViewActive = false;
      $('compare-view').hidden = true;
      updateCompareTray();
    }
    var $table = $('section-table');
    if ($table) $table.hidden = false;
  }

  /* ================================================================
     POPULATE LOCATION DROPDOWN
     ================================================================ */
  function populateLocations() {
    $locationFilter.innerHTML = '<option value="all">All accounts</option>';
    LOCATIONS.forEach(loc => {
      const o = document.createElement('option');
      o.value = loc.name; o.textContent = loc.name;
      $locationFilter.appendChild(o);
    });
  }

  function populateCampaigns() {
    $campaignFilter.innerHTML = '<option value="all">All campaigns</option>';
    CAMPAIGNS.forEach(c => {
      const o = document.createElement('option');
      o.value = c.name; o.textContent = c.name;
      $campaignFilter.appendChild(o);
    });
  }

  /** Show/hide the campaign filter based on group-by mode */
  function syncFilterVisibility() {
    const campGroup = $('cs-group-campaign');
    if (campGroup) {
      campGroup.style.display = groupBy === 'campaign' ? '' : 'none';
    }
  }

  /* ================================================================
     MULTI-SELECT FILTER — "Filter by" dropdown
     ================================================================ */
  function initMultiSelect() {
    const $btn = $('perf-filter-btn');
    const $dropdown = $('perf-filter-dropdown');
    const $tags = $('perf-filter-tags');
    const $clear = $('perf-filter-clear');
    const checkboxes = $dropdown.querySelectorAll('input[type="checkbox"]');

    // Toggle dropdown
    $btn.addEventListener('click', e => {
      e.stopPropagation();
      $dropdown.hidden = !$dropdown.hidden;
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!$btn.contains(e.target) && !$dropdown.contains(e.target)) {
        $dropdown.hidden = true;
      }
    });

    // Checkbox changes
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        syncFilters();
        refresh();
      });
    });

    // Clear all
    $clear.addEventListener('click', () => {
      checkboxes.forEach(cb => { cb.checked = false; });
      syncFilters();
      refresh();
    });

    function syncFilters() {
      activeFilters = [];
      checkboxes.forEach(cb => {
        if (cb.checked) activeFilters.push(cb.value);
      });
      renderTags();
    }

    const FILTER_LABELS = {
      'attention': 'Needs attention',
      'strong': 'Strong',
      'average': 'Average',
      'inactive': 'Low activity',
      'high-bounce': 'High bounce',
      'low-deliv': 'Low delivery',
      'high-unsub': 'High unsub',
    };

    function renderTags() {
      if (!activeFilters.length) {
        $tags.innerHTML = '<span class="multi-select-placeholder">All performance</span>';
        return;
      }
      $tags.innerHTML = activeFilters.map(f => {
        const label = f.startsWith('brand:') ? f.replace('brand:', '') : (FILTER_LABELS[f] || f);
        return '<span class="multi-select-tag">' + esc(label) +
          '<button class="multi-select-tag-remove" data-val="' + esc(f) + '" type="button">×</button>' +
          '</span>';
      }).join('');

      // Remove individual tags
      $tags.querySelectorAll('.multi-select-tag-remove').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const val = btn.dataset.val;
          const cb = $dropdown.querySelector('input[value="' + CSS.escape(val) + '"]');
          if (cb) cb.checked = false;
          syncFilters();
          refresh();
        });
      });
    }

    // Expose renderTags so external callers can sync the UI
    updateFilterTags = renderTags;
  }

  /* ================================================================
     COMPARE LOCATIONS — unified inline experience
     No "compare mode" toggle needed. Checkboxes always visible.
     Floating tray appears when 1+ locations are selected.
     Comparison table appears inline when 2+ are selected.
     ================================================================ */
  let compareAll = false;           // true = compare all filtered locations
  let compareSelected = new Set();  // names of individually selected locations

  function getCompareRows() {
    const filtered = getFiltered();
    if (compareAll) return filtered;
    return filtered.filter(r => compareSelected.has(r.name));
  }

  function hasActiveComparison() {
    return compareModeActive || compareAll || compareSelected.size > 0;
  }

  /* --- Floating Compare Tray --- */
  function updateCompareTray() {
    const $tray = $('compare-tray');
    const rows = getCompareRows();
    const count = rows.length;
    const active = hasActiveComparison();

    // Don't show tray when compare view is already showing
    if (compareViewActive) {
      $tray.classList.remove('show');
      setTimeout(() => { $tray.hidden = true; }, 360);
      return;
    }

    // Show/hide tray
    const $btt = $('back-to-top');
    if (active) {
      $tray.hidden = false;
      requestAnimationFrame(() => { $tray.classList.add('show'); });
      if ($btt) $btt.classList.add('tray-shifted');
    } else {
      $tray.classList.remove('show');
      setTimeout(() => { if (!hasActiveComparison()) $tray.hidden = true; }, 360);
      if ($btt) $btt.classList.remove('tray-shifted');
    }

    // Update text
    const entityCmp = groupBy === 'campaign' ? 'campaigns' : 'accounts';
    const entityCmpS = groupBy === 'campaign' ? 'campaign' : 'account';
    if (count === 0) {
      $('compare-tray-title').textContent = 'Compare ' + entityCmp;
      $('compare-tray-sub').textContent = 'Click ' + entityCmp + ' below to select them';
    } else if (count === 1) {
      $('compare-tray-title').textContent = '1 ' + entityCmpS + ' selected';
      $('compare-tray-sub').textContent = 'Select at least 1 more to compare';
    } else {
      $('compare-tray-title').textContent = count + ' ' + entityCmp + ' selected';
      $('compare-tray-sub').textContent = 'Ready to compare side-by-side';
    }

    // Enable/disable view button
    const $viewBtn = $('tray-view-btn');
    $viewBtn.disabled = count < 2;
    $viewBtn.style.opacity = count < 2 ? '.4' : '';
    $viewBtn.style.pointerEvents = count < 2 ? 'none' : '';

    // Update "All filtered" button active state
    $('tray-all-btn').classList.toggle('active', compareAll);

    // Update Compare button in toolbar
    const $btn = $('btn-compare');
    const $label = $('btn-compare-label');
    $btn.classList.toggle('active', compareModeActive || active);
    if (compareModeActive && count > 0) {
      $label.textContent = count + ' selected';
    } else if (compareModeActive) {
      $label.textContent = 'Comparing…';
    } else {
      $label.textContent = 'Compare';
    }
  }

  /* --- Comparison View — replaces cards/table --- */
  let compareViewActive = false;  // true = showing comparison view instead of cards/table

  function showCompareView() {
    const rows = getCompareRows();
    if (rows.length < 2) return;
    compareViewActive = true;
    renderCompareView();
    // Hide cards/table/leaderboard/list-header, show comparison
    var $sCards = $('section-cards'); if ($sCards) $sCards.hidden = true;
    $('section-table').hidden = true;
    $('leaderboard-strip').hidden = true;
    $('list-header').hidden = true;
    $('compare-view').hidden = false;
    // Hide floating tray since we're in the view
    $('compare-tray').classList.remove('show');
    setTimeout(() => { if (compareViewActive) $('compare-tray').hidden = true; }, 360);
    // Scroll to top of comparison
    $('compare-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update view toggle buttons
    document.querySelectorAll('.list-view-btn').forEach(b => b.classList.remove('active'));
  }

  function hideCompareView() {
    compareViewActive = false;
    $('compare-view').hidden = true;
    $('list-header').hidden = false;
    // Restore cards/table view
    setViewMode(viewMode);
    // If still have selections, re-show tray
    if (hasActiveComparison()) {
      updateCompareTray();
    }
  }

  function renderCompareView() {
    const rows = getCompareRows();
    const $view = $('compare-view');
    const $body = $('compare-view-body');
    const $count = $('compare-view-count');
    const $sub = $('compare-view-sub');

    if (rows.length < 2) {
      if (compareViewActive) hideCompareView();
      return;
    }

    const cmpEntity = groupBy === 'campaign' ? 'campaigns' : 'accounts';
    $count.textContent = rows.length + ' ' + cmpEntity;
    $sub.textContent = 'Comparing ' + rows.length + ' ' + cmpEntity + ' · ' + getDateLabel();

    const metrics = [
      { key: 'sends', label: 'Total sends', fmt: fmtNum, higher: true },
      { key: 'openRate', label: 'Open rate', fmt: fmtPct, higher: true },
      { key: 'clickRate', label: 'Click rate', fmt: fmtPct, higher: true },
      { key: 'deliverability', label: 'Deliverability', fmt: fmtPct, higher: true },
      { key: 'bounceRate', label: 'Bounce rate', fmt: fmtPct, higher: false },
      { key: 'unsubRate', label: 'Unsub rate', fmt: fmtPct, higher: false },
      { key: 'contacts', label: 'Total contacts', fmt: fmtNum, higher: true },
      { key: 'newContacts', label: 'New contacts', fmt: fmtNum, higher: true },
    ];

    // KPI summary cards for the comparison
    let kpiHtml = '<div class="compare-kpi-row">';
    const compMetrics = [
      { key: 'openRate', label: 'Best open rate', fmt: fmtPct, higher: true },
      { key: 'clickRate', label: 'Best click rate', fmt: fmtPct, higher: true },
      { key: 'deliverability', label: 'Best deliverability', fmt: fmtPct, higher: true },
      { key: 'bounceRate', label: 'Lowest bounce', fmt: fmtPct, higher: false },
    ];
    compMetrics.forEach(m => {
      const vals = rows.map(r => r[m.key]);
      const bestVal = m.higher ? Math.max(...vals) : Math.min(...vals);
      const worstVal = m.higher ? Math.min(...vals) : Math.max(...vals);
      const bestLoc = rows.find(r => r[m.key] === bestVal);
      const spread = Math.abs(bestVal - worstVal);
      kpiHtml += '<div class="compare-kpi-card">' +
        '<span class="compare-kpi-label">' + m.label + '</span>' +
        '<span class="compare-kpi-value">' + m.fmt(bestVal) + '</span>' +
        '<span class="compare-kpi-loc">' + esc(bestLoc.name) + '</span>' +
        '<span class="compare-kpi-spread">Spread: ' + spread.toFixed(1) + (m.key === 'sends' ? '' : '%') + '</span>' +
      '</div>';
    });
    kpiHtml += '</div>';

    // Build column headers
    let headerHtml = '<th class="compare-metric-col">Metric</th>';
    rows.forEach(r => {
      const status = r.sends < 100 ? 'Low activity' : r.clickRate >= 6 ? 'Strong' : (r.clickRate < 3 || r.deliverability < 90) ? 'Attention' : 'Average';
      const colName = groupBy === 'campaign' ? (r.campaignName || r.name) : r.name;
      const colSub = groupBy === 'campaign' ? (r.locationName || '') : '';
      headerHtml += '<th class="compare-col-header"><div class="compare-col-name">' + esc(colName) + '</div>' +
        (colSub ? '<div class="compare-col-sub">' + esc(colSub) + '</div>' : '') +
        '<div class="compare-col-status">' + status + '</div></th>';
    });
    headerHtml += '<th class="compare-col-header compare-col-avg"><div class="compare-col-name">Avg</div></th>';

    // Build metric rows
    let bodyHtml = '';
    metrics.forEach(m => {
      const vals = rows.map(r => r[m.key]);
      const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
      const best = m.higher ? Math.max(...vals) : Math.min(...vals);
      const worst = m.higher ? Math.min(...vals) : Math.max(...vals);

      bodyHtml += '<tr><td class="compare-metric-cell">' + m.label + '</td>';
      rows.forEach(r => {
        const v = r[m.key];
        let cls = '';
        if (rows.length > 1) {
          if (v === best) cls = 'compare-best';
          else if (v === worst) cls = 'compare-worst';
        }
        bodyHtml += '<td class="compare-data-cell ' + cls + '">' + m.fmt(v) + '</td>';
      });
      bodyHtml += '<td class="compare-data-cell compare-avg-cell">' + m.fmt(avg) + '</td>';
      bodyHtml += '</tr>';
    });

    // Status row
    bodyHtml += '<tr class="compare-status-row"><td class="compare-metric-cell">Status</td>';

    $body.innerHTML = kpiHtml +
      '<div class="compare-table-wrap"><table class="compare-table"><thead><tr>' + headerHtml + '</tr></thead><tbody>' + bodyHtml + '</tbody></table></div>';
  }


  function toggleLocationCompare(name) {
    compareAll = false;
    if (compareSelected.has(name)) {
      compareSelected.delete(name);
      // If no selections left, exit compare mode
      if (compareSelected.size === 0) compareModeActive = false;
    } else {
      compareSelected.add(name);
      compareModeActive = true; // auto-enter compare mode on first selection
    }
    afterCompareChange();
  }

  let compareModeActive = false; // true = compare mode is on (tray visible, checkboxes shown)

  function toggleCompareMode() {
    if (compareModeActive) {
      // Turn off compare mode entirely
      compareModeActive = false;
      compareAll = false;
      compareSelected.clear();
      if (compareViewActive) hideCompareView();
      afterCompareChange();
    } else {
      // Enter compare mode with nothing selected — user picks locations
      compareModeActive = true;
      compareAll = false;
      compareSelected.clear();
      afterCompareChange();
    }
  }

  function clearCompare() {
    compareModeActive = false;
    compareAll = false;
    compareSelected.clear();
    if (compareViewActive) hideCompareView();
    afterCompareChange();
  }

  function afterCompareChange() {
    updateCompareTray();
    // If compare view is active, update it (auto-close if < 2 selected)
    if (compareViewActive) {
      const rows = getCompareRows();
      if (rows.length < 2) {
        hideCompareView();
      } else {
        renderCompareView();
      }
    }
    // Re-render cards/table to update checkbox states
    const rows = getFiltered();
    renderCards(rows);
    renderTable(rows);
  }

  /* --- Export Comparison as CSV --- */
  function exportComparisonCSV() {
    const rows = getCompareRows();
    if (rows.length < 2) return;
    const dateLabel = getDateLabel();
    const meta = [
      '# Account Comparison Report — Evergreen Harvest Co.',
      '# Date range: ' + dateLabel,
      '# Accounts compared: ' + rows.length,
      '# Exported: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      '',
    ];
    const headers = ['Account', 'Brand', 'Sends', 'Open Rate', 'Click Rate', 'Deliverability', 'Bounce Rate', 'Unsub Rate', 'Contacts', 'New Contacts', 'Status'];
    const csvRows = meta.concat([headers.join(',')]);
    rows.forEach(r => {
      const status = r.sends < 100 ? 'Low activity' : r.clickRate >= 6 ? 'Strong' : (r.clickRate < 3 || r.deliverability < 90) ? 'Needs attention' : 'Average';
      csvRows.push([
        '"' + r.name + '"', '"' + r.brand + '"',
        r.sends, r.openRate.toFixed(1) + '%', r.clickRate.toFixed(1) + '%',
        r.deliverability.toFixed(1) + '%', r.bounceRate.toFixed(1) + '%',
        r.unsubRate.toFixed(1) + '%',
        r.contacts, r.newContacts, status,
      ].join(','));
    });
    // Add averages row
    const n = rows.length;
    csvRows.push([
      '"AVERAGE"', '""',
      Math.round(rows.reduce((s, r) => s + r.sends, 0) / n),
      (rows.reduce((s, r) => s + r.openRate, 0) / n).toFixed(1) + '%',
      (rows.reduce((s, r) => s + r.clickRate, 0) / n).toFixed(1) + '%',
      (rows.reduce((s, r) => s + r.deliverability, 0) / n).toFixed(1) + '%',
      (rows.reduce((s, r) => s + r.bounceRate, 0) / n).toFixed(1) + '%',
      (rows.reduce((s, r) => s + r.unsubRate, 0) / n).toFixed(1) + '%',
      Math.round(rows.reduce((s, r) => s + r.contacts, 0) / n),
      Math.round(rows.reduce((s, r) => s + r.newContacts, 0) / n),
      '',
    ].join(','));

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evergreen-harvest-account-comparison.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function initCompare() {
    // "Compare" button in toolbar — toggles "all filtered"
    $('btn-compare').addEventListener('click', toggleCompareMode);

    // "Back to all locations" closes comparison view
    $('compare-back-btn').addEventListener('click', () => {
      clearCompare();
    });

    // "Export comparison" button
    $('compare-export-btn').addEventListener('click', exportComparisonCSV);

    // Floating tray buttons
    $('tray-all-btn').addEventListener('click', () => {
      compareAll = true;
      compareSelected.clear();
      afterCompareChange();
    });

    $('tray-top3-btn').addEventListener('click', () => {
      compareAll = false;
      compareSelected.clear();
      const sorted = [...getFiltered()].sort((a, b) => b.clickRate - a.clickRate);
      sorted.slice(0, 3).forEach(r => compareSelected.add(r.name));
      afterCompareChange();
    });

    $('tray-bottom3-btn').addEventListener('click', () => {
      compareAll = false;
      compareSelected.clear();
      const sorted = [...getFiltered()].sort((a, b) => a.clickRate - b.clickRate);
      sorted.slice(0, 3).forEach(r => compareSelected.add(r.name));
      afterCompareChange();
    });

    $('tray-clear-btn').addEventListener('click', clearCompare);

    // "View Comparison" — switch to comparison view
    $('tray-view-btn').addEventListener('click', () => {
      showCompareView();
    });


    // Click compare buttons on TABLE ROWS (event delegation)
    $('perf-tbody').addEventListener('click', e => {
      const btn = e.target.closest('.table-compare-btn');
      if (!btn) return;
      e.stopPropagation();
      e.preventDefault();
      toggleLocationCompare(btn.dataset.compare);
    });
  }

  /* ================================================================
     RESET ALL FILTERS
     ================================================================ */
  function resetAllFilters() {
    // Reset location & campaign
    activeLocation = 'all';
    $locationFilter.value = 'all';
    activeCampaign = 'all';
    $campaignFilter.value = 'all';

    // Reset search
    searchTerm = '';
    $searchFilter.value = '';

    // Reset channel filter
    var $chSel = $('filter-channel');
    if ($chSel) $chSel.value = 'all';

    // Reset multi-select filters
    activeFilters = [];
    const checkboxes = $('perf-filter-dropdown').querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => { cb.checked = false; });
    $('perf-filter-tags').innerHTML = '<span class="multi-select-placeholder">All performance</span>';

    // Reset date to 30 days
    activeDays = 30;
    activeDatePreset = '30';
    customDateStart = null;
    customDateEnd = null;
    $('custom-date-picker').hidden = true;
    document.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.hero-date-tab[data-days="30"]').classList.add('active');

    // Reset sort
    activeMetric = 'clickRate';
    sortAsc = false;

    // Reset group-by (default: campaign)
    groupBy = 'campaign';
    document.querySelectorAll('.cs-groupby-btn').forEach(b => b.classList.remove('active'));
    const campGroupBtn = document.querySelector('.cs-groupby-btn[data-group="campaign"]');
    if (campGroupBtn) campGroupBtn.classList.add('active');
    syncFilterVisibility();

    // Reset comparison
    compareModeActive = false;
    compareAll = false;
    compareSelected.clear();
    if (compareViewActive) {
      compareViewActive = false;
      $('compare-view').hidden = true;
    }

    // Reset view
    setViewMode('table');

    // Immediately update date badge to reflect reset
    syncDateBadge();
    scaleData();
    refresh();
  }

  /* ================================================================
     SAVED VIEWS — persist filter state with localStorage
     ================================================================ */
  const STORAGE_KEY = 'ep_saved_views';

  function getSavedViews() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  }

  function persistViews(views) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  }

  function getCurrentViewState() {
    return {
      activeLocation,
      activeCampaign,
      activeFilters: [...activeFilters],
      searchTerm,
      activeDays,
      activeDatePreset,
      customDateStart: customDateStart ? customDateStart.toISOString() : null,
      customDateEnd: customDateEnd ? customDateEnd.toISOString() : null,
      activeMetric,
      sortAsc,
      viewMode,
      groupBy,
    };
  }

  function applyViewState(state) {
    // Location & Campaign
    activeLocation = state.activeLocation || 'all';
    $locationFilter.value = activeLocation;
    activeCampaign = state.activeCampaign || 'all';
    $campaignFilter.value = activeCampaign;

    // Filters
    activeFilters = state.activeFilters || [];
    const checkboxes = $('perf-filter-dropdown').querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = activeFilters.includes(cb.value);
    });
    // Re-render tags
    const $tags = $('perf-filter-tags');
    if (!activeFilters.length) {
      $tags.innerHTML = '<span class="multi-select-placeholder">All performance</span>';
    } else {
      const FILTER_LABELS = {
        'attention': 'Needs attention', 'strong': 'Strong', 'average': 'Average',
        'inactive': 'Low activity', 'high-bounce': 'High bounce',
        'low-deliv': 'Low delivery', 'high-unsub': 'High unsub',
      };
      $tags.innerHTML = activeFilters.map(f => {
        const label = f.startsWith('brand:') ? f.replace('brand:', '') : (FILTER_LABELS[f] || f);
        return '<span class="multi-select-tag">' + esc(label) +
          '<button class="multi-select-tag-remove" data-val="' + esc(f) + '" type="button">×</button></span>';
      }).join('');
    }

    // Search
    searchTerm = state.searchTerm || '';
    $searchFilter.value = searchTerm;

    // Date range
    activeDays = state.activeDays || 30;
    activeDatePreset = state.activeDatePreset || '30';
    customDateStart = state.customDateStart ? new Date(state.customDateStart) : null;
    customDateEnd = state.customDateEnd ? new Date(state.customDateEnd) : null;
    document.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
    const matchTab = document.querySelector('.hero-date-tab[data-days="' + activeDatePreset + '"]');
    if (matchTab) matchTab.classList.add('active');
    $('custom-date-picker').hidden = true;
    if (activeDatePreset === 'custom' && customDateStart && customDateEnd) {
      $('custom-date-start').value = customDateStart.toISOString().slice(0, 10);
      $('custom-date-end').value = customDateEnd.toISOString().slice(0, 10);
    }

    // Sort
    activeMetric = state.activeMetric || 'clickRate';
    sortAsc = !!state.sortAsc;

    // View mode
    setViewMode(state.viewMode || 'cards');

    // Group-by
    groupBy = state.groupBy || 'campaign';
    document.querySelectorAll('.cs-groupby-btn').forEach(b => b.classList.remove('active'));
    const gbBtn = document.querySelector('.cs-groupby-btn[data-group="' + groupBy + '"]');
    if (gbBtn) gbBtn.classList.add('active');

    scaleData();
    refresh();
  }

  /* Build descriptive pills for a view state */
  var DATE_LABELS = { '7': '7 days', '30': '30 days', '90': '90 days', 'ytd': 'YTD', '365': '1 year', 'custom': 'Custom range' };
  var FILTER_LABEL_MAP = {
    'attention': 'Needs attention', 'strong': 'Strong', 'average': 'Average',
    'inactive': 'Low activity', 'high-bounce': 'High bounce',
    'low-deliv': 'Low delivery', 'high-unsub': 'High unsub',
  };

  function viewPillsHtml(state) {
    var pills = [];
    // Date pill
    pills.push('<span class="saved-view-pill saved-view-pill--date">' +
      (DATE_LABELS[state.activeDatePreset] || '30 days') + '</span>');
    // Location pill
    if (state.activeLocation && state.activeLocation !== 'all') {
      pills.push('<span class="saved-view-pill saved-view-pill--location">' + esc(state.activeLocation) + '</span>');
    }
    // Filter pills
    if (state.activeFilters && state.activeFilters.length) {
      state.activeFilters.forEach(function(f) {
        var label = f.startsWith('brand:') ? f.replace('brand:', '') : (FILTER_LABEL_MAP[f] || f);
        pills.push('<span class="saved-view-pill saved-view-pill--filter">' + esc(label) + '</span>');
      });
    }
    // Search pill
    if (state.searchTerm) {
      pills.push('<span class="saved-view-pill saved-view-pill--search">"' + esc(state.searchTerm) + '"</span>');
    }
    return pills.join('');
  }

  function describeView(state) {
    var parts = [];
    if (state.activeLocation !== 'all') parts.push(state.activeLocation);
    if (state.activeFilters.length) parts.push(state.activeFilters.length + ' filter' + (state.activeFilters.length > 1 ? 's' : ''));
    if (state.searchTerm) parts.push('"' + state.searchTerm + '"');
    parts.push(DATE_LABELS[state.activeDatePreset] || '30 days');
    return parts.join(' · ');
  }

  function formatViewDate(isoStr) {
    try {
      var d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  }

  function renderSavedViews() {
    var views = getSavedViews();
    var $list = $('saved-views-list');
    var $count = $('saved-views-count');

    if (!views.length) {
      $list.innerHTML =
        '<div class="saved-views-empty">' +
          '<span class="saved-views-empty-icon">📑</span>' +
          '<span class="saved-views-empty-text">No saved views yet</span>' +
          '<span class="saved-views-empty-sub">Save your current filters and date range so you can quickly switch between different report views.</span>' +
        '</div>';
      $count.textContent = '';
      return;
    }

    $count.textContent = views.length;
    $list.innerHTML = views.map(function(v, i) {
      return '<div class="saved-view-item" data-view-idx="' + i + '">' +
        '<div class="saved-view-icon">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>' +
        '</div>' +
        '<div class="saved-view-info">' +
          '<span class="saved-view-name">' + esc(v.name) + '</span>' +
          '<span class="saved-view-meta">Saved ' + formatViewDate(v.createdAt) + '</span>' +
          '<div class="saved-view-filters">' + viewPillsHtml(v.state) + '</div>' +
        '</div>' +
        '<button class="saved-view-delete" data-del-idx="' + i + '" title="Delete view" type="button">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>';
    }).join('');
  }

  /* Render a preview of the currently active filters in the footer */
  function renderCurrentFilterPreview() {
    var $preview = $('saved-views-current-preview');
    if (!$preview) return;
    $preview.innerHTML = viewPillsHtml(getCurrentViewState());
  }

  function initSavedViews() {
    var $btn = $('btn-saved-views');
    var $dropdown = $('saved-views-dropdown');
    var $list = $('saved-views-list');
    var $nameInput = $('saved-views-name');
    var $saveBtn = $('btn-save-view');

    renderSavedViews();

    // Toggle dropdown
    $btn.addEventListener('click', function(e) {
      e.stopPropagation();
      $dropdown.hidden = !$dropdown.hidden;
      if (!$dropdown.hidden) {
        renderSavedViews();
        renderCurrentFilterPreview();
        // Auto-focus the name input for quick typing
        setTimeout(function() { $nameInput.focus(); }, 80);
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!$btn.contains(e.target) && !$dropdown.contains(e.target)) {
        $dropdown.hidden = true;
      }
    });

    // Save via Enter key in the input
    $nameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        $saveBtn.click();
      }
    });

    // Clear error state on typing
    $nameInput.addEventListener('input', function() {
      $nameInput.classList.remove('input-error');
    });

    // Save current view
    $saveBtn.addEventListener('click', function() {
      var name = $nameInput.value.trim();
      if (!name) {
        $nameInput.focus();
        $nameInput.classList.add('input-error');
        return;
      }
      $nameInput.classList.remove('input-error');
      var state = getCurrentViewState();
      var views = getSavedViews();
      views.push({
        name: name,
        description: describeView(state),
        state: state,
        createdAt: new Date().toISOString(),
      });
      persistViews(views);
      $nameInput.value = '';
      renderSavedViews();
      // Show a confirmation toast
      showToast('View "' + name + '" saved successfully');
    });

    // Click on a saved view to load it, or delete it
    $list.addEventListener('click', function(e) {
      // Delete button
      var delBtn = e.target.closest('.saved-view-delete');
      if (delBtn) {
        e.stopPropagation();
        var idx = parseInt(delBtn.dataset.delIdx, 10);
        var views = getSavedViews();
        var deletedName = views[idx] ? views[idx].name : 'View';
        views.splice(idx, 1);
        persistViews(views);
        renderSavedViews();
        showToast('"' + deletedName + '" removed');
        return;
      }

      // Load view
      var item = e.target.closest('.saved-view-item');
      if (item) {
        var idx2 = parseInt(item.dataset.viewIdx, 10);
        var views2 = getSavedViews();
        if (views2[idx2]) {
          applyViewState(views2[idx2].state);
          $dropdown.hidden = true;
          showToast('Loaded view "' + views2[idx2].name + '"');
        }
      }
    });
  }

  /* ================================================================
     LIST HEADER — count, sort context, filter badge, view toggle
     ================================================================ */
  const metricDisplayNames = {
    sends: 'emails sent', openRate: 'open rate', clickRate: 'click rate',
    deliverability: 'delivered', bounceRate: 'bounced', unsubRate: 'unsubscribed',
  };

  function updateListHeader(rows) {
    // Title — dynamic based on groupBy
    const $title = $('list-header-title');
    if ($title) $title.textContent = groupBy === 'campaign' ? 'Campaigns' : 'Accounts';

    // Count
    const $count = $('list-header-count');
    if ($count) $count.textContent = rows.length;

    // Sort context
    const $context = $('list-header-context');
    if ($context) {
      $context.textContent = 'sorted by ' + (metricDisplayNames[activeMetric] || activeMetric);
    }

    // Filter badge — show when anything besides defaults is active
    const isFiltered =
      activeLocation !== 'all' ||
      activeFilters.length > 0 ||
      searchTerm.length > 0 ||
      activeDatePreset !== '30';
    const $badge = $('summary-filter-badge');
    if ($badge) {
      $badge.hidden = !isFiltered;
      if (isFiltered) {
        // Build descriptive text
        const parts = [];
        if (activeDatePreset !== '30') {
          const dateNames = { '7': '7 days', '90': '90 days', 'ytd': 'YTD', '365': '1 year', 'custom': 'custom range' };
          parts.push(dateNames[activeDatePreset] || activeDatePreset);
        }
        if (activeLocation !== 'all') parts.push('1 account');
        if (activeFilters.length > 0) parts.push(activeFilters.length + ' filter' + (activeFilters.length > 1 ? 's' : ''));
        if (searchTerm.length > 0) parts.push('search');
        $badge.textContent = 'Filtered: ' + parts.join(', ');
      }
    }

    // Connector between summary and locations — removed per design

    // Pulse the summary panel when filters change to signal update
    const currentSig = [activeLocation, activeFilters.join(','), searchTerm, activeDatePreset].join('|');
    if (prevFilterSignature && prevFilterSignature !== currentSig) {
      const $panel = $('summary-panel');
      if ($panel) {
        $panel.classList.add('summary-panel--updated');
        setTimeout(() => $panel.classList.remove('summary-panel--updated'), 700);
      }
    }
    prevFilterSignature = currentSig;
  }

  /* ================================================================
     MASTER REFRESH
     ================================================================ */
  function refresh() {
    const rows = getFiltered();

    // "No changes" detection — show toast if filter changed but result count didn't
    const newCount = rows.length;
    const currentSigCheck = [activeLocation, activeFilters.join(','), searchTerm, activeDatePreset].join('|');
    if (prevResultCount !== null && newCount === prevResultCount && prevFilterSignature && prevFilterSignature !== currentSigCheck && newCount === getActiveData().length) {
      // Filters changed but all items still match
      const entityToast = groupBy === 'campaign' ? 'campaigns' : 'accounts';
      showToast('All ' + newCount + ' ' + entityToast + ' match — no change', false);
    }
    prevResultCount = newCount;

    // When on All Activity, re-render that view instead of email-only panels
    if (activeChannel === 'all') {
      $searchFilter.placeholder = 'Search…';
      renderAllActivity();
      renderActiveFilters();
      if (typeof updateMobileFilterBadge === 'function') updateMobileFilterBadge();
      return;
    }

    $searchFilter.placeholder = groupBy === 'campaign' ? 'Search campaigns…' : 'Search accounts…';

    updateScope(rows);
    renderHealthHeadline(rows);
    renderKpis(rows);
    renderTrendSummary(rows);
    renderNoticeBar(rows);
    renderInlineLeaders(rows);
    renderActiveFilters();
    renderCards(rows);
    renderTable(rows);
    setSortedColumn();
    updateListHeader(rows);
    updateCompareTray();
    if (compareViewActive) {
      renderCompareView();
    }
    if (typeof updateMobileFilterBadge === 'function') updateMobileFilterBadge();
  }

  /* ================================================================
     EVENT LISTENERS
     ================================================================ */
  function initEvents() {
    // Group-by toggle
    $('groupby-toggle').addEventListener('click', e => {
      const btn = e.target.closest('.cs-groupby-btn');
      if (!btn || btn.classList.contains('active')) return;
      document.querySelectorAll('.cs-groupby-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      groupBy = btn.dataset.group;
      // Reset campaign filter when switching away from campaign mode
      if (groupBy !== 'campaign') {
        activeCampaign = 'all';
        $campaignFilter.value = 'all';
      }
      syncFilterVisibility();
      // Clear comparison when switching group-by
      if (compareSelected.size > 0 || compareAll) {
        compareModeActive = false;
        compareAll = false;
        compareSelected.clear();
        if (compareViewActive) {
          compareViewActive = false;
          $('compare-view').hidden = true;
        }
      }
      refresh();
    });

    // Location filter
    $locationFilter.addEventListener('change', () => {
      activeLocation = $locationFilter.value;
      refresh();
    });

    // Campaign filter
    $campaignFilter.addEventListener('change', () => {
      activeCampaign = $campaignFilter.value;
      refresh();
    });



    // Search
    $searchFilter.addEventListener('input', () => {
      searchTerm = $searchFilter.value.trim();
      refresh();
    });

    // Date tabs (7, 30, 90, ytd, 365, custom)
    $('date-tabs').addEventListener('click', e => {
      const tab = e.target.closest('.hero-date-tab');
      if (!tab) return;
      const val = tab.dataset.days;

      if (val === 'custom') {
        // Show the custom date picker, but don't switch yet
        $('custom-date-picker').hidden = false;
        // Pre-fill with reasonable defaults
        const $start = $('custom-date-start');
        const $end = $('custom-date-end');
        if (!$end.value) {
          const today = new Date();
          $end.value = today.toISOString().slice(0, 10);
          const monthAgo = new Date(today);
          monthAgo.setDate(today.getDate() - 30);
          $start.value = monthAgo.toISOString().slice(0, 10);
        }
        return;
      }

      // Hide custom picker if open
      $('custom-date-picker').hidden = true;

      if (val === 'ytd') {
        const now = new Date();
        const jan1 = new Date(now.getFullYear(), 0, 1);
        activeDays = Math.ceil((now - jan1) / (1000 * 60 * 60 * 24));
        activeDatePreset = 'ytd';
      } else {
        activeDays = parseInt(val, 10);
        activeDatePreset = val;
      }

      document.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Immediately update the date badge so users see the new range right away
      syncDateBadge();
      showSkeleton();
      setTimeout(() => {
        scaleData();
        refresh();
      }, 250);
    });

    // Custom date picker — Apply
    $('custom-date-apply').addEventListener('click', () => {
      const startVal = $('custom-date-start').value;
      const endVal = $('custom-date-end').value;
      if (!startVal || !endVal) { alert('Please select both a start and end date.'); return; }
      customDateStart = new Date(startVal + 'T00:00:00');
      customDateEnd = new Date(endVal + 'T00:00:00');
      if (customDateEnd < customDateStart) { alert('End date must be after start date.'); return; }
      activeDays = Math.max(1, Math.ceil((customDateEnd - customDateStart) / (1000 * 60 * 60 * 24)));
      activeDatePreset = 'custom';
      document.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
      $('date-tab-custom').classList.add('active');
      $('custom-date-picker').hidden = true;
      // Immediately update the date badge to reflect the custom range
      syncDateBadge();
      scaleData();
      refresh();
    });

    // Custom date picker — Cancel
    $('custom-date-cancel').addEventListener('click', () => {
      $('custom-date-picker').hidden = true;
    });

    // Close custom picker on outside click
    document.addEventListener('click', e => {
      const picker = $('custom-date-picker');
      const customTab = $('date-tab-custom');
      if (!picker.hidden && !picker.contains(e.target) && e.target !== customTab) {
        picker.hidden = true;
      }
    });

    // Table header sort — click same column to toggle asc/desc
    document.querySelector('#perf-table thead').addEventListener('click', e => {
      const th = e.target.closest('th[data-sort]');
      if (!th) return;
      const key = th.dataset.sort;
      if (activeMetric === key) {
        // Same column clicked → toggle direction
        sortAsc = !sortAsc;
      } else {
        // New column → reset to default direction (desc)
        activeMetric = key;
        sortAsc = false;
      }
      refresh();
    });


    // Export CSV
    $('btn-export-csv').addEventListener('click', exportCSV);

    // Share
    $('btn-share-report').addEventListener('click', () => {
      const url = window.location.href.split('?')[0] + '?view=shared';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => prompt('Share this link:', url));
      } else {
        prompt('Share this link:', url);
      }
    });

    // Reset all filters
    $('btn-reset-filters').addEventListener('click', resetAllFilters);

    // Active filter pills — remove individual or clear all
    $('active-filters').addEventListener('click', e => {
      const removeBtn = e.target.closest('.af-pill-remove');
      if (removeBtn) {
        const type = removeBtn.dataset.afType;
        const val = removeBtn.dataset.afValue;
        if (type === 'date') {
          activeDays = 30; activeDatePreset = '30';
          customDateStart = null; customDateEnd = null;
          $('custom-date-picker').hidden = true;
          document.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
          document.querySelector('.hero-date-tab[data-days="30"]').classList.add('active');
          scaleData();
        } else if (type === 'location') {
          activeLocation = 'all';
          $locationFilter.value = 'all';
        } else if (type === 'campaign') {
          activeCampaign = 'all';
          $campaignFilter.value = 'all';
        } else if (type === 'filter' && val) {
          activeFilters = activeFilters.filter(f => f !== val);
          const cb = $('perf-filter-dropdown').querySelector('input[value="' + val + '"]');
          if (cb) cb.checked = false;
          updateFilterTags();
        } else if (type === 'channel') {
          var $chSel = $('filter-channel');
          if ($chSel) $chSel.value = 'all';
        } else if (type === 'search') {
          searchTerm = '';
          $searchFilter.value = '';
        }
        refresh();
        return;
      }
      if (e.target.closest('#af-clear-all')) {
        resetAllFilters();
      }
    });

    // Back to top button — show/hide on scroll
    const $btt = $('back-to-top');
    const summaryEl = $('summary-panel');
    if ($btt && summaryEl) {
      let bttVisible = false;
      window.addEventListener('scroll', () => {
        const past = summaryEl.getBoundingClientRect().bottom < 0;
        if (past && !bttVisible) { $btt.classList.add('visible'); bttVisible = true; }
        else if (!past && bttVisible) { $btt.classList.remove('visible'); bttVisible = false; }
      }, { passive: true });
      $btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }


    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      // Don't trigger if typing in an input
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      switch (e.key) {
        case '/':
          e.preventDefault();
          $searchFilter.focus();
          break;
        case 'r': case 'R':
          if (!e.ctrlKey && !e.metaKey) resetAllFilters();
          break;
        case 'c': case 'C':
          if (!e.ctrlKey && !e.metaKey) {
            const btn = $('btn-compare');
            if (btn) btn.click();
          }
          break;
        case 'v': case 'V':
          break;
        case '1':
          document.querySelector('.hero-date-tab[data-days="7"]').click();
          break;
        case '2':
          document.querySelector('.hero-date-tab[data-days="30"]').click();
          break;
        case '3':
          document.querySelector('.hero-date-tab[data-days="90"]').click();
          break;
        case '4':
          document.querySelector('.hero-date-tab[data-days="ytd"]').click();
          break;
        case '5':
          document.querySelector('.hero-date-tab[data-days="365"]').click();
          break;
        case '?':
          $('kbd-overlay').hidden = false;
          break;
        case 'Escape':
          $('kbd-overlay').hidden = true;
          break;
      }
    });

    // Keyboard help overlay
    $('kbd-close').addEventListener('click', () => { $('kbd-overlay').hidden = true; });
    $('kbd-overlay').addEventListener('click', e => {
      if (e.target === $('kbd-overlay')) $('kbd-overlay').hidden = true;
    });
    $('footer-kbd-btn').addEventListener('click', () => { $('kbd-overlay').hidden = false; });

    // Footer refresh
    $('footer-refresh').addEventListener('click', e => {
      e.preventDefault();
      scaleData();
      refresh();
      $('footer-updated').textContent = 'Data as of ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
      showToast('Data refreshed', false);
    });

    // Smooth scroll to results after filter change (debounced)
    let scrollAfterFilter = false;
    const origRefresh = refresh;
    ['filter-location', 'filter-search'].forEach(id => {
      const el = $(id);
      if (el) {
        const origHandler = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(origHandler, () => { scrollAfterFilter = true; });
      }
    });
  }

  /* ================================================================
     EXPORT CSV
     ================================================================ */
  function exportCSV() {
    if (activeChannel === 'all') {
      exportAllActivityCSV();
      return;
    }
    const rows = getFiltered();
    const dateLabel = getDateLabel();
    const entityLabel = groupBy === 'campaign' ? 'Campaigns' : 'Accounts';
    const meta = [
      '# Email Performance Report — Evergreen Harvest Co.',
      '# Grouped by: ' + (groupBy === 'campaign' ? 'Campaign' : 'Account'),
      '# Date range: ' + dateLabel,
      '# ' + entityLabel + ': ' + rows.length,
      '# Exported: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      '',
    ];
    const isCampaignExport = groupBy === 'campaign';
    const headers = isCampaignExport
      ? ['Campaign', 'Type', 'Account', 'Brand', 'Sends', 'Open Rate', 'Click Rate', 'Deliverability', 'Bounce Rate', 'Unsub Rate']
      : ['Account', 'Brand', 'Sends', 'Open Rate', 'Click Rate', 'Deliverability', 'Bounce Rate', 'Unsub Rate', 'Contacts', 'New Contacts'];
    const csvRows = meta.concat([headers.join(',')]);
    rows.forEach(r => {
      if (isCampaignExport) {
        csvRows.push([
          '"' + (r.campaignName || r.name) + '"', '"' + (r.campaignType || '') + '"',
          '"' + (r.locationName || '') + '"', '"' + r.brand + '"',
          r.sends, r.openRate.toFixed(1) + '%', r.clickRate.toFixed(1) + '%',
          r.deliverability.toFixed(1) + '%', r.bounceRate.toFixed(1) + '%',
          r.unsubRate.toFixed(1) + '%',
        ].join(','));
      } else {
        csvRows.push([
          '"' + r.name + '"', '"' + r.brand + '"',
          r.sends, r.openRate.toFixed(1) + '%', r.clickRate.toFixed(1) + '%',
          r.deliverability.toFixed(1) + '%', r.bounceRate.toFixed(1) + '%',
          r.unsubRate.toFixed(1) + '%',
          r.contacts, r.newContacts,
        ].join(','));
      }
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evergreen-harvest-email-performance.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportAllActivityCSV() {
    var filtered = getAAFiltered();
    var sorted = sortAARows(filtered);
    var dateLabel = getDateLabel();
    var dateFmt = { month: 'short', day: 'numeric', year: 'numeric' };
    var meta = [
      '# All Activity Report — Evergreen Harvest Co.',
      '# Date range: ' + dateLabel,
      '# Campaigns: ' + sorted.length,
      '# Exported: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      '',
    ];
    var headers = ['Campaign', 'Channel', 'Account', 'Brand', 'Sent / Reach', 'Delivered', 'Opens / Views', 'Clicks', 'Click Rate', 'Date'];
    var csvRows = meta.concat([headers.join(',')]);
    sorted.forEach(function(r) {
      csvRows.push([
        '"' + r.name + '"', '"' + r.channel + '"',
        '"' + r.location + '"', '"' + r.brand + '"',
        r.sent, r.delivered, r.opens, r.clicks,
        r.clickRate.toFixed(1) + '%',
        '"' + r.date.toLocaleDateString('en-US', dateFmt) + '"'
      ].join(','));
    });
    var blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'evergreen-harvest-all-activity.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ================================================================
     MOBILE FILTER DRAWER
     ================================================================ */
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function getMobileFilterCount() {
    let count = 0;
    const locSel = $('filter-location');
    if (locSel && locSel.value !== 'all') count++;
    const search = $('filter-search');
    if (search && search.value.trim()) count++;
    if (typeof selectedPerfFilters !== 'undefined' && selectedPerfFilters.length > 0) count += selectedPerfFilters.length;
    return count;
  }

  function updateMobileFilterBadge() {
    const badge = $('m-filter-count');
    if (!badge) return;
    const count = getMobileFilterCount();
    badge.textContent = count > 0 ? count : '';
  }

  function openFilterDrawer() {
    const overlay = $('m-filter-overlay');
    if (!overlay) return;
    populateFilterDrawer();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus trap
    requestAnimationFrame(() => {
      const first = overlay.querySelector('button, select, input');
      if (first) first.focus();
    });
  }

  function closeFilterDrawer() {
    const overlay = $('m-filter-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function populateFilterDrawer() {
    const body = $('m-filter-body');
    if (!body) return;

    const entityLabel = groupBy === 'campaign' ? 'campaigns' : 'accounts';
    const entityLabelUC = groupBy === 'campaign' ? 'Campaign' : 'Account';
    const dateLabel = getDateLabel();

    // Build location/campaign selector options
    const locSel = $('filter-location');
    let locOptions = '';
    if (locSel) {
      Array.from(locSel.options).forEach(opt => {
        const sel = opt.value === locSel.value ? 'selected' : '';
        locOptions += '<option value="' + opt.value + '" ' + sel + '>' + opt.textContent + '</option>';
      });
    }

    // Build date tab buttons
    const activeDays = document.querySelector('.hero-date-tab.active');
    const activeDaysVal = activeDays ? activeDays.dataset.days : '30';
    const dateTabs = [
      { label: '7 days', val: '7' },
      { label: '30 days', val: '30' },
      { label: '90 days', val: '90' },
      { label: 'YTD', val: 'ytd' },
      { label: '1 year', val: '365' },
      { label: 'Custom', val: 'custom' }
    ];
    let dateHTML = '<div class="hero-date-tabs">';
    dateTabs.forEach(t => {
      dateHTML += '<button class="hero-date-tab' + (t.val === activeDaysVal ? ' active' : '') + '" data-days="' + t.val + '" type="button">' + t.label + '</button>';
    });
    dateHTML += '</div>';

    // Build perf filter options
    const perfFilters = [
      { group: 'Performance', items: [
        { val: 'needs-attention', label: 'Needs attention', desc: 'Bounce >4%, unsub >2%, low opens/clicks' },
        { val: 'strong', label: 'Strong performers', desc: 'Click ≥6%, open ≥35%' },
        { val: 'average', label: 'Average', desc: 'In-range on most metrics' },
        { val: 'low-activity', label: 'Low activity', desc: '<100 sends in period' }
      ]},
      { group: 'Issues', items: [
        { val: 'high-bounce', label: 'High bounce rate', desc: '>4% bounce' },
        { val: 'low-deliv', label: 'Low deliverability', desc: '<90% delivered' },
        { val: 'high-unsub', label: 'High unsubscribe rate', desc: '>2% unsub' }
      ]},
      { group: 'Brand', items: [] }
    ];
    // Populate brands
    const brands = [...new Set(LOCATIONS.map(l => l.brand))];
    brands.forEach(b => perfFilters[2].items.push({ val: 'brand-' + b.replace(/\s+/g, '-').toLowerCase(), label: b, desc: '' }));

    let perfHTML = '';
    perfFilters.forEach(grp => {
      perfHTML += '<div class="multi-select-group-label">' + grp.group + '</div>';
      grp.items.forEach(item => {
        const checked = (typeof selectedPerfFilters !== 'undefined' && selectedPerfFilters.includes(item.val)) ? 'checked' : '';
        perfHTML += '<label class="multi-select-option"><input type="checkbox" value="' + item.val + '" ' + checked + ' class="m-perf-check" />';
        perfHTML += '<span><span class="filter-option-label">' + item.label + '</span>';
        if (item.desc) perfHTML += '<span class="filter-option-desc">' + item.desc + '</span>';
        perfHTML += '</span></label>';
      });
    });

    // Search
    const searchVal = $('filter-search') ? $('filter-search').value : '';

    body.innerHTML = '' +
      '<div class="m-filter-section">' +
        '<div class="m-filter-section-title">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          'Search' +
        '</div>' +
        '<input class="cs-search-input" id="m-search" type="text" placeholder="Search ' + entityLabel + '…" value="' + searchVal + '" />' +
      '</div>' +

      '<div class="m-filter-section">' +
        '<div class="m-filter-section-title">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>' +
          entityLabelUC +
        '</div>' +
        '<select class="cs-select" id="m-location-filter">' + locOptions + '</select>' +
      '</div>' +

      '<div class="m-filter-section">' +
        '<div class="m-filter-section-title">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
          'Date Range' +
        '</div>' +
        dateHTML +
      '</div>' +

      '<div class="m-filter-section">' +
        '<div class="m-filter-section-title">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>' +
          'Performance Filters' +
        '</div>' +
        perfHTML +
      '</div>';
  }

  function applyMobileFilters() {
    // Sync search
    const mSearch = document.getElementById('m-search');
    const mainSearch = $('filter-search');
    if (mSearch && mainSearch) mainSearch.value = mSearch.value;

    // Sync location filter
    const mLoc = document.getElementById('m-location-filter');
    const mainLoc = $('filter-location');
    if (mLoc && mainLoc) {
      mainLoc.value = mLoc.value;
      mainLoc.dispatchEvent(new Event('change'));
    }

    // Sync perf filters
    const checks = document.querySelectorAll('.m-perf-check');
    const newSelected = [];
    checks.forEach(chk => { if (chk.checked) newSelected.push(chk.value); });
    if (typeof selectedPerfFilters !== 'undefined') {
      selectedPerfFilters.length = 0;
      newSelected.forEach(v => selectedPerfFilters.push(v));
    }

    // Sync date tabs — find the active one in drawer
    const activeTab = document.querySelector('#m-filter-body .hero-date-tab.active');
    if (activeTab) {
      const dayVal = activeTab.dataset.days;
      const mainTab = document.querySelector('.hero-date-tabs:not(#m-filter-body .hero-date-tabs) .hero-date-tab[data-days="' + dayVal + '"]');
      if (mainTab && !mainTab.classList.contains('active')) {
        mainTab.click();
      }
    }

    closeFilterDrawer();
    updateMobileFilterBadge();
    scaleData();
    refresh();
  }

  function initMobileFilters() {
    // Toggle button
    const toggleBtn = $('cs-mobile-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        openFilterDrawer();
      });
    }

    // Close button
    const closeBtn = $('m-filter-close');
    if (closeBtn) closeBtn.addEventListener('click', closeFilterDrawer);

    // Overlay background
    const overlay = $('m-filter-overlay');
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeFilterDrawer();
      });
    }

    // Apply button
    const applyBtn = $('m-filter-apply');
    if (applyBtn) applyBtn.addEventListener('click', applyMobileFilters);

    // Reset button
    const resetBtn = $('m-filter-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      resetAllFilters();
      closeFilterDrawer();
    });

    // Delegate date tab clicks inside drawer
    const drawerBody = $('m-filter-body');
    if (drawerBody) {
      drawerBody.addEventListener('click', e => {
        const tab = e.target.closest('.hero-date-tab');
        if (!tab) return;
        drawerBody.querySelectorAll('.hero-date-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    }

    // Swipe-down to close drawer
    let touchStartY = 0;
    const drawer = $('m-filter-drawer');
    if (drawer) {
      drawer.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      drawer.addEventListener('touchmove', e => {
        const deltaY = e.touches[0].clientY - touchStartY;
        if (deltaY > 80 && drawer.scrollTop <= 0) {
          closeFilterDrawer();
        }
      }, { passive: true });
    }

    // Update badge on filter changes
    updateMobileFilterBadge();
  }

  /* ================================================================
     INIT
     ================================================================ */
  /* ================================================================
     DRILLDOWN — Individual email detail view for a location/campaign
     ================================================================ */
  const EMAIL_SUBJECTS = [
    'Your weekly update from {name}',
    '🌿 Fresh picks this week',
    'Don\'t miss our spring promo!',
    'Welcome to {name}!',
    'We miss you — come back for 20% off',
    'Holiday hours & special menu',
    'Monthly recap: what\'s new at {name}',
    'Last chance: Weekend flash sale',
    'New seasonal items just dropped',
    'Thank you for being a loyal customer',
    'Your order is confirmed',
    'Refer a friend, earn rewards',
    'Big news: Grand re-opening event',
    'Your feedback matters to us',
    '🎉 Anniversary special inside',
  ];

  function generateDrilldownEmails(entity) {
    // Build 6–12 mock individual emails based on the entity's aggregate metrics
    const seed = entity.name.length + entity.sends;
    const count = 6 + (seed % 7); // 6–12 emails
    const emails = [];
    const now = new Date();
    const dayRange = activeDays || 30;

    for (let i = 0; i < count; i++) {
      const daysAgo = Math.floor((i / count) * dayRange) + 1;
      const sentDate = new Date(now);
      sentDate.setDate(sentDate.getDate() - daysAgo);

      // Vary metrics per email based on position
      const variance = 0.7 + (((seed * (i + 1) * 7) % 60) / 100); // 0.7–1.3
      const sent = Math.max(20, Math.floor((entity.sends / count) * variance));
      const delivRate = Math.min(100, entity.deliverability * (0.97 + ((i % 5) * 0.008)));
      const delivered = Math.floor(sent * delivRate / 100);
      const openRateEmail = Math.min(99, Math.max(3, entity.openRate * variance));
      const opens = Math.floor(delivered * openRateEmail / 100);
      const clickRateEmail = Math.min(50, Math.max(0.2, entity.clickRate * variance));
      const clicks = Math.max(0, Math.floor(delivered * clickRateEmail / 100));
      const unsubRateEmail = Math.min(8, Math.max(0.05, (entity.unsubRate || 0.5) * variance));
      const unsubs = Math.max(0, Math.floor(delivered * unsubRateEmail / 100));

      const subjIdx = (seed + i * 3) % EMAIL_SUBJECTS.length;
      const displayName = entity.campaignName || entity.name.split(' ').slice(0, -1).join(' ') || entity.name;
      const subject = EMAIL_SUBJECTS[subjIdx].replace('{name}', displayName);

      const status = i === 0 && daysAgo <= 2 ? 'scheduled' : 'sent';

      emails.push({
        subject,
        sent,
        delivered,
        opens,
        openRate: openRateEmail,
        clicks,
        clickRate: clickRateEmail,
        unsubs,
        unsubRate: unsubRateEmail,
        sentDate,
        status,
      });
    }
    return emails.sort((a, b) => b.sentDate - a.sentDate); // newest first
  }

  function openDrilldown(entityName) {
    const dataset = groupBy === 'campaign' ? scaledCampaignData : scaledData;
    const entity = dataset.find(r => r.name === entityName);
    if (!entity) return;

    const emails = generateDrilldownEmails(entity);
    const $overlay = $('drilldown-overlay');
    const displayName = groupBy === 'campaign'
      ? (entity.campaignName + ' — ' + entity.locationName)
      : entity.name;

    // Title & subtitle
    $('drilldown-title').textContent = displayName;
    $('drilldown-subtitle').textContent = emails.length + ' emails · ' + getDateLabel();

    // KPI summary for this entity
    const kpis = [
      { label: 'Total sends', value: fmtNum(entity.sends), cls: '' },
      { label: 'Open rate', value: fmtPct(entity.openRate), cls: entity.openRate >= 35 ? '--good' : entity.openRate < 20 ? '--bad' : entity.openRate < 25 ? '--warn' : '' },
      { label: 'Click rate', value: fmtPct(entity.clickRate), cls: entity.clickRate >= 6 ? '--good' : entity.clickRate < 2.5 ? '--bad' : entity.clickRate < 4 ? '--warn' : '' },
      { label: 'Deliverability', value: fmtPct(entity.deliverability), cls: entity.deliverability >= 95 ? '--good' : entity.deliverability < 85 ? '--bad' : entity.deliverability < 90 ? '--warn' : '' },
      { label: 'Bounce rate', value: fmtPct(entity.bounceRate), cls: entity.bounceRate <= 1.5 ? '--good' : entity.bounceRate > 4 ? '--bad' : entity.bounceRate > 2.5 ? '--warn' : '' },
      { label: 'Unsub rate', value: fmtPct(entity.unsubRate), cls: entity.unsubRate <= 0.3 ? '--good' : entity.unsubRate > 2 ? '--bad' : entity.unsubRate > 1.5 ? '--warn' : '' },
    ];
    $('drilldown-kpis').innerHTML = kpis.map(k =>
      '<div class="drilldown-kpi">' +
        '<div class="drilldown-kpi-label">' + k.label + '</div>' +
        '<div class="drilldown-kpi-value' + (k.cls ? ' drilldown-kpi-value' + k.cls : '') + '">' + k.value + '</div>' +
      '</div>'
    ).join('');

    // Email rows
    const fmtDate = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    $('drilldown-tbody').innerHTML = emails.map(e => {
      const statusCls = e.status === 'scheduled' ? 'drilldown-status--scheduled' : 'drilldown-status--sent';
      const statusLabel = e.status === 'scheduled' ? 'Scheduled' : 'Sent';
      return '<tr>' +
        '<td><span class="drilldown-email-subj" title="' + esc(e.subject) + '">' + esc(e.subject) + '</span></td>' +
        '<td class="num">' + fmtNum(e.sent) + '</td>' +
        '<td class="num">' + fmtNum(e.delivered) + '</td>' +
        '<td class="num">' + fmtNum(e.opens) + '</td>' +
        '<td class="num" style="color:' + colorForClass(metricClass('openRate', e.openRate)) + '">' + fmtPct(e.openRate) + '</td>' +
        '<td class="num">' + fmtNum(e.clicks) + '</td>' +
        '<td class="num" style="color:' + colorForClass(metricClass('clickRate', e.clickRate)) + '">' + fmtPct(e.clickRate) + '</td>' +
        '<td class="num">' + e.unsubs + '</td>' +
        '<td class="num" style="color:' + colorForClass(metricClass('unsubRate', e.unsubRate)) + '">' + fmtPct(e.unsubRate) + '</td>' +
        '<td><span class="drilldown-date">' + fmtDate(e.sentDate) + '</span></td>' +
        '<td><span class="drilldown-status ' + statusCls + '">' + statusLabel + '</span></td>' +
      '</tr>';
    }).join('');

    // Show overlay
    $overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    $overlay.scrollTop = 0;
  }

  function closeDrilldown() {
    $('drilldown-overlay').hidden = true;
    document.body.style.overflow = '';
  }

  function initDrilldown() {
    // Back button
    $('drilldown-back').addEventListener('click', closeDrilldown);

    // Close on Escape
    $('drilldown-overlay').addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrilldown();
    });

    // Click overlay background to close (but not the panel itself)
    $('drilldown-overlay').addEventListener('click', e => {
      if (e.target === $('drilldown-overlay')) closeDrilldown();
    });
  }

  /* ================================================================
     CHANNEL TABS — switching between Email, SMS, Social, etc.
     ================================================================ */
  let activeChannel = 'email';

  function initChannelTabs() {
    var $tabs = $('channel-tabs');
    if (!$tabs) return;

    $tabs.addEventListener('click', function(e) {
      var btn = e.target.closest('.channel-tab');
      if (!btn || btn.classList.contains('active')) return;

      var channel = btn.dataset.channel;
      switchChannel(channel);
    });
  }

  function switchChannel(channel) {
    activeChannel = channel;

    // Update tab active state
    document.querySelectorAll('.channel-tab').forEach(function(t) {
      t.classList.toggle('active', t.dataset.channel === channel);
    });

    // Show/hide content panels
    document.querySelectorAll('.channel-content').forEach(function(panel) {
      panel.hidden = true;
    });
    var $panel = $('channel-' + channel);
    if ($panel) $panel.hidden = false;

    // Update hero title/scope
    var $title = $('hero-title');
    var channelNames = { email: 'Email Performance', contacts: 'Contacts', social: 'Social', automation: 'Automation', all: 'All Activity' };
    if ($title) $title.textContent = channelNames[channel] || 'Reporting';

    // Update breadcrumb
    var $bc = document.querySelector('.breadcrumb-current');
    if ($bc) $bc.textContent = channelNames[channel] || 'Reporting';

    // Adapt the control strip for the active channel
    var isEmail = channel === 'email';
    var isAll = channel === 'all';
    var showControls = isEmail || isAll;

    var $strip = $('control-strip');
    if ($strip) $strip.style.display = showControls ? '' : 'none';

    // Hide email-only controls when on All Activity; show channel filter on All Activity
    var emailOnly = [
      document.getElementById('groupby-toggle') ? document.getElementById('groupby-toggle').closest('.cs-labeled-group') : null,
      $('cs-group-campaign'),
      document.getElementById('perf-filter-multi') ? document.getElementById('perf-filter-multi').closest('.cs-labeled-group') : null,
      $('btn-compare'),
      $('cs-div-groupby'),
      $('cs-div-filters')
    ];
    emailOnly.forEach(function(el) { if (el) el.style.display = isEmail ? '' : 'none'; });

    var $channelGroup = $('cs-group-channel');
    if ($channelGroup) $channelGroup.style.display = isAll ? '' : 'none';

    // Update search placeholder
    var $search = $('filter-search');
    if ($search) $search.placeholder = isAll ? 'Search campaigns…' : 'Search accounts…';

    // Render all-activity table when switching to that tab
    if (isAll) {
      renderAllActivity();
    }

    document.title = (channelNames[channel] || 'Reporting') + ' — Evergreen Harvest Co.';
  }

  /* ================================================================
     ALL ACTIVITY — cross-channel campaign data & rendering
     ================================================================ */
  var ALL_ACTIVITY_DATA = [];
  var aaSortKey = 'date';
  var aaSortAsc = false;

  function buildAllActivityData() {
    var rows = [];
    var dateBase = new Date();
    dateBase.setDate(dateBase.getDate() - 2);

    scaledCampaignData.forEach(function(r, i) {
      var d = new Date(dateBase);
      d.setDate(d.getDate() - Math.floor(i * 1.3));
      rows.push({
        name: r.campaignName,
        channel: 'email',
        location: r.locationName,
        brand: r.brand,
        sent: r.sends,
        delivered: Math.round(r.sends * r.deliverability / 100),
        opens: Math.round(r.sends * r.openRate / 100),
        clicks: Math.round(r.sends * r.clickRate / 100),
        clickRate: r.clickRate,
        date: d
      });
    });

    var autoNames = ['Welcome Series', 'Abandoned Cart Reminder', 'Birthday Email', 'Re-engagement Drip', 'Post-Purchase Follow-Up'];
    LOCATIONS.forEach(function(loc, li) {
      autoNames.forEach(function(sn, si) {
        var d = new Date(dateBase);
        d.setDate(d.getDate() - (li * 3 + si * 2));
        var sent = Math.floor(80 + Math.random() * 300);
        var cr = +(3 + Math.random() * 18).toFixed(1);
        rows.push({
          name: sn, channel: 'automation', location: loc.name, brand: loc.brand,
          sent: sent, delivered: Math.round(sent * 0.982), opens: 0,
          clicks: Math.round(sent * cr / 100), clickRate: cr, date: d
        });
      });
    });

    var socialNames = ['Instagram Reel — Farm Tour', 'Facebook Post — Menu Update', 'Instagram Story — Behind the Scenes', 'Facebook Event — Farmers Market', 'Instagram Carousel — Seasonal Picks'];
    LOCATIONS.slice(0, 5).forEach(function(loc, li) {
      socialNames.forEach(function(sn, si) {
        var d = new Date(dateBase);
        d.setDate(d.getDate() - (li * 2 + si * 3));
        var reach = Math.floor(200 + Math.random() * 2000);
        var eng = Math.floor(reach * (0.02 + Math.random() * 0.08));
        rows.push({
          name: sn, channel: 'social', location: loc.name, brand: loc.brand,
          sent: reach, delivered: reach, opens: eng,
          clicks: Math.floor(eng * 0.3), clickRate: +((eng / reach) * 100).toFixed(1), date: d
        });
      });
    });

    rows.sort(function(a, b) { return b.date - a.date; });
    ALL_ACTIVITY_DATA = rows;
  }

  function getAAFiltered() {
    if (!ALL_ACTIVITY_DATA.length) buildAllActivityData();

    var locationFilter = ($('filter-location') || {}).value || 'all';
    var channelFilter = ($('filter-channel') || {}).value || 'all';
    var search = (($('filter-search') || {}).value || '').toLowerCase().trim();

    var now = new Date();
    var cutoff = new Date(now);
    if (customDateStart && customDateEnd) {
      cutoff = new Date(customDateStart);
    } else {
      cutoff.setDate(cutoff.getDate() - activeDays);
    }
    var endDate = (customDateStart && customDateEnd) ? new Date(customDateEnd) : now;

    return ALL_ACTIVITY_DATA.filter(function(r) {
      if (locationFilter !== 'all' && r.location !== locationFilter) return false;
      if (channelFilter !== 'all' && r.channel !== channelFilter) return false;
      if (search && !(r.name + ' ' + r.location + ' ' + r.brand + ' ' + r.channel).toLowerCase().includes(search)) return false;
      if (r.date < cutoff || r.date > endDate) return false;
      return true;
    });
  }

  function sortAARows(rows) {
    var key = aaSortKey;
    var dir = aaSortAsc ? 1 : -1;
    return rows.slice().sort(function(a, b) {
      var va = a[key], vb = b[key];
      if (key === 'name' || key === 'channel' || key === 'location') {
        return dir * String(va).localeCompare(String(vb));
      }
      if (key === 'date') return dir * (va - vb);
      return -dir * (va - vb);
    });
  }

  function renderAllActivity() {
    var filtered = getAAFiltered();
    var sorted = sortAARows(filtered);

    var $scope = $('scope-meta');
    if ($scope && activeChannel === 'all') {
      var dateLabel = getDateLabel();
      var locVal = ($('filter-location') || {}).value || 'all';
      var chVal = ($('filter-channel') || {}).value || 'all';
      var acctLabel = locVal === 'all' ? 'All accounts' : locVal;
      var chLabel = chVal === 'all' ? 'All channels' : chVal.charAt(0).toUpperCase() + chVal.slice(1);
      $scope.textContent = acctLabel + '  ·  ' + chLabel + '  ·  ' + dateLabel;
    }

    // KPIs with channel breakdown
    var totalSent = 0, totalDelivered = 0, totalClicks = 0, totalOpens = 0;
    var emailCamps = 0, autoCamps = 0, socialCamps = 0;
    filtered.forEach(function(r) {
      totalSent += r.sent;
      totalDelivered += r.delivered;
      totalClicks += r.clicks;
      totalOpens += r.opens;
      if (r.channel === 'email') emailCamps++;
      else if (r.channel === 'automation') autoCamps++;
      else socialCamps++;
    });
    var avgClickRate = totalSent > 0 ? (totalClicks / totalSent * 100).toFixed(1) : '0.0';
    var delivRate = totalSent > 0 ? (totalDelivered / totalSent * 100).toFixed(1) : '0.0';

    // Count unique accounts
    var acctSet = {};
    filtered.forEach(function(r) { acctSet[r.location] = true; });
    var acctCount = Object.keys(acctSet).length;

    var $kpis = $('all-activity-kpis');
    if ($kpis) {
      $kpis.innerHTML =
        '<div class="all-activity-kpi-card">' +
          '<span class="all-activity-kpi-card-value">' + fmtNum(filtered.length) + '</span>' +
          '<span class="all-activity-kpi-card-label">Campaigns</span>' +
          '<span class="aa-kpi-breakdown">' +
            '<span class="aa-kpi-chip aa-kpi-chip--email">' + emailCamps + ' email</span>' +
            '<span class="aa-kpi-chip">' + autoCamps + ' auto</span>' +
            '<span class="aa-kpi-chip">' + socialCamps + ' social</span>' +
          '</span>' +
        '</div>' +
        '<div class="all-activity-kpi-card"><span class="all-activity-kpi-card-value">' + fmtNum(totalSent) + '</span><span class="all-activity-kpi-card-label">Sent / reach</span></div>' +
        '<div class="all-activity-kpi-card"><span class="all-activity-kpi-card-value">' + delivRate + '%</span><span class="all-activity-kpi-card-label">Delivered</span></div>' +
        '<div class="all-activity-kpi-card"><span class="all-activity-kpi-card-value">' + fmtNum(totalClicks) + '</span><span class="all-activity-kpi-card-label">Clicks</span></div>' +
        '<div class="all-activity-kpi-card"><span class="all-activity-kpi-card-value">' + avgClickRate + '%</span><span class="all-activity-kpi-card-label">Click rate</span></div>';
    }

    // Account overview cards
    renderAccountOverview(filtered);

    // Campaign count label
    var $campCount = $('aa-campaign-count');
    if ($campCount) $campCount.textContent = sorted.length + ' campaigns';

    // Update sort header styles
    document.querySelectorAll('#all-activity-table th[data-aa-sort]').forEach(function(th) {
      var isActive = th.dataset.aaSort === aaSortKey;
      th.classList.toggle('sorted', isActive);
      th.classList.toggle('sort-asc', isActive && aaSortAsc);
      th.classList.toggle('sort-desc', isActive && !aaSortAsc);
    });

    // Table body
    var $tbody = $('all-activity-tbody');
    if (!$tbody) return;

    if (!sorted.length) {
      $tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--n400);font-weight:600;">No campaigns match your filters</td></tr>';
      return;
    }

    var dateFmt = { month: 'short', day: 'numeric' };

    $tbody.innerHTML = sorted.slice(0, 200).map(function(r) {
      var chLabel = r.channel === 'automation' ? 'Automation' : r.channel.charAt(0).toUpperCase() + r.channel.slice(1);
      var chIcon = r.channel === 'email' ? '✉' : r.channel === 'automation' ? '⚙' : '📱';
      var chBadge = '<span class="channel-badge channel-badge--' + r.channel + '">' + chIcon + ' ' + chLabel + '</span>';

      return '<tr>' +
        '<td><span class="table-name-primary">' + esc(r.name) + '</span></td>' +
        '<td>' + chBadge + '</td>' +
        '<td><span class="table-name-sub">' + esc(r.location) + '</span></td>' +
        '<td class="num">' + fmtNum(r.sent) + '</td>' +
        '<td class="num">' + fmtNum(r.delivered) + '</td>' +
        '<td class="num">' + fmtNum(r.opens) + '</td>' +
        '<td class="num">' + fmtNum(r.clicks) + '</td>' +
        '<td class="num">' + r.clickRate.toFixed(1) + '%</td>' +
        '<td>' + r.date.toLocaleDateString('en-US', dateFmt) + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderAccountOverview(filtered) {
    var $grid = $('aa-account-grid');
    var $count = $('aa-account-count');
    if (!$grid) return;

    // Group by account
    var accts = {};
    filtered.forEach(function(r) {
      if (!accts[r.location]) {
        accts[r.location] = { name: r.location, brand: r.brand, sent: 0, clicks: 0, opens: 0, delivered: 0, campaigns: 0, channels: {} };
      }
      var a = accts[r.location];
      a.sent += r.sent;
      a.clicks += r.clicks;
      a.opens += r.opens;
      a.delivered += r.delivered;
      a.campaigns++;
      a.channels[r.channel] = (a.channels[r.channel] || 0) + 1;
    });

    var list = Object.keys(accts).map(function(k) { return accts[k]; });
    list.sort(function(a, b) { return b.sent - a.sent; });

    if ($count) $count.textContent = list.length + ' accounts';

    if (!list.length) {
      $grid.innerHTML = '<p style="color:var(--n400);font-weight:600;padding:20px 0;">No account data matches your filters</p>';
      return;
    }

    $grid.innerHTML = list.map(function(a) {
      var cr = a.sent > 0 ? (a.clicks / a.sent * 100).toFixed(1) : '0.0';
      var or = a.sent > 0 ? (a.opens / a.sent * 100).toFixed(1) : '0.0';
      var chTags = Object.keys(a.channels).map(function(ch) {
        var cls = ch === 'email' ? ' aa-account-channel-tag--email' : '';
        return '<span class="aa-account-channel-tag' + cls + '">' + a.channels[ch] + ' ' + ch + '</span>';
      }).join('');

      return '<div class="aa-account-card">' +
        '<div class="aa-account-card-head">' +
          '<span class="aa-account-name">' + esc(a.name) + '</span>' +
          '<span class="aa-account-brand">' + esc(a.brand) + '</span>' +
        '</div>' +
        '<div class="aa-account-metrics">' +
          '<div class="aa-account-metric"><span class="aa-account-metric-value">' + fmtNum(a.campaigns) + '</span><span class="aa-account-metric-label">Campaigns</span></div>' +
          '<div class="aa-account-metric"><span class="aa-account-metric-value">' + fmtNum(a.sent) + '</span><span class="aa-account-metric-label">Sent</span></div>' +
          '<div class="aa-account-metric"><span class="aa-account-metric-value">' + or + '%</span><span class="aa-account-metric-label">Open rate</span></div>' +
          '<div class="aa-account-metric"><span class="aa-account-metric-value">' + cr + '%</span><span class="aa-account-metric-label">Click rate</span></div>' +
        '</div>' +
        '<div class="aa-account-channels">' + chTags + '</div>' +
      '</div>';
    }).join('');
  }

  function initAllActivity() {
    // Sort headers
    var $table = $('all-activity-table');
    if ($table) {
      $table.querySelector('thead').addEventListener('click', function(e) {
        var th = e.target.closest('th[data-aa-sort]');
        if (!th) return;
        var key = th.dataset.aaSort;
        if (key === aaSortKey) { aaSortAsc = !aaSortAsc; }
        else { aaSortKey = key; aaSortAsc = key === 'name' || key === 'channel' || key === 'location'; }
        renderAllActivity();
      });
    }

    // Channel filter
    var $chFilter = $('filter-channel');
    if ($chFilter) $chFilter.addEventListener('change', function() { refresh(); });
  }

  function init() {
    loadDismissedAlerts();
    populateLocations();
    populateCampaigns();
    scaleData();
    syncFilterVisibility();
    setViewMode('table');
    initMultiSelect();
    initSavedViews();
    initCompare();
    refresh();
    initEvents();
    initMobileFilters();
    initDrilldown();
    initChannelTabs();
    initAllActivity();
    switchChannel('email');

    // Set footer timestamp
    const $footerDate = $('footer-updated');
    if ($footerDate) {
      $footerDate.textContent = 'Data as of ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
