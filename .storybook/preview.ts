import type { Preview } from '@storybook/react'
import '../src/assets/css/main.css'
import 'tw-elements'
import { themes } from '@storybook/theming'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: 'light',
      stylePreview: true,
      classTarget: 'html',
      dark: { ...themes.dark, appBg: 'black' },
      light: { ...themes.normal, appBg: 'white' },
    },
  },
}
export default preview
