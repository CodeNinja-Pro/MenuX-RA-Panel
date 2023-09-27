import firebase from "../../config/firebase";
import algoliasearch from "algoliasearch";
import { createNullCache } from "@algolia/cache-common";
import { enqueueSnackbar } from "notistack";

const client = algoliasearch("99PJ9S7CN9", "4dd3b464870ca480ed3bbbe36ef739cd", {
  responsesCache: createNullCache(),
});

export const getAllMerchantAction = (id, category) => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .where("type", "==", "restaurant")
      .onSnapshot(async (query) => {
        console.log("query.docs", query.docs);
        let temp = [];
        if (!query.empty) {
          for (let doc of query.docs) {
            temp.push({ id: doc.id, ...doc.data() });
          }
        }
        dispatch({ type: "GET_ALL_MERCHANT", payload: temp });
      });
  } catch (err) {
    enqueueSnackbar(err.message);
  }
};
export const getAllRestaurant =
  (search, hitsPerPage, currentPage) => async (dispatch) => {
    dispatch(restaurantLoader(true));
    const index = client.initIndex("users");
    index
      .search(search, {
        filters: "isDeleted:false AND type:restaurant",
        hitsPerPage: hitsPerPage,
        page: currentPage,
      })
      .then((response) => {
        let { hits, ...rest } = response;
        dispatch({
          type: "GET_RESTAURANT",
          payload: hits,
        });
        dispatch({ type: "RESTAURANT_DETAILS", payload: rest });
        dispatch(restaurantLoader(false));
      });
    // Firebase Get Code Start
    // firebase
    // 	.firestore()
    // 	.collection('users')
    // 	.where('type', '==', 'restaurant')
    // 	.where('isDeleted', '==', false)
    // 	.onSnapshot(query => {
    // 		let temp = [];
    // 		query.docs.forEach(doc => {
    // 			temp.push({
    // 				id: doc.id,
    // 				...doc.data(),
    // 			});
    // 		});
    // 		dispatch({ type: 'GET_RESTAURANT', payload: temp });
    // 		dispatch(restaurantLoader(false));
    // 	});
  };

export const updateMerchant = (id, obj, onSuccess) => async (dispatch) => {
  dispatch(restaurantLoader(true));
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .update(obj)
    .then(() => {
      dispatch(restaurantLoader(false));
      onSuccess();
      dispatch({
        type: "UPDATE_RESTAURANT",
        payload: {
          id,
          ...obj,
        },
      });
    })
    .catch((err) => {
      enqueueSnackbar(err);
      dispatch(restaurantLoader(false));
    });
};

export const deleteRestaurant = (id, onSuccess) => async (dispatch) => {
  dispatch(restaurantLoader(true));
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .update({
      isDeleted: true,
    })
    .then(() => {
      dispatch(restaurantLoader(false));
      onSuccess();
      dispatch({ type: "DELETE_RESTAURANT", payload: id });
    })
    .catch((err) => {
      enqueueSnackbar(err);
      dispatch(restaurantLoader(false));
    });
};
export const getRestaurantImages = (ID) => async (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(ID)
    .onSnapshot((query) => {
      let data = query.data();
      let images = data?.restaurantImages;
      let logo = data?.restaurantLogo;
      let adminColor = data?.adminColor;
      dispatch({
        type: "Restaurant_Media",
        payload: { images, logo, adminColor },
      });
    });
};

const restaurantLoader = (data) => async (dispatch) => {
  dispatch({
    type: "RESTAURANT_LOADER",
    payload: data,
  });
};
