/*global chrome*/

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getThemes } from '../reducers/fullScreenChatTheme'

/*
  useTheme hook. Pass in the list of themes we want the user have have available to select.
*/
const useTheme = () => {
  const [theme, setSelectedTheme] = useState()

  const [themeLoaded, setThemeLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: Get themes from browser storage api

    debugger

    chrome.storage.sync.get(['themes'], function (themes) {
      // dispatch(getThemes())
      debugger
    })

    // Set theme to first one i guess
    // setSelectedTheme(themes[0])

    setThemeLoaded(true)
  })

  // const setTheme = themeId => {
  //   themes.find(x => x.id)
  //   setSelectedTheme(theme)
  // }

  // const getFonts = () => {
  //   return themes.map(x => x.font)
  // }

  return theme
}

export default useTheme
