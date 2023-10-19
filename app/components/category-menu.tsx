import clsx from "clsx";
import { CS_CATEGORY_MENU, CS_CategoryMenuItem } from "cslib";

export function CategoryMenu({
  onChange,
  value
}: {
  onChange(newValue: CS_CategoryMenuItem): void;
  value: CS_CategoryMenuItem;
}) {
  function handleClick(category: CS_CategoryMenuItem) {
    return function handleClick() {
      onChange(category);
    };
  }

  return (
    <div className="flex justify-between items-center px-2">
      {CS_CATEGORY_MENU.map((item) => (
        <button
          key={item.category}
          className={clsx(
            "rounded bg-opacity-50 px-2 transition-all hover:text-neutral-200",
            item.category !== value.category && "text-neutral-400",
            item.category === value.category
              && "bg-neutral-900 text-neutral-200"
          )}
          onClick={handleClick(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}