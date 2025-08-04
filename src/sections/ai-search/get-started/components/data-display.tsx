import { useState } from 'react';

import {
    Box,
    Button,
    Tooltip,
    MenuItem,
    TextField,
    IconButton,
    Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { MultiSelectField } from './multi-select-field';

interface DataDisplayProps {
    formValues: {
        openSearchIndexNames: string;
        textEmbeddingModelId: string;
        imageEmbeddingModelId: string;
        semanticSearchFields: string[];
        imageURLFields: string[];
        keywordSearchFields: string[];
        resultDisplayFields: string[];
    };
    attributes: string[];
    handleChange: (field: string, value: string | string[]) => void;
    handleContinue: () => void;
}

export function DataDisplay({
    formValues,
    attributes,
    handleChange,
    handleContinue
}: DataDisplayProps) {
    const [errors, setErrors] = useState({
        openSearchIndexNames: '',
        textEmbeddingModelId: '',
        imageEmbeddingModelId: '',
    });

    const validateForm = () => {
        const newErrors = {
            openSearchIndexNames: formValues.openSearchIndexNames.trim() === '' ? 'Open Search IndexName is required' : '',
            textEmbeddingModelId: formValues.textEmbeddingModelId.trim() === '' ? 'Text Embedding Model is required' : '',
            imageEmbeddingModelId: formValues.imageEmbeddingModelId.trim() === '' ? 'Image Embedding Model is required' : '',
        };

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };


    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h5" gutterBottom>
                Design your search display
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom width="80%">
                Choose the data you want to show on search results. Selections here will influence your front-end search interface code on the final step.
            </Typography>

            <Box mt={3} display="flex" flexDirection="column" gap={3} width="60%">
                <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography fontWeight="bold" mr={1}>
                            Open Search IndexName
                            <Typography component="span" color="error" ml={0.5}>
                                *
                            </Typography>
                        </Typography>
                        <Tooltip title="Enter the OpenSearch index name where data should be stored or queried" arrow>
                            <IconButton size="small">
                                <Iconify icon="mdi:information-outline" width={18} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        required
                        size="small"
                        value={formValues.openSearchIndexNames}
                        onChange={(e) =>
                            handleChange('openSearchIndexNames', e.target.value)
                        }
                        error={Boolean(errors.openSearchIndexNames)}
                        helperText={errors.openSearchIndexNames}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography fontWeight="bold" mr={1}>
                            Text Embedding Model
                            <Typography component="span" color="error" ml={0.5}>
                                *
                            </Typography>
                        </Typography>
                        <Tooltip title="Provide the model ID used to generate embeddings for text search" arrow>
                            <IconButton size="small">
                                <Iconify icon="mdi:information-outline" width={18} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        required
                        select
                        fullWidth
                        size="small"
                        value={formValues.textEmbeddingModelId}
                        onChange={(e) =>
                            handleChange('textEmbeddingModelId', e.target.value)
                        }
                        error={Boolean(errors.textEmbeddingModelId)}
                        helperText={errors.textEmbeddingModelId}
                    >
                        <MenuItem value="amazon.titan-embed-image-v1">
                            amazon.titan-embed-image-v1
                        </MenuItem>
                        <MenuItem value="clip-vit-base">clip-vit-base</MenuItem>
                    </TextField>
                </Box>

                <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography fontWeight="bold" mr={1}>
                            Image Embedding Model
                            <Typography component="span" color="error" ml={0.5}>
                                *
                            </Typography>
                        </Typography>
                        <Tooltip title="Provide the model ID used to generate embeddings for image search" arrow>
                            <IconButton size="small">
                                <Iconify icon="mdi:information-outline" width={18} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        required
                        select
                        fullWidth
                        size="small"
                        value={formValues.imageEmbeddingModelId}
                        onChange={(e) =>
                            handleChange('imageEmbeddingModelId', e.target.value)
                        }
                        error={Boolean(errors.imageEmbeddingModelId)}
                        helperText={errors.imageEmbeddingModelId}
                    >
                        <MenuItem value="amazon.titan-embed-image-v1">
                            amazon.titan-embed-image-v1
                        </MenuItem>
                        <MenuItem value="clip-vit-base">clip-vit-base</MenuItem>
                    </TextField>
                </Box>

                <MultiSelectField
                    label="Semantic Search Fields"
                    tooltipText="List the text fields to be used for semantic search"
                    value={formValues.semanticSearchFields}
                    onChange={(val) => handleChange('semanticSearchFields', val)}
                    options={attributes}
                />
                <MultiSelectField
                    label="Image URL Fields"
                    tooltipText="Specify the fields containing image URLs for image-based search"
                    value={formValues.imageURLFields}
                    onChange={(val) => handleChange('imageURLFields', val)}
                    options={attributes}
                />
                <MultiSelectField
                    label="Keyword Search Fields"
                    tooltipText="Enter the fields that support keyword-based search"
                    value={formValues.keywordSearchFields}
                    onChange={(val) => handleChange('keywordSearchFields', val)}
                    options={attributes}
                />
                <MultiSelectField
                    label="Result Display Fields"
                    tooltipText="Select the fields to display in search results"
                    value={formValues.resultDisplayFields}
                    onChange={(val) => handleChange('resultDisplayFields', val)}
                    options={attributes}
                />

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (validateForm()) {
                                handleContinue();
                            }
                        }}
                    >
                        Continue
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
