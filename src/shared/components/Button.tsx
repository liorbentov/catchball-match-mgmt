import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantMap: Record<
  NonNullable<ButtonProps['variant']>,
  Pick<MuiButtonProps, 'variant' | 'color'>
> = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'inherit' },
  danger: { variant: 'contained', color: 'error' },
  ghost: { variant: 'text', color: 'inherit' },
};

const sizeMap: Record<NonNullable<ButtonProps['size']>, MuiButtonProps['size']> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const { variant: muiVariant, color } = variantMap[variant];
  const muiSize = sizeMap[size];
  return (
    <MuiButton variant={muiVariant} color={color} size={muiSize} {...props}>
      {children}
    </MuiButton>
  );
}

