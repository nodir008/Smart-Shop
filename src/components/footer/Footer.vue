<script setup>
import appleIcon from "@/assets/icons/AppleIcon.vue";
import googlePlayIcon from "@/assets/icons/GooglePlayIcon.vue";
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <ul class="footer__links">
          <h3 class="footer__link-title">{{ $t('footer__link-title-1') }}</h3>
          <li class="footer__link">{{ $t('footer__link-1') }}</li>
          <li class="footer__link">{{ $t('footer__link-2') }}</li>
        </ul>
        <ul class="footer__links">
          <h3 class="footer__link-title">{{ $t('footer__link-title-2') }}</h3>
          <li class="footer__link">{{ $t('footer__link-3') }}</li>
          <li class="footer__link">{{ $t('footer__link-4') }}</li>
        </ul>
        <ul class="footer__links">
          <h3 class="footer__link-title">{{ $t('footer__link-title-3') }}</h3>
          <li class="footer__link">{{ $t('footer__link-5') }}</li>
          <li class="footer__link">{{ $t('footer__link-6') }}</li>
        </ul>
        <div class="footer__apps">
          <h3 class="footer__link-title">{{ $t('footer__link-title-4') }}</h3>
          <div class="footer__app">
            <p class="footer__app-link"><appleIcon /> AppStore</p>
            <p class="footer__app-link"><googlePlayIcon /> Google Play</p>
          </div>
          <h3 class="footer__apps-title">{{ $t('footer__apps-title') }}</h3>
          <div class="footer__link-contact">
            <a href="#"><img src="@/assets/images/instagram.png" alt="" /></a>
            <a href="#"><img src="@/assets/images/telegram.png" alt="" /></a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="hspan"></span>
        <div class="footer__bottom-item">
          <ul class="footer__bottom-links">
            <li class="footer__bottom-link">{{ $t('footer__bottom-link-1') }}</li>
            <li class="footer__bottom-link">{{ $t('footer__bottom-link-2') }}</li>
          </ul>
          <p class="footer__bottom-text">
            {{ $t('footer__bottom-text') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
