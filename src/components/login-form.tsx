'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        setSuccess('Check your email to confirm your account!');
        // Don't redirect yet - user needs to confirm email
      } else {
        await signIn(email, password);
        router.push('/dashboard');
      }
    } catch (err: any) {
      // Parse Supabase error messages
      let errorMessage = 'An error occurred';
      if (err.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (err.message.includes('Email not confirmed')) {
        errorMessage = 'Please check your email to confirm your account';
      } else if (err.message.includes('User already registered')) {
        errorMessage = 'Email already registered';
      } else if (err.message.includes('Password should be at least')) {
        errorMessage = 'Password should be at least 6 characters';
      } else if (err.message.includes('Unable to validate email')) {
        errorMessage = 'Invalid email address';
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{isSignUp ? 'Create an account' : 'Login to your account'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Enter your information to create an account' 
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              {isSignUp && (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement password reset
                        alert('Password reset - check your email!');
                      }}
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && (
                  <FieldDescription>
                    Password must be at least 6 characters
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Login'}
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  {isSignUp ? (
                    <>
                      Already have an account?{' '}
                      <a 
                        href="#" 
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsSignUp(false);
                          setError('');
                          setSuccess('');
                        }}
                      >
                        Sign in
                      </a>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{' '}
                      <a 
                        href="#" 
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsSignUp(true);
                          setError('');
                          setSuccess('');
                        }}
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}