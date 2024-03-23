<script setup>
import { ref } from "vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";

const accordion = [
  {
    title: "Qanday tovarlarni kreditga sotib olish mumkin?",
    content: "Muddatli toʻlov limiti doirasida istalgan tovarni xarid qilishingiz mumkin. Tovarlarni 3, 6 yoki 12 oyga muddatli to’lovga sotib olishingiz mumkin. Xaridlar va tovarlar soni faqatgina sizning limitingiz bilan cheklangan. Muddatli to’lov uchun minimal buyurtma miqdori 35 000 so’m"
  },
  {
    title: "Muddatli toʻlovni kim rasmiylashtirishi mumkin?",
    content: " 20-65 yoshda bo'lgan O'zbekiston fuqarosi. Muddatli to'lovni tasdiqlash imkoniyatini oshirish uchun sizda boshqa kreditlar va muddatli to'lovlar bo'yicha muddati o'tgan majburiyatlar bo'lmasligingi kerak "
  },
  {
    title: "Muddatli to'lovni rasmiylashtirish uchun nimalar kerak?",
    content: " 3 oylik muddatli to'lov: ",
    list: ["pasport yoki ID karta", "kamerali mobil telefon"],
    content2: " 6 va 12 oylik muddatli to'lov:  ",
    list2: ["pasport yoki ID karta", "kamerali mobil telefon", "ish haqi bank kartasi", "yaqinlaringiz bilan aloqa usuli"],
  },
  {
    title: "Muddatli toʻlov limiti qanday aniqlanadi?",
    content: "Limit moliyaviy ko'rsatkichlar, shuningdek sizning kredit tarixingiz bo'yicha hisoblanadi"
  },
  {
    title: "Mening maʼlumotlarimdan biror tarzda foydalanasizmi?",
    content: "Yoʻq, barcha maʼlumotlar shifrlangan shaklda uzatiladi va biz ularni uchinchi shaxslarga bermaymiz"
  },
  {
    title: "Koʻrsatilgan xizmat uchun toʻlov talab qilinadimi?",
    content: "Yoʻq, biz xizmat uchun haq olmaymiz"
  },
  {
    title: "Toʻlovlar qanday amalga oshiriladi?",
    content: "To'lovlar muddatli to'lovni rasmiylashtirishda ko'rsatilgan kartadan avtomatik ravishda yechib olinadi. Shuningdek, Uzum Nasiya ilovasida yoki Uzum Bank, Payme, ClickUp orqali to'lovlarni amalga oshirishingiz mumkin"
  },
];


const accordionStatus = ref(Array(accordion.length).fill(false));

const toggleAccordion = (index) => {
  accordionStatus.value[index] = !accordionStatus.value[index];
};

const accordionItem1 = ref(false);
const accordionItem2 = ref(false);
const accordionItem3 = ref(false);
const accordionItem4 = ref(false);
const accordionItem5 = ref(false);
</script>


