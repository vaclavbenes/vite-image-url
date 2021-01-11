<template>
<div class="container">

  <div class="flex">
  <div class="w-3/4 border m-2  rounded p-10 bg-gray-50">

    <div class="border rounded p-2 my-2 bg-gray-600">
      <input type="text" class="px-2 py-2 bg-gray-200 w-full focus:outline-none" v-model="originalUrl">
    </div>

    <button class="border rounded bg-indigo-600 px-2 py-2 text-gray-50 shadow-sm" @click="originalUrl=''">clean</button>

    <div class="border rounded p-2 my-2 bg-gray-600">
      <p class="text-gray-50 p-2" ref="copy">{{url}}</p>
   </div>


    <button class="border rounded bg-indigo-600 px-2 py-2 text-gray-50 shadow-sm" @click="copyUrl">Copy</button>
     <transition name="fade">
      <p v-if="show">copied</p>
     </transition>
  </div>

  <div class="w-1/4">
  <div class="h-16 border m-2 rounded p-2 bg-gray-50">

  <h3>Facepad</h3>
    <input class="bg-white text-gray-500" type="text" v-model="atributes.facepad">
  </div>

    <div class="h-16 border m-2 rounded p-2 bg-gray-50">
      <h3>Fit</h3>
      <input class="bg-white text-gray-500 " type="text" v-model="atributes.fit">
    </div>

    <div class="h-16 border m-2 rounded p-2 bg-gray-50">
      <h3>Width</h3>
      <input class="bg-white text-gray-500 " type="text" v-model="atributes.w">
    </div>

    <div class="h-16 border m-2 rounded p-2 bg-gray-50">
      <h3>Height</h3>
      <input class="bg-white text-gray-500 " type="text" v-model="atributes.h">
    </div>

  </div>


  </div>


  <div class="flex">
    <div class="border w-1/2 h-auto m-2 rounded p-2 bg-gray-50">
      <h2>Original</h2>
      <img :src="originalUrl" alt="">
    </div>
       <div class="border w-1/2 h-auto m-2 rounded p-2 bg-gray-50">
      <h2>New</h2>
      <img :src="url" alt="">
    </div>
  </div>


</div>

</template>
su
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch, watchEffect } from 'vue'
import { ParseSearchParams } from './Parse';

interface Atributes {
  facepad:string
  fit: string,
  w:string,
  h: string,
}

export default defineComponent({
  name: 'App',
  setup(){

    let originalUrl = ref<string>("https://images.unsplash.com/photo-1565893065072-b635a3166dfb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80")
    let url = ref<string>("")
    const copy = ref(null)
    let show = ref(false)


    const atributes  = reactive<Atributes>({
      facepad: "2",
      fit: "facearea",
      w: "144",
      h: "144"
    })

    watchEffect(()=>{
      new ParseSearchParams(atributes, originalUrl, url)
    })

    const copyUrl = ()=>{
      window.getSelection()?.selectAllChildren(copy.value as any)
      const success = document.execCommand("copy")
      success || console.error("cant run document.execCommand(\"copy\")")
      show.value = true

      setTimeout(() => {
        show.value = false
      }, 400);

      window.getSelection()?.removeAllRanges()
    }


    return  {atributes, originalUrl, url, copy, copyUrl, show}
  }
})
</script>

<style>

</style>