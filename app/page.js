import Image from 'next/image';
import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import { ClerkProvider } from '@clerk/nextjs';

export default function Home() {
  return (
  
      <main>
        <Navbar />
        <Hero />
      </main>
  
  );
}
