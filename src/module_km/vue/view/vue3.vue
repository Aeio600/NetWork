<template>
  <div>
    <!--
     一. 组件化开发
     组件化的核心思想:对组件进行拆分,拆分成一个个小组件,再将这些组件组合在一起,最终形成我们的应用程序

     1.父子组件通信
       (1)父传子:通过props属性 (即:在组件上注册一些自定义的属性,在父组件里给这些属性赋值,子组件通过属性的名称获取到对应的值)
            props常见的两种用法:(1)字符串数组,数组中的字符串指属性名称  例:props:['title','content']
                              (2)对象类型.在指定属性名称的同时,指定需要传递的类型,是否是必须的,默认值等等   例:props:{
                                                                                                            title:{
                                                                                                             type:String,  //type的类型可以是String,Number,Boolean,Array,Object,Date,Function,Symbol
                                                                                                             required:true,
                                                                                                             default:'123'   //一般来说,required和default属性写其中一个就可以了
                                                                                                            }
                                                                                                          }
       (2)子传父:通过$emit触发事件
         什么情况下子组件需要传递内容到父组件呢?
         <1> 当子组件有一些事件发生的时候,比如子组件发生点击,父组件需要切换内容 <2>子组件有一些内容想要传递给父组件
         如何完成上述操作呢?
         <1> 首先,在子组件中定义好在某些情况下触发的事件名称 <2> 其次,在父组件中以v-on的方式传入要监听的事件名称,并且绑定到对应的方法中 <3>

          vue3中多了一个步骤,要在子组件中注册要触发的事件.在export default中添加属性emits属性
            数组写法 emits:['add','sub','addN']
            对象写法(目的是为了进行参数的验证)  emits:{
                                                  // 没有参数的话,值取null
                                                  add:null,
                                                  sub:null,
                                                  // 假设有三个参数
                                                  addN:(num,age,name)=>{
                                                    if(num>10){
                                                      return true
                                                    }
                                                    return false
                                                  }

                                                 }

        (3)非父子
          <1>Provide/Inject(可以看成是一个long range props 长的依赖注入)
             注⚠️:适用于父组件提供数据,子孙组件使用.
                 兄弟组件之间不适用,兄弟组件之间用vuex比较多
                 且 父组件提供的数据,自己也使用不了

             基本使用:父组件有一个provide属性来提供数据,子孙组件有一个inject属性来接收数据
             场景:父组件想把数据给孙组件
              father.vue中:                                                  grandSon.vue中:
                                                                               <template>
                                                                                 <div>{{name}}-{{age}}</div>
                                                                                </template>

               <script>                                                          <script>
                 export default{                                                   export default{
                   data(){return{...}},                                                data(){return{...}},
                   provide:{                                                           inject:['name','age']
                     name:'lll',                                                     }
                     age:18                                                      </script>
                   }
                 }
               </script>
              // 如果在provide里想引用data里的数据,则provide需要写成函数返回对象格式.写成这种格式后,this指向该组件实例,不然里面的this为undefined
              <script>
                 export default{
                   data(){return{
                     name:['abc','600']
                   }},
                   provide(){
                     return{
                        name:'lll',
                        age:18,
                        //⚠️如果name的长度发生变化,该处的length不会动态改变,即子孙组件中inject接收的值也不会发生改变,解决办法见下方
                        length:this.name.length
                     }

                   }
                 }
               </script>

               // 动态改变provide中的属性:使用computed方法
               father.vue中:
               <script>
                import { computed } from 'vue'
                 export default{
                   data(){return{
                     name:['abc','600']
                   }},
                   provide(){
                     return{
                        name:'lll',
                        age:18,
                        //⚠️computed里传入的是getter函数,这里写箭头函数即可
                        length:computed(()=>this.names.length)
                     }
                   },
                   // 以后开始渐渐不使用computed的option属性了,vue3改用下面这种写法
                   setup(){
                     computed
                   }
                 }
               </script>

               grandSon.vue中:
                <template>
                  //⚠️computed(()=>this.names.length返回的是个ref对象,真正的值是保存在value属性中)
                  <div>{{length.value}}</div>
                </template>

                <script>
                 export default{
                   data(){return{...}},
                   inject:['name','age','length']
                 }
                </script>

          <2>Mitt全局事件总线   适用于父子组件,兄弟组件之间事件的传递
             与vue2不同的是,vue3删除了$on,$off和$once.

             要实现事件总线,要通过第三方库,例如mitt或tiny-emitter.下面是mitt库的使用
               首先,安装库  npm install mitt
               其次,可以自己封装一个工具eventbus.js:
                 import mitt from 'mitt'
                 const emitter = mitt()
                 export default emitter;
               最后开始使用:
                 情况:home和about是兄弟组件,在home中发生了一个点击事件,想在about中监听
               home.vue中
               <script>
                 import emitter from './eventbus.js'
                 export default{
                   methods:{
                     btnClick(){
                       // 发射事件
                        emitter.emit('lll',{name:'lll',age:18}) // 也可不带参数
                     }
                   }
                 }
               </script>

               about.vue中
               <script>
                 import emitter from './eventbus.js'
                 export default{
                   // 在组件创建好的时候就监听
                   created(){
                     // 使用on方法,第一个参数是想要监听的事件名,第二个参数是一个回调函数
                     emitter.on('lll',(info)=>{
                        ...
                     })
                     // 如果有多个事件需要监听,可以拆分监听;或者一次性全部监听,如下
                     emitter.on('*',(type,info)=>{
                       // type表示事件名,info表示传递过来的数据
                     })
                   }
                 }
               </script>

            如何取消mitt事件(即取消监听)
              // 取消emitter中所有的监听
                 emitter.all.clear()

              // 定义一个函数
              function onFoo(){}
              emitter.on('foo',onFoo) // 监听
              emitter.off('foo',onFoo) // 取消监听

          <3>Vuex  适用于父子组件通信,父孙组件通信,兄弟组件通信

       2.插槽
         (1)普通插槽
         (2)具名插槽
         基本使用: (1)在子组件(例:son)中给slot设置name属性 <slot name="left">左边</slot>  (2)父组件中: <son> <template v-slot:left> <span >标题<span> </template> </son>
                                                                                                //上面的(2) 可简写成 <son> <template #left> <span >标题<span> </template> </son>
              动态插槽名:上面(1)的"left"不是写死的,而是在子组件中配置好,从父组件中传过去的           此时上面(2)的"left"可以从父组件的data中取到,可使用v-slot:[变量名]

         (3)作用域插槽  用一句话总结:父组件替换插槽中的标签,但是内容由子组件来提供
         father.vue中:                                                  son.vue中:
          <son>                                                              <template>
            // 通过v-slot:default获取到slot的数据                                 <div> //names是从父组件中传过来的
            <template v-slot="slotProps">                                          <template v-for=(item,index) in names :key="item">
               <span>{{slotProps.item}}-{{slotProps.index}}</span>                      <slot :item="item" :index="index"></slot>
            </template>                                                            </template>
          </son>                                                                </div>
                                                                              </template>
           //如果子组件中只有一个默认插槽,还可以简写成:
           <son v-slot="slotProps">
             <span>{{slotProps.item}}-{{slotProps.index}}</span>
           </son>

           // 如果是具名插槽,通过v-slot:lll获取数据
            <son>                                                              <template>
            // 通过v-slot:default获取到slot的数据                                 <div> //names是从父组件中传过来的
            <template v-slot:lll="slotProps">                                          <template v-for=(item,index) in names :key="item">
               <span>{{slotProps.item}}-{{slotProps.index}}</span>                      <slot name="lll" :item="item" :index="index"></slot>
            </template>                                                            </template>
          </son>                                                                </div>
                                                                              </template>
          //如果子组件中有默认插槽,同时存在被赋值了的具名插槽,不可使用上面的简写,必须使用template
          //如果子组件中有默认插槽和具名插槽,且具名插槽没有被赋值,也可使用上面的简写

     3.异步组件
     4.组件的v-model
     input框里绑定v-model:
        <input v-model="message"/>  相当于<input :value="message" @input="message=$event.target.value"/>

     组件上绑定v-model:
        <lll-input v-model="message"/>   相当于<lll-input :modelValue="message" @update:model-value="message='$event'"/>
        // modelValue是常规的固定的写法,也可更换名字.  在lll-input组件的props中需定义该属性
        // @update:model-value="message='$event'"是固定写法,除了model-value可根据具体名字变换.  在lll-input组件中通过his.$emit('update:modelValue','参数')发射事件,Vue3还需在emits属性中定义该事件:emits:['update:modelValue']

     5.mixin
     (1)组件和组件之间会存在相同的代码逻辑,我们可以通过mixin进行抽取
        mixin对象中可以包含任何组件选项
     (2)合并规则
        情况一:如果是data函数的返回值对象
          默认情况下会进行合并;
          如果含有相同的属性,优先选择组件自身的数据
        情况二:生命周期钩子函数
          会被合并到数组中,都会被调用
        情况三:只为对象的选项,例如methods,components和directives
          会被合并为同一个对象,都会生效
          如果含有相同的,优先选择组件自身的

       vue2中用的比较多,到了vue3,推荐使用composition api (简称为VCA)
         vue2的options api包括data,methods,computed,watch,生命周期钩子,mixin等.特点就是在对应的属性中编写对应的功能模块
         options api的弊端:当实现某一功能时,对应的逻辑代码会被拆分到各个属性中;当组件变得更大更复杂时,同一个功能的逻辑就会被拆分地很分散

     -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
