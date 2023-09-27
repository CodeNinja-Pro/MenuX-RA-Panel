import firebase from "../../config/firebase";
import algoliasearch from "algoliasearch";
import { createNullCache } from "@algolia/cache-common";
import { enqueueSnackbar } from "notistack";

const client = algoliasearch("99PJ9S7CN9", "4dd3b464870ca480ed3bbbe36ef739cd", {
  responsesCache: createNullCache(),
});
export const getAllAdmins =
  (search, hitsPerPage, currentPage) => async (dispatch) => {
    dispatch(AdminLoader(true));
    const index = client.initIndex("users");
    index
      .search(search, {
        filters: "isDeleted:false AND type:admin",
        hitsPerPage: hitsPerPage,
        page: currentPage,
      })
      .then((response) => {
        let { hits, ...rest } = response;
        dispatch({
          type: "GET_ALL_ADMINS",
          payload: hits,
        });

        dispatch({ type: "ADMINS_DETAILS", payload: rest });
        dispatch(AdminLoader(false));
      });
  };

export const updateSubAdmin = (id, obj, onSuccess) => async (dispatch) => {
  console.log(obj);
  dispatch(AdminLoader(true));
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .update(obj)
    .then(() => {
      dispatch(AdminLoader(false));

      onSuccess();
    })
    .catch((err) => {
      enqueueSnackbar(err.message);
      dispatch(AdminLoader(false));
    });
};

export const deleteSubAdmin = (id, onSuccess) => async (dispatch) => {
  dispatch(AdminLoader(true));
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .update({
      isDeleted: true,
    })
    .then(() => {
      dispatch(AdminLoader(false));
      // dispatch({
      //   type: "DELETE_ADMIN",
      //   payload: id,
      // });
      onSuccess();
    })
    .catch((err) => {
      enqueueSnackbar(err);
      dispatch(AdminLoader(false));
    });
};

const AdminLoader = (data) => async (dispatch) => {
  dispatch({
    type: "ADMIN_LOADER",
    payload: data,
  });
};
