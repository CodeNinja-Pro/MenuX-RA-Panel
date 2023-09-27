import { createTheme } from '@mui/material/styles'
import { BasicColor } from './Color'

const FONT_FAMILY = [
  'Poppins',
  'Arial',
  'Roboto',
  'BlinkMacSystemFont',
  '-apple-system',
  'sans-serif',
  '"Segoe UI"',
  '"Helvetica Neue"',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(',')

export const ThemeMain = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'Roboto',
      'BlinkMacSystemFont',
      '-apple-system',
      'sans-serif',
      '"Segoe UI"',
      '"Helvetica Neue"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  MuiButton: {
    fontFamily: FONT_FAMILY
  },

  MuiCard: {
    fontFamily: FONT_FAMILY
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY
        },
        text: {
          fontFamily: FONT_FAMILY
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          // textAlign:'end',
        }
      }
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'body1' },
          style: ({ theme }) => ({
            fontSize: 16,
            [theme.breakpoints.down('sm')]: {
              fontSize: 12
            },
            color: 'white',
            textAlign: 'center'
          })
        }
      ],
      styleOverrides: {
        root: {
          textDecoration: 'none',
          textAlign: 'center'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // borderRadius: 10,
          ':focus': {
            outline: 0,
            border: 0
          },

          '& fieldset': {
            borderColor: BasicColor.greenSoft
          },
          ':hover fieldset': {
            borderColor: BasicColor.greenSoft
          }
        },
        input: {
          ':focus :valid': {
            outline: 0,
            border: 0
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: BasicColor.green,
          '& .MuiSvgIcon-root': {
            fontSize: 30
          }
        }
      }
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: 'body4' },
          style: ({ theme }) => ({
            fontSize: 16,
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
              fontSize: 12
            }
          })
        },
        {
          props: { variant: 'h4' },
          style: ({ theme }) => ({
            fontSize: 36,
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
              fontSize: 24
            },
            fontWeight: 'bold'
          })
        }
      ],
      styleOverrides: {}
    }
  }
})
