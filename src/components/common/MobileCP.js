import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import foodImage from '../../assets/common/food.jpg'
import { Box, ThemeProvider, CardActionArea, Paper } from '@mui/material'
import { useTheme, createTheme } from '@mui/material/styles'
import { ThemeMain } from './Theme'
import Image from '../../assets/common/landing.jpg'
import MenuXLogo from '../../assets/common/MenuXlogo.png'
import MenuWhiteLogo from '../../assets/common/whiteLogo.png'
import Logo from '../../assets/common/logo.png'
import Language from '../../assets/common/language.png'
import Hello from '../../assets/common/hello.png'
import Message from '../../assets/common/message.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { FiCardContent, FiCardMedia } from './CardBackground'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })
const useStyles = makeStyles({
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  // card: {
  //   maxWidth: '100%'
  // },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,.24)'
  },
  fiCardContentTextSecondary: {
    color: 'rgba(255,255,255,0.78)'
  }
})

function MyApp (props) {
  const theme = useTheme()

  const colorMode = React.useContext(ColorModeContext)

  const styles = useStyles()
  const width = props.width

  // Extract the red, green, and blue components
  console.log('Mobile', props.style.categoryTextColor)
  const red = parseInt(props.style.categoryTextColor.substring(1, 3), 16)
  const green = parseInt(props.style.categoryTextColor.substring(3, 5), 16)
  const blue = parseInt(props.style.categoryTextColor.substring(5, 7), 16)

  return (
    <>
      {/* <ThemeProvider theme={ThemeMain}> */}
      <Card
        sx={{
          width: { width },
          marginBottom: '30px',
          border: 'solid',
          borderWidth: '15px',
          borderRadius: '70px',
          borderColor: 'black',
          height: '670px'
        }}
      >
        <CardActionArea disableRipple>
          <div>
            <FiCardMedia
              media='picture'
              alt='Contemplative Reptile'
              image={
                props.style.backgroundImage === ''
                  ? ''
                  : props.style.backgroundImage
              }
              style={{
                backgroundRepeat: 'repeat',
                backgroundSize: `${380 / props.style.patternSize + 'px'} ${
                  380 / props.style.patternSize + 'px'
                }`,
                transform: `rotate(${props.style.patternTilt}deg)`,
                opacity: 0.3
              }}
              title='Contemplative Reptile'
            />
            <FiCardContent>
              <div
                style={{
                  backgroundColor: `${
                    props.style.colorMode ? '#ffffff' : '#121212'
                  }`,
                  margin: '-20px'
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ width: '35px' }}>
                    <CardMedia
                      component='img'
                      image={props.style.colorMode ? MenuXLogo : MenuWhiteLogo}
                      alt='MenuX'
                    />
                  </div>
                  <div style={{ width: '30px' }}>
                    <CardMedia
                      component='img'
                      sx={{
                        marginLeft: '10px',
                        marginRight: '15px'
                      }}
                      image={Hello}
                      alt='MenuX'
                    />
                  </div>
                  <div style={{ width: '70px' }}>
                    <CardMedia
                      component='img'
                      sx={{ marginLeft: '9px' }}
                      image={Language}
                      alt='MenuX'
                    />
                  </div>
                  <div style={{ width: '50px' }}>
                    <CardMedia
                      component='img'
                      // height='50px'
                      image={Message}
                      alt='MenuX'
                    />
                  </div>
                  <div
                    style={{
                      width: '70px'
                    }}
                  >
                    {props.style.logoImage === '' ? (
                      <></>
                    ) : (
                      <CardMedia
                        component='img'
                        sx={{
                          width: '100%',
                          height: '100%'
                        }}
                        alt='Logo'
                        image={
                          props.style.logoImage === ''
                            ? {}
                            : props.style.logoImage
                        }
                      />
                    )}
                  </div>
                </CardContent>
                {props.style.coverImage === '' ? (
                  <></>
                ) : (
                  <CardMedia
                    component='img'
                    alt='You can select the cover Image of your restaurant.'
                    height='250'
                    image={
                      props.style.coverImage === ''
                        ? {}
                        : props.style.coverImage
                    }
                    sx={{
                      borderRadius: '20px',
                      padding: '10px'
                    }}
                  />
                )}

                <CardContent
                  sx={{
                    width: '1000px',
                    marginLeft: '5px'
                  }}
                >
                  <Typography
                    fontSize={Number(props.style.mainFontSize)}
                    textAlign={'left'}
                    fontFamily={props.style.mainFont}
                  >
                    <b>Menu1</b> Menu2 Menu3
                    <SearchOutlinedIcon
                      style={{
                        position: 'absolute',
                        right: '10px'
                      }}
                    />
                  </Typography>
                  <Typography
                    fontSize={Number(props.style.mainFontSize)}
                    textAlign={'left'}
                    fontFamily={props.style.mainFont}
                  >
                    <b>Category1</b> Category2 Category3
                  </Typography>
                </CardContent>
              </div>
              <CardContent
                style={{
                  marginTop: '-10px',
                  marginLeft: '-20px',
                  marginRight: '-20px',
                  backgroundImage: `${props.style.backgroundImage}`,
                  backgroundColor: `${
                    props.style.backgroundImage === ''
                      ? props.style.entireBackgroundColor
                      : ''
                  }`
                }}
              >
                <Box
                  textAlign={'left'}
                  display={'flex'}
                  justifyContent={'space-between'}
                  marginTop={'20px'}
                  marginBottom={'20px'}
                >
                  <Paper
                    sx={{
                      backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.2)`,
                      boxShadow: 'none',
                      borderRadius: '10px'
                    }}
                  >
                    <Typography
                      fontWeight={'bold'}
                      fontSize={'20px'}
                      padding={1}
                      color={`${props.style.categoryTextColor}`}
                    >
                      Category Title
                    </Typography>
                  </Paper>
                </Box>
                <Box>
                  <Card
                    sx={{
                      display: 'flex',
                      border: 'solid',
                      borderWidth: '2px',
                      justifyContent: 'space-between',
                      borderColor: `${props.style.itemBorderColor}`,
                      backgroundColor: `${props.style.itemBackgroundColor}`
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: `${props.style.itemTextColor}`,
                        fontFamily: `${props.style.secondaryFont}`
                      }}
                    >
                      <Box>
                        <Box
                          display={'flex'}
                          width={'100%'}
                          justifyContent={'space-between'}
                        >
                          <Typography
                            textAlign={'left'}
                            fontSize={Number(props.style.secondaryFontSize)}
                            sx={{
                              fontWeight: 'bold',
                              fontFamily: `${props.style.secondaryFont}`,
                              color: `${props.style.categoryTextColor}`
                            }}
                          >
                            Pizza
                          </Typography>
                          {/* <Typography
                            fontSize={Number(props.style.secondaryFontSize)}
                            textAlign={'left'}
                            height={'80%'}
                            sx={{
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              borderRadius: '5px',
                              backgroundColor: '#4A4B50',
                              fontWeight: 'bold',
                              color: 'white',
                              fontFamily: `${props.style.secondaryFont}`
                            }}
                          >
                            Popular
                          </Typography> */}
                        </Box>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          textAlign={'left'}
                          fontFamily={props.style.secondaryFont}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Entree Ingredient Information
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        bottom={'auto'}
                      >
                        <Typography
                          variant='body4'
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Price
                        </Typography>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          variant='body4'
                          fontWeight={'bold'}
                          color={props.style.priceTextColor}
                        >
                          $6.22
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component='img'
                      sx={{
                        minWidth: '120px',
                        maxWidth: '120px',
                        minHeight: '120px',
                        maxHeight: '120px'
                      }}
                      image={foodImage}
                      alt='MenuX'
                    />
                  </Card>
                  <Card
                    sx={{
                      display: 'flex',
                      border: 'solid',
                      borderWidth: '2px',
                      marginTop: '20px',
                      justifyContent: 'space-between',
                      borderColor: `${props.style.itemBorderColor}`,
                      backgroundColor: `${props.style.itemBackgroundColor}`
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: `${props.style.itemTextColor}`,
                        fontFamily: `${props.style.secondaryFont}`
                      }}
                    >
                      <Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                          <Typography
                            fontSize={Number(props.style.secondaryFontSize)}
                            textAlign={'left'}
                            sx={{
                              fontWeight: 'bold',
                              fontFamily: `${props.style.secondaryFont}`,
                              color: `${props.style.categoryTextColor}`
                            }}
                          >
                            Burger
                          </Typography>
                          {/* <Typography
                            textAlign={'left'}
                            height={'80%'}
                            fontSize={Number(props.style.secondaryFontSize)}
                            sx={{
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              borderRadius: '5px',
                              backgroundColor: '#4A4B50',
                              fontWeight: 'bold',
                              color: 'white',
                              fontFamily: `${props.style.secondaryFont}`
                            }}
                          >
                            Popular
                          </Typography> */}
                        </Box>
                        <Typography
                          textAlign={'left'}
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontFamily={props.style.secondaryFont}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Entree Ingredient Information
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        bottom={'auto'}
                      >
                        <Typography
                          variant='body4'
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Price
                        </Typography>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          variant='body4'
                          fontWeight={'bold'}
                          color={props.style.priceTextColor}
                        >
                          $6.22
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component='img'
                      sx={{ maxWidth: '120px', maxHeight: '120px' }}
                      image={foodImage}
                      alt='MenuX'
                    />
                  </Card>
                  <Card
                    sx={{
                      display: 'flex',
                      border: 'solid',
                      borderWidth: '2px',
                      marginTop: '20px',
                      justifyContent: 'space-between',
                      borderColor: `${props.style.itemBorderColor}`,
                      backgroundColor: `${props.style.itemBackgroundColor}`
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: `${props.style.itemTextColor}`,
                        fontFamily: `${props.style.secondaryFont}`
                      }}
                    >
                      <Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                          <Typography
                            fontSize={Number(props.style.secondaryFontSize)}
                            textAlign={'left'}
                            sx={{
                              fontWeight: 'bold',
                              fontFamily: `${props.style.secondaryFont}`,
                              color: `${props.style.categoryTextColor}`
                            }}
                          >
                            Burger
                          </Typography>
                          {/* <Typography
                            textAlign={'left'}
                            height={'80%'}
                            fontSize={Number(props.style.secondaryFontSize)}
                            sx={{
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              borderRadius: '5px',
                              backgroundColor: '#4A4B50',
                              fontWeight: 'bold',
                              color: 'white',
                              fontFamily: `${props.style.secondaryFont}`
                            }}
                          >
                            Popular
                          </Typography> */}
                        </Box>
                        <Typography
                          textAlign={'left'}
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontFamily={props.style.secondaryFont}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Entree Ingredient Information
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        bottom={'auto'}
                      >
                        <Typography
                          variant='body4'
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Price
                        </Typography>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          variant='body4'
                          fontWeight={'bold'}
                          color={props.style.priceTextColor}
                        >
                          $6.22
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component='img'
                      sx={{ maxWidth: '120px', maxHeight: '120px' }}
                      image={foodImage}
                      alt='MenuX'
                    />
                  </Card>
                  <Card
                    sx={{
                      display: 'flex',
                      border: 'solid',
                      borderWidth: '2px',
                      marginTop: '20px',
                      justifyContent: 'space-between',
                      borderColor: `${props.style.itemBorderColor}`,
                      backgroundColor: `${props.style.itemBackgroundColor}`
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: `${props.style.itemTextColor}`,
                        fontFamily: `${props.style.secondaryFont}`
                      }}
                    >
                      <Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                          <Typography
                            fontSize={Number(props.style.secondaryFontSize)}
                            textAlign={'left'}
                            sx={{
                              fontWeight: 'bold',
                              fontFamily: `${props.style.secondaryFont}`,
                              color: `${props.style.categoryTextColor}`
                            }}
                          >
                            Burger
                          </Typography>
                          {/* <Typography
                            textAlign={'left'}
                            height={'80%'}
                            fontSize={Number(props.style.secondaryFontSize)}
                            sx={{
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              borderRadius: '5px',
                              backgroundColor: '#4A4B50',
                              fontWeight: 'bold',
                              color: 'white',
                              fontFamily: `${props.style.secondaryFont}`
                            }}
                          >
                            Popular
                          </Typography> */}
                        </Box>
                        <Typography
                          textAlign={'left'}
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontFamily={props.style.secondaryFont}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Entree Ingredient Information
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        bottom={'auto'}
                      >
                        <Typography
                          variant='body4'
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Price
                        </Typography>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          variant='body4'
                          fontWeight={'bold'}
                          color={props.style.priceTextColor}
                        >
                          $6.22
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component='img'
                      sx={{ maxWidth: '120px', maxHeight: '120px' }}
                      image={foodImage}
                      alt='MenuX'
                    />
                  </Card>
                  <Card
                    sx={{
                      display: 'flex',
                      border: 'solid',
                      borderWidth: '2px',
                      marginTop: '20px',
                      justifyContent: 'space-between',
                      borderColor: `${props.style.itemBorderColor}`,
                      backgroundColor: `${props.style.itemBackgroundColor}`,
                      opacity: '0.75'
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: `${props.style.itemTextColor}`,
                        fontFamily: `${props.style.secondaryFont}`
                      }}
                    >
                      <Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                          <Typography
                            fontSize={Number(props.style.secondaryFontSize)}
                            textAlign={'left'}
                            sx={{
                              fontWeight: 'bold',
                              fontFamily: `${props.style.secondaryFont}`,
                              color: `${props.style.categoryTextColor}`
                            }}
                          >
                            Burger
                          </Typography>
                          {/* <Typography
                            textAlign={'left'}
                            height={'80%'}
                            fontSize={Number(props.style.secondaryFontSize)}
                            sx={{
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              borderRadius: '5px',
                              backgroundColor: '#4A4B50',
                              fontWeight: 'bold',
                              color: 'white',
                              fontFamily: `${props.style.secondaryFont}`
                            }}
                          >
                            Popular
                          </Typography> */}
                        </Box>
                        <Typography
                          textAlign={'left'}
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontFamily={props.style.secondaryFont}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Entree Ingredient Information
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        bottom={'auto'}
                      >
                        <Typography
                          variant='body4'
                          fontSize={Number(props.style.secondaryFontSize)}
                          fontWeight={props.style.itemFontWeight ? 'bold' : ''}
                        >
                          Price
                        </Typography>
                        <Typography
                          fontSize={Number(props.style.secondaryFontSize)}
                          variant='body4'
                          fontWeight={'bold'}
                          color={props.style.priceTextColor}
                        >
                          $6.22
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component='img'
                      sx={{ maxWidth: '120px', maxHeight: '120px' }}
                      image={foodImage}
                      alt='MenuX'
                    />
                  </Card>
                </Box>
              </CardContent>
            </FiCardContent>
          </div>
        </CardActionArea>
      </Card>
      {/* </ThemeProvider> */}
    </>
  )
}

export default function MobileCP (props) {
  const style = props.theme
  const width = props.width

  const [mode, setMode] = React.useState('light')

  React.useEffect(() => {
    console.log('colorMode', style.colorMode)
    if (!style.colorMode) {
      setMode('dark')
    } else {
      setMode('light')
    }
  }, [style.colorMode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp width={width} style={style} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
