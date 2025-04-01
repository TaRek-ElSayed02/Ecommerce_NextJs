'use client';

import { useState } from 'react';
import { Typography, Button } from '@mui/material';

interface ReadMoreProps {
  text: string;
  maxWords?: number;
}

export default function ReadMore({ text, maxWords = 20 }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(' ');
  const shortText = words.slice(0, maxWords).join(' ') + '...';

  return (
    <div>
      <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
        {expanded ? text : shortText}
      </Typography>
      <Button 
        variant="text" 
        sx={{ color: '#007bff', textTransform: 'none' }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Read Less' : 'Read More'}
      </Button>
    </div>
  );
}
    