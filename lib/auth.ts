import { jwtVerify, SignJWT } from 'jose';

export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT Secret key is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, await getJwtSecretKey());
    return verified.payload;
  } catch (err) {
    throw new Error('Your token has expired.');
  }
}

export async function validateToken(token: string) {
  try {
    const verified = await jwtVerify(token, await getJwtSecretKey());
    return verified.payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function generateToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(await getJwtSecretKey());
}