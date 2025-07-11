import type { ButtonProps } from '@mui/material';

import { Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

export function LocateVendorButton({ sx, ...other }: ButtonProps) {
  const router = useRouter();

  const navigateVendorList = () => {
    router.push('/locate-vendor');
  };
  return (
    <Button color="info" variant="contained" sx={sx} onClick={navigateVendorList}>
      Locate a Vendor
    </Button>
  );
}
