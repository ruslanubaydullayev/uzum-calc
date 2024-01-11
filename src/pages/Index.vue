<template>
  <div class="container !pt-[100px]">
    <h1 class="text-center font-normal text-primary text-xl md:text-2xl mb-5">Uzum marketda mahsulot sotmoqchimisiz? Kalkulyator
      aynan siz uchun!</h1>
    <div class="container mx-auto !px-0">
      <div class="max-w-[700px] mx-auto flex flex-col gap-3">
        <!--     Narx   -->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Narx (so'm)</h4>
          <div class="max-w-[220px] w-full">
            <FormInput v-model="form.price" type="number" placeholder=""/>
          </div>
        </div>

        <!--     Chegirma-->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Chegirma (so'm)</h4>
          <div class="max-w-[220px] w-full">
            <FormInput v-model="form.discount" type="number" placeholder=""/>
          </div>
        </div>

        <!--     Sotish narxi -->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Sotish narxi (so'm)</h4>
          <div class="max-w-[220px] w-full">
            <h5>{{ moneyMask(form.sellingPrice) }} so'm</h5>
          </div>
        </div>

        <!--     Dona uchun komissiya -->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Dona uchun komissiya (so'm)</h4>
          <div class="max-w-[220px] w-full">
            <h5>{{ moneyMask(form.commissionPrice) }} so'm</h5>
          </div>
        </div>

        <!--        Komissiya-->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Komissiya</h4>
          <div class="max-w-[220px] w-full">
            <h5>{{ form.commission }}%</h5>
          </div>
        </div>

        <!--        Har bir dona uchun chiqarish-->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Har bir dona uchun chiqarish</h4>
          <div class="max-w-[220px] w-full">
            <h5>{{ moneyMask(form.profitPerItem) }} so'm</h5>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3 mt-3">
          <div class="w-[200px] h-[1px] bg-gray-300"></div>
              <h5 class="whitespace-nowrap text-primary">Umumiy daromadni hisoblash</h5>
          <div class="w-[200px] h-[1px] bg-gray-300"></div>
        </div>

        <!--       Tannarx-->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Siz tovarni qaysi narxda olasiz?</h4>
          <div class="max-w-[220px] w-full">
            <FormInput v-model="form.itemPrice" type="number" placeholder=""/>
          </div>
        </div>

        <!--        Umumiy foydani hisoblash-->
        <div class="flex items-center justify-between">
          <h4 class="text-sm md:text-base font-medium">Necha dona sotmoqchisiz?</h4>
          <div class="max-w-[220px] w-full">
            <FormInput v-model="form.totalItems" type="number"  placeholder=""/>
          </div>
        </div>

        <!--       Umumiy natija-->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h4 class="text-sm md:text-base font-medium">Umumiy natija:</h4>
          <div class="max-w-[220px] w-full">
            <h5>Siz <span class="font-bold text-primary">{{ moneyMask(form.total) }}</span> so'm foyda qilishingiz mumkin.</h5>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue"

import FormInput from "@/components/Form/Input.vue"

const form = ref({
  price: 0,
  discount: 0,
  sellingPrice: 0,
  commissionPrice: 0,
  commission: 0,
  profitPerItem: 0,
  totalItems: 0,
  itemPrice: 0,
  total: 0,
})


watch( () => form.value.price, (newVal) => {
  form.value.sellingPrice = newVal - form.value.discount
})


watch( () => form.value.discount, (newVal) => {
  form.value.sellingPrice = form.value.price - newVal
})

watch(() => form.value.sellingPrice, (newVal) => {
  if(newVal < 49000) {
    form.value.commission = 40
  }
  else if(newVal >= 49000 && newVal < 99000) {
    form.value.commission = 35
  }
  else if(newVal >= 99000 && newVal < 149000) {
    form.value.commission = 32
  }
  else if(newVal >= 149000 && newVal < 199000) {
    form.value.commission = 30
  }
  else if(newVal >= 199000 && newVal < 299000) {
    form.value.commission = 25
  }
  else if(newVal >= 299000 && newVal < 399000) {
    form.value.commission = 21
  }
  else if(newVal >= 399000 && newVal < 699000) {
    form.value.commission = 18
  }
  else if(newVal >= 699000 && newVal < 998000) {
    form.value.commission = 15
  }
  else if(newVal >= 998000 && newVal < 1999000) {
    form.value.commission = 10
  }
  else if(newVal >= 1999000 && newVal < 2999000) {
    form.value.commission = 8
  }
  else if(newVal >= 2999000 && newVal < 4999000) {
    form.value.commission = 6
  }
  else if(newVal >= 4999000) {
    form.value.commission = 5
  }


  form.value.commissionPrice = form.value.sellingPrice * form.value.commission / 100
  form.value.profitPerItem = form.value.sellingPrice - form.value.commissionPrice
  form.value.total = (form.value.profitPerItem - form.value.itemPrice) * form.value.totalItems

})

watch(() => form.value.itemPrice, (newVal) => {
  form.value.total = (form.value.profitPerItem - newVal) * form.value.totalItems
})

watch(() => form.value.totalItems, (newVal) => {
  form.value.total = (form.value.profitPerItem - form.value.itemPrice) * newVal
})


const moneyMask = (x: any) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "0"
}
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

}
</style>