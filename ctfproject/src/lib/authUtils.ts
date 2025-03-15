// lib/authUtils.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export interface UserToken {
  userId: number;
  username: string;
  globalPermissions: string[];
  coursePermissions: Array<{
    courseId: number;
    permissions: string[];
  }>;
  iat: number;
  exp: number;
}

// Environment variables should be defined in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'itkmitl';

export async function verifyAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user?: UserToken;
  error?: string;
}> {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    console.log("test");
    return { isAuthenticated: false, error: 'No token found' };
  }
  
  try {
    // Convert JWT_SECRET to Uint8Array for jose
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    
    // Verify the token
    const { payload } = await jwtVerify(token, secretKey);

    console.log("test2");
    
    return {
      isAuthenticated: true,
      user: payload as unknown as UserToken,
    };
  } catch (error) {
    console.log("test3");
    return {
      isAuthenticated: false,
      error: error instanceof Error ? error.message : 'Token verification failed',
    };
  }
}

// Check if user has specific global permission
export function hasGlobalPermission(user: UserToken, permission: string): boolean {
  return user.globalPermissions.includes(permission);
}

// Check if user has specific course permission
export function hasCoursePermission(user: UserToken, courseId: number, permission: string): boolean {
  // Check if user has the permission globally (e.g., admins)
  if (hasGlobalPermission(user, permission)) {
    return true;
  }
  
  // Check course-specific permissions
  const coursePerms = user.coursePermissions.find(
    (cp) => cp.courseId === courseId
  );
  
  return !!coursePerms && coursePerms.permissions.includes(permission);
}

// Check if user is admin
export function isAdmin(user: UserToken): boolean {
  return hasGlobalPermission(user, 'manage_users'); 
}