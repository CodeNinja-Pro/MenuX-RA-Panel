import firebase from '../../config/firebase'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import algoliasearch from 'algoliasearch'
import { createNullCache } from '@algolia/cache-common'
import { enqueueSnackbar } from 'notistack'

// const tinyPNG = new TinyPNG('8PNWK2Rs0wbmgyRd0yQ10dN5Vsj92hHl')

const client = algoliasearch('99PJ9S7CN9', '4dd3b464870ca480ed3bbbe36ef739cd', {
  responsesCache: createNullCache()
})

export const addNewCoupon = (id, coupon, onSuccess) => async dispatch => {
  try {
    dispatch({
      type: 'COUPON_LOADER',
      payload: true
    })
    await firebase
      .firestore()
      .collection('coupons')
      .add({
        ...coupon,
        status: true,
        uses: 0,
        discountSharp: '',
        restaurantID: id,
        createdAt: firebase.firestore.Timestamp.now()
      })
      .then(() => {
        onSuccess()
        toast.success('You added new coupon successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'COUPON_LOADER',
          payload: false
        })
      })
      .catch(error => {
        toast.error(error.message, {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'COUPON_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

export const getCoupons = id => async dispatch => {
  dispatch({
    type: 'COUPON_LOADER',
    payload: true
  })

  try {
    let allCoupons = []
    const snapShot = await firebase
      .firestore()
      .collection('coupons')
      .where('restaurantID', '==', id)
      .get()

    snapShot.forEach(doc => {
      allCoupons.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_COUPONS',
      payload: allCoupons
    })

    dispatch({
      type: 'COUPON_LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'COUPON_LOADER',
      payload: false
    })
  }
}

export const updateStatus =
  (userId, id, couponStatus, onSuccess) => async dispatch => {
    try {
      await firebase
        .firestore()
        .collection('coupons')
        .doc(id)
        .update({
          status: !couponStatus
        })
        .then(() => {
          dispatch(getCoupons(userId))
          onSuccess()
          toast.success('You updated the coupon status.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

export const deleteCoupon = (userId, id, onSuccess) => async dispatch => {
  dispatch({
    type: 'COUPON_LOADER',
    payload: true
  })

  try {
    await firebase
      .firestore()
      .collection('coupons')
      .doc(id)
      .delete()
      .then(() => {
        dispatch(getCoupons(userId))
        onSuccess()
      })
      .catch(error => {
        toast.error(error.message, {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'COUPON_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'COUPON_LOADER',
      payload: false
    })
  }
}

export const addPopup =
  (id, newPopup, bannerFile, onSuccess) => async dispatch => {
    dispatch({
      type: 'POPUP_LOADER',
      payload: true
    })
    try {
      const storageRef = firebase.storage().ref()

      const imageFile = storageRef.child('popup_images/' + bannerFile.name)
      const snapShot = await imageFile.put(bannerFile)
      const downloadURL = await snapShot.ref.getDownloadURL()

      const popupData = {
        ...newPopup,
        bannerImage: downloadURL,
        status: false,
        restaurantID: id,
        createdAt: firebase.firestore.Timestamp.now()
      }

      await firebase
        .firestore()
        .collection('popups')
        .add(popupData)
        .then(() => {
          onSuccess()
          dispatch({
            type: 'POPUP_LOADER',
            payload: false
          })
        })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'POPUP_LOADER',
        payload: false
      })
    }
  }

export const updatePopup =
  (id, prevImage, popupID, newPopup, bannerFile, onSuccess) =>
  async dispatch => {
    dispatch({
      type: 'POPUP_LOADER',
      payload: true
    })
    try {
      await firebase.storage().refFromURL(prevImage).delete()

      const storageRef = firebase.storage().ref()

      const imageFile = storageRef.child('popup_images/' + bannerFile.name)
      const snapShot = await imageFile.put(bannerFile)
      const downloadURL = await snapShot.ref.getDownloadURL()

      await firebase
        .firestore()
        .collection('popups')
        .doc(popupID)
        .update({
          ...newPopup,
          bannerImage: downloadURL,
          createdAt: firebase.firestore.Timestamp.now()
        })
        .then(() => {
          onSuccess()
          dispatch({
            type: 'POPUP_LOADER',
            payload: false
          })
        })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'POPUP_LOADER',
        payload: false
      })
    }
  }

export const getPopups = id => async dispatch => {
  dispatch({
    type: 'POPUP_LOADER',
    payload: true
  })
  try {
    const snapShot = await firebase
      .firestore()
      .collection('popups')
      .where('restaurantID', '==', id)
      .get()

    let allPopups = []

    snapShot.forEach(doc => {
      allPopups.push({ id: doc.id, ...doc.data() })
    })

    dispatch({
      type: 'GET_POPUPS',
      payload: allPopups
    })

    dispatch({
      type: 'POPUP_LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'POPUP_LOADER',
      payload: false
    })
  }
}

export const updatePopupStatus =
  (userId, id, popupStatus, onSuccess) => async dispatch => {
    try {
      await firebase
        .firestore()
        .collection('popups')
        .doc(id)
        .update({
          status: !popupStatus
        })
        .then(() => {
          dispatch(getPopups(userId))
          onSuccess()
          toast.success('You updated the popup status.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

export const deletePopup = (userId, id, onSuccess) => async dispatch => {
  dispatch({
    type: 'POPUP_LOADER',
    payload: true
  })

  try {
    const seletedPopup = await firebase
      .firestore()
      .collection('popups')
      .doc(id)
      .get()

    const url = seletedPopup.data().bannerImage
    await firebase.storage().refFromURL(url).delete()

    await seletedPopup.ref
      .delete()
      .then(() => {
        dispatch(getPopups(userId))
        onSuccess()
      })
      .catch(error => {
        toast.error(error.message, {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'POPUP_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'POPUP_LOADER',
      payload: false
    })
  }
}

export const importMenuNew =
  (payload, restaurantID, onSuccess = () => {}, onError) =>
  async dispatch => {
    try {
      dispatch({
        type: 'IMPORT_LOADER',
        payload: true
      })
      let menuRef
      for (var item of payload) {
        const menuName = item?.MenuName
        const categoryName = item?.CategoryName
        if (!menuName || !categoryName) {
          toast.error('Invalid Data', {
            style: {
              fontFamily: 'Poppins'
            }
          })
          dispatch({
            type: 'IMPORT_LOADER',
            payload: false
          })
          onError()
          break // Skip processing this item and move to the next one
        }

        const querySnapshot = await firebase
          .firestore()
          .collection('parentMenus')
          .where('name', '==', menuName)
          .get()
        if (!querySnapshot.empty) {
          // Document with the matching menu name already exists
          menuRef = querySnapshot.docs[0].ref
        } else {
          // Create a new document
          const newMenuData = {
            name: menuName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            restaurantID // Replace with the actual restaurant ID
          }

          const newMenuDoc = await firebase
            .firestore()
            .collection('parentMenus')
            .add(newMenuData)

          menuRef = newMenuDoc
        }

        const exsitCategory = await firebase
          .firestore()
          .collection('categories')
          .where('originID', '==', item.CategoryID)
          .get()

        let addedCategory
        if (exsitCategory.empty) {
          const categoryData = {
            categoryName,
            menuID: menuRef ? menuRef.id : '', // Make sure menuRef is defined before accessing its ID
            restaurantID,
            originID: item.CategoryID
          }

          const category = await firebase
            .firestore()
            .collection('categories')
            .add(categoryData)
          addedCategory = category.id
        } else {
          exsitCategory.forEach(doc => {
            addedCategory = doc.id
          })
        }

        const sizes =
          item?.Sizes &&
          item?.Sizes.split(',').map(ele => {
            const [subItem, price] = ele.split('->')
            return { subItem, price }
          })
        const menuData = {
          name: item.ItemName,
          categoriesID: addedCategory,
          Calories: item.Calories ? item.Calories : '',
          estimatedTime: item.EstTime ? item.EstTime : '',
          menuID: menuRef ? menuRef.id : '', // Make sure menuRef is defined before accessing its ID
          restaurantID,
          sizes,
          images: '',
          views: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }

        await firebase.firestore().collection('menus').add(menuData)
      }
      const docSnapshot = await menuRef.get() // get the document snapshot
      const newMenu = { id: docSnapshot.id, ...docSnapshot.data() }
      dispatch({
        type: 'ADD_MENU_SUCCESS',
        payload: newMenu
      })
      dispatch({
        type: 'IMPORT_LOADER',
        payload: false
      })
      onSuccess()
      toast.success('Menus,Categorys and Items Added Successfully..!', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (error) {
      toast.error('Error importing menu:', error, {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'IMPORT_LOADER',
        payload: false
      })
    }
  }

export const importMenu = payload => async dispatch => {
  try {
    for (var item of payload) {
      const itemRecommendedProducts = JSON.parse(item?.recommendedProducts)
      const itemSizes = JSON.parse(item?.sizes)
      const itemImages = JSON.parse(item?.images)
      const itemVideos = JSON.parse(item?.videos)

      await firebase
        .firestore()
        .collection('menus')
        .add({
          ...item,
          recommendedProducts: itemRecommendedProducts,
          sizes: itemSizes,
          videos: itemVideos,
          images: itemImages
        })
        .then(toast.success('Menu Imported'), {
          style: {
            fontFamily: 'Poppins'
          }
        })
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export const getMenu =
  (id, search, hitsPerPage, currentPage) => async dispatch => {
    const index = client.initIndex('menus')
    index
      .search(search, {
        filters: `restaurantID:${id}`,
        hitsPerPage: hitsPerPage,
        page: currentPage
      })
      .then(response => {
        let { hits, ...rest } = response

        dispatch({
          type: 'MENU',
          payload: hits
        })

        dispatch({ type: 'MENU_DETAILS', payload: rest })
      })
    // firebase
    //   .firestore()
    //   .collection("menus")
    //   .where("restaurantID", "==", id)
    //   .onSnapshot((query) => {
    //     let menu = [];
    //     for (var doc of query.docs) {
    //       menu.push({ id: doc.id, ...doc.data() });
    //     }
    //     dispatch({
    //       type: "MENU",
    //       payload: menu,
    //     });
    //   });
  }

export const editMenu =
  (id, payload, onSuccess = () => {}, imagesToRemove) =>
  async dispatch => {
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: true
    })

    imagesToRemove?.map(url => {
      firebase.storage().refFromURL(url).delete()
    })
    let uploadImages = []
    for (var image of payload.images) {
      if (image?.name) {
        let fileName = image?.name
        let fileName1 = fileName.slice(fileName.lastIndexOf('.'))
        let fileName2 = uuidv4() + fileName1.toLowerCase()
        let storageRef = await firebase.storage().ref(fileName2).put(image)
        let url = await storageRef.ref.getDownloadURL()
        uploadImages.push(url)
      } else {
        uploadImages.push(image)
      }
    }

    await firebase
      .firestore()
      .collection('menus')
      .doc(id)
      .update({ ...payload, images: uploadImages })
      .then(() => {
        onSuccess({
          type: 'item',
          id: id,
          ...payload,
          images: uploadImages
        })
        toast.success('Menu Updated', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'UPDATE_MENU',
          payload: {
            id: id,
            ...payload,
            images: uploadImages
          }
        })
        dispatch({
          type: 'ADD_MENU_LOADER',
          payload: false
        })
      })
      .catch(error => {
        console.error(error)
        toast.error('Error updating menu', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'ADD_MENU_LOADER',
          payload: false
        })
      })
  }

export const addMenu = (payload, onSuccess) => async dispatch => {
  dispatch({
    type: 'ADD_MENU_LOADER',
    payload: true
  })
  try {
    // if (!payload.images || !payload.videos) {
    //   enqueueSnackbar("Please add images or videos");
    //   dispatch({
    //     type: "ADD_MENU_LOADER",
    //     payload: false,
    //   });
    //   return;
    // }

    const uploadImagesPromises = payload.images
      ? payload.images.map(async image => {
          const fileName = image.name
          const fileName1 = fileName.slice(fileName.lastIndexOf('.'))
          const fileName2 = uuidv4() + fileName1.toLowerCase()
          const storageRef = firebase.storage().ref(fileName2)
          await storageRef.put(image)
          const url = await storageRef.getDownloadURL()
          return url
        })
      : []

    const uploadVideosPromises = payload.videos
      ? payload.videos.map(async video => {
          const fileName = video.name
          const fileName1 = fileName.slice(fileName.lastIndexOf('.'))
          const fileName2 = uuidv4() + fileName1.toLowerCase()
          const storageRef = firebase.storage().ref(fileName2)
          await storageRef.put(video)
          const url = await storageRef.getDownloadURL()
          return url
        })
      : []

    const uploadImages = await Promise.all(uploadImagesPromises)
    const uploadVideos = await Promise.all(uploadVideosPromises)

    const newMenu = {
      ...payload,
      views: 0,
      videos: uploadVideos,
      images: uploadImages
    }

    const docRef = await firebase.firestore().collection('menus').add(newMenu)

    // Fetch the document data using the document reference
    const menuDoc = await firebase
      .firestore()
      .collection('menus')
      .doc(docRef.id)
      .get()

    dispatch({
      type: 'ADDED_MENU',
      payload: {
        id: docRef.id,
        ...menuDoc.data()
      }
    })

    onSuccess({
      type: 'item',
      id: docRef.id,
      ...menuDoc.data()
    })
    toast.success('Menu Added Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  } catch (error) {
    toast.warn(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  }
}

const compressImage = async file => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('localhost:8748/files/compress-image', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.log('Success!')
    } else {
      console.error('Image compression failed.')
    }
  } catch (error) {
    console.error(error)
  }
}

export const addMenuNew = (payload, onSuccess) => async dispatch => {
  dispatch({
    type: 'ADD_MENU_LOADER',
    payload: true
  })
  try {
    const uploadImagesPromises = payload.images?.map(async image => {
      // compressImage(image)
      const fileName = image?.name
      const fileName1 = fileName.slice(fileName.lastIndexOf('.'))
      const fileName2 = uuidv4() + fileName1.toLowerCase()
      const storageRef = firebase.storage().ref(fileName2)
      await storageRef.put(image)
      const url = await storageRef.getDownloadURL()
      return url
    })

    const uploadImages = await Promise.all(uploadImagesPromises)
    // const uploadVideos = await Promise.all(uploadVideosPromises)

    const newMenu = {
      ...payload,
      views: 0,
      purchase: 0,
      images: uploadImages
    }

    const docRef = await firebase.firestore().collection('menus').add(newMenu)

    // Fetch the document data using the document reference
    const menuDoc = await firebase
      .firestore()
      .collection('menus')
      .doc(docRef.id)
      .get()

    dispatch({
      type: 'ADDED_MENU',
      payload: {
        id: docRef.id,
        ...menuDoc.data()
      }
    })

    onSuccess({
      type: 'item',
      id: docRef.id,
      ...menuDoc.data()
    })
    toast.success('Menu Added Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })

    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  } catch (error) {
    enqueueSnackbar('Error adding menu: ', error.message)
    // handle error as needed
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  }
}

export const getCategories =
  (id, search, hitsPerPage, currentPage) => async dispatch => {
    const index = client.initIndex('categories')
    index
      .search(search, {
        filters: `restaurantID:${id}`,
        hitsPerPage: hitsPerPage,
        page: currentPage
      })
      .then(response => {
        let { hits, ...rest } = response
        dispatch({
          type: 'CATEGORIES',
          payload: hits
        })

        dispatch({ type: 'CATEGORIES_DETAILS', payload: rest })
      })
    // firebase
    // 	.firestore()
    // 	.collection('categories')
    // 	.where('restaurantID', '==', id)
    // 	.onSnapshot(data => {
    // 		let categories = [];
    // 		for (var doc of data.docs) {
    // 			categories.push({ id: doc.id, ...doc.data() });
    // 		}
    // 		dispatch({
    // 			type: 'CATEGORIES',
    // 			payload: categories,
    // 		});
    // 	});
  }

// export const addCategory =
//   (payload, onSuccess = () => {}) =>
//   async (dispatch) => {
//     dispatch({
//       type: "CATEGORY_LOADER", // Updated action type
//       payload: true,
//     });

//     const image = payload?.imageURL;

//     if (image) {
//       let fileName = image?.name;
//       let fileName1 = fileName.slice(fileName.lastIndexOf("."));
//       let fileName2 = uuidv4() + fileName1.toLowerCase();
//       let storageRef = await firebase
//         .storage()
//         .ref("categories_images/" + fileName2)
//         .put(image);
//       let url = await storageRef.ref.getDownloadURL();

//       payload.imageURL = url;
//     }
//     let categoryId = "";
//     firebase
//       .firestore()
//       .collection("categories")
//       .add({
//         ...payload,
//       })
//       .then((doc) => {
//         categoryId = doc.id;
//         dispatch({
//           type: "CATEGORY_LOADER", // Update loading state to false
//           payload: false,
//         });
//         dispatch({
//           type: "ADDED_CATEGORY", // Dispatch the new action
//           payload: {
//             id: doc.id,
//             ...payload,
//           },
//         });
//         onSuccess(categoryId);
//         toast.success("Category added");
//       });
//   };
export const addCategory =
  (payload, onSuccess = () => {}, categoryID) =>
  async dispatch => {
    dispatch({
      type: 'CATEGORY_LOADER',
      payload: true
    })
    const imageFile = payload?.imageURL

    // if (image instanceof File) {
    //   let fileName = image?.name;
    //   let fileName1 = fileName.slice(fileName.lastIndexOf("."));
    //   let fileName2 = uuidv4() + fileName1.toLowerCase();
    //   let storageRef = await firebase
    //     .storage()
    //     .ref("categories_images/" + fileName2)
    //     .put(image);
    //   let url = await storageRef.ref.getDownloadURL();

    //   payload.imageURL = url;
    // }
    if (imageFile) {
      const fileName = imageFile.name
      const fileExtension = fileName.slice(fileName.lastIndexOf('.'))
      const fileNameWithExtension = uuidv4() + fileExtension.toLowerCase()
      const storageRef = firebase
        .storage()
        .ref('categories_images/' + fileNameWithExtension)
      const uploadTaskSnapshot = await storageRef.put(imageFile)
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL()

      payload.imageURL = downloadURL
    }

    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('categories')
        .add({
          ...payload
        })
        .then(doc => {
          const categoryId = doc.id
          dispatch({
            type: 'CATEGORY_LOADER',
            payload: false
          })
          dispatch({
            type: 'ADDED_CATEGORY',
            payload: {
              id: doc.id,
              ...payload
            }
          })
          onSuccess(categoryId)
          // toast.success('Category added Successfully', {
          //   style: {
          //     fontFamily: 'Poppins'
          //   }
          // })
          resolve(categoryId) // Resolve the promise with categoryId
        })
        .catch(error => {
          reject(error) // Reject the promise if there's an error
        })
    })
  }

export const editCategory =
  (id, name, image, imageToRemove, onSuccess = () => {}) =>
  async dispatch => {
    dispatch({
      type: 'CATEGORY_LOADER',
      payload: true
    })

    try {
      // let imageURL = null

      // if (imageToRemove && !image) {
      //   // Only remove the image if there is an image to remove and no new image is being added
      //   firebase.storage().refFromURL(imageToRemove).delete()
      // } else if (image instanceof Blob) {
      //   let fileName = image?.name
      //   let fileName1 = fileName.slice(fileName.lastIndexOf('.'))
      //   let fileName2 = uuidv4() + fileName1.toLowerCase()
      //   let storageRef = await firebase
      //     .storage()
      //     .ref('categories_images/' + fileName2)
      //     .put(image)
      //   imageURL = await storageRef.ref.getDownloadURL()
      // } else {
      //   imageURL = image
      // }

      await firebase.firestore().collection('categories').doc(id).update({
        categoryName: name
        // imageURL: imageURL
      })

      onSuccess({
        id: id,
        name
        // imageURL
      })
      dispatch({
        type: 'UPDATED_CATEGORY',
        payload: {
          id: id,
          categoryName: name
          // imageURL: imageURL
        }
      })
      toast.success('Category updated Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Error updating category', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }

    dispatch({
      type: 'CATEGORY_LOADER',
      payload: false
    })
  }

export const deleteMenu = (id, parentID, images) => async dispatch => {
  try {
    if (images) {
      for (let i = 0; i < images.length; i++) {
        firebase.storage().refFromURL(images[i]).delete()
      }
    }
    firebase
      .firestore()
      .collection('menus')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: 'DELETED_MENU',
          payload: id
        })
      })

    dispatch(
      getParentMenu(parentID, res => {
        toast.success('Menu deleted successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
    )
  } catch (error) {
    console.error('Error deleting menu:', error)
    toast.error('Error deleting menu', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

export const deleteCategory =
  (id, parentID, imageToRemove) => async dispatch => {
    dispatch({
      type: 'CATEGORY_EDIT_LOADER',
      payload: true
    })
    try {
      if (imageToRemove) {
        firebase.storage().refFromURL(imageToRemove).delete()
      }

      await firebase.firestore().collection('categories').doc(id).delete()

      dispatch({
        type: 'DELETED_CATEGORY',
        payload: id
      })

      dispatch(
        getParentMenu(parentID, res => {
          toast.success('Category deleted successfully', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
      )
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Error deleting category', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }

    dispatch({
      type: 'CATEGORY_EDIT_LOADER',
      payload: false
    })
  }

// Tab section actions
export const addTabs =
  (payload, onSuccess = () => {}) =>
  async dispatch => {
    dispatch({
      type: 'ADD_TAB_LOADER',
      payload: true
    })

    await firebase
      .firestore()
      .collection('tabs')
      .add({
        ...payload,
        createdAt: firebase.firestore.Timestamp.now()
      })
      .then(doc => {
        onSuccess()
        toast.success('Tab added Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'ADDED_TAB',
          payload: {
            id: doc.id,
            ...payload
          }
        })
      })
      .finally(() => {
        dispatch({
          type: 'ADD_TAB_LOADER',
          payload: false
        })
      })
  }

export const editTabs =
  (id, name, onSuccess = () => {}) =>
  async dispatch => {
    dispatch({
      type: 'EDIT_TAB_LOADER',
      payload: true
    })

    try {
      const tabRef = firebase.firestore().collection('tabs').doc(id)
      await tabRef.update({
        tabName: name
      })
      onSuccess()
      toast.success('Tab updated Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'UPDATE_TAB',
        payload: {
          id: tabRef.id, // Use labelRef.id to get the ID of the updated document
          tabName: name
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Error updating tab', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } finally {
      dispatch({
        type: 'EDIT_TAB_LOADER',
        payload: false
      })
    }
  }

export const getTabs = id => async dispatch => {
  const querySnapshot = await firebase
    .firestore()
    .collection('tabs')
    .where('restaurantID', '==', id)
    .get()

  const tabs = []

  querySnapshot.forEach(doc => {
    tabs.push({ id: doc.id, ...doc.data() })
  })

  dispatch({
    type: 'TABS',
    payload: tabs
  })
}

export const deleteTab = id => async dispatch => {
  await firebase
    .firestore()
    .collection('tabs')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({
        type: 'DELETED_TAB',
        payload: id
      })
      toast.success('Tab Deleted Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
}

export const getLabels = id => async dispatch => {
  const querySnapshot = await firebase
    .firestore()
    .collection('labels')
    .where('restaurantID', '==', id)
    .get()

  const labels = []

  querySnapshot.forEach(doc => {
    labels.push({ id: doc.id, ...doc.data() })
  })

  dispatch({
    type: 'LABELS',
    payload: labels
  })
}

export const addlabel =
  (payload, image, onSuccess = () => {}) =>
  async dispatch => {
    dispatch({
      type: 'ADD_LABEL_LOADER',
      payload: true
    })

    const storageRef = firebase.storage().ref()

    const imageFile = storageRef.child('AttachmentLabels/' + image.name)
    const snapShot = await imageFile.put(image)
    const downloadURL = await snapShot.ref.getDownloadURL()

    await firebase
      .firestore()
      .collection('labels')
      .add({
        ...payload,
        labelIcon: downloadURL,
        createdAt: firebase.firestore.Timestamp.now()
      })
      .then(doc => {
        onSuccess()
        toast.success('Label added Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'ADDED_LABEL',
          payload: {
            id: doc.id,
            ...payload
          }
        })
      })
      .finally(() => {
        dispatch({
          type: 'ADD_LABEL_LOADER',
          payload: false
        })
      })
  }

export const editlabel =
  (id, name, image, onSuccess = () => {}) =>
  async dispatch => {
    dispatch({
      type: 'EDIT_LABEL_LOADER',
      payload: true
    })

    const storageRef = firebase.storage().ref()

    const imageFile = storageRef.child('popup_images/' + image.name)
    const snapShot = await imageFile.put(image)
    const downloadURL = await snapShot.ref.getDownloadURL()

    try {
      const labelRef = firebase.firestore().collection('labels').doc(id)
      await labelRef.update({
        labelName: name,
        labelIcon: downloadURL
      })
      onSuccess()
      toast.success('Label updated Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'UPDATE_LABEL',
        payload: {
          id: labelRef.id, // Use labelRef.id to get the ID of the updated document
          labelName: name,
          labelIcon: downloadURL
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Error updating label', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } finally {
      dispatch({
        type: 'EDIT_LABEL_LOADER',
        payload: false
      })
    }
  }

export const deleteLabel = id => async dispatch => {
  await firebase
    .firestore()
    .collection('labels')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({
        type: 'DELETED_LABEL',
        payload: id
      })
      toast.success('Label Deleted Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
}
export const addParentMenu =
  (name, restaurantID, onSuccess) => async dispatch => {
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: true
    })
    try {
      const docRef = await firebase.firestore().collection('parentMenus').doc()

      const querySnapshot = await firebase
        .firestore()
        .collection('parentMenus')
        .where('restaurantID', '==', restaurantID)
        .get()

      const order = querySnapshot.size

      await docRef.set({
        name,
        order,
        restaurantID,
        active: 'true',
        createdAt: firebase.firestore.Timestamp.now()
      })

      const docSnapshot = await docRef.get() // get the document snapshot
      const newMenu = { id: docSnapshot.id, ...docSnapshot.data() }
      dispatch({
        type: 'ADD_MENU_SUCCESS',
        payload: newMenu
      })
      toast.success('Menu Added..!', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess(docRef.id)
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: false
      })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: false
      })
    }
  }

export const updateActive =
  (parentID, status, restaurantID) => async dispatch => {
    try {
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: true
      })

      await firebase
        .firestore()
        .collection('parentMenus')
        .doc(parentID)
        .update({ active: status })

      dispatch(getAllParentMenu(restaurantID))
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: false
      })

      toast.success('Menu Actived.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (error) {
      toast.error('Error active', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

export const getAllParentMenu = restaurantID => async dispatch => {
  dispatch({
    type: 'ADD_MENU_LOADER',
    payload: true
  })
  try {
    const parentMenus = []
    const querySnapshot = await firebase
      .firestore()
      .collection('parentMenus')
      .where('restaurantID', '==', restaurantID)
      .get()

    querySnapshot.forEach(doc => {
      parentMenus.push({ id: doc.id, ...doc.data() })
    })
    // await firebase
    //   .firestore()
    //   .collection("parentMenus")
    //   .where("restaurantID", "==", restaurantID)
    //   .onSnapshot(async (query) => {
    //     let parentMenus = [];
    //     if (!query.empty) {
    //       for (let doc of query.docs) {
    //         parentMenus.push({ id: doc.id, ...doc.data() });
    //       }
    //     }

    //     dispatch({
    //       type: "ALL_PARENT_MENU",
    //       payload: parentMenus,
    //     });
    //     dispatch({
    //       type: "ADD_MENU_LOADER",
    //       payload: false,
    //     });
    //   });

    // console.log(parentMenus, "parentMenus");

    dispatch({
      type: 'ALL_PARENT_MENU',
      payload: parentMenus
    })
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  } catch (error) {
    enqueueSnackbar(error.message)
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  }
}

export const getParentMenu = (parentMenuID, onSuccess) => async dispatch => {
  // dispatch({
  //   type: 'EDIT_LABEL_LOADER',
  //   payload: true
  // })
  try {
    const menu = []

    const querySnapshot = await firebase
      .firestore()
      .collection('categories')
      .where('menuID', '==', parentMenuID)
      .get()

    querySnapshot.forEach(doc => {
      menu.push({
        type: 'category',
        openSubMenu: false,
        addItems: false,
        id: doc.id,
        ...doc.data(),
        items: []
      })
    })

    const itemsSnapshot = await firebase
      .firestore()
      .collection('menus')
      .where('menuID', '==', parentMenuID)
      .get()

    itemsSnapshot.forEach(doc => {
      const item = {
        type: 'item',
        id: doc.id,
        ...doc.data()
      }

      const categoryID = item.categoriesID

      const matchingCategory = menu.find(category => category.id === categoryID)

      if (matchingCategory) {
        matchingCategory.items.push(item)
      } else {
        menu.push(item)
      }
    })

    // console.log(menu);

    dispatch({
      type: 'EDIT_MENU',
      payload: menu
    })
    onSuccess(menu)

    dispatch({
      type: 'EDIT_LABEL_LOADER',
      payload: false
    })
  } catch (error) {
    enqueueSnackbar(error.message)
    dispatch({
      type: 'EDIT_LABEL_LOADER',
      payload: false
    })
  }
}
export const deleteMenuNew =
  (menuID, categoriesIDs, imagesToRemove, restaurantID) => async dispatch => {
    dispatch({
      type: 'DELETE_MENU_LOADER',
      payload: true
    })
    try {
      const batch = firebase.firestore().batch()

      // Delete parent menu
      if (menuID) {
        const parentMenuRef = firebase
          .firestore()
          .collection('parentMenus')
          .doc(menuID)
        batch.delete(parentMenuRef)
      }

      // Delete categories and associated menus
      if (categoriesIDs) {
        const categoryRefs = []
        const menuRefs = []

        categoriesIDs.forEach(id => {
          const categoryRef = firebase
            .firestore()
            .collection('categories')
            .doc(id)
          categoryRefs.push(categoryRef)

          const querySnapshot = firebase
            .firestore()
            .collection('menus')
            .where('categoriesID', '==', id)
            .get()
          querySnapshot.forEach(doc => {
            doc.ref.delete()
          })
        })
        await categoryRefs.forEach(categoryRef => {
          batch.delete(categoryRef)
        })

        await menuRefs.forEach(menuRef => {
          firebase.firestore().collection('menus').delete(menuRef)
        })
      }

      // Delete images
      if (imagesToRemove) {
        const deletePromises = imagesToRemove.map(url => {
          return firebase.storage().refFromURL(url).delete()
        })
        await Promise.all(deletePromises)
      }

      // Commit batched writes
      await batch.commit()
      dispatch({
        type: 'DELETE_PARENT_MENU',
        payload: menuID
      })
      dispatch(getAllParentMenu(restaurantID))
      toast.success('Menu Deleted Successfully...', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'DELETE_MENU_LOADER',
        payload: false
      })
    } catch (error) {
      toast.error('Error deleting menu: ' + error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch({
        type: 'DELETE_MENU_LOADER',
        payload: false
      })
    }
  }

export const updateParentMenu =
  (parentMenuID, newName, restaurantID) => async dispatch => {
    try {
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: true
      })

      await firebase
        .firestore()
        .collection('parentMenus')
        .doc(parentMenuID)
        .update({ name: newName })

      dispatch(getAllParentMenu(restaurantID))
      dispatch({
        type: 'ADD_MENU_LOADER',
        payload: false
      })

      toast.success('Menu renamed successfully.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (error) {
      toast.error('Error deleting menu', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

export const rearrangeOrder = (arrangeData, byID, type) => async dispatch => {
  try {
    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: true
    })
    if (type === 'parent') {
      await arrangeData.map((item, index) => {
        item.order = index
      })

      await firebase
        .firestore()
        .collection('parentMenus')
        .where('restaurantID', '==', byID)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const item = arrangeData.find(data => data.id === doc.id)
            if (item) {
              doc.ref.update({ order: item.order })
            }
          })
        })
    } else if (type === 'category') {
      await arrangeData.map((item, index) => {
        item.order = index
      })

      await firebase
        .firestore()
        .collection('categories')
        .where('menuID', '==', byID)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const item = arrangeData.find(data => data.id === doc.id)
            if (item) {
              doc.ref.update({ order: item.order })
            }
          })
        })

      dispatch(
        getParentMenu(byID, () => {
          toast.success('Reordered successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
      )
    } else {
      dispatch({
        type: 'CATEGORY_EDIT_LOADER',
        payload: true
      })

      await arrangeData.map((item, index) => {
        item.order = index
      })

      await firebase
        .firestore()
        .collection('menus')
        .where('categoriesID', '==', byID)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const item = arrangeData.find(data => data.id === doc.id)
            if (item) {
              doc.ref.update({ order: item.order })
            }
          })
        })
      const menuID = arrangeData[0].menuID

      dispatch(
        getParentMenu(menuID, () => {
          toast.success('Reordered successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
      )

      // dispatch({
      //   type: 'CATEGORY_EDIT_LOADER',
      //   payload: false
      // })
    }

    // dispatch(getAllParentMenu(restaurantID))

    dispatch({
      type: 'ADD_MENU_LOADER',
      payload: false
    })
  } catch (error) {
    toast.error('Error deleting menu', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

export const getParentMenuName = menuID => async dispatch => {
  try {
    const parentMenuRef = await firebase
      .firestore()
      .collection('parentMenus')
      .doc(menuID)
      .get()

    const parentMenuName = parentMenuRef.data().name
    dispatch({
      type: 'SET_PARENT_MENU_NAME',
      payload: parentMenuName
    })
  } catch (error) {
    toast.error(error.message)
  }
}
