/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CS_Inventory } from "@ianlucas/cslib";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect
} from "react";
import type { findRequestUser } from "~/auth.server";
import { useInventory } from "~/hooks/use-inventory";
import { AddFromCacheAction } from "~/routes/api.action.sync._index";
import { translateItems } from "~/utils/economy";
import { parseInventory } from "~/utils/inventory";
import { sync } from "~/utils/sync";
import {
  retrieveInventoryItems,
  retrieveUserId,
  storeInventoryItems,
  storeUserId
} from "~/utils/user";

const RootContext = createContext<{
  inventory: CS_Inventory;
  itemTranslation: Record<string, string | undefined>;
  language: string;
  maxInventoryItems: number;
  requireAuth: boolean;
  setInventory: Dispatch<SetStateAction<CS_Inventory>>;
  translation: Record<string, string | undefined>;
  user: Awaited<ReturnType<typeof findRequestUser>>;
}>(null!);

export function useRootContext() {
  return useContext(RootContext);
}

export function RootProvider({
  children,
  itemTranslation,
  language,
  maxInventoryItems,
  translation,
  user
}: {
  children: ReactNode;
  itemTranslation: Record<string, string | undefined>;
  language: string;
  maxInventoryItems: number;
  translation: Record<string, string | undefined>;
  user: Awaited<ReturnType<typeof findRequestUser>>;
}) {
  const [inventory, setInventory] = useInventory(
    new CS_Inventory(
      user?.inventory
        ? parseInventory(user?.inventory)
        : retrieveInventoryItems(),
      maxInventoryItems
    )
  );

  useEffect(() => {
    storeInventoryItems(inventory.getAll());
  }, [inventory]);

  useEffect(() => {
    const items = retrieveInventoryItems();
    if (user !== undefined && user.inventory === null && items.length > 0) {
      sync(AddFromCacheAction, { items });
      setInventory(
        new CS_Inventory(
          items.map((item) => ({
            ...item,
            equipped: undefined,
            equippedCT: undefined,
            equippedT: undefined
          })),
          maxInventoryItems
        )
      );
    }
    if (user !== undefined) {
      storeUserId(user.id);
    }
  }, [user]);

  translateItems(language, itemTranslation);

  return (
    <RootContext.Provider
      value={{
        inventory,
        itemTranslation,
        language,
        maxInventoryItems,
        requireAuth: retrieveUserId() !== undefined,
        setInventory,
        translation,
        user
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
