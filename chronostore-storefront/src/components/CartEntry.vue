<script lang="ts" setup>


</script>


<template>
    <div class="cart-item border-top border-bottom padding-small">
              <div class="row align-items-center"> 
                <div class="col-lg-4 col-md-3">
                  <div class="cart-info d-flex flex-wrap align-items-center mb-4">
                    <div class="col-lg-5">
                      <div class="card-image">
                        <img src="images/cart-item1.jpg" alt="cloth" class="img-fluid">
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="card-detail ps-3">
                        <h3 class="card-title text-uppercase">
                          <a href="#">Iphone 13</a>
                        </h3>
                        <div class="card-price">
                          <span class="money text-primary" data-currency-usd="$1200.00">$1500.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-7">
                  <div class="row d-flex">
                    <div class="col-md-6">
                      <div class="qty-field">
                        <div class="qty-number d-flex">
                          <div class="quntity-button incriment-button">+</div>
                          <input class="spin-number-output bg-light no-margin" type="text" readonly="true" value="0">
                          <div class="quntity-button decriment-button">-</div>
                        </div>
                        <div class="regular-price"></div>
                        <div class="quantity-output text-center bg-primary"></div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="total-price">
                        <span class="money text-primary">$1500.00</span>
                      </div>
                    </div>   
                  </div>             
                </div>
                <div class="col-lg-1 col-md-2">
                  <div class="cart-remove">
                    <a href="#">
                      <svg class="close" width="38px">
                        <use xlink:href="#close"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
</template>