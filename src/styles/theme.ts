const themeDarkColor = {}

const themeLightColor = {}

const theme = (mode: string) => ({
  color: mode === 'dark' ? themeDarkColor : themeLightColor,

  mode: mode,
})

export default theme
