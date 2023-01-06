<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-16 23:52:04
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-27 10:25:51
 * @FilePath     : /micro-vue/src/views/dashboard/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container class="dashboard-container">
    <div class="dashboard-container-background">
      <div class="dashboard-container-background-title">{{title}}</div>
      <div class="dashboard-container-background-content">{{content}}</div>
      <!-- {{ $t("message.hello") }} -->
    </div>
  </mc-container>
</template>

<script lang="ts" setup>
const title = '茅屋为秋风所破歌'
const content = '八月秋高风怒号，卷我屋上三重茅。茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。南村群童欺我老无力，忍能对面为盗贼。公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。俄顷风定云墨色，秋天漠漠向昏黑。布衾多年冷似铁，娇儿恶卧踏里裂。床头屋漏无干处，雨脚如麻未断绝。自经丧乱少睡眠，长夜沾湿何由彻！安得广厦千万间，大庇天下寒士俱欢颜！风雨不动安如山。呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！'
</script>

<style lang="scss">
.dashboard-container {
  &-background {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0);
    font-weight: 900;
    background: url("https://farm5.staticflickr.com/4273/34378170890_3901a0ac25_k.jpg?momo_cache_bg_uuid=99cbab77-d2d1-4c69-be97-8ba21a5eb59a")
      no-repeat center/cover;
    background-clip: text;
    -webkit-background-clip: text;
    padding: 3rem 10rem;
    box-sizing: border-box;

    &-title{
      font-size: 6rem;
      text-align: center;
      margin-bottom: 3rem;
      letter-spacing:1rem;

    }

    &-content{
      font-size: 2rem;
      line-height: 3.6rem;
      text-indent: 2em;
    }
  }
}
</style>