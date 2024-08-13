<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    const router = useRouter();
    let recentlyOpened = ref<string[]>([]); // Reactive array

    // Carregar arquivos recentemente abertos do sessionStorage
    onMounted(() => {
        const storedFiles = sessionStorage.getItem('recentlyOpened');
        if (storedFiles) {
            recentlyOpened.value = JSON.parse(storedFiles);
        }
    });

    function resetEditor() {
        sessionStorage.removeItem('fileText');
        sessionStorage.removeItem('filePath');

        router.push('/editor');
    }

    async function openThisFile(path: string) {
        const fileText = await window.api.openFile(path);

        sessionStorage.setItem('fileText', fileText);
        sessionStorage.setItem('filePath', path);

        router.push('/editor');
    }

    async function openFileDialog() {
        const filePath = await window.api.openDialog();

        if (filePath && filePath[0]) {
            if (!recentlyOpened.value.includes(filePath[0])) {
                recentlyOpened.value.push(filePath[0]);

                // Salvar a lista de arquivos no sessionStorage
                sessionStorage.setItem(
                    'recentlyOpened',
                    JSON.stringify(recentlyOpened.value),
                );
            }

            const fileText = await window.api.openFile(filePath[0]);

            sessionStorage.setItem('fileText', fileText);
            sessionStorage.setItem('filePath', filePath[0]);

            router.push('/editor');
        } else {
            console.log('Nenhum arquivo selecionado');
        }
    }
</script>

<template>
    <div class="container">
        <nav>
            <ul>
                <li>
                    <strong><h2>LiteMark</h2></strong>
                </li>
            </ul>
            <ul>
                <section class="buttons" role="group">
                    <button class="outline" @click.prevent="resetEditor">
                        New
                    </button>
                    <button class="outline" @click.prevent="openFileDialog">
                        Open
                    </button>
                </section>
            </ul>
        </nav>
        <section class="recentFiles">
            <article>
                <header>Recent Files Opened</header>
                <ul>
                    <!-- Gets the file base name of each path -->
                    <li class="recentFileList" v-for="file in recentlyOpened">
                        <a
                            class="recentFile"
                            @click.prevent="openThisFile(file)"
                            >{{
                                (() => {
                                    const fileName =
                                        file.split('\\').pop() || '';
                                    const baseName = fileName.split('.')[0];
                                    return baseName;
                                })()
                            }}</a
                        >
                    </li>
                </ul>
            </article>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        display: grid;
        height: 100vh;
        grid-template-rows: 0fr 1fr;

        .recentFiles {

            article {
                display: grid;
                grid-template-rows: 0fr 1fr;
                
                header {
                    padding: 1rem;
                }
                
                ul {
                    height: 50vh;
                    padding: 1rem;
                    overflow-y: auto;
                    
                    &::-webkit-scrollbar {
                        width: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.2);
                    }

                    &::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(0, 0, 0, 0.3);
                    }

                    &::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    .recentFileList {
                        list-style: none;
                        display: grid;
                    }
        
                    .recentFile {
                        cursor: pointer;
                        padding: 0.2rem;
                        transition: background-color 0.3s !important;
                        text-decoration: none;
                    }
        
                    .recentFile:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }

            }

        }
    }
</style>
