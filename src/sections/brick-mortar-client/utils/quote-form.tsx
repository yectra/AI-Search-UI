import type { StackProps } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

import { z as zod } from 'zod';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, Slide, Stack, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, postFetcher } from 'src/utils/axios';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// import { b2cPolicies, loginRequest } from 'src/auth/authConfig';

// ----------------------------------------------------------------------

export const FormSchema = zod.object({
  message: zod
    .string()
    .min(1, { message: 'Message is required!' })
    .min(50, { message: 'Minimum 50 characters required !' })
    .max(500, { message: 'Maximum 500 characters!' }),
  servicesCategory: zod.string(),
  userId: zod.string(),
  location: zod
    .string()
    .nullable()
    .transform((val) => (val === null ? '' : val.trim()))
    .refine((val) => val !== '', { message: 'Location is required!' })
    .refine((val) => /^[A-Za-z\s]+$/.test(val), {
      message: 'Only letters and spaces are allowed!',
    }),
  aging: zod.string(),
});

type FormSchemaType = zod.infer<typeof FormSchema>;

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="down" ref={ref} {...props} />
);

// ----------------------------------------------------------------------

type IProps = {
  fullWidth?: boolean;
  title?: string;
  servicesCategory?: string;
  actionName?: string;
  formTitle?: string;
  location?: string;
};

export function QuoteFormDialog({
  fullWidth = true,
  title,
  servicesCategory,
  actionName,
  formTitle,
  location,
}: IProps) {
  const dialog = useBoolean();

  const theme = useTheme();

  // const { instance, accounts } = useMsal();
  // const isAuthenticated = useIsAuthenticated();

  // const handleDialog = () => {
  //   if (
  //     (accounts[0]?.idTokenClaims?.jobTitle === 'Customer' ||
  //       accounts[0]?.idTokenClaims?.jobTitle === 'Vendor') &&
  //     isAuthenticated
  //   ) {
  //     dialog.onTrue();
  //   } else if (accounts[0]?.idTokenClaims?.jobTitle === 'Admin') {
  //     instance
  //       .logoutPopup({
  //         authority: b2cPolicies.authorities.admin.authority,
  //       })
  //       .then(() => {
  //         instance.loginRedirect({
  //           scopes: loginRequest.scopes,
  //           authority: b2cPolicies.authorities.user.authority,
  //         });
  //       });
  //   } else {
  //     instance.loginRedirect({
  //       scopes: loginRequest.scopes,
  //       authority: b2cPolicies.authorities.user.authority,
  //     });
  //   }
  // };

  const defaultValues = {
    message: '',
    servicesCategory: servicesCategory || '',
    userId:  '',
    location: location || '',
    aging: '',
  };

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Submit handler for form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      await postFetcher([endpoints.client.quotes.create, { data }]);
      toast.success('Form submitted successfully');
      reset();
      dialog.onFalse();
    } catch (error) {
      console.error(error);
      toast.error(`Form submission failed ${error.errorMessage}`);
    }
  });

  return (
    <>
      <Button
        fullWidth={fullWidth}
        size="medium"
        color="info"
        variant="contained"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {title}
      </Button>

      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        fullWidth
        maxWidth="xs"
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle textAlign="center">{formTitle}</DialogTitle>
          <Box onClick={dialog.onFalse} sx={{ mr: 2, cursor: 'pointer' }}>
            <Iconify icon="material-symbols:close" width={24} />
          </Box>
        </Box>

        <DialogContent>
          <Form methods={methods} onSubmit={onSubmit}>
            <Block>
              <Field.Text multiline name="message" label="Explain your requirement" minRows={3} />
            </Block>

            {!location && (
              <Block sx={{ mt: 2 }}>
                <Field.Autocomplete
                  name="location"
                  label="Select Location"
                  fullWidth
                  freeSolo
                  options={['Coimbatore', 'Chennai', 'Bangalore', 'Hyderabad']}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />
              </Block>
            )}

            <div style={{ textAlign: 'end' }}>
              <LoadingButton
                color="info"
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  [theme.breakpoints.up('sm')]: { width: 'auto' },
                  my: 2,
                }}
              >
                {actionName}
              </LoadingButton>
            </div>
            {/* form end */}
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------

type BlockProps = StackProps & {
  label?: string;
  children: React.ReactNode;
};

function Block({ sx, children, label = '' }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
          fontSize: (theme) => theme.typography.pxToRem(10),
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
