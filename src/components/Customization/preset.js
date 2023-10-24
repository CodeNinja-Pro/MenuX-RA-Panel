import LightThemePattern1 from '../../assets/common/theme/light-theme-pattern-1.jpg'

export const presetTheme = [
  {
    name: 'Dark Theme 1',
    colorMode: true,
    mainFont: 'Raleway',
    secondaryFont: 'Montserrat',
    categoryTextColor: '#000000',
    itemBorderColor: '#000000',
    priceTextColor: '#000000',
    itemTextColor: '#000000',
    itemBackgroundColor: '#ffffff',
    entireBackgroundColor: '#808000'
  },
  {
    name: 'Light Theme 1',
    colorMode: false,
    mainFont: 'Nerko One',
    secondaryFont: 'Montserrat',
    categoryTextColor: '#000000',
    itemBorderColor: '#000000',
    priceTextColor: '#000000',
    itemTextColor: '#000000',
    itemBackgroundColor: 'transparent',
    entireBackgroundColor: '#ffffff',
    backgroundPattern: LightThemePattern1
  }
]
