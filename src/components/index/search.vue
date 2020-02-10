<template>
    <div id="search">
        <vue-headful v-if="!waiting" :title="'Search: '+querys" />
        <div class="loading" v-if="waiting">
            <h1>Loading</h1>
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-if="notfound && !waiting">
            <b-jumbotron bg-variant="danger" text-variant="light" header="Not Found"
                :lead="'ID:'+ id +' Seem not in the place'">
                <p>Don't fooling me!,if you see this page please give up.We wont fix this</p>
            </b-jumbotron>
        </div>
        <div v-if="animok">
            <b-jumbotron header="Search" :lead="'Query: '+querys">
            </b-jumbotron>
            <b-card img-fluid>
                <h3>Found : {{packages.length}} Items</h3>
                <hr>
                <b-card-text>
                    <b-container fluid="true">
                        <b-row cols="2" cols-sm="2" cols-lg="5">
                            <b-col v-for="(slide, index) in packages" :key="index" @click.prevent="itemClick(index)">
                                <b-row class="hvr-grow">
                                    <b-col>
                                        <b-img-lazy :src="slide.cover" fluid width="100%" height="100%">
                                        </b-img-lazy>
                                    </b-col>
                                    <b-col>
                                        <b-row>
                                            <b-col>
                                                <h5 style="display:block;text-overflow: ellipsis;">
                                                    {{slide.name_catalogue}}
                                                </h5>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                Rating {{slide.rating}}
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                Episode {{slide.now_ep_anim}} / {{slide.total_ep_anim}}
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>
<script>
    import httpmake from '@/library/network.js'
    export default {
        data() {
            return {
                querys: this.$route.params.query,
                waiting: true,
                notfound: true,
                animok: false,
                urlsearch: process.env.VUE_APP_APIURL + '/anim/search/package/' + this.$route.params.query,
                packages: [],
            }
        },
        mounted() {
            var dataSearch = httpmake.makeGETrequest(this.urlsearch)
            dataSearch.then((data) => {
                this.waiting = false
                if (!data.error) {
                    this.notfound = false
                    this.animok = true
                    this.packages = data.package
                }
            })
        },
        methods: {
            itemClick(index) {
                this.$router.push({
                    path: '/anim/package/' + this.packages[index].package_anim
                })
            }
        }

    }
</script>
<style scoped>
    .hvr-grow {
        margin: 10px;
        padding: 5px;
        z-index: 0;
        display: inline-block;
        vertical-align: middle;
        transform: translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        backface-visibility: hidden;
        -moz-osx-font-smoothing: grayscale;
        transition-duration: 0.3s;
        transition-property: transform;
    }

    .hvr-grow:hover,
    .hvr-grow:focus,
    .hvr-grow:active {
        z-index: 10;
        transform: scale(1.1);
        color: white;
        background-color: #FF3CAC;
        background-image: linear-gradient(270deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    }

    .card {
        margin: 20px;
    }
</style>