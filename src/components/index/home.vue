<template>
    <div id="home-index">
        <vue-headful title="Animize - Teman Ngewibu anda" description="Home" />
        <banner></banner>
        <b-container fluid class="bv-example-row">
            <b-row>
                <b-col sm="6">
                    <h1>New Releases</h1>
                    <anframe></anframe>
                </b-col>
                <b-col sm="6">
                    <h1>New Uploaded</h1>
                    <epframe></epframe>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>
<script>
    import banner from '@/components/frame/banner.vue'
    import epframe from '@/components/frame/anim/episode.vue'
    import anframe from '@/components/frame/anim/anime.vue'
    export default {
        components: {
            banner,
            epframe,
            anframe,
        },
    }
</script>
<style scoped>
.b-container{
    width: 100%;
}
</style>