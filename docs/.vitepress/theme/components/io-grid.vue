<template>
    <div class="io_grid">
        <header>
            <h1>{{ data.header }}</h1>
        </header>
        <div class="io_grid_list" v-for="item in data.list" :key="item.title">
            <h2>{{ item.title }}</h2>
            <div class="io_grid_list_groups" :style="{ columns: item.columns }">
                <div class="io_grid_list_group" v-for="v in item.project" :key="v.title">
                    <h3>{{ v.title }}</h3>
                    <ul>
                        <li v-for="j in v.projectColumn">
                            <a :href="j.href">{{ j.title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
</script>

<style lang="scss" scoped>
.io_grid {
    padding: 40px 0;
    &_list {
        &_group {
            break-inside: avoid;
            overflow: auto;
            margin-bottom: 20px;
            background-color: var(--vp-c-bg-soft);
            border-radius: 8px;
            padding: 28px 32px;
            transition: background-color 0.5s;
        }
    }
}
</style>
