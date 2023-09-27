const initState = {
	loading: false,
	catalogs: [],
};
const catalogReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_CATALOGS':
			return {
				...state,
				catalogs: action.payload,
			};
		case 'CATALOG_LOADER':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};
export default catalogReducer;
