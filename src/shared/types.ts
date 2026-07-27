import type { ReactNode } from 'react';

/**
 * Single entry in the left navigation rail.
 *
 * Used by GrataShell.navItems and the per-product nav arrays
 * in productNavItems.ts.
 */
export interface NavItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  /** Section header this item renders under (e.g. "Business Development").
   *  Consecutive items sharing a group render as one collapsible section. */
  group?: string;
}
