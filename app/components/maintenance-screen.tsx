/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function MaintenanceScreen({
  settings
}: {
  settings: { title: string; message: string };
}) {
  const title = settings.title?.trim() || "Bakım Modu";
  const message =
    settings.message?.trim() ||
    "Şu anda bakım yapıyoruz. Lütfen daha sonra tekrar deneyin.";

  return (
    <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-amber-500/30 bg-stone-950/80 p-8 text-center shadow-xl shadow-black/40 backdrop-blur">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Bakım
        </div>
        <h1 className="font-display text-3xl font-semibold text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300 whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
}
