<script setup>

</script>

<template>
  <div class="sign__up">
    <form class="form-control" action="">
      <p class="title">Sign up</p>
        <h3 class="sign__up-username-title">Foydalanuvchi nomi</h3>
        <input class="sign__up-username-inp" type="text" name="" id="" />
      <div class="input-field">
        <input required="" class="input" type="email" />
        <label class="label" for="input">Elektron pochtani kiriting</label>
      </div>
      <div class="input-field">
        <input
          required=""
          type="password"
          class="input"
        />
        <label class="label" for="input">Parolni kiriting</label>
      </div>
      <div class="input-field">
        <input
          required=""
          type="password"
          class="input"
        />
        <label class="label" for="input">Parolni tasdiqlang</label>
      </div>
      <button class="submit-btn">Sign Up</button>
    </form>
  </div>
</template>

<style scoped>
.sign__up {
  width: 100% !important;
  height: 60dvh !important;
  margin: 0 auto;
  box-shadow: none !important;
}
.form-control {
  margin: 20px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  border-radius: 8px;
}
.title {
  font-size: 28px;
  font-weight: 800;
}
.input-field {
  position: relative;
  width: 100%;
}

.input {
  margin-top: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  height: 45px;
  border: 1.5px solid #ecedec;
  background: transparent;
  padding-left: 10px;
}
.input:focus {
  border: 1.5px solid #2d79f3;
}
.input-field .label {
  position: absolute;
  top: 25px;
  left: 15px;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}
.input-field .input:focus ~ .label,
.input-field .input:valid ~ .label {
  top: 5px;
  left: 5px;
  font-size: 12px;
  color: #2d79f3;
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}
.submit-btn {
  margin-top: 30px;
  height: 55px;
  background: #f2f2f2;
  border-radius: 11px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(180deg, #363636 0%, #1b1b1b 50%, #000000 100%);
  box-shadow: 0px 0px 0px 0px #ffffff, 0px 0px 0px 0px #000000;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.submit-btn:hover {
  box-shadow: 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #0000003a;
}

.form__password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign__up {
  width: 400px;
  height: 100px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.sign__up {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.sign__up-text {
  font-weight: 700;
  font-size: 18px;
}

.sign__up-link {
  font-size: 16px;
  color: #2d79f3;
}

.sign__up-link:hover {
  color: #16448d;
}

.sign__up-username-inp {
    padding-left: 10px;
    width: 100%;
    height: 45px;
    border: 1.5px solid #ecedec;
    border-radius: 8px;
}
.sign__up-username-title {
    font-weight: 400;
    font-size: 14px;
}
</style>