<template>
  <div class="installment">
    <div class="term">
      <div class="container">
        <div class="term__theme">
          <h1 class="term__theme-title">
            {{ $t("term__theme-title") }}
          </h1>
          <p class="term__theme-text">
            {{ $t("term__theme-text") }}
          </p>
          <button class="term__theme-btn">{{ $t("term__theme-btn") }}</button>
        </div>
        <img class="term-img" src="@/assets/images/hero_uzum.png" alt="" />
      </div>
    </div>
    <div class="container">
      <h1 class="installment-title"> {{ $t("installment-title") }}</h1>
      <div class="installment__cards">
        <div class="installment__card">
          <h3 class="installment__card-title"> {{ $t("installment-title-1") }}</h3>
          <p class="installment__card-subtitle">
            {{ $t("installment__card-subtitle-1") }}
          </p>
          <ul class="installment__card-ul">
            <li class="installment__card-li">
              {{ $t("installment__card-li-1") }}
            </li>
            <li class="installment__card-li">{{ $t("installment__card-li-2") }}</li>
          </ul>
          <div class="installment__card-card">
            <p class="installment__card-card-text">
              {{ $t("installment__card-card-text-1") }}
            </p>
            <img class="installment__card-card-img" src="@/assets/images/story-one.png" alt="" />
          </div>
          <p class="installment__card-text">
            {{ $t("installment__card-text-1") }}
            <span>285 000{{ $t("installment__card-text-2") }}</span>
          </p>
          <div class="installment-bar">
            <div class="installment-bar-line active"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
          </div>
          <div class="installment__items">
            <p class="installment__items-text"> {{ $t("installment__items-text-1") }}<span>0
                {{ $t("installment__card-text-2") }}</span></p>
            <p class="installment__items-text">
              {{ $t("installment__items-text-2") }} <span>95 000{{ $t("installment__items-text-3") }} </span>
            </p>
          </div>
        </div>
        <div class="installment__card">
          <h3 class="installment__card-title">{{ $t("installment__card-title") }}</h3>
          <p class="installment__card-subtitle">
            {{ $t("installment__card-subtitle") }}

          </p>
          <ul class="installment__card-ul">
            <li class="installment__card-li">
              {{ $t("installment__card-li-3") }}
            </li>
            <li class="installment__card-li">{{ $t("installment__card-li-2") }}</li>
          </ul>
          <div class="installment__card-card">
            <p class="installment__card-card-text">
              {{ $t("installment__card-card-text-2") }}

            </p>
            <img class="installment__card-card-img" src="@/assets/images/story-two.png" alt="" />
          </div>
          <p class="installment__card-text">
            {{ $t("installment__card-text-3") }}<span> 10 990 080{{ $t("installment__card-text-2") }} </span>
          </p>
          <div class="installment-bar">
            <div class="installment-bar-line active"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
            <div class="installment-bar-line"></div>
          </div>
          <div class="installment__items">
            <p class="installment__items-text">{{ $t("installment__items-text-1") }} <span>0
                {{ $t("installment__card-text-2") }}</span></p>
            <p class="installment__items-text">
              {{ $t("installment__items-text-4") }}
              <span> {{ $t("installment__items-text-5") }}</span>
            </p>
          </div>
        </div>
      </div>
      <h1 class="installment-title">{{ $t("installment-title-2") }}</h1>
      <div class="benefit-content">
        <div class="benefit-item">
          <img src="@/assets/images/done.svg" alt="" />
          <h2 class="benefit-item-title">
            {{ $t("benefit-item-title-1") }}

          </h2>
          <p class="benefit-item-text">
            {{ $t("benefit-item-text-1") }}

          </p>
        </div>
        <div class="benefit-item">
          <img src="@/assets/images/zero.svg" alt="" />
          <h2 class="benefit-item-title">{{ $t("benefit-item-title-2") }}</h2>
          <p class="benefit-item-text">
            {{ $t("benefit-item-text-2") }}
          </p>
        </div>
        <div class="benefit-item">
          <img src="@/assets/images/heart.svg" alt="" />
          <h2 class="benefit-item-title">
            {{ $t("benefit-item-title-3") }}
          </h2>
          <p class="benefit-item-text">
            {{ $t("benefit-item-text-3") }}
          </p>
        </div>
      </div>
      <h1 class="installment-title">{{ $t("installment-title-3") }}</h1>
      <div class="couplesteps">
        <div class="couplesteps__left">
          <div class="step__item">
            <h4 class="step__item-title">1-{{ $t("step__item-title") }}</h4>
            <p class="step__item-text">{{ $t("step__item-text-1") }}
              
            </p>
          </div>
          <div class="step__item">
            <h4 class="step__item-title">2-{{ $t("step__item-title") }}</h4>
            <p class="step__item-text">
              {{ $t("step__item-text-2") }}
            </p>
          </div>
          <div class="step__item">
            <h4 class="step__item-title">3-{{ $t("step__item-title") }}</h4>
            <p class="step__item-text">
              {{ $t("step__item-text-3") }}
            </p>
          </div>
          <button class="couplesteps__left-btn">{{ $t("term__theme-btn") }}</button>
        </div>
        <img class="couplesteps-img" alt="" src="@/assets/images/phone-uz.png" />
      </div>
      <!-- :src="$t('img')" -->
      <h1 class="installment-title">{{ $t("installment-title-4") }}</h1>
      <div class="accordion">
        <div v-for="(item, index) in accordion" :key="index" class="accordion__item"
          :class="{ active: accordionStatus[index] }">
          <div class="accordion__item-top" @click="toggleAccordion(index)">
            <p class="accordion__item-title">{{ item.title }}</p>
            <ArrowIcon class="accordion__item-icon" :class="{ active: accordionStatus[index] }" />
          </div>
          <div class="accordion__item-open-box">

            <p class="accordion__item-open-box-p">{{ item.content }}
            <ul class="accordion__item-open-box-ul">
              <li class="accordion__item-open-box-li" v-for="(list, i) in item.list" :key="i">{{ list }}</li>
            </ul>
            </p>
            <p class="accordion__item-open-box-p">{{ item.content2 }}
            <ul class="accordion__item-open-box-ul">
              <li class="accordion__item-open-box-li" v-for="(list, i) in item.list2" :key="i">{{ list }}</li>
            </ul>
            </p>
          </div>
        </div>
      </div>
      <h1 class="installment-title">{{ $t("installment-title-5") }}</h1>
      <div class="installment__links">
        <a class="installment__links-link" href="http://instagram.com/_kh1kmatof__" target="_blank"
          rel="noopener noreferrer"><img src="@/assets/images/instagram.png" alt=""> _kh1kmatof__</a>
        <p class="installment__links-link">+998 93 772 35 22 </p>
      </div>
    </div>
  </div>
</template>

