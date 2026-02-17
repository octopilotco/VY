// Vyxlo Core Type Definitions
// Generated from database schema

export interface User {
  id: string;
  email: string;
  name: string | null;
  password_hash?: string; // Never exposed to client
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  plan_tier: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  created_at: Date;
  expires_at: Date;
  ip: string | null;
  user_agent: string | null;
}

export interface ApiKey {
  id: string;
  organization_id: string;
  name: string;
  secret_hash: string; // Never exposed to client
  scopes: string[];
  created_at: Date;
  revoked_at: Date | null;
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface Post {
  id: string;
  project_id: string;
  author_id: string;
  content: string;
  status: PostStatus;
  scheduled_at: Date | null;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Usage {
  id: string;
  organization_id: string;
  project_id: string | null;
  feature: string;
  qty: number;
  ts: Date;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  organization_id: string | null;
  action: string;
  meta: Record<string, any>;
  ts: Date;
}

// DTOs for API responses (no sensitive fields)
export interface UserDTO {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface OrganizationDTO {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface ProjectDTO {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  planTier: string | null;
  createdAt: string;
}

export interface ApiKeyDTO {
  id: string;
  organizationId: string;
  name: string;
  scopes: string[];
  createdAt: string;
  revokedAt: string | null;
}

// Helper to convert DB user to DTO (removes sensitive fields)
export function userToDTO(user: User): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isActive: user.is_active,
    createdAt: user.created_at.toISOString(),
    lastLoginAt: user.last_login_at ? user.last_login_at.toISOString() : null,
  };
}

export function organizationToDTO(org: Organization): OrganizationDTO {
  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
    ownerId: org.owner_id,
    metadata: org.metadata,
    createdAt: org.created_at.toISOString(),
  };
}

export function projectToDTO(project: Project): ProjectDTO {
  return {
    id: project.id,
    organizationId: project.organization_id,
    name: project.name,
    slug: project.slug,
    planTier: project.plan_tier,
    createdAt: project.created_at.toISOString(),
  };
}
