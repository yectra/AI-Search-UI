import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, CssBaseline } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { varBounce, MotionContainer } from 'src/components/animate';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

type IProps = {
  url?: string;
};

export function PageNotFound({ url }: IProps) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <PageContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Container component={MotionContainer}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Sorry, Page not found!
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <Typography sx={{ color: 'text.secondary' }}>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the
                URL? Be sure to check your spelling.
              </Typography>
            </m.div>

            <Button component={RouterLink} href={url} variant="contained" sx={{ mt: 3 }}>
              Go to home
            </Button>
          </Container>
        </Card>
      </PageContainer>
    </>
  );
}
