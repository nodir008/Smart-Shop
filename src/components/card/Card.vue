<script setup>
import { ref, defineProps, watch } from "vue";
import StarIcon from "@/assets/icons/StarIcon.vue";
import Heart2Icon from "@/assets/icons/Heart2Icon.vue";
import Basket2Icon from "@/assets/icons/Basket2Icon.vue";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import { useFavouriteStore } from "@/stores/favouriteStore";
import { useBasketStore } from "@/stores/basketStore";

const basketStore = useBasketStore();
const favouriteStore = useFavouriteStore()

const props = defineProps({
    card: {
        type: Object,
        required: true,
    },
});

const isClicked = ref(false);

const calculateFormattedPrice = (price) => {
    return (price / 12).toFixed(0);
};

const calculateFormatted = () => {
    const discountedPrice = props.card.price - (props.card.price / 100) * props.card.discountPercentage;
    return discountedPrice.toFixed(0);
};

const handleHeartClick = () => {
    // isClicked.value = !isClicked.value;
    favouriteStore.activeStates[props.card.id] = !favouriteStore.activeStates[props.card.id]
    favouriteStore.getAddFavPro(props.card.id)
};

const toggleBasket = () => {
    const quantity = 1; // or any other default quantity
    basketStore.getAddDrawerPro(props.card.id, quantity);
    // basketStore.changeActive(true)
    console.log(props.card.id);
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
};
</script>

<template>
    <div class="card">
        <RouterLink @click="scrollToTop" :to="'/product/' + card.id"><img :src="card.thumbnail" alt="" /></RouterLink>
        <div class="card__theme">
            <h3 class="card__theme-title">{{ card.title }}</h3>
            <div class="card__theme-rating-div">
                <p class="card__theme-rating"><StarIcon />{{ card.rating }}</p>
                <span class="card__theme-sale">-{{ card.discountPercentage.toFixed(0) }}% Sale</span>
            </div>
            <p class="card__theme-nation">{{ calculateFormattedPrice(card.price) }} $/{{ $t('card__theme-nation') }}</p>
            <p class="card__theme-price">{{ $t('card__theme-price') }} {{ card.price }}$</p>
            
    
            <button class="card__icons-btnh" @click="handleHeartClick">
                <HeartIcon class="card__icons-btnh-1" v-if="!favouriteStore.activeStates[card.id]" />
                <Heart2Icon class="card__icons-btnh-2" v-else  />
            </button>
            <div class="card__icons">
                <p class="card__theme-newprice">{{ $t('card__theme-newprice') }} {{ calculateFormatted() }}$</p>
                <button class="card__icons-btnb" @click="toggleBasket" >
                    <Basket2Icon class="card__icons-btnb-basketicon" />
                </button>
            </div>
        </div>  
    </div>
</template>
