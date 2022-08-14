import { amber, grey, deepOrange, green, lightBlue, orange, blueGrey, lightGreen, lime } from '@mui/material/colors';
export const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					background: {
						default: blueGrey[200],
						paper: blueGrey[200]
					},
					text: {
						primary: blueGrey,
						secondary: blueGrey[900]
					}
				}
			: {
					// palette values for dark mode
					background: {
						default: grey[900],
						paper: grey[900]
					},
					text: {
						primary: grey[50],
						secondary: lime[900]
					}
				})
	}
});
