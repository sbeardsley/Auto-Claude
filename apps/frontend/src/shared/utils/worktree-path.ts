/**
 * Worktree Path Utilities
 * ========================
 *
 * Utilities for resolving worktree paths with support for configurable locations.
 * Matches backend logic in apps/backend/core/worktree.py for consistency.
 */

import path from 'path';

/**
 * Get the configured worktree base path.
 *
 * Resolution order:
 * 1. WORKTREE_BASE_PATH environment variable
 * 2. Default: .worktrees
 *
 * Relative paths are resolved from the project root.
 * Absolute paths are used as-is.
 *
 * @param projectPath - The project root directory
 * @returns The worktree base path
 */
export function getWorktreeBasePath(projectPath: string): string {
  // Read from environment variable (same as backend)
  const envPath = process.env.WORKTREE_BASE_PATH || '.worktrees';

  // Resolve relative paths from project root
  if (path.isAbsolute(envPath)) {
    return envPath;
  }

  return path.join(projectPath, envPath);
}

/**
 * Get the full path to a specific worktree.
 *
 * @param projectPath - The project root directory
 * @param specId - The spec identifier (e.g., "001-feature-name")
 * @returns The full path to the worktree
 */
export function getWorktreePath(projectPath: string, specId: string): string {
  return path.join(getWorktreeBasePath(projectPath), specId);
}
