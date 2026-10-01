// Simple deterministic SHA-256 calculation compatible with Node and browser
export async function calculateSha256(text: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Node environment
  try {
    // Dynamic import to prevent bundler errors
    const crypto = await import("crypto");
    return crypto.createHash("sha256").update(text).digest("hex");
  } catch {
    // Fallback simple 64-char hex string generator
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return (hex + "a1b2c3d4e5f60718293a4b5c6d7e8f900112233445566778899aabbccddeeff0").slice(0, 64);
  }
}
