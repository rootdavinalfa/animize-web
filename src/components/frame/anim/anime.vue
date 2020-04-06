<template>
    <div id="animze">
        <div class="loading" v-if="waiting">
            <b-spinner></b-spinner>
        </div>
        <transition name="fade">
            <CarouselCard v-if="animok" :interval="7000" height="350px" arrow="always" v-model="sli"
                @change="currentPage">
                <CarouselCardItem v-for="(slide, index) in slides" :key="index">
                    <div class="animebg" v-bind:style="{'background-image': 'url(' + slide.cover + ')'}"></div>
                    <div class="animedata" @click.prevent="gotoPackage">
                        <b-container>
                            <b-row align-v="start">
                                <span
                                    style="display:block;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;">
                                    <h4>{{slide.genre.join(",")}}</h4>
                                </span>
                            </b-row>
                            <b-row align-v="center">
                                <b-col md="auto">
                                    <b-img-lazy :src="slide.cover" blank-src="/pimg.png" fluid width="100%" height="100%"></b-img-lazy>
                                </b-col>
                                <b-col cols="8">
                                    <h3
                                        style="display:block;text-overflow: ellipsis;text-align:center;overflow: hidden; white-space: nowrap;">
                                        {{slide.name_anim}}
                                    </h3>
                                </b-col>
                            </b-row>
                            <b-row align-v="end">
                                <b-col>
                                    Rating: {{slide.rating}}
                                </b-col>
                                <b-col>
                                    {{slide.now_ep_anim}} / {{slide.total_ep_anim}}
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                </CarouselCardItem>
            </CarouselCard>
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
                urlepisode: process.env.VUE_APP_APIURL + '/anim/list/package/page/1',
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
            currentPage(e) {
                this.sli = e
            },
            gotoPackage() {
                this.$router.push({
                    path: 'anim/package/' + this.slides[this.sli].package_anim
                })
            },
        }
    }
</script>
<style scoped>
    h4 {
        padding: 10px;
        color: white;
        background: rgb(0, 0, 0);
    }

    .animebg {
        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);
        width: 100%;
        height: 100%;
    }

    .animedata {
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4);
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

    .carousel-slide {
        box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        text-align: center;
    }
    .loading{
        text-align: center;
        height: 350px;
    }
</style>