<script setup lang="ts">
    import { marked } from 'marked';
    import { ref, watch } from 'vue';

    // Reference for the user input
    let markdownRef = ref<string>('');

    // Log markownRef everytime it is updated *For tests only*
    watch(markdownRef, () => {
        console.log(markdownRef.value);
    });

    // Function for setting the markdown into the result tab
    async function setResultMarkdown() {
        let markdown = await marked.parse(markdownRef.value);

        let resultTable = document.getElementsByClassName('result')[0];
        resultTable.innerHTML = markdown;
    }

    // Function for reseting the textarea
    function cancel() {
        markdownRef.value = '';

        let resultTable = document.getElementsByClassName('result')[0];
        resultTable.innerHTML = '';
    }
</script>

<template>
    <form action="" class="container-fluid">
        <section class="separator">
            <textarea
                name="markdownEditor"
                class="textarea has-fixed-size"
                placeholder="Digite aqui seu markdown"
                v-model="markdownRef"
            ></textarea>
            <section
                class="result"
                disabled
            ></section>
        </section>
        <section class="buttons">
            <button class="button is-link" @click.prevent="setResultMarkdown">
                Submit
            </button>
            <button class="button" @click.prevent="cancel">Cancel</button>
        </section>
    </form>
</template>

<style lang="scss" scoped>
    .container-fluid {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;

        .separator {
            height: 80vh;
            display: flex;
            width: 100%;
            gap: 10px;

            textarea {
                overflow: auto;
                height: 80vh;
                width: 100%;
                resize: none;
            }

            .result {
                overflow: auto;
                height: 80vh;
                cursor: auto;
                width: 100%;
                border: 2px solid black;
                border-radius: 1%;
            }
        }

        .buttons {
            width: 100%;
            display: flex;
            margin-top: 10px;
            justify-content: space-evenly;

            button {
                width: fit-content;
            }
        }
    }
</style>
