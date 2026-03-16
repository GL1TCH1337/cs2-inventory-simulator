/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getMySQLPool } from "~/mysql.server";

const SETTINGS_KEYS = {
  popupEnabled: "popup_enabled",
  popupTitle: "popup_title",
  popupMessage: "popup_message",
  popupCtaLabel: "popup_cta_label",
  popupCtaUrl: "popup_cta_url",
  maintenanceEnabled: "maintenance_enabled",
  maintenanceTitle: "maintenance_title",
  maintenanceMessage: "maintenance_message"
} as const;

export interface SiteSettings {
  popup: {
    enabled: boolean;
    title: string;
    message: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  maintenance: {
    enabled: boolean;
    title: string;
    message: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  popup: {
    enabled: false,
    title: "Duyuru",
    message: "",
    ctaLabel: "",
    ctaUrl: ""
  },
  maintenance: {
    enabled: false,
    title: "Bakım Modu",
    message: "Şu anda bakım yapıyoruz. Lütfen daha sonra tekrar deneyin."
  }
};

async function ensureSettingsTable() {
  const pool = getMySQLPool();
  if (!pool) return;
  await pool.execute(
    "CREATE TABLE IF NOT EXISTS site_settings (setting_key VARCHAR(64) PRIMARY KEY, setting_value TEXT NOT NULL)"
  );
}

function toBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const pool = getMySQLPool();
  if (!pool) return DEFAULT_SETTINGS;
  try {
    await ensureSettingsTable();
    const keys = Object.values(SETTINGS_KEYS);
    const [rows] = await pool.execute<import("mysql2").RowDataPacket[]>(
      `SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN (${keys
        .map(() => "?")
        .join(", ")})`,
      keys
    );
    const map = new Map<string, string>();
    for (const row of rows ?? []) {
      map.set(String(row.setting_key), String(row.setting_value));
    }
    return {
      popup: {
        enabled: toBoolean(
          map.get(SETTINGS_KEYS.popupEnabled),
          DEFAULT_SETTINGS.popup.enabled
        ),
        title:
          map.get(SETTINGS_KEYS.popupTitle) ?? DEFAULT_SETTINGS.popup.title,
        message:
          map.get(SETTINGS_KEYS.popupMessage) ??
          DEFAULT_SETTINGS.popup.message,
        ctaLabel:
          map.get(SETTINGS_KEYS.popupCtaLabel) ??
          DEFAULT_SETTINGS.popup.ctaLabel,
        ctaUrl:
          map.get(SETTINGS_KEYS.popupCtaUrl) ??
          DEFAULT_SETTINGS.popup.ctaUrl
      },
      maintenance: {
        enabled: toBoolean(
          map.get(SETTINGS_KEYS.maintenanceEnabled),
          DEFAULT_SETTINGS.maintenance.enabled
        ),
        title:
          map.get(SETTINGS_KEYS.maintenanceTitle) ??
          DEFAULT_SETTINGS.maintenance.title,
        message:
          map.get(SETTINGS_KEYS.maintenanceMessage) ??
          DEFAULT_SETTINGS.maintenance.message
      }
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSiteSettings(
  settings: SiteSettings
): Promise<{ ok: true } | { ok: false; error: string }> {
  const pool = getMySQLPool();
  if (!pool) return { ok: false, error: "Database not configured" };
  try {
    await ensureSettingsTable();
    const entries: Array<[string, string]> = [
      [
        SETTINGS_KEYS.popupEnabled,
        settings.popup.enabled ? "1" : "0"
      ],
      [SETTINGS_KEYS.popupTitle, settings.popup.title],
      [SETTINGS_KEYS.popupMessage, settings.popup.message],
      [SETTINGS_KEYS.popupCtaLabel, settings.popup.ctaLabel],
      [SETTINGS_KEYS.popupCtaUrl, settings.popup.ctaUrl],
      [
        SETTINGS_KEYS.maintenanceEnabled,
        settings.maintenance.enabled ? "1" : "0"
      ],
      [SETTINGS_KEYS.maintenanceTitle, settings.maintenance.title],
      [SETTINGS_KEYS.maintenanceMessage, settings.maintenance.message]
    ];
    const placeholders = entries.map(() => "(?, ?)").join(", ");
    await pool.execute(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES ${placeholders} ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      entries.flat()
    );
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
