<template>
    <div id="packageview">
        <vue-headful title="Animize Play" description="Watch Anime" />
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
        <transition name="fade">
            <div v-if="animok">
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <div class="header-pack">
                                <div class="header-bg" v-bind:style="{'background-image': 'url(' + anims.cover + ')'}">
                                </div>
                                <div class="header-title">
                                    <b-img-lazy :src="anims.cover" fluid height="100%"></b-img-lazy>
                                    <div>
                                        <h1>{{anims.name_catalogue}}</h1>
                                        <h3>Episode: {{anims.total_ep_anim}}</h3>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h3>Rating: {{anims.rating}}</h3>
                        </b-col>
                        <b-col>
                            <h3>{{anims.genre.join(",")}}</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-card title="Synopsis" img-fluid>
                                <hr>
                                <b-card-text>
                                    {{anims.synopsis}}
                                </b-card-text>

                                <b-button :href="'https://myanimelist.net/anime/'+anims.mal_id" variant="primary">Go to
                                    MyAnimeList</b-button>
                            </b-card>
                        </b-col>

                    </b-row>
                    <b-row>
                        <b-col>
                            <playlist></playlist>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </transition>
    </div>
</template>

<script>
    import httpmake from '@/library/network.js'
    import playlist from '@/components/frame/anim/playlist.vue'
    export default {
        components: {
            playlist,
        },
        data() {
            return {
                id: this.$route.params.idpack,
                waiting: true,
                notfound: true,
                animok: false,
                urlpackview: process.env.VUE_APP_APIURL + '/package/info/' + this.$route.params.idpack,
                anims: [],
            }
        },
        mounted() {
            var dataPack = httpmake.makeGETrequest(this.urlpackview)
            dataPack.then((data) => {
                this.waiting = false
                if (!data.error) {
                    this.notfound = false
                    this.animok = true
                    this.anims = data.anim[0]
                }
            })
        }
    }
</script>
<style scoped>
    .spinner-border {
        margin: 30px;
        width: 20rem;
        height: 20rem;
    }

    img {
        margin: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    @media only screen and (min-width: 600px) {
        img {
            width: 120px;
        }
    }

    @media only screen and (max-width: 600px) {
        img {
            width: 60px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
    }

    .header-pack {
        margin: 20px;
    }

    .header-bg {
        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);
        width: 100%;
        height: 250px;
    }

    .header-title {
        /* Black w/opacity/see-through */
        color: white;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 80%;
        text-align: center;
    }

    .header-title div {
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4);
    }

    .card {
        margin: 20px;
    }
</style>