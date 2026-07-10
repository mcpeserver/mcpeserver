'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'success' | 'danger' | 'white';
  children: React.ReactNode;
}

export default function MinecraftButton({ variant = 'default', children, className, ...props }: MinecraftButtonProps) {
  const variants = {
    default: 'bg-[#8b8b8b] hover:bg-[#9d9d9d] border-black shadow-[inset_-2px_-2px_0_0_#4a4a4a,inset_2px_2px_0_0_#dbdbdb]',
    success: 'bg-[#38e11e] hover:bg-[#45ed2b] border-black shadow-[inset_-2px_-2px_0_0_#1a6d0d,inset_2px_2px_0_0_#7cfc00]',
    danger: 'bg-[#ff4d4d] hover:bg-[#ff6666] border-black shadow-[inset_-2px_-2px_0_0_#8b0000,inset_2px_2px_0_0_#ff9999]',
    white: 'bg-white hover:bg-gray-100 border-black shadow-[inset_-2px_-2px_0_0_#a0a0a0,inset_2px_2px_0_0_#ffffff]',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2 border-[2px] transition-all active:translate-y-1 select-none font-minecraft text-[8px] uppercase tracking-tighter text-black',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
