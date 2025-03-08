<template>
  <div class="loading-area">
    <div class="loading-box">
      <div class="loading" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading-area {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: gainsboro;
  opacity: 0.6;
}

.loading-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 125px;
  height: 145px;
  border-radius: 16px;
  background: #101010;
  opacity: 0.8;
}

.loading {
  width: 50px;
  height: 50px;
  border: 4px solid #000;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #fff;
  border-radius: 50%;
  animation: loading 1s infinite linear;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

p {
  margin-top: 8px;
  color: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  font-family: Lato-Regular, Lato;
  line-height: 20px;

  user-select: none;
}
</style>
