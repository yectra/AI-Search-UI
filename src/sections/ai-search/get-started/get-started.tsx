import { Icon } from '@iconify/react';
import { useState, useEffect, useCallback } from 'react';
import { decodeJWT, fetchAuthSession } from 'aws-amplify/auth';

import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Snackbar,
  Backdrop,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { fetcher, endpoints, postFetcher } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { DataDisplay } from './components/data-display';

export function GetStartedPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<any>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [formValues, setFormValues] = useState({
    businessId: '',
    openSearchIndexNames: '',
    textEmbeddingModelId: '',
    imageEmbeddingModelId: '',
    semanticSearchFields: [] as string[],
    imageURLFields: [] as string[],
    keywordSearchFields: [] as string[],
    resultDisplayFields: [] as string[],
  });

  const stepsData = [
    { label: 'Import Data', icon: 'mdi:database' },
    { label: 'Select Data to Display', icon: 'mdi:magnify' },
    { label: 'implement search', icon: 'mdi:pencil' },
    { label: 'Configure Relevancy', icon: 'material-symbols:bolt-outline-rounded' },
    { label: 'Implement Search', icon: 'mdi:cog' },
  ];

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setError('');
    } else {
      setFile(null);
      setError('Only CSV, JSON, or TSV files are allowed.');
    }
  }, []);

  const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Only CSV, JSON, or TSV files are allowed.');
    }
  };

  const validateFile = (uploadedFile: File) => {
    const allowedTypes = [
      'application/json',
      'text/csv',
      'text/tab-separated-values',
    ];
    const allowedExtensions = ['.csv', '.json', '.tsv'];

    const ext = uploadedFile.name.slice(uploadedFile.name.lastIndexOf('.')).toLowerCase();
    return allowedTypes.includes(uploadedFile.type) || allowedExtensions.includes(ext);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('businessId', userInfo.payload['cognito:username']);

      setIsLoading(true);
      await postFetcher([
        endpoints.aiSearch.getStarted.upload,
        { data: formData },
      ]);

      const params = new URLSearchParams({
        tableName: 'processedData',
        businessId: userInfo.payload['cognito:username'],
      });
      const attributesResponse = await fetcher([`${endpoints.aiSearch.getStarted.getAttributes}${params}`, {}]);
      setAttributes(attributesResponse);

      setIsLoading(false);
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      if (activeStep < stepsData.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
    } catch (err) {
      setIsLoading(false);
      setSnackbarMessage('Failed to upload file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Upload error:', err);
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = async () => {
    formValues.businessId = userInfo.payload['cognito:username'];
    try {
      setIsLoading(true);
      const searchableFieldsResponse = await postFetcher([
        endpoints.aiSearch.getStarted.searchableFields,
        { data: formValues },
      ]);
      console.log('searchableFieldsResponse', searchableFieldsResponse)
      setIsLoading(false);
      // setSnackbarMessage('File uploaded successfully!');
      // setSnackbarSeverity('success');
      // setSnackbarOpen(true);
      // if (activeStep < stepsData.length - 1) {
      //   setActiveStep((prev) => prev + 1);
      // }
    } catch (err) {
      setIsLoading(false);
      // setSnackbarMessage('Failed to upload file.');
      // setSnackbarSeverity('error');
      // setSnackbarOpen(true);
      console.error('Upload error:', err);
    }
  };


  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();

        if (idToken) {
          const decoded = decodeJWT(idToken);
          setUserInfo(decoded);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Grid container spacing={2}>
      <Backdrop open={isLoading} style={{ zIndex: 9999, color: '#fff' }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Grid item xs={12} md={4}>
        <Timeline position="right">
          {stepsData.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <TimelineItem
                key={step.label}
                sx={{
                  '&::before': { display: 'none' },
                }}
              >
                <TimelineSeparator>
                  <TimelineDot
                    onClick={() => setActiveStep(index)}
                    sx={{
                      bgcolor: isCompleted ? '#4caf50' : isActive ? 'black' : 'transparent',
                      borderColor: isCompleted ? '#4caf50' : '#ccc',
                      cursor: 'pointer',
                    }}
                  >
                    {isCompleted ? (
                      <Icon icon="mdi:check" color="#fff" width="18" height="18" />
                    ) : (
                      <Icon
                        icon={step.icon || 'mdi:circle-outline'}
                        width="20"
                        height="20"
                        color={isActive ? '#fff' : '#ccc'}
                      />
                    )}
                  </TimelineDot>
                  {index !== stepsData.length - 1 && (
                    <TimelineConnector sx={{ backgroundColor: isCompleted ? '#4caf50' : '#ccc' }} />
                  )}
                </TimelineSeparator>

                <TimelineContent
                  onClick={() => setActiveStep(index)}
                  sx={{
                    pt: 0,
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: isActive ? 700 : 400 }}>
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: isActive ? 700 : null }}>{step.label}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Grid>

      <Grid item xs={12} md={8}>
        {activeStep === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" onClick={() => setSelectedCard('crawl')}
                sx={{ cursor: 'pointer', height: '100%', width: '80%', py: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src={`${CONFIG.site.basePath}/assets/crawl.png`} alt="Crawl your website" style={{ width: '90%', height: '15vh' }} />
                </Box>
                <CardContent sx={{ textAlign: 'left', pt: 0 }}>
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
              <Card variant="outlined" onClick={() => setSelectedCard('upload')}
                sx={{ cursor: 'pointer', height: '100%', width: '80%', py: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src={`${CONFIG.site.basePath}/assets/upload.png`} alt="Crawl your website" style={{ width: '90%', height: '15vh' }} />
                </Box>
                <CardContent sx={{ textAlign: 'left', pt: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Upload a File
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload a JSON, CSV or TSV file
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {selectedCard === 'upload' && (
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Card variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Upload Records to your index
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Uploading a file will add records to this index; it will not erase previous records.
                  </Typography>

                  <Box
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    sx={{
                      border: '1px dashed #9fa8da',
                      borderRadius: 1,
                      textAlign: 'center',
                      py: 4,
                      px: 2,
                      mt: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept=".csv,.json,.tsv"
                      hidden
                      onChange={handleBrowse}
                    />
                    <Typography variant="body1" color="text.secondary">
                      Drop file here or click to browse
                    </Typography>
                    <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                      JSON, CSV, TSV
                    </Typography>
                    {file && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected: {file.name}
                      </Typography>
                    )}
                    {error && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {error}
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{ mt: 3 }}
                      disabled={!file}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                  </Box>
                </Card>
              </Grid>
            )}
          </Grid>
        )}

        {activeStep === 1 && (
          <DataDisplay
            formValues={formValues}
            attributes={attributes}
            handleChange={handleChange}
            handleContinue={handleContinue}
          />
        )}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
