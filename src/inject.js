const entryPoint = document.createElement('div')
entryPoint.id = 'content-script'

const appScript = document.createElement('script')
entryPoint.appendChild(appScript)

document.querySelector('body').appendChild(entryPoint)
