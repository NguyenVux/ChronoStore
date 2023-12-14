<script lang='ts' setup>
</script>

<template>
<div class="vh-100 vw-100 position-fixed top-0 left-0  spinner-container">
    <div class="spinner-border spinner text-light" role="status">
    </div>
</div>
</template>

<style>
.spinner-container
{
    background-color: rgba(82, 82, 82, 0.704);
    z-index: 99999999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
    width: 6rem;
    height: 6rem;
}
</style>