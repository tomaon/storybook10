export const fmtNumber0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format;

export const fmtDate = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format;

export const fmtDatetime = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format;
