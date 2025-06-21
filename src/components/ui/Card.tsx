import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-200
      ${hover ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};