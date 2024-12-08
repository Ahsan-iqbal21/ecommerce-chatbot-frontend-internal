import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessToaster = ({ open, onClose, message }) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [open, onClose]);

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: '420px', height: '71px', border: '2px solid #079A93', borderRadius: '18px', color: '#079A93', backgroundColor: '#F3FEFE', display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SuccessToaster;
