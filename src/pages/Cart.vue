<template>
  <Loader v-if="store.dt.loading" />

  <div
    v-if="selectedDish !== -1 && !forceExit"
    :class="selectedDish !== -1 ? 'active' : ''"
    class="selected-dish"
  >
    <div class="h-100 w-100 bg-invisible">
      <div class="card card-show border-0 rounded-4 overflow-hidden">
        <button
          @click="selectedDish = -1"
          class="btn btn-primary btn-custom close-show"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img
          v-if="store.dt.myChart[selectedDish].item.image.includes('http')"
          :src="store.dt.myChart[selectedDish].item.image"
          class="card-img-top"
          alt="..."
          :style="
            store.dt.myChart[selectedDish].item.visibility
              ? 'filter: grayscale(0)'
              : 'filter: grayscale(100%)'
          "
        />
        <img
          v-else
          :src="
            store.dt.beUrl +
            '/storage/' +
            store.dt.myChart[selectedDish].item.image
          "
          class="card-img-top"
          alt="..."
          :style="
            store.dt.myChart[selectedDish].item.visibility
              ? 'filter: grayscale(0)'
              : 'filter: grayscale(100%)'
          "
        />
        <div class="card-body">
          <h5 class="card-title">
            {{ store.dt.myChart[selectedDish].item.name }}
          </h5>
          <p class="card-text">
            {{ store.dt.myChart[selectedDish].item.description }}
          </p>
          <div class="px-3">
            <div class="bg-light border text-center py-3 fs-4 rounded-2">
              €
              {{
                totalPrice(
                  store.dt.myChart[selectedDish].item.price,
                  store.dt.myChart[selectedDish].quantity
                )
              }}
            </div>

            <div
              class="text-center py-3"
              v-if="store.dt.myChart[selectedDish].item.visibility"
            >
              <div class="d-flex justify-content-around pt-3">
                <button
                  class="btn btn-primary btn-custom btn-sm px-3"
                  @click="
                    store.dt.myChart[selectedDish].quantity === 1
                      ? (store.dt.myChart[selectedDish].quantity = 99)
                      : store.dt.myChart[selectedDish].quantity--;
                    store.dt.myChart[selectedDish].price = totalPrice(
                      store.dt.myChart[selectedDish].item.price,
                      store.dt.myChart[selectedDish].quantity
                    );
                    store.fn.saveStorage();
                    store.fn.loadStorage();
                  "
                >
                  -
                </button>
                <div class="card w-25 text-center py-2 d-none d-lg-block">
                  {{ store.dt.myChart[selectedDish].quantity }}
                </div>
                <button
                  class="btn btn-primary btn-custom btn-sm px-3"
                  @click="
                    store.dt.myChart[selectedDish].quantity === 99
                      ? (store.dt.myChart[selectedDish].quantity = 1)
                      : store.dt.myChart[selectedDish].quantity++;
                    store.dt.myChart[selectedDish].price = totalPrice(
                      store.dt.myChart[selectedDish].item.price,
                      store.dt.myChart[selectedDish].quantity
                    );
                    store.fn.saveStorage();
                    store.fn.loadStorage();
                  "
                >
                  +
                </button>
              </div>

              <div class="text-center pt-3">
                <button
                  @click="
                    forceExit = true;
                    store.dt.myChart.splice(selectedDish, 1);
                    selectedDish = -1;
                    store.fn.saveStorage();
                    store.fn.loadStorage();
                  "
                  class="delete btn-sm btn btn-primary btn-custom"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
            <div class="pt-3" v-else>
              <h5 class="text-center custom-color fw-bold">
                Prodotto attualmente non disponibile
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container pt-3" >
    <h2 class="pt-3 pb-2">Il tuo Carrello</h2>
    <div class="py-1 mt-2 mb-5 custom-bg w-100 rounded-1"></div>
    <div class="row row-cols-1">
      <div class="col" v-for="(item, index) in store.dt.myChart" :key="index">
        <div class="single-row py-3 px-1">
          <div class="row">
            <div class=" col-sm-1 col-2 col-lg-1 align-items-center d-flex">
              <div
                class="card  border-0 ms-0 d-flex justify-content-center align-items-center fw-bolder"
                style="aspect-ratio: 1/1; width: 50px"
              >
                {{ item.quantity }}
              </div>
            </div>
            <div class="col-5 col-lg-7 d-flex align-items-center">
              <div class="fw-bolder p-0  mx-auto">{{ item.item.name }}:</div>
            </div>
            <div
              class="col-3 text-end d-flex align-items-center justify-content-end"
            >
              <div>€ {{ item.price }}</div>
            </div>
            <div class="col-1 ps-0 align-items-center d-flex">
              <button
                class="btn btn-primary btn-custom"
                style="aspect-ratio: 1/1; width: 50px"
                @click="
                  selectedDish = index;
                  forceExit = false;
                "
              >
                <i class="fa-solid fa-pen"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="single-row p-3 pe-0">
          <div class="row">
            <!-- <div class="col-2 col-lg-1"></div> -->
            <div class=" col">
              <span class="fw-bolder">Totale:</span> 
              <span class=" ms-3">€ {{ total_order.toFixed(2) }}</span>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button
        v-if="store.dt.myChart.length > 0"
        class="btn btn-ptimary btn-custom mt-5 mb-4 "
        @click="dropChart()"
      >   Svuota carrello
      </button>
    </div>
   

    <div class="py-1 mt-3 mb-5 custom-bg w-100 rounded-1"></div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <form class="row g-3" novalidate>
          <div class="col-md-12">
            <label for="customer_name" class="form-label"
              >Nome e Cognome*</label
            >
            <input
              type="text"
              v-model="customer_name"
              class="form-control"
              name="customer_name"
              :class="{ 'is-invalid': formSubmitted && !customer_name }"
              required
            />
            <div
              class="invalid-feedback"
              v-if="formSubmitted && !customer_name"
            >
              Inserisci nome e cognome.
            </div>
          </div>
          <div class="col-md-12">
            <label for="customer_address" class="form-label">Indirizzo*</label>
            <input
              type="text"
              v-model="customer_address"
              class="form-control"
              name="customer_address"
              :class="{ 'is-invalid': formSubmitted && !customer_address }"
              required
            />
            <div
              class="invalid-feedback"
              v-if="formSubmitted && !customer_address"
            >
              Inserisci un indirizzo.
            </div>
          </div>
          <div class="col-md-12">
            <label for="customer_phone" class="form-label"
              >Numero di telefono*</label
            >
            <input
              type="number"
              v-model="customer_phone"
              class="form-control"
              name="customer_phone"
              :class="{ 'is-invalid': formSubmitted && !customer_phone }"
              required
            />
            <div
              class="invalid-feedback"
              v-if="formSubmitted && !customer_phone"
            >
              Inserisci un numero di telefono.
            </div>
          </div>
          <div class="col-md-12">
            <label for="customer_email" class="form-label">E-mail*</label>
            <input
              type="email"
              v-model="customer_email"
              class="form-control"
              name="customer_email"
              :class="{ 'is-invalid': formSubmitted && !customer_email }"
              required
            />
            <div
              class="invalid-feedback"
              v-if="formSubmitted && !customer_email"
            >
              Inserisci una mail valida.
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-12 col-md-7">
        <div>{{ resultPayment }}</div>
        <div id="dropin-wrapper">
          <div id="checkout-message"></div>
          <div id="dropin-container"></div>
          <div class="d-flex btn-payment">
            <button
            class="btn btn-primary btn-custom mb-5"
            @click="submit"
            :disabled="!formComplete"
            id="submit-button"
          >
            Conferma Pagamento
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { router } from "../router";
window.addEventListener("DOMContentLoaded", function () {
  var payButton = document.querySelector("#submit-button");
  braintree.dropin.create(
    {
      // Insert your tokenization key here
      authorization: "sandbox_hcrmmztj_h28c6qmktphjvv8n",
      container: "#dropin-container",
    },
    function (createErr, instance) {
      payButton.addEventListener("click", function () {
        instance.requestPaymentMethod(function (
          requestPaymentMethodErr,
          payload
        ) {
          store.dt.loading = true;
          // When the user clicks on the 'Submit payment' button this code will send the
          // encrypted payment information in a variable called a payment method nonce
          $.ajax({
            type: "POST",
            url: store.dt.paymentUrl + store.dt.payLink,
            data: { paymentMethodNonce: payload.nonce },
          }).done(function (result) {
            // Tear down the Drop-in UI
            instance.teardown(function (teardownErr) {
              if (teardownErr) {
                console.error("Could not tear down Drop-in UI!");
              } else {
                console.info("Drop-in UI has been torn down!");
                // Remove the 'Submit payment' button
                $("#submit-button").remove();
              }
            });

            if (result.success) {
              store.dt.myChart = [];
              store.fn.saveStorage();
              router.push("checkout");
            } else {
              $("#checkout-message").html(
                "<h1>Error</h1><p>Pagamento rifiutato.</p>"
              );
            }
            store.dt.loading = false;
          });
        });
      });
    }
  );
});
import { store } from "../stores/store";
import axios from "axios";
import Loader from "../components/Loader.vue";
export default {
  data() {
    return {
      customer_email: "",
      customer_name: "",
      customer_address: "",
      customer_phone: "",
      formSubmitted: false,
      store,
      resultPayment: "",
      selectedDish: -1,
      forceExit: true,
    };
  },
  methods: {
    dropChart() {
      store.dt.myChart = [];
      store.fn.saveStorage();
      store.fn.loadStorage();
    },
    totalPrice(num1, num2) {
      let total = num1 * num2;
      return (Math.round(total * 100) / 100).toFixed(2);
    },
    submit() {
      store.dt.payLink = this.dishesBuy;
      this.formSubmitted = true;
      axios
        .post(
          "http://localhost:8000/api/take-data-order",
          {
            customer_email: this.customer_email,
            customer_name: this.customer_name,
            customer_address: this.customer_address,
            customer_phone: this.customer_phone,
            status: "In lavorazione",
            order_date: "2023/03/14",
            order_time: "2023/03/14",
            total_order: this.total_order,
            restaurant_id: this.restaurant_id,
            dish_id: this.dish_id,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          store.fn.saveStorage();
        })
        .catch((error) => {
          this.resultPayment = "Transazione negata";
        });
    },
  },
  mounted() {
    store.fn.loadStorage();
    const reload = localStorage.getItem("reload");
    if (reload) {
      this.reload = JSON.parse(reload);
    }
    if (this.reload === 0) {
      this.reload++;
      window.location.reload();
      localStorage.setItem("reload", JSON.stringify(this.reload));
    } else {
      this.reload = 0;
      localStorage.setItem("reload", JSON.stringify(this.reload));
    }
  },
  beforeUnmount() {
    store.fn.saveStorage();
  },
  computed: {
    formComplete() {
      return (
        this.customer_name &&
        this.customer_address &&
        this.customer_phone &&
        this.customer_email
      );
    },
    total_order() {
      // Controlla se "store.dt.myChart" esiste ed è un array valido
      if (store.dt.myChart && Array.isArray(store.dt.myChart)) {
        return store.dt.myChart.reduce((total, item) => {
          return total + parseFloat(item.price);
        }, 0);
      }
      return 0; // restituisce 0 se "store.dt.myChart" non è definito o non è un array
    },
    dishesBuy() {
      return store.dt.myChart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => `&dishes[]=${item.item.id}`)
      );
    },
    dishBuyLink() {
      return `http://127.0.0.1:8000/api/orders/make/payment?token=fake-valid-nonce${this.dishesBuy.join(
        ""
      )}`;
    },
    dish_id() {
      return store.dt.myChart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => item.item.id)
      );
    },
    restaurant_id() {
      const item = this.store.dt.myChart.find((item) => item.quantity > 0);
      return item ? item.item.restaurant_id : null;
    },
  },
  components: { Loader },
};
</script>

<style lang="scss" scoped>
@media screen and ( max-width:500px ) {
    .btn-payment {
        justify-content: center;
    }
}
.container {
  min-height: calc(100vh - 214px);

  .single-row {
    border-bottom: 1px solid #c76262;
    border-collapse: collapse !important;
  }
}

.selected-dish {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.7);
  z-index: 9999999999999999999992;
  opacity: 0;

  &.active {
    opacity: 1;
  }

  .card-show {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;

    &:hover {
      .close-show {
        opacity: 1;
      }
    }

    .close-show {
      position: absolute;
      top: 15px;
      right: 15px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      opacity: 0.3;
      transition: opacity, 0.4s;
      z-index: 9999999999999999999999;

      &:hover {
        transform: rotate(360deg);
      }

      &:active {
        transform: rotate(-360deg);
      }
    }

    img {
      aspect-ratio: 2/1;
      object-fit: cover;
      width: 100%;
    }
  }
}
</style>
