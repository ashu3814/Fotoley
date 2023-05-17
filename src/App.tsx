import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, PlayArrow, Pause } from '@mui/icons-material';
import { images } from './images';

const CatalogViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isSlideshowRunning) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSlideshowRunning]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsSlideshowRunning(false);
  };

  const handlePlayPause = () => {
    setIsSlideshowRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={images[currentIndex].url} alt={images[currentIndex].title} style={{ maxWidth: '100%' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton onClick={handlePrevious}>
              <ArrowBackIos />
            </IconButton>
            <IconButton onClick={handlePlayPause}>
              {isSlideshowRunning ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {images[currentIndex].title}
            </Typography>
            <Typography variant="body1">{images[currentIndex].description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.title}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 4px',
                  filter: index === currentIndex ? 'none' : 'grayscale(100%)',
                  cursor: 'pointer',
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogViewer;
