import { User } from '@/lib/models/user';
import { connectDB } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import crypto from 'crypto';
import { sendVerificationEmail } from './email.service';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  await connectDB();

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({
    ...data,
    verificationToken,
    verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  await sendVerificationEmail(user.email, verificationToken);

  return { message: 'Registration successful. Please check your email to verify your account.' };
}

export async function verifyEmail(token: string) {
  await connectDB();

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Already verified');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
}

export async function loginUser(data: LoginData) {
  await connectDB();

  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in');
  }

  const isPasswordValid = await user.comparePassword(data.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = await generateToken({ userId: user._id });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function getCurrentUser(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}