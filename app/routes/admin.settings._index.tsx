/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { getMetaTitle } from "~/root-meta";
import {
  getSiteSettings,
  updateSiteSettings,
  type SiteSettings
} from "~/admin/settings.server";
import type { Route } from "./+types/admin.settings._index";

export const meta = getMetaTitle("Admin - Ayarlar");

export async function loader(_args: Route.LoaderArgs) {
  const settings = await getSiteSettings();
  return { settings };
}

function isValidUrl(value: string) {
  if (!value) return true;
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") return { ok: false, error: "Method not allowed" };
  const formData = await request.formData();
  const popupEnabled = formData.get("popup_enabled") === "on";
  const popupTitle = String(formData.get("popup_title") ?? "").trim();
  const popupMessage = String(formData.get("popup_message") ?? "").trim();
  const popupCtaLabel = String(formData.get("popup_cta_label") ?? "").trim();
  const popupCtaUrl = String(formData.get("popup_cta_url") ?? "").trim();
  const maintenanceEnabled = formData.get("maintenance_enabled") === "on";
  const maintenanceTitle = String(formData.get("maintenance_title") ?? "").trim();
  const maintenanceMessage = String(formData.get("maintenance_message") ?? "").trim();

  if (!isValidUrl(popupCtaUrl)) {
    return { ok: false, error: "Popup URL yalnızca /path veya http(s) olabilir." };
  }

  const payload: SiteSettings = {
    popup: {
      enabled: popupEnabled,
      title: popupTitle || "Duyuru",
      message: popupMessage,
      ctaLabel: popupCtaLabel,
      ctaUrl: popupCtaUrl
    },
    maintenance: {
      enabled: maintenanceEnabled,
      title: maintenanceTitle || "Bakım Modu",
      message: maintenanceMessage
    }
  };

  return updateSiteSettings(payload);
}

export default function AdminSettings() {
  const { settings } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [popupEnabled, setPopupEnabled] = useState(settings.popup.enabled);
  const [popupTitle, setPopupTitle] = useState(settings.popup.title);
  const [popupMessage, setPopupMessage] = useState(settings.popup.message);
  const [popupCtaLabel, setPopupCtaLabel] = useState(settings.popup.ctaLabel);
  const [popupCtaUrl, setPopupCtaUrl] = useState(settings.popup.ctaUrl);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(
    settings.maintenance.enabled
  );
  const [maintenanceTitle, setMaintenanceTitle] = useState(
    settings.maintenance.title
  );
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    settings.maintenance.message
  );

  useEffect(() => {
    setPopupEnabled(settings.popup.enabled);
    setPopupTitle(settings.popup.title);
    setPopupMessage(settings.popup.message);
    setPopupCtaLabel(settings.popup.ctaLabel);
    setPopupCtaUrl(settings.popup.ctaUrl);
    setMaintenanceEnabled(settings.maintenance.enabled);
    setMaintenanceTitle(settings.maintenance.title);
    setMaintenanceMessage(settings.maintenance.message);
  }, [settings]);

  const actionError =
    fetcher.data && "ok" in fetcher.data && !fetcher.data.ok
      ? (fetcher.data as { error: string }).error
      : null;
  const actionSuccess =
    fetcher.data && "ok" in fetcher.data && fetcher.data.ok;

  const preview = useMemo(
    () => ({
      popupSignature: JSON.stringify({
        popupTitle,
        popupMessage,
        popupCtaLabel,
        popupCtaUrl
      })
    }),
    [popupTitle, popupMessage, popupCtaLabel, popupCtaUrl]
  );

  return (
    <div className="m-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-xl font-semibold text-white mb-4">
        Site Ayarları
      </h1>
      {actionError && <p className="mb-4 text-sm text-red-400">{actionError}</p>}
      {actionSuccess && (
        <p className="mb-4 text-sm text-emerald-400">
          Ayarlar kaydedildi.
        </p>
      )}
      <fetcher.Form
        method="post"
        className="space-y-6 rounded-xl border border-stone-600/50 bg-stone-900/80 p-5"
      >
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
          <h2 className="font-display text-lg text-white">Popup Ayarları</h2>
          <p className="text-xs text-neutral-400">
                Popup, sadece ana sayfada görünür.
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input
                type="checkbox"
                name="popup_enabled"
                checked={popupEnabled}
                onChange={(e) => setPopupEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-stone-600 bg-stone-800 text-amber-500"
              />
              Aktif
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-neutral-300">
              Başlık
              <input
                type="text"
                name="popup_title"
                value={popupTitle}
                onChange={(e) => setPopupTitle(e.target.value)}
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-sm text-neutral-300">
              CTA Metni
              <input
                type="text"
                name="popup_cta_label"
                value={popupCtaLabel}
                onChange={(e) => setPopupCtaLabel(e.target.value)}
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-sm text-neutral-300 md:col-span-2">
              Mesaj
              <textarea
                name="popup_message"
                value={popupMessage}
                onChange={(e) => setPopupMessage(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-sm text-neutral-300 md:col-span-2">
              CTA URL
              <input
                type="text"
                name="popup_cta_url"
                value={popupCtaUrl}
                onChange={(e) => setPopupCtaUrl(e.target.value)}
                placeholder="/vip veya https://..."
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
          </div>
          <p className="text-xs text-neutral-500">
            Popup yeniden görünsün diye tarayıcı depolaması (popupSignature: {preview.popupSignature.length} chars)
            temizlenmelidir.
          </p>
        </section>

        <div className="h-px bg-stone-700/60" />

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg text-white">
                Bakım Modu
              </h2>
              <p className="text-xs text-neutral-400">
                Aktifken /admin dışındaki tüm sayfalar kapanır.
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input
                type="checkbox"
                name="maintenance_enabled"
                checked={maintenanceEnabled}
                onChange={(e) => setMaintenanceEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-stone-600 bg-stone-800 text-amber-500"
              />
              Aktif
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-neutral-300 md:col-span-2">
              Başlık
              <input
                type="text"
                name="maintenance_title"
                value={maintenanceTitle}
                onChange={(e) => setMaintenanceTitle(e.target.value)}
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-sm text-neutral-300 md:col-span-2">
              Mesaj
              <textarea
                name="maintenance_message"
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
              />
            </label>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={fetcher.state !== "idle"}
            className="rounded bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 disabled:opacity-50"
          >
            {fetcher.state !== "idle" ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
