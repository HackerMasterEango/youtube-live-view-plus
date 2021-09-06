import { ThemeProvider } from 'styled-components'

// TODO make as reducer
const theme = {
  chatBox: {
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,

    colors: {
      backgroundColor: {
        r: 23,
        g: 23,
        b: 23,
        a: 0.4
      }
    }
  }
}

const ThemeFullScreenMode = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default ThemeFullScreenMode
