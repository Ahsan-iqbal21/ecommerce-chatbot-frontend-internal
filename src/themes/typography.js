const fontWeightBold = 700;
const fontWeightMedium = 500;
const fontWeightRegular = 400;
const fontWeightLight = 300;

const Typography = (fontFamily = 'Inter') => ({
  fontFamily,
  fontWeightLight: fontWeightLight,
  fontWeightRegular: fontWeightRegular,
  fontWeightMedium: fontWeightMedium,
  fontWeightBold: fontWeightBold,

  h1: {
    fontFamily,
    fontSize: '48px',
    fontWeight: fontWeightBold,
    lineHeight: '58.09px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #000000 0%, #B75397 56.15%, #5F46CC 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  h2: {
    fontFamily,
    fontSize: '40px',
    fontWeight: fontWeightBold,
    lineHeight: '48.41px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #000000 0%, #B75397 56.15%, #5F46CC 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  h3: {
    fontFamily,
    fontSize: '26px',
    fontWeight: fontWeightMedium,
    lineHeight: '31.47px',
    textAlign: 'center',
    color: '#000000'
  },
  h4: {
    fontFamily,
    fontSize: '22px',
    fontWeight: fontWeightMedium,
    lineHeight: '26.63px',
    textAlign: 'left',
    color: '#000000'
  },
  h5: {
    fontFamily,
    fontSize: '16px',
    fontWeight: fontWeightMedium,
    lineHeight: '19.36px',
    textAlign: 'left',
    color: '#000000'
  },
  h6: {
    fontFamily,
    fontSize: '16px',
    fontWeight: fontWeightRegular,
    lineHeight: '19.36px',
    textAlign: 'left',
    color: '#000000'
  },
  h7: {
    fontFamily,
    fontSize: '16px',
    fontWeight: fontWeightRegular,
    lineHeight: '19.36px',
    textAlign: 'center',
    color: '#000000'
  },
  h8: {
    fontFamily,
    fontSize: '16px',
    fontWeight: fontWeightMedium,
    lineHeight: '19.36px',
    textAlign: 'center',
    color: '#000000'
  },
  body1: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightRegular,
    lineHeight: '16.94px',
    textAlign: 'center',
    color: '#676767'
  },
  body2: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightMedium,
    lineHeight: '16.94px',
    textAlign: 'left',
    color: '#1F1F1F'
  },
  body3: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightRegular,
    lineHeight: '16.94px',
    textAlign: 'center',
    color: '#898989'
  },
  body4: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightRegular,
    lineHeight: '16.94px',
    textAlign: 'left',
    color: '#8E8E8E'
  },
  body5: {
    fontFamily: 'Helvetica',
    fontSize: '13px',
    fontWeight: fontWeightRegular,
    lineHeight: '13.8px',
    textAlign: 'left',
    color: '#000'
  },
  body6: {
    fontFamily,
    fontSize: '16px',
    fontWeight: fontWeightRegular,
    lineHeight: '21.78px',
  },
  highlightedText: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightMedium,
    lineHeight: '20px',
    color: '#00AEEE'
  },
  errorText: {
    fontFamily,
    fontSize: '14px',
    fontWeight: fontWeightMedium,
    lineHeight: '20px',
    color: '#BA1111'
  }
});

export default Typography;
