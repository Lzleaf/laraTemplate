<template>
    <div>
        <tables-page
                :total="total"
                :tableColumns1="tableColumns1"
                :tableData1="tableData1"
                :loading="loading"
                @on-change-page="handleChangePage"
        ></tables-page>
    </div>
</template>
<script>
    import TablesPage from './components/tables/tables'
    import { mapActions } from 'vuex'

    export default {
        name: 'Hello',
        data() {
            return {
                total: 0,
                tableColumns1: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '内容',
                        key: 'body'
                    },
                    {
                        title: '创建时间',
                        key: 'created_at'
                    }
                ],
                tableData1: [],
                loading: true
            }
        },
        components: {
            TablesPage
        },
        methods: {
            ...mapActions([
                'handlePosts',
            ]),
            handleChangePage(page) {
                this._handlePosts(page)
            },
            _handlePosts(page) {
                this.handlePosts(page).then(res => {
                    this.tableData1 = res.data
                    this.total = res.total
                })
            }
        },
        created:function () {
            this._handlePosts(1)
        }
    }
</script>