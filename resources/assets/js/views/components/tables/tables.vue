<template>
    <div>
        <Card>
            <Table :loading="loading" :data="tableData1" :columns="tableColumns1" stripe></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'TablesPage',
        props: {
            tableData1: '',
            tableColumns1: '',
            total: '',
            loading: ''
        },
        methods: {
            changePage (page) {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.$emit('on-change-page', page)
            }
        }
    }
</script>