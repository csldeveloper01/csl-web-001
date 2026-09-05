/**
 * Global TypeScript Interfaces & Types for CreatorSpaceLab
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface PageRoute {
  path: string;
  title: string;
  description?: string;
}

export type VoxelAssetKey =
  | 'ai-innovation'
  | 'cloud-excellence'
  | 'security-first'
  | 'speed-optimization'
  | 'growth-analytics'
  | 'people-collaboration';
