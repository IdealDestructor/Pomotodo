<template>
  <div id="app">
    <h1 class="cute-title">
      <span style="--i: 1">P</span>
      <span style="--i: 2">o</span>
      <span style="--i: 3">m</span>
      <span style="--i: 4">o</span>
      <span style="--i: 5">t</span>
      <span style="--i: 6">o</span>
      <span style="--i: 7">d</span>
      <span style="--i: 8">o</span>
    </h1>
    <nav>
      <router-link style="text-decoration: none" to="/">📝 待办项</router-link>
      |
      <router-link style="text-decoration: none" to="/tomato"
        >🍅 番茄钟</router-link
      >
    </nav>
    <router-view />
  </div>
</template>
>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.cute-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 50px 0 0 0;
  font-family: system-ui, -apple-system, fantasy, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif,
    "Comic Sans MS", cursive, sans-serif;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); */
  letter-spacing: 2px;
}
.cute-title span:nth-child(1) {
  color: #ff6b6b;
} /* 红色 */
.cute-title span:nth-child(2) {
  color: #ff9e4f;
} /* 橙色 */
.cute-title span:nth-child(3) {
  color: #ffd93d;
} /* 黄色 */
.cute-title span:nth-child(4) {
  color: #6bcb77;
} /* 绿色 */
.cute-title span:nth-child(5) {
  color: #4d96ff;
} /* 蓝色 */
.cute-title span:nth-child(6) {
  color: #9b72aa;
} /* 紫色 */
.cute-title span:nth-child(7) {
  color: #ff6b6b;
} /* 红色 */
.cute-title span:nth-child(8) {
  color: #ff9e4f;
} /* 橙色 */
.cute-title span {
  display: inline-block;
  animation: bounce 2s infinite alternate;
  animation-delay: calc(0.1s * var(--i));
  transform-origin: bottom;
}
@keyframes bounce {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-10px) scale(1.1);
  }
}
</style>
