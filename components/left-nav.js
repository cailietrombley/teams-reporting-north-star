/* Left Navigation Component
   Usage: renderLeftNav('sidebar-content', { activeId: 'reporting-email' })
*/
function renderLeftNav(containerId, options) {
  var opts = options || {};
  var activeId = opts.activeId || '';
  var container = document.getElementById(containerId);
  if (!container) return;

  var NAV = [
    { section: 'MY ORGANIZATION' },
    { id: 'org-dashboard', label: 'Org dashboard', icon: 'grid', href: 'org-dashboard.html' },
    { id: 'accounts', label: 'Accounts', icon: 'building', href: '#', expandable: true },
    { id: 'templates', label: 'Templates', icon: 'layout', href: '#' },
    { id: 'central-send', label: 'Central send', icon: 'send', href: '#', expandable: true },
    { id: 'reporting-org', label: 'Reporting', icon: 'bar-chart-org', href: '#', expandable: true, children: [
      { id: 'reporting-email', label: 'Email', href: 'email-engagement-report.html' },
      { id: 'reporting-contacts', label: 'Contacts', href: 'contacts-reporting.html' },
      { id: 'reporting-sms', label: 'SMS', href: 'sms-reporting.html' },
      { id: 'reporting-run', label: 'Reports', href: '#' }
    ]},
    { id: 'community', label: 'Community', icon: 'info', href: '#' },
    { section: 'MY MARKETING' },
    { id: 'my-dashboard', label: 'My dashboard', icon: 'grid', href: '#' },
    { id: 'campaigns', label: 'Campaigns', icon: 'check-circle', href: '#' },
    { id: 'contacts', label: 'Contacts', icon: 'user', href: '#' },
    { id: 'channels', label: 'Channels', icon: 'zap', href: '#', expandable: true },
    { id: 'audience', label: 'Audience', icon: 'users', href: '#', expandable: true },
    { id: 'assets', label: 'Assets', icon: 'package', href: '#', expandable: true },
    { id: 'reporting-my', label: 'Reporting', icon: 'bar-chart', href: '#', expandable: true },
    { id: 'automations', label: 'Automations', icon: 'shuffle', href: 'automations-reporting.html' },
    { id: 'integrations', label: 'Integrations', icon: 'link', href: '#' }
  ];

  var ICONS = {
    'grid': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    'building': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    'layout': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    'send': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    'bar-chart-org': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 15a2 2 0 0 1 2-2h16v5H5a2 2 0 0 1-2-2z"/></svg>',
    'info': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    'check-circle': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
    'user': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    'zap': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    'users': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'package': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
    'bar-chart': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    'shuffle': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    'link': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  var CHEVRON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

  function isChildActive(item) {
    if (item.id === activeId) return true;
    if (item.children) {
      for (var i = 0; i < item.children.length; i++) {
        if (item.children[i].id === activeId) return true;
      }
    }
    return false;
  }

  var html = '';

  // Logo
  html += '<div style="padding:20px 20px 12px">';
  html += '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:40px;height:40px">';
  html += '<circle cx="20" cy="20" r="18" stroke="#186ded" stroke-width="3" fill="none"/>';
  html += '<circle cx="20" cy="20" r="10" stroke="#186ded" stroke-width="2.5" fill="none"/>';
  html += '<circle cx="20" cy="14" r="3" fill="#186ded"/>';
  html += '</svg></div>';

  // Create button + collapse
  html += '<div style="margin:0 16px 16px;display:flex;align-items:center;gap:8px">';
  html += '<button style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#186ded;color:#fff;border:none;border-radius:24px;padding:10px 0;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
  html += 'Create</button>';
  html += '<button onclick="toggleSidebar()" style="width:32px;height:32px;border-radius:50%;border:1px solid #dce2ec;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7492;flex-shrink:0">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
  html += '</button></div>';

  // Nav items
  html += '<div style="flex:1;overflow-y:auto;padding-bottom:24px">';

  for (var i = 0; i < NAV.length; i++) {
    var item = NAV[i];

    if (item.section) {
      html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#6b7492;padding:16px 20px 8px">' + item.section + '</div>';
      continue;
    }

    var itemActive = isChildActive(item);
    var activeBg = itemActive ? 'background:#e6f8ff;color:#186ded;font-weight:600' : 'color:#3f4b63';
    var iconColor = itemActive ? 'color:#186ded' : 'color:#8d9bb6';
    var hasChildren = item.children && item.children.length > 0;
    var isOpen = hasChildren && itemActive;

    if (hasChildren) {
      html += '<div>';
      html += '<a href="javascript:void(0)" onclick="this.parentElement.classList.toggle(\'ln-open\')" style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 20px;font-size:14px;text-decoration:none;cursor:pointer;' + activeBg + '">';
      html += '<span style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;' + iconColor + '">' + (ICONS[item.icon] || '') + '</span>';
      html += item.label;
      html += '<span style="margin-left:auto;width:16px;height:16px;color:#c9d0de;transition:transform 0.2s" class="ln-chev">' + CHEVRON + '</span>';
      html += '</a>';
      html += '<div class="ln-sub" style="overflow:hidden;' + (isOpen ? '' : 'max-height:0') + '">';
      for (var c = 0; c < item.children.length; c++) {
        var child = item.children[c];
        var childActive = child.id === activeId;
        var childStyle = childActive ? 'color:#186ded;font-weight:600;background:#e6f8ff' : 'color:#5d687e';
        html += '<a href="' + child.href + '" style="display:block;font-size:13px;padding:6px 20px 6px 50px;text-decoration:none;' + childStyle + '">' + child.label + '</a>';
      }
      html += '</div>';
      if (isOpen) html = html.replace('<div>', '<div class="ln-open">');
      html += '</div>';
    } else {
      html += '<a href="' + item.href + '" style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 20px;font-size:14px;text-decoration:none;cursor:pointer;' + activeBg + '">';
      html += '<span style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;' + iconColor + '">' + (ICONS[item.icon] || '') + '</span>';
      html += item.label;
      if (item.expandable) {
        html += '<span style="margin-left:auto;width:16px;height:16px;color:#c9d0de">' + CHEVRON + '</span>';
      }
      html += '</a>';
    }
  }

  html += '</div>';

  // Inject styles for open/close toggling
  if (!document.getElementById('ln-toggle-style')) {
    var style = document.createElement('style');
    style.id = 'ln-toggle-style';
    style.textContent = '.ln-sub{max-height:0;overflow:hidden;transition:max-height 0.25s ease}.ln-open>.ln-sub{max-height:200px}.ln-open .ln-chev{transform:rotate(180deg)}.sidebar a:hover,.sidebar button:hover{background:#f0f4fa !important}';
    document.head.appendChild(style);
  }

  container.innerHTML = html;
}
