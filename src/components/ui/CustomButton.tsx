import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface CustomButtonProps extends ButtonProps {
  gradient?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ 
  children, 
  gradient = true,
  sx,
  ...props 
}) => {
  return (
    <Button
      {...props}
      sx={{
        background: gradient ? 'linear-gradient(180deg, #1C8DC9 0%, #3EC6E0 100%)' : undefined,
        borderRadius: '10px',
        boxShadow: '0px 4px 16px 0px #1C8DC940',
        textTransform: 'none',
        fontWeight: 'bold',
        width: '160px',
        height: '44px',
        '&:hover': {
          background: gradient ? 'linear-gradient(180deg, #1679b0 0%, #35b0c7 100%)' : undefined,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton; 