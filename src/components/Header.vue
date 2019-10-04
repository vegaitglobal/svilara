<template>
  <div>
    <header class="header">
        <h1 class="headline">Kalendar događaja</h1>
        <div>
            <div class="social-icons-wrapper">
                <span></span>
            </div>
            <div class="search-wrapper">
                
            </div>
            <button class="btn btn-purple" type="button">+ Dodaj događaj</button>
        </div>
    </header>
  </div>
</template>

<script>
export default {
    name: "Header",
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.header {
    width: 100%;
    background-color: transparent;
    padding: 10px 0 10px 37px;
    display: flex;
    justify-content: space-between;

    h1 {
        font-size: 25px;
        font-weight: bold;
    }
}

</style>
