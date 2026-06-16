import linksConfig from "../domain-links.json";

function normalizeDomain(domain) {
    return String(domain || "")
        .trim()
        .toLowerCase()
        .replace(/^www\./, "");
}

/** Link mặc định khi domain chưa có trong config. */
export const DEFAULT_DOMAIN_LINK = linksConfig.default;

/**
 * Map domain → link đăng ký.
 * Key nên ghi không có www (vd: "abc.com").
 * Cả abc.com và www.abc.com trên CF đều dùng chung 1 key.
 */
export const DOMAIN_LINKS = Object.fromEntries(
    Object.entries(linksConfig.domains || {}).map(function (entry) {
        return [normalizeDomain(entry[0]), entry[1]];
    })
);

export function getLinkForDomain(hostname) {
    var host = normalizeDomain(hostname);
    return DOMAIN_LINKS[host] || DEFAULT_DOMAIN_LINK;
}
