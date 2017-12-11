<template>
    <div :style="styleObj">
        <Table :height="height" :columns="columns" :data="cityData"></Table>
              <img src="../../images/map.jpg">
    </div>
</template>

<script>
export default {
    name: 'mapDataTable',
    data () {
        return {
            columns: [
                {
                    title: '城市',
                    key: 'name'
                },
                {
                    title: '流量(k)',
                    key: 'value',
                    sortable: true
                }
            ]
        };
    },
    props: {
        cityData: Array,
        styleObj: Object,
        height: String
    }
};
</script>
