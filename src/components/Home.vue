<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function resetEditor() {
        sessionStorage.removeItem('fileText');
        sessionStorage.removeItem('filePath');

        router.push('/editor');
    }

    async function openFile() {
        const filePath = await window.api.openDialog();

        if (filePath && filePath[0]) {
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
                    <!-- Just for testing purposes -->
                    <li><a href="">Example.md</a></li>
                    <li><a href="">Example2.md</a></li>
                    <li><a href="">Example3.md</a></li>
                </ul>
            </article>
        </section>
    </div>
</template>

<style scoped></style>
