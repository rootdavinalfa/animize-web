<template>
    <div id="player">
        <vue-headful v-if="!waiting" :title="anims.name_catalogue+' - Ep '+anims.episode_anim" description="Watch Anime" />
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
                <b-container fluid class="player-box">
                    <b-row cols="1">
                        <b-col>
                            <vuePlayer :src="anims.source" :poster="anims.thumbnail"></vuePlayer>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="auto">
                            <b-img-lazy :src="anims.cover" blank-src="/pimg.png" fluid height="200%"></b-img-lazy>
                        </b-col>
                        <b-col>
                            <b-jumbotron fluid header-level="4" :header="anims.name_catalogue"
                                :lead="'Episode: '+anims.episode_anim+' ,Rating: '+anims.rating">
                                <b-button variant="outline-success" :to="'/anim/package/'+anims.package_anim">See Package</b-button>
                                <hr>
                                <p>{{anims.synopsis}}</p>
                                <b-button variant="primary" :href="anims.source">Download Sub Indo 480p</b-button>
                            </b-jumbotron>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </transition>
    </div>
</template>
<script>
    import vuePlayer from '@algoz098/vue-player'
    import httpmake from '@/library/network.js'
    export default {

        data() {
            return {
                id: this.$route.params.idplay,
                waiting: true,
                notfound: true,
                animok: false,
                urlplay: process.env.VUE_APP_APIURL + '/anim/detail/play/' + this.$route.params.idplay,
                anims: [],
                playur: "",
            }
        },
        components: {
            vuePlayer,
        },

        mounted() {
            var dataPlay = httpmake.makeGETrequest(this.urlplay)
            dataPlay.then((data) => {
                this.waiting = false
                if (!data.error) {
                    this.anims = data.anim[0]
                    this.playur = this.anims.source
                    this.notfound = false
                    this.animok = true
                }
            })
        },
    }
</script>
<style scoped>
    .col {
        padding: 0px;
    }

    .spinner-border {
        margin: 30px;
        width: 20rem;
        height: 20rem;
    }

    #player {
        width: 100%;

        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    .player-box,
    vue-video-player {
        width: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    img {
        margin: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    @media only screen and (min-width: 600px) {
        img {
            width: 250px;

        }
    }

    @media only screen and (max-width: 600px) {
        img {
            width: 150px;
            margin: 20px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
    }
</style>