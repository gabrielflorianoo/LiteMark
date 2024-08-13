<script setup lang="ts">
    import { marked } from 'marked';
    import { computed, onMounted, ref, watch } from 'vue';

    // Reference for the user input
    let markdownRef = ref<string>('');
    let autoLoader = ref<boolean>(false);
    let fileText = computed(() => sessionStorage.getItem('fileText'));
    let openedFilePath = computed(() => sessionStorage.getItem('filePath'));

    // Updates markdownRef whenever open a new md file
    watch(fileText, (newVal) => {
        markdownRef.value = newVal || '';
        setResultMarkdown(); // Display the markdown for the user
    });

    // Sets the value of markdownRef when the page loads
    onMounted(() => {
        // If has fileText, sets is to it, otherwise sets to empty
        markdownRef.value = fileText.value || '';
        
        // Creates the reminder of the auto loader in the session storage
        const storageAutoLoader = sessionStorage.getItem('autoLoader');
        if (storageAutoLoader == 'yes') {
            autoLoader.value = true;
            setResultMarkdown(); // Format and display markdown if auto formater is enabled
        } else {
            autoLoader.value = false;
        }
    });

    // If clicked check box it will already change the result table
    watch(autoLoader, (value) => {
        // Save autoFormatter in the storage
        if (value) {
            sessionStorage.setItem('autoLoader', 'yes');
            setResultMarkdown();
        } else {
            sessionStorage.setItem('autoLoader', 'no');
        }
    });

    // Auto changes everytime the user changes the markdown textarea
    watch(markdownRef, () => {
        if (autoLoader.value) {
            setResultMarkdown(); // Format and display markdown if auto formater is enabled
        }
    });

    // Function for setting the markdown into the result tab
    async function setResultMarkdown() {
        let markdown = await marked.parse(markdownRef.value);

        let resultTable = document.getElementsByClassName('result')[0];
        resultTable.innerHTML = markdown;
    }

    // Function for saving a file
    async function saveFile() {
        await window.api.saveFile(markdownRef.value);
        if (openedFilePath) {
            await window.api.updateFile(markdownRef.value, openedFilePath);
        }
    }

    // Function for reseting the textarea
    function cancel() {
        markdownRef.value = '';

        let resultTable = document.getElementsByClassName('result')[0];
        resultTable.innerHTML = '';
    }
</script>

<template>
    <section class="body">
        <nav class="navbar">
            <ul class="navbarList">
                <router-link to="/">
                    <button class="outline contrast">Home</button>
                </router-link>
                <button class="outline" @click.prevent="saveFile">
                    Save File
                </button>
                <li>
                    <label>
                        <input
                            type="checkbox"
                            v-model="autoLoader"
                            class="outline contrast"
                        />
                        Toggle Auto Formater
                    </label>
                </li>
            </ul>
        </nav>
        <form action="" class="container">
            <section class="separator">
                <textarea
                    name="markdownEditor"
                    placeholder="Digite aqui seu markdown"
                    v-model="markdownRef"
                ></textarea>
                <section
                    class="result"
                    v-show="markdownRef !== ''"
                    disabled
                ></section>
                <textarea
                    v-if="markdownRef === ''"
                    placeholder="Aqui aparecerá seu markdown"
                    disabled
                ></textarea>
            </section>
            <section class="buttons">
                <button class="button" @click.prevent="setResultMarkdown">
                    Submit
                </button>
                <button class="button" @click.prevent="cancel">Cancel</button>
            </section>
        </form>
    </section>
</template>

<style lang="scss" scoped>
    .body {
        gap: 10px;
        margin: 0px;
        display: grid;
        height: 100vh;
        grid-template-columns: 1fr;
        grid-template-rows: 0.15fr 1fr;

        .navbar {
            margin: 0px;
            display: grid;
            grid-template-columns: 1fr;

            .navbarList {
                margin: 0px;
                display: flex;
                justify-content: space-around;
            }
        }

        .container {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 0fr;

            .separator {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;

                .result,
                textarea {
                    padding: 0.5rem;
                    border: 1px solid rgba(0, 0, 0, 0.4);
                    border-radius: 1%;
                    overflow: auto;
                    cursor: auto;
                    resize: none;
                }
            }

            .buttons {
                display: flex;
                justify-content: space-evenly;

                button {
                    height: fit-content;
                }
            }
        }
    }
</style>
