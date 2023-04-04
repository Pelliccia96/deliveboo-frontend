<template>
  <div class="my-container custom-bg">
    <div class="p-5">
      <h1 class="title pt-5 text-white">
        Il tuo pagamento è andato a buon fine!
      </h1>
      <h5 class="text-center">A breve ti arriverà una mail di conferma!</h5>
    </div>
  </div>
</template>

<script>
const payButton = document.querySelector("#submit-button");
braintree.dropin.create(
  {
    authorization: "sandbox_hcrmmztj_h28c6qmktphjvv8n",
    container: "#dropin-container",
  },
  (createErr, instance) => {
    payButton.addEventListener("click", () => {
      instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        axios
          .post("/checkout", { paymentMethodNonce: payload.nonce })
          .then((response) => {
            if (response.data.success) {
              console.log("Payment successful!");
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }
);
import axios from "axios";
export default {
  mounted() {},
  methods: {
    submitPayment() {
      // This method can be used instead of the click event listener in mounted()
    },
  },
};
</script>
<style lang="scss" scoped>
.my-container {
  min-height: calc(100vh - 214px);
}
.title {
  /* font-family: bold; */
  font-weight: bold;
  // font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
}
</style>
dashboard
