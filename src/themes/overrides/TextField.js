// ==============================|| OVERRIDES - TEXT FIELD ||============================== //

export default function TextField() {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #D9D9D9, #D9D9D9)',
          color: '#838383',
          minHeight: '48px',
          borderRadius: '4px',
          border: '0px'
        },
        type2: {
          background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #D9D9D9, #D9D9D9)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset',
          color: '#A4A4A4',
          minHeight: '64px',
          borderRadius: '16px'
        }
      }
    }
  };
}
