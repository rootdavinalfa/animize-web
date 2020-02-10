<template>
    <div id="playlist">
        <div class="loading" v-if="waiting">
            <h1>Loading</h1>
            <b-spinner></b-spinner>
        </div>
        <transition name="fade">
            <b-card v-if="animok" title="Playlist" img-fluid>
                <hr>
                <div>
                    <b-container class="bv-playlist-row mb-3" fluid="true">
                        <b-row cols="2" cols-sm="2" cols-lg="5">
                            <b-col id="items-play" v-for="(data, index) in anims" :key="index">
                                <b-row>
                                    <b-col md="auto">
                                        <b-img-lazy :src="data.thumbnail" fluid width="100%" height="100%"></b-img-lazy>
                                    </b-col>
                                    <b-col>
                                        <b-row>
                                            <b-col>
                                                Episode {{data.episode_anim}}
                                            </b-col>
                                            <b-col>
                                                <b-button variant="outline-success" :to="'/anim/play/'+data.id_anim">Play</b-button>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </b-card>
        </transition>
    </div>
</template>
<script>
    import httpmake from '@/library/network.js'
    export default {
        props:{
            idPack : String
        },
        data() {
            return {
                waiting: true,
                animok: false,
                urlplaylist: process.env.VUE_APP_APIURL + '/anim/detail/playlist/' + this.idPack,
                anims: [],
            }
        },
        mounted() {
            var dataPlayList = httpmake.makeGETrequest(this.urlplaylist)
            dataPlayList.then((data) => {
                if (!data.error) {
                    this.waiting = false
                    this.animok = true
                    this.anims = data.anim
                }
            })
        }
    }
</script>
<style scoped>
    .card {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    #items-play{
        padding: 5px;
    }
</style>