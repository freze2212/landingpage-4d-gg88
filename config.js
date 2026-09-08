// Runtime Configuration & Dynamic Domain Sync for landingPage-9d
(function() {
  var DEFAULT_TARGET = 'https://www.gg8842.com/home/register?id=609380932';
  window.REDIRECT_URL = DEFAULT_TARGET;

  function getQueryDomain() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get('domain') || '';
    } catch (e) {
      return '';
    }
  }

  function applyLinks(targetUrl) {
    if (!targetUrl) return;
    window.REDIRECT_URL = targetUrl;
    
    // Update all clickable links
    var elements = document.querySelectorAll('[data-city], [data-role="logo-portal"], a.btn-experience, .service-card a, a');
    elements.forEach(function(el) {
      el.setAttribute('href', targetUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      el.onclick = function(e) {
        e.preventDefault();
        window.open(targetUrl, '_blank') || (window.location.href = targetUrl);
      };
    });

    // Add click listeners to cards and buttons
    document.querySelectorAll('.service-card, .btn-experience, [data-city], [data-role="logo-portal"]').forEach(function(el) {
      el.onclick = function(e) {
        e.preventDefault();
        window.open(targetUrl, '_blank') || (window.location.href = targetUrl);
      };
    });
  }

  function resolveDomain() {
    var rawHost = (getQueryDomain() || window.location.hostname || '').toLowerCase();
    var host = rawHost.replace(/^www\./, '');

    fetch('/domains.json?v=' + Date.now())
      .then(function(res) { return res.json(); })
      .then(function(dj) {
        if (!dj) return;
        var entry = dj[rawHost] || dj[host] || dj['www.' + host] || dj['default'];
        if (entry) {
          var target = entry.main_url || entry.url || entry.link || (typeof entry === 'string' ? entry : '');
          if (target) {
            applyLinks(target);
          }
        }
      })
      .catch(function() {
        applyLinks(DEFAULT_TARGET);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyLinks(DEFAULT_TARGET);
      resolveDomain();
    });
  } else {
    applyLinks(DEFAULT_TARGET);
    resolveDomain();
  }
})();
