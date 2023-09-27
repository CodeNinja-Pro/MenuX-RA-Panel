import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { enqueueSnackbar } from 'notistack'

const questionLoader = data => async dispatch => {
  dispatch({
    type: 'QUESTION_LOADER',
    payload: data
  })
}

export const getCheckoutQuestion = restaurantID => async dispatch => {
  dispatch(questionLoader(true))
  firebase
    .firestore()
    .collection('checkoutQuestions')
    .where('restaurantID', '==', restaurantID)
    .onSnapshot(query => {
      let temp = []
      query.docs.forEach(doc => {
        temp.push({
          id: doc.id,
          ...doc.data()
        })
      })
      dispatch({ type: 'GET_QUESTION', payload: temp })
      dispatch(questionLoader(false))
    })
}
export const getCheckoutResponses = Id => async dispatch => {
  firebase
    .firestore()
    .collection('checkoutResponses')
    .where('questionId', '==', Id)
    .orderBy('createdAt', 'desc')
    .onSnapshot(query => {
      let temp = []
      query.docs.forEach(doc => {
        temp.push({
          id: doc.id,
          ...doc.data()
        })
      })
      dispatch({ type: 'GET_RESPONSES', payload: temp })
    })
}
export const addCheckoutQuestion = (obj, onSuccess) => async dispatch => {
  dispatch(questionLoader(true))
  firebase
    .firestore()
    .collection('checkoutQuestions')
    .add(obj)
    .then(() => {
      dispatch(questionLoader(false))
      toast.success('Question Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(questionLoader(false))
    })
}
