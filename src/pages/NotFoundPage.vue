<template>
  <div class="not__found">
    <div class="glitch-wrapper">
      <div class="glitch" data-glitch="404">404</div>
    </div>
    <p class="not__found-title">Sahifa topilmadi</p>
    <p class="not__found-text">
      <RouterLink to="/" class="not__found-link">Bosh sahifa</RouterLink>ga
      qaytish
    </p>
  </div>
</template>

<style>
.not__found {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.glitch-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.glitch {
  position: relative;
  font-size: 200px;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  letter-spacing: 5px;
  z-index: 1;
}

.glitch:before,
.glitch:after {
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.glitch:before {
  animation: glitch-color 0.3s cubic-bezier(0.25, 1.46, 0.45, 0.94) both
    infinite;
  color: #0010ff;
  z-index: -1;
}

.glitch:after {
  animation: glitch-color 0.3s cubic-bezier(0.25, 1.46, 0.45, 0.94) reverse both
    infinite;
  color: #ff0000;
  z-index: -2;
}

@keyframes glitch-color {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-3px, 3px);
  }

  40% {
    transform: translate(-3px, -3px);
  }

  60% {
    transform: translate(3px, 3px);
  }

  80% {
    transform: translate(3px, -3px);
  }

  to {
    transform: translate(0);
  }
}

.not__found-title {
    font-size: 40px;
}

.not__found-text {
    font-size: 36px;
    margin-top: 20px;
}

.not__found-link {
    color: #0010ff;
}
</style>
