<script setup lang="ts"></script>

<template>
    <form action="" class="container is-fluid">
        <textarea
            name="markdownEditor"
            class="textarea has-fixed-size"
            placeholder="Digite aqui seu markdown"
        ></textarea>
        <section class="buttons is-grouped">
            <button class="button is-link">Submit</button>
            <button class="button">Cancel</button>
        </section>
    </form>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;

        & textarea {
            height: 80vh;
        }

        & .buttons {
            width: 100%;
            display: flex;
            margin-top: 10px;
            justify-content: space-evenly;

            & button {
                width: fit-content;
            }
        }
    }
</style>
