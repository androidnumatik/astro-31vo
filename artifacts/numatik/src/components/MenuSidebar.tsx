import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Ellipsis,
  Heart,
  Home,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MENU_ITEMS, type MenuGroup, type MenuItemConfig } from "@/data/menuConfig";

export type MenuSidebarTab = "home" | Exclude<MenuGroup, "featured">;

type MenuSidebarProps = {
  activeTab: MenuSidebarTab;
  activePath?: string;
  onHomeClick: () => void;
  onOpenItem?: (item: MenuItemConfig) => void;
};

const SIDEBAR_GROUPS = [
  { id: "learn", labelKey: "menu.sections.learn", group: "learn", icon: BookOpen },
  { id: "practice", labelKey: "menu.sections.practice", group: "practice", icon: ClipboardCheck },
  { id: "tools", labelKey: "menu.sections.tools", group: "tools", icon: Wrench },
  { id: "more", labelKey: "menu.moreTab", group: "more", icon: Ellipsis },
] as const satisfies ReadonlyArray<{
  id: Exclude<MenuSidebarTab, "home">;
  labelKey: string;
  group: Exclude<MenuGroup, "featured">;
  icon: LucideIcon;
}>;

const DONATION_ITEM = MENU_ITEMS.find((item) => item.key === "donate");

const MenuSidebar = ({ activeTab, activePath, onHomeClick, onOpenItem }: MenuSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expandedGroup, setExpandedGroup] = useState<Exclude<MenuSidebarTab, "home"> | null>(
    activeTab === "home" ? null : activeTab,
  );
  const isHomeActive = location.pathname === "/menu" && activeTab === "home";

  useEffect(() => {
    setExpandedGroup(activeTab === "home" ? null : activeTab);
  }, [activeTab]);

  return (
    <aside className="menu-sidebar">
      <div className="menu-sidebar-brand">
        <h1 className="menu-page-title menu-brand-title">
          <button
            type="button"
            onClick={onHomeClick}
            aria-label={t("menu.homeTab")}
            className="menu-brand-home-button menu-focusable"
          >
            NUMATIK
          </button>
        </h1>
        <p className="menu-muted">{t("menu.subtitle")}</p>
      </div>

      <nav className="menu-sidebar-primary" aria-label={t("menu.homeTab")}>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="menu-sidebar-link menu-sidebar-cover-link menu-focusable"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0" />
          <span>{t("nav.backToHome")}</span>
        </button>

        <button
          type="button"
          aria-current={isHomeActive ? "page" : undefined}
          onClick={() => {
            setExpandedGroup(null);
            onHomeClick();
          }}
          className={`menu-sidebar-link menu-focusable${isHomeActive ? " is-active" : ""}`}
        >
          <Home aria-hidden="true" className="h-5 w-5 shrink-0" />
          <span>{t("menu.homeTab")}</span>
        </button>

        {SIDEBAR_GROUPS.map(({ id, labelKey, group, icon: Icon }) => {
          const isExpanded = expandedGroup === id;
          const isActive = activeTab === id || isExpanded;
          const submenuId = `menu-sidebar-submenu-${id}`;
          return (
            <div key={id} className="menu-sidebar-group">
              <button
                type="button"
                aria-current={activeTab === id ? "location" : undefined}
                aria-expanded={isExpanded}
                aria-controls={submenuId}
                onClick={() => {
                  setExpandedGroup((current) => current === id ? null : id);
                }}
                className={`menu-sidebar-link menu-focusable${isActive ? " is-active" : ""}`}
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span className="min-w-0 flex-1">{t(labelKey)}</span>
                <ChevronDown aria-hidden="true" className={`menu-sidebar-chevron h-4 w-4 shrink-0${isExpanded ? " is-expanded" : ""}`} />
              </button>
              {isExpanded && (
                <div id={submenuId} className="menu-sidebar-submenu">
                  {MENU_ITEMS.filter((item) => item.group === group && item.key !== "donate").map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => onOpenItem ? onOpenItem(item) : navigate(item.path)}
                        aria-current={activePath === item.path ? "page" : undefined}
                        aria-label={t(`menuItems.${item.key}.label`)}
                        className={`menu-sidebar-sub-link menu-focusable${activePath === item.path ? " is-active" : ""}`}
                      >
                        <ItemIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                        <span>{t(`menu.${item.key}`)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {DONATION_ITEM && (
        <button
          type="button"
          onClick={() => onOpenItem ? onOpenItem(DONATION_ITEM) : navigate(DONATION_ITEM.path)}
          aria-label={t("menuItems.donate.label")}
          className="menu-sidebar-link menu-sidebar-donate menu-focusable"
        >
          <Heart aria-hidden="true" className="h-5 w-5 shrink-0" />
          <span>{t("menu.donate")}</span>
        </button>
      )}
    </aside>
  );
};

export default MenuSidebar;
