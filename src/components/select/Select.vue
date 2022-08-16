<template>
    <a-select default-value="2020" style="width: 120px"  @change="handleChange">
        <a-select-option   v-for="item in yearList" :value="item.value" :key="item.value">
            {{ item.label }}
        </a-select-option>
    </a-select>
</template>

<script>
export default {
    name: "Select",
    data() {
        return {

            yearList: [
                {
                    value: '2015',
                    label: '2015'
                },
                {
                    value: '2016',
                    label: '2016'
                },
                {
                    value: '2017',
                    label: '2017'
                },
                {
                    value: '2018',
                    label: '2018'
                },
                {
                    value: '2019',
                    label: '2019'
                },
                {
                    value: '2020',
                    label: '2020'
                },
                {
                    value: '2021',
                    label: '2021'

                }],
        }
    }
    ,
    methods: {
        handleChange(value) {
            this.$emit("getData",value);
        },
    }
}
</script>

<style scoped>

</style>
