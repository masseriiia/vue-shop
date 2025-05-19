<script setup lang="ts"></script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="content">
        <ul class="footer-links">
          <li class="footer-link"><RouterLink to="/">Доставка и оплата</RouterLink></li>
          <li class="footer-link"><RouterLink to="/">Оферта</RouterLink></li>
          <li class="footer-link"><RouterLink to="/">О нас</RouterLink></li>
        </ul>
        <div class="social-icons">
          <RouterLink to="/" class="social-icon whatsapp"
            ><span class="visually-hidden"><img src="../assets/icons/whatsapp.svg" /></span
          ></RouterLink>
          <RouterLink to="/" class="social-icon telegram"
            ><span class="visually-hidden"><img src="../assets/icons/telegram.svg" /></span
          ></RouterLink>
          <RouterLink to="/" class="social-icon instagram"
            ><span class="visually-hidden"><img src="../assets/icons/instagram.svg" /></span
          ></RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding-top: 21px;
  padding-bottom: 23px;
  background: var(--ui-bluish);
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-link {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  a {
    transition: color 0.3s ease-in-out;
    color: var(--ui-gray);
  }
}

.footer-link a:hover {
  color: var(--ui-black);
}

.social-icons {
  display: flex;
  gap: 10px;
}

.visually-hidden {
  height: 32px;
  width: 32px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: var(--ui-gray);
}
</style>
