<template>
  <header>
    <div class="nav navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid d-flex justify-content-between">
        <div class="navnar-brand">
          <router-link to="/" class="navbar-brand">
            <img :src="require('/public/logo.svg')" alt="bcs">
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/portfolio" class="nav-link">Портфель</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>