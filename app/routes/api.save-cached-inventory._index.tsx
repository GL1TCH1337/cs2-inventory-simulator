/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CS_MutableInventory } from "@ianlucas/cslib";
import { ActionFunctionArgs } from "@remix-run/node";
import { requireUser } from "~/auth.server";
import { MAX_INVENTORY_ITEMS } from "~/env.server";
import { updateUserInventory } from "~/models/user.server";
import { noContent, notFound } from "~/response.server";
import { craftInventoryShape } from "~/utils/shapes";

export const ApiSaveCachedInventoryUrl = "/api/save-cached-inventory";

export async function action({ request }: ActionFunctionArgs) {
  const { id: userId, inventory: userInventory } = await requireUser(request);
  if (userInventory !== null) {
    return notFound;
  }
  const items = craftInventoryShape.parse(await request.json());
  const inventory = new CS_MutableInventory([], MAX_INVENTORY_ITEMS);
  items.forEach(item => inventory.add(item));
  await updateUserInventory(userId, inventory.getItems());
  return noContent;
}
