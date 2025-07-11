import type { ServiceResponse } from 'src/types/client/our-services';

import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Card, Grid, Link } from '@mui/material';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { maxLine } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

type IProps = {
  service: ServiceResponse[];
};

export function CarouselDotsNumber({ service }: IProps) {
  const carousel = useCarousel(
    {
      align: 'start',
      slideSpacing: '24px',
      slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 3000 })]
  );

  return (
    <Container component={MotionViewport}>
      <Stack sx={{ position: 'relative' }}>
        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          slotProps={{
            prevBtn: { sx: { left: { xs: -8, md: -40 } } },
            nextBtn: { sx: { right: { xs: -8, md: -40 } } },
          }}
        />

        <Carousel carousel={carousel} sx={{ px: 0.5 }}>
          {service.map((member) => (
            <Grid key={member.id} item xs={12} sm={6} md={4} lg={3} sx={{ mb: 2 }}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Carousel>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: ServiceResponse;
};

function MemberCard({ member }: MemberCardProps) {
  const linkTo = `/our-services/${member.navigationPath}`;
  return (
    <Card>
      <Typography sx={{ mt: 2.5, mb: 0.5, pl: 2, pt: 1 }}>
        <Link
          component={RouterLink}
          href={linkTo}
          state={{ serviceDetails: member }}
          color="inherit"
          variant="subtitle2"
          noWrap
        >
          {member.name}
        </Link>
      </Typography>

      <Typography
        variant="body2"
        sx={{ mb: 2.5, pl: 2, color: 'text.secondary', ...maxLine({ line: 1 }) }}
      >
        {member.keyFeatures[0]}
      </Typography>

      <Box sx={{ px: 1, py: 1 }}>
        <Link
          component={RouterLink}
          href={linkTo}
          state={{ serviceDetails: member }}
          color="inherit"
          variant="subtitle2"
          noWrap
        >
          <Image
            alt={member.name}
            src={member.imageURL[0]}
            ratio="1/1"
            sx={{ borderRadius: 1, height: { sm: 280, md: 230, lg: 230 } }}
          />
        </Link>
      </Box>
    </Card>
  );
}
