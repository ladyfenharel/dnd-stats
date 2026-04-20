import { useRouteError, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  const message = error?.statusText || error?.message || 'Something went wrong.';

  return (
    <Box id="error-page" sx={{ p: 4, maxWidth: 480 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Something went wrong
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Back to dashboard
      </Button>
    </Box>
  );
}
