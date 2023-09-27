import firebase from "../../config/firebase";
import algoliasearch from "algoliasearch";
import { createNullCache } from "@algolia/cache-common";
const client = algoliasearch("99PJ9S7CN9", "4dd3b464870ca480ed3bbbe36ef739cd", {
  responsesCache: createNullCache(),
});

export const getRequests = (id) => async (dispatch) => {
  firebase
    .firestore()
    .collection("requests")
    .where("restaurantID", "==", id)
    .onSnapshot(async (query) => {
      let requests = [];
      for (let doc of query.docs) {
        let customerName = "";
        let requestData = doc.data();
        await firebase
          .firestore()
          .collection("orders")
          .doc(requestData?.orderID)
          .get()
          .then(async (order) => {
            let orderData = order.data();
            await firebase
              .firestore()
              .collection("users")
              .doc(orderData?.customerID)
              .get()
              .then((customer) => {
                let customerData = customer?.data();
                customerName = customerData?.name;
              });

            requests.push({
              id: doc.id,
              ...doc.data(),
              customerName,
            });
          });
      }
      dispatch({
        type: "REQUESTS",
        payload: requests,
      });
    });
};

export const getAllOrders =
  (search, id, currentPage, filter, startWeek, endWeek, startDate, endDate) =>
  async (dispatch) => {
    dispatch(orderLoader(true));

    const orderIndex = client.initIndex("orders");

    if (filter == "All") {
      orderIndex
        .search(search, {
          filters: `restaurantID:${id} AND (createdAt._seconds > ${startDate} AND createdAt._seconds < ${endDate})`,
          page: currentPage,
        })
        .then(async (response) => {
          let { hits, ...rest } = response;
          await dispatch({
            type: "ORDERS",
            payload: hits,
          });
          // console.log("this is hits", hits);
          dispatch({ type: "ORDERS_DETAILS", payload: rest });
          dispatch(orderLoader(false));
        });
    } else if (filter == "New") {
      orderIndex
        .search(search, {
          filters: `restaurantID:${id} AND (createdAt._seconds < ${startWeek} AND createdAt._seconds > ${endWeek})`,
          page: currentPage,
        })
        .then(async (response) => {
          let { hits, ...rest } = response;
          await dispatch({
            type: "ORDERS",
            payload: hits,
          });
          dispatch({ type: "ORDERS_DETAILS", payload: rest });
          dispatch(orderLoader(false));
        });
    } else {
      orderIndex
        .search(search, {
          filters: `restaurantID:${id} AND status:${filter}`,
          page: currentPage,
        })
        .then(async (response) => {
          let { hits, ...rest } = response;
          await dispatch({
            type: "ORDERS",
            payload: hits,
          });

          dispatch({ type: "ORDERS_DETAILS", payload: rest });
          dispatch(orderLoader(false));
        });
    }
  };

export const updateOrder = (id, status) => async (dispatch) => {
  await firebase.firestore().collection("orders").doc(id).update({
    status: status,
  });

  dispatch({
    type: "UPDATE_ORDER_STATUS",
    payload: {
      id: id,
      status: status,
    },
  });
};

// Notfications

export const getUnreadNotfications = (id) => async (dispatch) => {
  if (id) {
    firebase
      .firestore()
      .collection("notifications")
      .where("restaurantID", "==", id)
      .where("markAsRead", "==", false)
      .onSnapshot((query) => {
        let unread = [];
        for (let doc of query.docs) {
          unread.push({ id: doc.id, ...doc.data() });
        }
        dispatch({
          type: "UNREAD_NOTFICATIONS",
          payload: unread,
        });
      });
  } else {
    firebase
      .firestore()
      .collection("notifications")
      .where("markAsRead", "==", false)
      .onSnapshot((query) => {
        let unread = [];
        for (let doc of query.docs) {
          unread.push({ id: doc.id, ...doc.data() });
        }
        dispatch({
          type: "UNREAD_NOTFICATIONS",
          payload: unread,
        });
      });
  }
};

export const updateNotification = (id) => async (dispatch) => {
  firebase.firestore().collection("notifications").doc(id).update({
    markAsRead: true,
  });
};

export const getNotifications = (id) => async (dispatch) => {
  firebase
    .firestore()
    .collection("notifications")
    .where("restaurantID", "==", id)
    .onSnapshot((query) => {
      let notifications = [];
      for (let doc of query.docs) {
        notifications.push({ id: doc.id, ...doc.data() });
      }

      dispatch({
        type: "ALL_NOTIFICATIONS",
        payload: notifications,
      });
    });
};

export const orderLoader = (val) => async (dispatch) => {
  dispatch({
    type: "ORDER_LOADER",
    payload: val,
  });
};
