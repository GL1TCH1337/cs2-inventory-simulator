/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CS_Item } from "@ianlucas/cs2-lib";
import { RARITY_LABEL, getRarityItemName } from "~/utils/economy";
import { useTranslate } from "./app-context";
import { InventoryItemInfo } from "./inventory-item-info";

export function InventoryItemRarity({ data }: { data: CS_Item }) {
  const translate = useTranslate();

  const isWeapon = ["glove", "melee", "weapon"].includes(data.type);
  const rarityKey = `Item${isWeapon ? "Weapon" : ""}Rarity${RARITY_LABEL[data.rarity]}`;
  const nameKey = `ItemRarityName${getRarityItemName(data)}`;

  return (
    <InventoryItemInfo
      style={{ color: data.rarity }}
      label={translate("InventoryItemRarity")}
    >
      {translate("ItemRarityFormat", translate(rarityKey), translate(nameKey))}
    </InventoryItemInfo>
  );
}