export default function Button({ theme }) {
  const applyButtonStyle = (type) => {
    return {
      boxShadow: theme.palette.shadows?.[type],
      background: theme.palette.gradients?.[type],
      borderRadius: theme.palette.borderRadius?.[type],
      padding: theme.palette.padding,
      border: type === 'new' || type === 'generate' ? theme.palette.borders?.[type] : 'none',
      borderImageSource: type === 'new' || type === 'generate' ? theme.palette.gradients?.[type] : 'none',
      color: theme.palette[type === 'primary' || type === 'secondary' ? type : 'primary']?.contrastText,
      textTransform: 'none',
      '&:disabled': {
        background: 'grey',
        color: 'white'
      },
    };
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        containedPrimary: {
          ...applyButtonStyle('primary'),
        },
        containedSecondary: {
          ...applyButtonStyle('secondary'),
        },
        containedNew: {
          ...applyButtonStyle('new'),
        },
        containedGenerate: {
          ...applyButtonStyle('generate')
        }
      }
    }
  };
}