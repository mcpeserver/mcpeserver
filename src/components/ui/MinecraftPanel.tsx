'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MinecraftPanelProps {
  variant?: 'light' | 'dark' | 'success';
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

/**
 * MinecraftPanel UI Primitive
 * Mendukung varian: light (Default), dark, dan success (Hijau).
 */
export default function MinecraftPanel({ variant = 'light', children, className, padding = 'p-4' }: MinecraftPanelProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          bg: 'bg-[#313131]',
          shadowLight: '#5a5a5a',
          shadowDark: '#1a1a1a',
        };
      case 'success':
        return {
          bg: 'bg-[#38e11e]',
          shadowLight: '#7cfc00',
          shadowDark: '#1a6d0d',
        };
      default:
        return {
          bg: 'bg-[#c6c6c6]',
          shadowLight: '#ffffff',
          shadowDark: '#555555',
        };
    }
  };

  const styles = getVariantStyles();
  
  return (
    <div 
      className={cn(
        'mc-pixel-border mc-bevel-light transition-all duration-300',
        styles.bg,
        padding,
        className
      )}
      style={{
        '--mc-shadow-light': styles.shadowLight,
        '--mc-shadow-dark': styles.shadowDark,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
