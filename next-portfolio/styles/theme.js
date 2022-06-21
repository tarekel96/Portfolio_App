import { amber, grey, deepOrange, green } from '@mui/material/colors';
export const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: deepOrange,
					divider: deepOrange[700],
					background: {
						default: deepOrange[900],
						paper: deepOrange[900]
					},
					text: {
						primary: '#fff',
						secondary: grey[500]
					}
				}
			: {
					// palette values for dark mode
					primary: green,
					divider: green[200],
					text: {
						primary: green[900],
						secondary: green[800]
					}
				})
	}
});
