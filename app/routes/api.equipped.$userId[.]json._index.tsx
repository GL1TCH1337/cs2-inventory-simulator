/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { middleware } from "~/http.server";
import { handleUserCachedResponse } from "~/models/user-cache.server";
import { transformEquipped } from "~/utils/inventory";

export const ApiEquippedUserIdJsonUrl = "/api/equipped/$userId.json";

export async function loader({ params, request }: LoaderFunctionArgs) {
  await middleware(request);
  const userId = z.string().parse(params.userId);
  return await handleUserCachedResponse({
    generate: transformEquipped,
    mimeType: "application/json",
    throwBody: {},
    url: ApiEquippedUserIdJsonUrl,
    userId
  });
}
