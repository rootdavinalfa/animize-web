<template>
    <div id="banner">
        <b-carousel id="carousel-banner" :interval="4000" controls fade indicators img-width="1024" img-height="350"
            background="#ffff" style="text-shadow: 1px 1px 2px #333;" v-model="sli">

            <b-carousel-slide v-for="(slide, index) in slides" :key="index">
                <h1>{{slide.banner_title}}</h1>
                <template v-slot:img>
                    <img width="1024" height="350" :src="slide.banner_image" alt="image slot"
                        @click.prevent="bannerClick">
                </template>
            </b-carousel-slide>


        </b-carousel>
    </div>
</template>
<script>
    import httpmake from '@/library/network.js'
    export default {
        name: 'banner',
        data() {
            return {
                sli: 0,
                bannerurl: process.env.VUE_APP_APIURL + "/banner/get",
                slides: []
            }
        },
        methods: {
            bannerClick() {
                var bannerurl = this.slides[this.sli].banner_url
                console.log("NO URL: " + bannerurl)
                console.log("URL: " + encodeURI(bannerurl))
                window.location = encodeURI("http://" + bannerurl)
            }
        },
        mounted() {
            var dataBanner = httpmake.makeGETrequest(this.bannerurl)
            dataBanner.then((data) => {
                this.slides = data.banner
            })
        }
    }
</script>
<style scoped>
    h1 {
        
        color: white;
        background: rgba(0, 0, 0, 0.795);
    }

    img {
        width: 100%;

        background-repeat: no-repeat;
        background-position: 50% 50%;

    }
</style>