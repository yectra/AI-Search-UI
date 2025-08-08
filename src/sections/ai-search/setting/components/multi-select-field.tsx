import {
    Box,
    Tooltip,
    MenuItem,
    Checkbox,
    TextField,
    IconButton,
    Typography,
    ListItemText,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface MultiSelectFieldProps {
    label: string;
    tooltipText?: string;
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
}
export function MultiSelectField({
    label,
    tooltipText,
    value,
    onChange,
    options,
}: MultiSelectFieldProps) {
    return (
        <Box mb={1}>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography fontWeight="bold" mr={1}>
                    {label}
                </Typography>
                <Tooltip
                    title={tooltipText}
                    arrow
                    componentsProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: '#f5f5f5',
                                color: '#000',
                                fontSize: 13,
                                border: '1px solid #ccc',
                            },
                        },
                        arrow: {
                            sx: {
                                color: '#f5f5f5',
                            },
                        },
                    }}
                >
                    <IconButton size="small">
                        <Iconify icon="mdi:information-outline" width={18} />
                    </IconButton>
                </Tooltip>
            </Box>
            <TextField
                select
                required
                fullWidth
                size="small"
                value={value}
                onChange={(e) => {
                    const selected = e.target.value as unknown as string[];
                    onChange(selected);
                }}

                SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (selected as string[]).join(', '),
                    MenuProps: {
                        disablePortal: true,
                        PaperProps: { style: { maxHeight: 250 } },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={value.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default MultiSelectField;
