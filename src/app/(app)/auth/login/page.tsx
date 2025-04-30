'use client';

import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return (error as FirebaseError)?.code !== undefined;
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        console.log('Sign-in successful:', res);
        sessionStorage.setItem('user', 'true');
        setEmail('');
        setPassword('');
        router.push('/superAdmin/addGallery');
      }
    } catch (e) {
      if (isFirebaseError(e)) {
        switch (e.code) {
          case 'auth/user-not-found':
            console.error('User not found. Redirecting to Sign Up.');
            alert('User not found! Redirecting to Sign Up page.');
            router.push('/sign-up');
            break;
          case 'auth/wrong-password':
            console.error('Incorrect password.');
            alert('Incorrect password! Please try again.');
            break;
          case 'auth/invalid-email':
            console.error('Invalid email format.');
            alert('Please enter a valid email address.');
            break;
          default:
            console.error('Error:', e.message);
            alert('An unexpected error occurred. Please try again.');
        }
      } else {
        console.error('An unexpected error occurred:', e);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Custom user-friendly error message
  let customErrorMessage = '';
  if (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        customErrorMessage = 'User not found. Please sign up.';
        break;
      case 'auth/wrong-password':
        customErrorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        customErrorMessage = 'Invalid email address.';
        break;
      case 'auth/invalid-credential':
        customErrorMessage = 'Invalid email or password.';
        break;
      default:
        customErrorMessage = 'Something went wrong. Please try again.';
    }
  }

  return (
    <div className="bg-white">
      <section className="text-gray-600 body-font h-screen flex justify-center items-center bg-white">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
          <div className="lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full shadow-lg transform transition duration-300">
            <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Sign In</h2>

            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-6">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={handleSignIn}
              className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none rounded-md text-lg w-full mb-4 transform transition duration-300"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {customErrorMessage && (
              <p className="text-red-500 text-sm mt-2">{customErrorMessage}</p>
            )}

            {/* 
            <p className="text-xs text-center text-gray-500 mt-4">
              Do not have an account?{' '}
              <a href="/auth/signup" className="text-indigo-500 hover:text-indigo-700">
                Sign Up
              </a>
            </p> 
            */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
