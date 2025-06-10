import { getAuth } from '@clerk/nextjs/server';

export function requireUser(req: Request) {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return userId;
}
