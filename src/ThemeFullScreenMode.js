import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import WebFont from 'webfontloader'
import useTheme from './hooks/useTheme'

const ThemeFullScreenMode = ({ children }) => {
  const theme = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(undefined)

  const themes = useSelector(state => state.fullScreenChatTheme)

  useEffect(() => {
    debugger
    setSelectedTheme(themes[0])
  }, [])

  // Load google fonts
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: getFonts()
  //     }
  //   })
  // })

  return <>{selectedTheme && <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>}</>
}

export default ThemeFullScreenMode
