export const designTokens = {
  color: {
    surface: "#ffffff",
    surfaceSubtle: "#fafafa",
    control: "#eeeeee",
    controlActive: "#ededed",
    controlHover: "#f0f0f0",
    controlSoft: "#f5f5f5",
    ink: "#111111",
    inkHover: "#333333",
    inkMuted: "#555555",
    inkSubtle: "#777777",
    inkInverse: "#ffffff",
    border: "#e5e5e5",
    borderStrong: "#dddddd",
    borderControl: "#d5d5d5",
    brand: "#ff4b2f",
    success: "#10b981",
    danger: "#f43f5e",
  },
  size: {
    topbarHeight: "56px",
    footerHeight: "48px",
    sidebarWidth: "260px",
    collaboratorPanelWidth: "400px",
  },
  radius: {
    control: "8px",
    card: "12px",
    workspace: "14px",
    panel: "16px",
    pill: "999px",
  },
  shadow: {
    control: "0 1px 6px rgba(0, 0, 0, 0.04)",
    card: "0 1px 2px rgba(0, 0, 0, 0.08)",
    elevated: "0 16px 48px rgba(0, 0, 0, 0.12)",
  },
} as const

export type DesignTokens = typeof designTokens
