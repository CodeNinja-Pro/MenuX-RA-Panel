import firebase from "../../config/firebase";
import algoliasearch from "algoliasearch";
import { createNullCache } from "@algolia/cache-common";
import { enqueueSnackbar } from "notistack";

const client = algoliasearch("99PJ9S7CN9", "4dd3b464870ca480ed3bbbe36ef739cd", {
  responsesCache: createNullCache(),
});

export const getAllStaff =
  (ID, search, hitsPerPage, currentPage) => async (dispatch) => {
    dispatch(staffLoader(true));
    let newHits = [];
    const index = client.initIndex("users");

    index
      .search(search, {
        filters: `isDeleted:false AND (type:kitchen-admin OR type:kitchen-cook) AND restaurantID:${ID}`,
        hitsPerPage: hitsPerPage,
        page: currentPage,
      })
      .then((response) => {
        let { hits, ...rest } = response;

        hits.forEach((hit) => {
          firebase
            .firestore()
            .collection("permissions")
            .where("userID", "==", hit.id)
            .onSnapshot((querySnapshot) => {
              let docs = {};
              querySnapshot.forEach((doc) => {
                // docs.push({ id: doc.id, ...doc.data() });
                docs = { id: doc.id, ...doc.data() };
              });
              newHits.push({ ...hit, permissions: docs });
              dispatch({
                type: "GET_ALL_STAFF",
                payload: newHits,
              });
              dispatch({ type: "STAFF_DETAILS", payload: rest });
              dispatch(staffLoader(false));
            });
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

export const updateStaff =
  (id, obj, permissionId, permissions, onSuccess) => async (dispatch) => {
    dispatch(staffLoader(true));
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update(obj)
      .then(async () => {
        dispatch(staffLoader(false));
        await firebase
          .firestore()
          .collection("permissions")
          .doc(permissionId)
          .set({
            userID: id,
            ...permissions,
          });
        dispatch({
          type: "STAFF_UPDATED",
          payload: {
            id,
            obj,
            // permissions,
          },
        });
        onSuccess();
      })
      .catch((err) => {
        enqueueSnackbar(err);
        dispatch(staffLoader(false));
      });
  };

export const deleteStaff =
  (id, permissionId, onSuccess) => async (dispatch) => {
    dispatch(staffLoader(true));
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        isDeleted: true,
      })
      .then(async () => {
        await firebase
          .firestore()
          .collection("permissions")
          .doc(permissionId)
          .delete()
          // .get()
          // .then((querySnapshot) => {
          //   querySnapshot.forEach((doc) => {
          //     doc.ref.delete();
          //   });
          // })
          .catch((error) => {
            console.error("Error deleting documents: ", error);
          });

        dispatch({
          type: "STAFF_DELETED",
          payload: id,
        });

        dispatch(staffLoader(false));
        onSuccess();
      })
      .catch((err) => {
        enqueueSnackbar(err);
        dispatch(staffLoader(false));
      });
  };

const staffLoader = (data) => async (dispatch) => {
  dispatch({
    type: "STAFF_LOADER",
    payload: data,
  });
};
