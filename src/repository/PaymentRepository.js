import Repository from './repository'
const verifyUser = '/email-verify'

const createStripe = '/users'
// const ResubscribeUser = "/payment/resubscribe";
// const subscribeUser = "/payment/subscribe";
// const paypalRefund = "/payment/paypal-refund";
// const stripeRefund = "/payment/stripe-refund";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkUserWithEmail (payload) {
    return Repository.post(`${verifyUser}`, payload)
  }

  //   add(payload) {
  //     return Repository.post(`${createUser}`, payload);
  //   },

  //   createSubscription(payload) {
  //     // console.log(payload, "payload");
  //     return Repository.post(`${subscribeUser}`, payload);
  //   },
  //   getSubscriptionStatus(subscriptionID) {
  //     // console.log(subscriptionID, "subscriptionID");
  //     return Repository.get(`/payment/getSubscription/${subscriptionID}`);
  //   },

  //   unSubscribe(subscriptionID) {
  //     // console.log(subscriptionID, "subscriptionID unSubscribe");
  //     return Repository.get(`/payment/unsubscribe/${subscriptionID}`);
  //   },

  //   reSubscribe(payload) {
  //     // console.log(payload, "payload");
  //     return Repository.post(`${ResubscribeUser}`, payload);
  //   },
  //   paymentRefund(payload) {
  //     // console.log("Payload in User", payload);
  //     return Repository.post(`${ResubscribeUser}`, payload);
  //   },
  //   paymentRefund(payload) {
  //     return Repository.post(
  //       `${payload.paymentMethod === "Stripe" ? stripeRefund : paypalRefund}`,
  //       payload.paymentMethod === "Stripe"
  //         ? {
  //             chargeId: payload.paymentID,
  //             amount: payload.totalAmount,
  //             orderId: payload.id,
  //           }
  //         : {
  //             transactionId: payload.paymentID,
  //             amount: payload.totalAmount,
  //             orderId: payload.id,
  //           }
  //     );
  //   },
}
