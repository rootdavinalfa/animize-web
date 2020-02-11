<template>
    <div id="new">
        <vue-headful v-if="!waiting_package" :title="'New Released - Page '+package_page" />
        <b-jumbotron header="New Released" lead="New released / new added anime to Animize">
            <p>Below will be new added Anime by Animize admin.Check It Out!</p>
        </b-jumbotron>
        <b-card img-fluid>
            <h3>Found : {{packages.length}} Items</h3>
            <hr>
            <b-card-text>
                <b-container fluid="true">
                    <b-row cols="2" cols-sm="2" cols-lg="5">
                        <b-col v-for="(slide, index) in packages" :key="index" @click.prevent="clickPackage(index)">
                            <b-row class="hvr-grow">
                                <b-col>
                                    <b-img-lazy :src="slide.cover" fluid width="100%" height="100%">
                                    </b-img-lazy>
                                </b-col>
                                <b-col>
                                    <b-row>
                                        <b-col>
                                            <h5 style="display:block;text-overflow: ellipsis;">
                                                {{slide.name_anim}}
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
                <b-container fluid="true">
                    <b-row cols="2" align-h="center">
                        <b-col md="auto">
                            <b-button variant="primary" @click.prevent="prevPackage">Previous</b-button>
                        </b-col>
                        <b-col md="auto">
                            <b-button variant="success" @click.prevent="nextPackage">Next</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import httpmake from '@/library/network.js'
    export default {
        beforeRouteUpdate(to, from, next) {
            this.package_page = to.params.page
            this.clearPackage()
            this.fetchPackage()
            next()
        },
        data() {
            return {
                urlpackage: "",
                urlepisode: "",
                waiting_package: true,
                packageok: false,
                waiting_episode: true,
                episodeok: false,
                package_page: this.$route.params.page,
                episode_page: 1,
                packages: [],
                episodes: [],
            }
        },
        mounted() {
            if (this.package_page == undefined) {
                this.package_page = 1
            }
            this.fetchPackage()
        },
        methods: {
            fetchPackage() {
                this.urlpackage = process.env.VUE_APP_APIURL + '/anim/list/package/page/' + this.package_page
                var dataPackage = httpmake.makeGETrequest(this.urlpackage)
                dataPackage.then((data) => {
                    if (!data.error) {
                        this.waiting_package = false
                        this.packageok = true
                        this.packages = data.anim
                    }
                })
            },
            prevPackage() {
                this.clearPackage()
                this.package_page = parseInt(this.package_page)
                if (this.package_page != 1) {
                    this.package_page = this.package_page - 1
                    this.$router.push({
                        path: '/new/' + this.package_page
                    })
                } else {
                    this.package_page = 1
                    this.fetchPackage()
                }
            },
            nextPackage() {
                this.clearPackage()
                this.package_page = parseInt(this.package_page) + 1
                this.$router.push({
                    path: '/new/' + this.package_page
                })
            },
            clearPackage() {
                this.waiting_package = true
                this.packageok = false
                this.packages = []
            },
            clickPackage(index) {
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