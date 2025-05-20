import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  border?: boolean;
  rounded?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  padding = 'medium',
  shadow = 'medium',
  border = true,
  rounded = 'medium',
}) => {
  const paddingStyles = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  const shadowStyles = {
    none: 'shadow-none',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg',
  };

  const roundedStyles = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
  };

  const borderStyle = border ? 'border border-gray-200' : '';

  return (
    <div
      className={`bg-white ${paddingStyles[padding]} ${shadowStyles[shadow]} ${roundedStyles[rounded]} ${borderStyle} ${className}`}
    >
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
