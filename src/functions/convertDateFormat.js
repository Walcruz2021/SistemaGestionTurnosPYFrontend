  export default function convertDateFormat(date) {
    // normalize many possible incoming formats to "YYYY-MM-DD"
    if (!date) return "";

    // already ISO-like "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SSZ"
    if (typeof date === "string" && date.includes("-")) {
      const iso = date.split("T")[0];
      const parts = iso.split("-");
      if (parts.length === 3 && parts[0].length === 4) return iso;
      // if it's "DD-MM-YYYY" -> reverse
      if (parts.length === 3 && parts[2].length === 4) {
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
      }
    }

    // format "DD/MM/YYYY" -> "YYYY-MM-DD"
    if (typeof date === "string" && date.includes("/")) {
      const parts = date.split("/");
      if (parts.length === 3) {
        const [d, m, y] = parts;
        return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
    }

    // fallback: try Date parsing
    const parsed = new Date(date);
    if (!isNaN(parsed)) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    return "";
  }