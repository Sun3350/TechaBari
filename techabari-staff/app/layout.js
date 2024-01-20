'use client'
import './globals.css'
import { Raleway } from 'next/font/google'
import React, {useState, useEffect} from 'react'
import { ProviderRoute } from './auth/ProviderRoute'
import { PersistRoute } from './auth/PersistRouter'
import Header from './header'
const inter = Raleway({ subsets: ['latin'] })

export const useToggleTheme = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme('dark');
        document.body.classList.add('dark-mode');
      } else {
        setTheme('light');
        document.body.classList.remove('dark-mode');
      }
    }
  }, []);

  return { theme, toggleTheme };
};
export default function RootLayout({ children, showHeader = true }) {
  const { theme } = useToggleTheme();
  return (
    <html lang="en">
    <body className={inter.className}>
    <ProviderRoute> 
      <PersistRoute>
        
        
         {showHeader && <Header />}
         {children}
      
        </PersistRoute>
    </ProviderRoute>
    </body>
    </html>
  )
}
