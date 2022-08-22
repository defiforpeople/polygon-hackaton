import type { IconProps } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';

export const BlurPc = (props: IconProps) => {
  return (
    <Icon
      width="100%"
      zIndex="-1"
      height="400px"
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      display={['none', 'block', 'block']}
      {...props}
    >
      {/* pink-dfp */}
      <circle cx="0" cy="30" r="10" fill="#F72585" />
      {/* blue-dfp */}
      <circle cx="250" cy="70" r="10" fill="#4895EF" />
      {/* purple-dfp */}
      <circle cx="100" cy="90" r="10" fill="#3A0CA3" />
    </Icon>
  );
};

export default BlurPc;
