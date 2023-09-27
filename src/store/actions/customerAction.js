import firebase from '../../config/firebase';
import algoliasearch from 'algoliasearch';
import { createNullCache } from '@algolia/cache-common';
const client = algoliasearch('99PJ9S7CN9', '4dd3b464870ca480ed3bbbe36ef739cd', {
	responsesCache: createNullCache(),
});

let OrderIndex = client.initIndex('orders');
let usersIndex = client.initIndex('users');

// export const getAllCustomers =
// 	(ID, search, gender, value, hitsPerPage, currentPage) => async dispatch => {
// 		const minAge = value[0];
// 		const maxAge = value[1];
// 		dispatch(customerLoader(true));
// 		OrderIndex.search('', {
// 			filters: `restaurantID:${ID}`,
// 			hitsPerPage: 5,
// 		}).then(async response => {
// 			let { hits, ...rest } = response;
// 			console.log('🚀 ~ file: customerAction.js:33 ~ rest:', rest);
// 			const customerIDs = hits.map(hit => hit.customerID);
// 			const uniqueCustomerIDs = [...new Set(customerIDs)];
// 			const uniqueCustomers = [];
// 			for (const customerID of uniqueCustomerIDs) {
// 				if (gender == 'all' || gender == '') {
// 					const customerResponse = await usersIndex.search(search, {
// 						filters: `objectID:${customerID} AND type:'customer' AND (age >= ${minAge} AND age <= ${maxAge})`,
// 						hitsPerPage: hitsPerPage,
// 						page: currentPage,
// 					});
// 					if (customerResponse.hits.length > 0) {
// 						console.log(
// 							'🚀 ~ file: customerAction.js:44 ~ customerResponse:',
// 							customerResponse
// 						);
// 						uniqueCustomers.push(customerResponse.hits[0]);
// 					}
// 				} else {
// 					const customerResponse = await usersIndex.search(search, {
// 						filters: `objectID:${customerID} AND type:'customer' AND gender:${gender} AND (age >= ${minAge} AND age <= ${maxAge})`,
// 						hitsPerPage: hitsPerPage,
// 						page: currentPage,
// 					});
// 					if (customerResponse.hits.length > 0) {
// 						uniqueCustomers.push(customerResponse.hits[0]);
// 					}
// 				}
// 			}
// 			dispatch({
// 				type: 'GET_ALL_CUSTOMER',
// 				payload: uniqueCustomers,
// 			});
// 			dispatch({
// 				type: 'CUSTOMER_DETAILS',
// 				payload: { ...rest, nbHits: 2, nbPages: 1 },
// 			});
// 			dispatch(customerLoader(false));
// 		});
// 	};

export const getAllCustomers =
	(ID, search, gender, value, hitsPerPage) => async dispatch => {
		const minAge = value[0];
		const maxAge = value[1];
		dispatch(customerLoader(true));
		OrderIndex.search('', {
			filters: `restaurantID:${ID}`,
			hitsPerPage: 100000,
		}).then(async response => {
			let { hits, ...rest } = response;
			const customerIDs = hits.map(hit => hit.customerID);
			const uniqueCustomerIDs = [...new Set(customerIDs)];
			const uniqueCustomers = [];
			// loop through uniqueCustomerIDs and fetch the corresponding customer data from the usersIndex
			for (const customerID of uniqueCustomerIDs) {
				let customerFilters = `objectID:${customerID} AND type:'customer' AND (age >= ${minAge} AND age <= ${maxAge})`;
				if (gender !== 'all' && gender !== '') {
					customerFilters += ` AND gender:${gender}`;
				}
				const customerResponse = await usersIndex.search(search, {
					filters: customerFilters,
					hitsPerPage: hitsPerPage,
				});
				if (customerResponse.hits.length > 0) {
					uniqueCustomers.push(customerResponse.hits[0]);
				}
			}
			// dispatch the uniqueCustomers to the redux store
			dispatch({
				type: 'GET_ALL_CUSTOMER',
				payload: uniqueCustomers,
			});
			// update rest.nbHits and rest.nbPages based on the number of uniqueCustomers fetched
			rest.nbHits = uniqueCustomers.length;
			rest.nbPages = Math.ceil(rest.nbHits / hitsPerPage);
			rest.hitsPerPage = hitsPerPage;
			// dispatch the updated rest object to the redux store
			dispatch({
				type: 'CUSTOMER_DETAILS',
				payload: rest,
			});

			dispatch(customerLoader(false));
		});
	};

const customerLoader = data => async dispatch => {
	dispatch({
		type: 'CUSTOMER_LOADER',
		payload: data,
	});
};
