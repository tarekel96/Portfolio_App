import { useCallback } from 'react';

/* CUSTOM HOOKS */
export const UseCurrListIndex = (itemList) =>
	useCallback(
		() => {
			return itemList.findIndex((index) => index.isCurrent === true);
		},
		[ itemList ]
	);
