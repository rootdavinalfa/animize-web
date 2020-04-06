<template>
    <div id="episode">
        <div class="loading" v-if="waiting">
            <b-spinner></b-spinner>
        </div>
        <transition name="fade">
            <b-carousel v-if="animok" id="carousel-episode" :interval="4000" controls background="#ffff"
                style="text-shadow: 1px 1px 2px #333;" v-model="sli" img-width="1024" img-height="300">

                <b-carousel-slide v-for="(slide, index) in slides" :key="index">
                    <div id="episodeinfo" style="text-overflow: ellipsis;">

                        <h3
                            style="display:block;text-overflow: ellipsis;width:100%;overflow: hidden; white-space: nowrap;">
                            {{slide.name_anim}}
                        </h3>
                        <h4>Episode: {{slide.episode_anim}}</h4>

                    </div>
                    <template v-slot:img>
                        <div @click.prevent="gotoPlay">
                            <b-img-lazy class="img-fluid w-100" fluid thumbnail width="1024" height="300"
                                :src="slide.thumbnail" blank-src="/pimg.png" alt="image slot" />
                        </div>
                    </template>
                </b-carousel-slide>
            </b-carousel>
        </transition>
    </div>
</template>
<script>
    import httpmake from '@/library/network.js'
    export default {
        data() {
            return {
                sli: 0,
                slides: [],
                waiting: true,
                animok: false,
                urlepisode: process.env.VUE_APP_APIURL + '/anim/list/page/1'
            }
        },
        mounted() {
            var dataEpisode = httpmake.makeGETrequest(this.urlepisode)
            dataEpisode.then((data) => {
                if (!data.error) {
                    this.waiting = false
                    this.animok = true
                    this.slides = data.anim
                }
            })
        },
        methods: {
            gotoPlay() {
                console.log("CLICKED EPISODE!")
                this.$router.push({
                    path: 'anim/play/' + this.slides[this.sli].id_anim
                })
            }
        }
    }
</script>
<style scoped>
    .carousel-slide {
        box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        text-align: center;
    }

    #episodeinfo {
        color: white;
        background: rgba(0, 0, 0, 0.795);
    }

    img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;

    }

    .loading {
        text-align: center;
        height: 350px;
    }
</style>