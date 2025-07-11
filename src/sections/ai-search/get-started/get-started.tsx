import { useState } from 'react';
import { Icon } from '@iconify/react';

import {
  Box,
  Chip,
  Card,
  Grid,
  Typography,
  CardContent,
} from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

const stepsData = [
  { label: 'Import Data', icon: 'mdi:database' },
  { label: 'Select Data to Display' },
  { label: 'Searchable Attributes' },
  { label: 'Configure Relevancy' },
  { label: 'Implement Search', icon: 'mdi:cog-outline' },
];

export function GetStartedPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleCardClick = () => {
    if (activeStep < stepsData.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Left Side Timeline */}
      <Grid item xs={12} md={4}>
        <Timeline position="right">
          {stepsData.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <TimelineItem key={step.label}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      bgcolor: isCompleted ? '#4caf50' : isActive ? 'transparent' : 'transparent',
                      borderColor: isCompleted ? '#4caf50' : '#ccc',
                    }}
                  >
                    {isCompleted ? (
                      <Icon icon="mdi:check" color="#fff" width="18" height="18" />
                    ) : (
                      <Icon
                        icon={step.icon || 'mdi:circle-outline'}
                        width="20"
                        height="20"
                        color={isActive ? '#000' : '#ccc'}
                      />
                    )}
                  </TimelineDot>
                  {index !== stepsData.length - 1 && (
                    <TimelineConnector sx={{ backgroundColor: isCompleted ? '#4caf50' : '#ccc' }} />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body1">{step.label}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} md={8}>
        {activeStep === 0 && (
          // 👉 Show the two cards on Step 1
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card onClick={handleCardClick} sx={{ cursor: 'pointer', height: '100%', boxShadow: 2, borderRadius: 2, p: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src="/assets/images/crawl.svg" alt="Crawl your website" style={{ width: '80px', height: '80px' }} />
                </Box>
                <CardContent sx={{ textAlign: 'left', pt: 0 }}>
                  <Chip label="No code" size="small" sx={{ bgcolor: '#e6f4ea', color: '#34a853', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Crawl your website
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Extract data from your website with a web crawler
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card onClick={handleCardClick} sx={{ cursor: 'pointer', height: '100%', boxShadow: 2, borderRadius: 2, p: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src="/assets/images/upload.svg" alt="Upload a File" style={{ width: '80px', height: '80px' }} />
                </Box>
                <CardContent sx={{ textAlign: 'left', pt: 0 }}>
                  <Chip label="No code" size="small" sx={{ bgcolor: '#e6f4ea', color: '#34a853', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Upload a File
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload a JSON, CSV or TSV file
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          // 👉 Show Step 2 Content
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Welcome Step 2
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
