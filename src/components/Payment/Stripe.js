// import React, { useState } from "react";
// import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
// import axios from "axios";

// import { loadStripe } from "@stripe/stripe-js";
// // import { TEST_CLIENT_KEY } from "../../contants/index.js";

// import {
//   Label,
//   Button,
//   Container,
//   Row,
//   Col,
//   Spinner,
//   Form,
//   FormGroup,
// } from "reactstrap";
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";

// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// let stripePromise = loadStripe("pk_test_7wzXL7byFHbRdehCSS5eC04Q00zUcStdHz");

// function StripePayment({ amount, orderData }) {
//   //   let { user, uid } = useSelector((state) => state.authUser);

//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { successMsg, setSuccessMsg } = useState("");
//   const [stripeError, setStripeError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [paymentLoader, setPaymentLoader] = useState(false);

//   //   const handleStripError = (message) => {
//   //     setStripeError(true);
//   //     setErrorMessage(message);
//   //     setTimeout(() => {
//   //       setStripeError(false);
//   //       setErrorMessage("");
//   //     }, 3000);
//   //   };

//   return (
//     <div className="container my-3 ">
//       <div className="row">
//         <div className="card p-3 col-md-12 m-auto">
//           <Elements stripe={stripePromise}>
//             <ElementsConsumer>
//               {({ elements, stripe }) => (
//                 <Form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     console.log("a gya ... ");
//                     // await setPaymentLoader(true);
//                     // const cardElement = await elements.getElement(
//                     //   CardNumberElement
//                     // );
//                     // const cardElement2 = await elements.getElement(
//                     //   CardExpiryElement
//                     // );
//                     // const cardElement3 = await elements.getElement(
//                     //   CardCvcElement
//                     // );

//                     // const { error, paymentMethod } =
//                     //   await stripe.createPaymentMethod({
//                     //     type: "card",
//                     //     card: cardElement,
//                     //     card: cardElement2,
//                     //     card: cardElement3,
//                     //   });
//                     // if (error) {
//                     //   await setPaymentLoader(false);
//                     //   enqueueSnackbar("Card Details not Added");
//                     // } else {
//                     //   // console.log("[payment Method]", paymentMethod)
//                     //   const result = await stripe.createToken(cardElement);
//                     //   // console.log("result", result)
//                     //   if (result.error) {
//                     //     enqueueSnackbar(result.error.message);
//                     //     // console.log("error result", result)
//                     //     return;
//                     //   }
//                     //   await setPaymentLoader(false);
//                     //   if (!amount) {
//                     //     enqueueSnackbar("session out re-order");
//                     //     return;
//                     //   }
//                     //   let body = {
//                     //     stripeToken: result.token.id,
//                     //     amount: Number(amount),
//                     //     email: user.email,
//                     //   };
//                     //   axios
//                     //     .post(
//                     //       "https://us-central1-menux1.cloudfunctions.net/app/payment",
//                     //       body
//                     //     )
//                     //     .then((res) => {
//                     //       let { data } = res;

//                     //       let obj = {
//                     //         ...orderData,
//                     //         customerID: uid,
//                     //         paymentMethod: "Stripe",
//                     //         status: "pending",
//                     //         paymentID: data?.charge?.id,
//                     //       };

//                     //       dispatch(
//                     //         addOrderAction(
//                     //           obj,
//                     //           (orderID) => {
//                     //             elements.getElement(CardNumberElement).clear();
//                     //             elements.getElement(CardExpiryElement).clear();
//                     //             elements.getElement(CardCvcElement).clear();

//                     //             enqueueSnackbar("Order Placed Successfully..!");
//                     //             // setSuccessMsg(
//                     //             //     "Amount Deducted successfully..!"
//                     //             // );
//                     //             // setTimeout(
//                     //             //     () => {
//                     //             //         setSuccessMsg(
//                     //             //             ""
//                     //             //         );
//                     //             //     },
//                     //             //     3000
//                     //             // );
//                     //             history.push(`/tracking/orderID=${orderID}`);
//                     //             dispatch(clearCartAction());
//                     //             localStorage.removeItem("cartPath");
//                     //             setPaymentLoader(false);
//                     //           },
//                     //           (res) => {
//                     //             setErrorMessage(res);
//                     //             setPaymentLoader(false);
//                     //           }
//                     //         )
//                     //       );
//                     //     })
//                     //     .catch((err) => {
//                     //       let { data } = err.response;
//                     //       console.error(data?.message, "Error");
//                     //       handleStripError(data?.message);
//                     //       setPaymentLoader(false);
//                     //     });
//                     // }
//                   }}
//                 >
//                   <Label className="offerheading text-center mb-2">
//                     <h3 className="text-center">
//                       <b>Card Detail</b>
//                     </h3>
//                   </Label>

//                   <FormGroup>
//                     <Label>Card number</Label>
//                     <div
//                       className="form-control mt-2 d-flex"
//                       style={{
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <i className="fa fa-credit-card"></i>
//                       <div style={{ flexBasis: "90%" }}>
//                         <CardNumberElement
//                           required
//                           options={{
//                             placeholder: "1234 1234 1234 1234",
//                             style: {
//                               base: {
//                                 // backgroundColor: "#232733",
//                                 fontSize: "16px",
//                               },
//                               invalid: {
//                                 color: "#9e2146",
//                               },
//                             },
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </FormGroup>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <FormGroup>
//                         <Label>Expiry Date</Label>
//                         <div
//                           className="form-control mt-2 d-flex"
//                           style={{
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <i className="fa fa-calendar"></i>
//                           <div
//                             style={{
//                               flexBasis: "90%",
//                             }}
//                           >
//                             <CardExpiryElement
//                               required
//                               options={{
//                                 placeholder: "MM/YY",
//                                 style: {
//                                   base: {
//                                     fontSize: "16px",
//                                   },
//                                   invalid: {
//                                     color: "#9e2146",
//                                   },
//                                 },
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </FormGroup>
//                     </div>
//                     <div className="col-md-6">
//                       <FormGroup>
//                         <Label>CVC/CVV</Label>
//                         <div
//                           className="form-control mt-2 d-flex"
//                           style={{
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <div
//                             style={{
//                               flexBasis: "80%",
//                             }}
//                           >
//                             <CardCvcElement
//                               required
//                               options={{
//                                 placeholder: "...",
//                                 style: {
//                                   base: {
//                                     fontSize: "16px",
//                                   },
//                                   invalid: {
//                                     color: "#9e2146",
//                                   },
//                                 },
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </FormGroup>
//                       {stripeError && (
//                         <p className="mb-0 my-1 text-danger">{errorMessage}</p>
//                       )}
//                       {successMsg && (
//                         <p className="mb-0 my-1 text-success">{successMsg}</p>
//                       )}
//                     </div>
//                   </div>
//                   <Button
//                     className="auth-button mt-2 py-3 btn btn-lg btn-block border border-none"
//                     type="submit"
//                     style={{ backgroundColor: "#f2ba36" }}
//                     disabled={paymentLoader}
//                   >
//                     {paymentLoader ? (
//                       <Spinner size="sm" />
//                     ) : (
//                       <h4 className="mb-0">Pay</h4>
//                     )}
//                   </Button>
//                 </Form>
//               )}
//             </ElementsConsumer>
//           </Elements>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StripePayment;
