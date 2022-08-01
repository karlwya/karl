<template>
  <div>
    <baidu-map class="map" center="北京" ak="E1Lz32CrnBmdWydg4e2IGeqsi2kFnKXf">
    </baidu-map>
  </div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  data() {
    return {
      polyline: {
        editing: false,
        paths: [],
      },
    };
  },
  components: {
    BaiduMap,
  },
};
</script>
<style lang="less" scoped>
.map {
  width: 575px;
  height: 440px;
}
</style>
