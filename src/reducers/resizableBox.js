const actionTypes = {
  RESIZE_END: 'RESIZE_END'
}

const initialState = {
  width: 200,
  height: 200
}

const resizableBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESIZE_END:
      const { width, height } = action.payload
      return {
        ...state,
        width,
        height
      }
    default:
      return state
  }
}

export const resizeBoxEnded = newDimensions => {
  return { type: actionTypes.RESIZE_END, payload: newDimensions }
}

export default resizableBoxReducer
