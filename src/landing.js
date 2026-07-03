import { getLinkForDomain } from "./domain-links.js";

export function runLanding() {
    /** href an toàn + thêm https:// nếu user nhập domain dạng example.com (tránh thành path tương đối). */
    function normalizePortalHref(raw) {
        var s = String(raw || "").trim();
        if (!s || s === "#") {
            return null;
        }
        var lower = s.toLowerCase();
        if (lower.indexOf("javascript:") === 0 || lower.indexOf("data:") === 0) {
            return null;
        }
        if (/^mailto:|^tel:/i.test(s)) {
            return s;
        }
        if (/^\/\//.test(s)) {
            return "https:" + s;
        }
        if (/^https?:\/\//i.test(s)) {
            return s;
        }
        if (/^\//.test(s)) {
            return s;
        }
        if (/[.]/.test(s) && !/\s/.test(s) && /^[\w.-]+(?:\.[\w.-]+)+/.test(s)) {
            return "https://" + s;
        }
        return s;
    }

    function hostnameForConfig() {
        var q = new URLSearchParams(window.location.search).get("domain");
        var host = q || window.location.hostname;
        return String(host || "").trim();
    }

    function domainLink() {
        return getLinkForDomain(hostnameForConfig());
    }

    function domainKeyForDisplay() {
        var host = hostnameForConfig().toLowerCase().replace(/^www\./, "");
        if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") {
            return "default";
        }
        return host || "default";
    }

    function applyPortalLink(url) {
        var href = normalizePortalHref(url);
        if (!href) {
            return null;
        }
        document.querySelectorAll("[data-city]").forEach(function (el) {
            el.setAttribute("href", href);
        });
        var logoEl = document.querySelector('[data-role="logo-portal"]');
        if (logoEl) {
            logoEl.setAttribute("href", href);
        }
        return href;
    }

    function run() {
        document.body.dataset.domain = domainKeyForDisplay();
        applyPortalLink(domainLink());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
}
