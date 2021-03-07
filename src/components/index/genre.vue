<template>
    <div id="genre">
        <vue-headful v-if="!waiting" title="Genre" />
        <div class="loading" v-if="waiting">
            <h1>Loading</h1>
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-if="notfound && !waiting">
            <b-jumbotron bg-variant="danger" text-variant="light" header="Error Occurred">
                <p>It's seem server not returned data.Please try again</p>
            </b-jumbotron>
        </div>
        <transition name="fade">
            <div v-if="animok">
                <b-jumbotron class="card" header="Genre" lead="Show Anime By Genre">
                    <b-button v-b-toggle.collapse-genre variant="primary">Show Genre List</b-button>
                </b-jumbotron>
                <b-collapse id="collapse-genre" class="mt-2" v-model="listgenre">
                    <b-container fluid>
                        <b-row cols="2" cols-sm="2" cols-lg="5">
                            <b-col id="items-genre" v-for="(genre,index) in genres" :key="index"
                                @click.prevent="itemClick(index)">
                                <b-button variant="primary">
                                    {{genre.name_genre}} <b-badge variant="light">{{genre.sum_genre}}</b-badge>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-collapse>
                <div v-if="genre_waiting && animok">
                    <h1>Loading</h1>
                    <b-spinner label="Fetching..."></b-spinner>
                </div>
                <transition name="fade">
                    <b-card img-fluid v-if="genreok">
                        <h3>{{genname}}</h3>
                        <hr>
                        <b-card-text>
                            <b-container fluid="true">
                                <b-row cols="2" cols-sm="2" cols-lg="5">
                                    <b-col v-for="(slide, index) in lists" :key="index"
                                        @click.prevent="itemPackage(index)">
                                        <b-row class="hvr-grow">
                                            <b-col>
                                                <b-img-lazy :src="slide.cover" blank-src="/pimg.png" fluid width="100%" height="100%">
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
                    <div v-if="genreerror">
                        <b-jumbotron bg-variant="danger" text-variant="light" header="Error Occurred">
                            <p>It's seem genre not found!</p>
                        </b-jumbotron>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    import httpmake from '@/library/network.js'
    export default {
        beforeRouteUpdate(to, from, next) {
            this.genname = to.params.genname
            this.genreok = false
            if (this.genname != undefined) {
                this.genre_waiting = true
                let urls = process.env.VUE_APP_APIURL + '/genre/list/' + this.genname
                this.fetchGenre(urls)
            }
            next()
        },
        data() {
            return {
                selected: 0,
                listgenre: false,
                waiting: true,
                genre_waiting: false,
                genreok: false,
                genreerror: false,
                notfound: true,
                animok: false,
                genname: this.$route.params.genname,
                urlmeta: process.env.VUE_APP_APIURL + '/genre/meta',
                genres: [],
                lists: [],
            }
        },
        mounted() {
            this.fetchData()
            if (this.genname != undefined) {
                let urls = process.env.VUE_APP_APIURL + '/genre/list/' + this.genname
                this.fetchGenre(urls)
            }
        },
        methods: {
            fetchData() {
                var dataMeta = httpmake.makeGETrequest(this.urlmeta)
                dataMeta.then((data) => {
                    if (!data.error) {
                        this.waiting = false
                        this.animok = true
                        this.notfound = false
                        this.genres = data.genre
                    }
                })
            },
            itemClick(index) {
                this.selected = index
                //let urls = process.env.VUE_APP_APIURL + '/genre/list/' + this.genres[index].name_genre
                //this.fetchGenre(urls)
                //console.log("PARAMS: "+this.$route.params.genname)
                this.genname = this.genres[index].name_genre
                if(this.genname != this.$route.params.genname){
                    this.genre_waiting = true
                    this.$router.push({
                    path: '/genre/' + this.genname
                })
                }
            },
            itemPackage(index) {
                this.$router.push({
                    path: '/anim/package/' + this.lists[index].package_anim
                })
            },
            fetchGenre(url) {
                var dataGenre = httpmake.makeGETrequest(url)
                dataGenre.then((data) => {
                    if (!data.error) {
                        this.genre_waiting = false
                        this.genreok = true
                        this.listgenre = false
                        this.lists = data.anim
                    } else {
                        this.genre_waiting = false
                        this.listgenre = false
                        this.genreerror = true
                    }
                })
            }
        }
    }
</script>
<style scoped>
    #items-genre {
        padding: 5px;
    }

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
        background-color: #3d3d3d;
        background-image: linear-gradient(270deg, #2653a8 0%, #2d63b6 50%, #4240d8 100%);
    }

    .card {
        margin: 20px;
        background-color: #1d1d1d;
    }
</style>