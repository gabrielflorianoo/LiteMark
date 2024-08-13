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

    async function openFile() {
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
            console.log(recentlyOpened.value);

            const fileData = await window.api.openFile(filePath[0]);

            const fileText = new TextDecoder().decode(fileData);

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
                    <button class="outline" @click.prevent="openFile">
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
                    <li v-for="file in recentlyOpened">
                        <a>{{
                            (() => {
                                const fileName = file.split('\\').pop() || '';
                                const baseName = fileName.split('.')[0];
                                return baseName;
                            })()
                        }}</a>
                    </li>
                </ul>
            </article>
        </section>
    </div>
</template>

<style scoped></style>
