const Theme = () => {
  const primaryColor = '#B75397';
  const secondaryColor = '#5F46CC';
  const contrastText = '#fff';

  return {
    palette: {
      primary: {
        color: primaryColor, 
        contrastText    
      },
      secondary: {
        color: secondaryColor,  
        contrastText          
      },
      gradients: {
        primary: 'linear-gradient(0deg, #5F46CC, #5F46CC), linear-gradient(145.63deg, #B75397 -23.03%, #5F46CC 154.73%)',
        secondary: 'linear-gradient(145.63deg, #B75397 -23.03%, #5F46CC 154.73%)',
        new: 'linear-gradient(0deg, #B75397, #B75397), linear-gradient(145.63deg, #B75397 -23.03%, #5F46CC 154.73%)',
        generate: 'linear-gradient(145.63deg, #B75397 -23.03%, #5F46CC 154.73%)'
      },
      shadows: {
        primary: '0px 4px 31.5px 0px #5F46CC42',
        secondary: '0px 4px 31.5px 0px #5F46CC42',
        generate: '0px 4px 7.4px 0px #02838121'
      },
      borders: {
        new: '2px solid',
        generate: '2px solid'
      },
      borderRadius: {
        primary: '53px',
        secondary: '53px',
        new: '38px',
        generate: '10px'
      },
      padding: '10px'
    }
  };
};

export default Theme;