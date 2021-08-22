<template>
  <h2>Vue</h2>
  <!--
    vue 是一个渐进式的框架.渐进式意味着你可以将vue作为你应用的 一部分嵌入其中,带来更丰富的交互体验.
    vue在web开发中常见的高级功能有:解耦视图和数据;可复用的组件;前端路由技术;状态管理;虚拟DOM

    MVVM: Model  ViewModel  View
        View层(视图层): 在前端开发中,通常就是DOM层,主要的作用是给用户展示各种信息
        Model层(数据层):数据可能是我们固定的死数据,更多的是来自我们服务器的数据,即请求下来的数据
        ViewModel层(视图模型层):是View和Model通信的桥梁.
                              一方面它实现了数据绑定(Data Binding),将数据的改变实时反应到视图中,
                              另一方面它实现了DOM监听(DOM Listener),通过监听DOM发生的事件(点击,滚动,touch),在需要的情况下改变对应的数据

    Vue的生命周期:
        阶段一:初始化
             beforeCreated() >>>实现数据代理>>> created() (可以访问data数据) >>>在内存中编译模板>>> beforeMounted()  >>>挂载到页面>>> mounted() (可以访问模板中的标签对象,执行初始异步任务,ajax请求和异步任务)
        阶段二:更新阶段
             阶段一 >>>更新数据>>> beforeUpdate() >>>更新界面>>> updated()
        阶段三:销毁
           vue2:  阶段二 >>>销毁vm>>> beforeDestroy() (收尾工作,清除定时器) >>>destroyed()
           vue3:  阶段二 >>>销毁vm>>> beforeUnmount() (收尾工作,清除定时器) >>>unmounted()

    插值操作: {{ }}  里面插入data中的数据,也可以是由data数据组成的表达式

    vue的一些简单指令:
        v-once:某些情况下,我们可能不希望界面随意的跟随改变,就可以使用该指令,表示元素和组件只渲染一次,不会随着数据的改变而改变,该指令后面不需要跟任何表达式  例<h2 v-once>{{message}}</h2>
        v-html:将服务器返回的标签(字符串类型)转换成html标签    例<h2 v-html="url"></h2>
        v-pre:用于跳过这个元素和他子元素的编译过程,用于显示原本的Mustache语法  例<h2 v-pre>{{message}}</h2>显示在页面的上的就是{{message}}
        v-cloak:浏览器可能会直接显示出未编译的Mustache标签(例如加载js卡顿时),在vue解析前,存在该属性,若解析成功,该属性会被删除,若没有被删除,可以给含有该属性的标签添加css样式,手写[v-cloak]{display:none}

    绑定属性 v-bind
       动态绑定class和style有对象语法和数组语法

    计算属性 computed :对数据进行一些转化,或者将多个数据结合起来并显示
        每个计算属性都都包含一个getter和一个setter(不常用)
        methods和computed的区别:计算属性会进行缓存,如果多次使用,计算属性只会调用一次

        完整写法: (一般是不写set属性的,让computed里的属性是只读属性)
             computed:{
               fullName:{
                 set:function(newValue){
                    .....
                 },
                 get:function(){
                    return XXX
                 }
               }
             }
        没有set属性的写法:
             computed(){
               fullName:function(){
                 return XXX
               }
             }

    事件监听v-on
     1.参数传递问题:
      情况一:如果该方法不需要额外参数,那么方法后面的()可以不添加;
            注:(1)在事件定义时,绑定的方法后面没有添加(),但方法本身又需要一个参数,此时vue会默认将浏览器生产的event事件对象作为参数传递到方法中
                                    <buttom @click=btnClick/>  btnClick(aaa){ console.log(aaa) //打印出来是原生事件event}
               (2)在事件定义时,绑定的方法后面添加(),但没有传入形参时,接收的形参打印出来是undefined
                                    <buttom @click=btnClick()/>  btnClick(aaa){ console.log(aaa) //打印出来是undefined}

      情况二:定义方法时,需要传入某个参数,同时需要event时,可以通过$event传入事件
            <buttom @click=btnClick(123,$event)/>  btnClick(aaa,event){ console.log(aaa,event) //打印出来是123,原生事件event}

     2.修饰符
      .stop 停止冒泡
        <div @click.stop="divClick">
          <button @click.stop="doThis"></buttom>   //.stop避免了 触发doThis事件时,同时触发divClick事件
        </div>
      .prevent 阻止默认行为
        (1)<button @click.prevent="doThis"></buttom>
        (2)阻止默认行为,没有表达式  <from @submit.prevent></form>

      .(keyCode|keyAlias) 只当事件是从特定键触发时才触发回调
        (1)键别名 <input @keyup.enter="onEnter">
        (2)键代码 <input @keyup.13="onEnter">

      .native 监听组件根元素的原生事件 (一般使用自定义组件的时候会用)
      .once 指触发一次回调

    v-if和v-show对比
       v-if当条件为false时,压根不会有对应的元素在DOM中,
       v-show当条件为false时,仅仅是将元素的display属性设置为none而已

       当需要在显示与隐藏之间频繁切换时,使用v-show
                         切换次数很少时,使用v-if

    循环遍历v-for
     (1)遍历数组
        格式:item in items 或 (item,index) in items
     (2)遍历对象
        格式:val in obj (val是对象中的value值) 或 (value,key) in obj 或 (value,key,index) in obj

     在使用v-for时,需要使用key(必须保证唯一性)来给每个节点做一个标识,便于diff算法正确地识别此节点并找到正确的位置插入新的节点
     key的作用主要是为了高效的更新虚拟DOM

    v-model其实是一个语法糖,它的本质是包含了两个操作:(1)v-bind绑定一个value属性 (2)v-on指令给当前元素绑定input事件

    v-model的修饰符
     lazy:默认情况下,v-model默认是在input事件中同步数据的,lazy修饰符可以让数据在失去焦点或者回车时才会更新 <input v-model.lazy="text">
     number:让输入框中的内容自动转换成数字类型
     trim:去除内容的首尾空格 <input v-model.trim="text">

    组件化:尽可能的将页面拆分成一个个独立可复用的组件
    组件的使用:创建Vue.extend()-注册Vue.component()-使用

    全局组件:可以在多个vue实例中使用  Vue.component()全局注册
    局部组件:在某个vue实例的components属性中注册组件,便可在该vue实例中使用注册的组件

    组件中的data必须是一个函数,而且这个函数返回一个对象,对象内部保存着数据.  因为本质是返回内存地址,能保持各个组件的数据独立

    组件之间的层级关系以及通信方式:
     1.父子组件
         (1)父传子 props  (如果props中的属性使用了驼峰写法,子组件使用时要换成连接符写法)
                  方式一:字符串数组,数组中的字符串就是传递时的名称
                  方式二:对象,对象可以设置传递时的类型,也可以设置默认值
            props:{
              // 基础的类型检查(null 匹配任何类型)
              propA:Number,
              // 多个可能的类型
              propB:[String,Number],
              // 必填的字符串
              propC:{
                type:String,
                required:true
              },
              // 带有默认值的数字
              propD:{
                type:Number,
                default:100
              },
              // 带有默认值的对象(或数组),注意default要写成一个函数,返回对象.是为了保持数据的独立性,不会被随意更改
              propE:{
                type:Object,
                default(){
                  return{message:'hi'}
                }
              },
              // 自定义验证函数
              propF:{
                validator:function(val){
                  // 这个值必须匹配下列字符串中的一个
                  return['success','warning','danger'].indexOf(val)!==-1
                }
              }
            }

            props数据验证支持的类型:String,Number,Boolean,Array,Object,Date,Function,Symbol

            非props的属性(该属性没有定义对应的props或emits,比如class,style,id等): (子组件中通过$attrs来访问这些属性)
              <1> 当组件有单个根节点时,非props的属性会自动添加到根节点上.
              <2> 如果不想添加到根节点,而是添加到子组件其他某个标签上,则在组件的export default中设置inheritAttrs:false,并在想要添加到的标签上绑定:class="$attrs.class"或:style="$attrs.style".如果想绑定所有属性,直接在想要添加到的标签上绑定v-bind="$attrs"
              <3> 当组件有多个根节点时,会报警告,必须手动地绑定到哪一个根节点

          父组件访问子组件(比如在父组件中想要操作子组件中的数据或是调用子组件中的方法):使用$children(vue3已经移除该属性)或$refs  常用$refs

         (2)子传父 在子组件中,通过$emit('add',XXX)发射事件,并向父组件传递数据
                  在父组件中,通过v-on来监听子组件事件 (绑定方法时,可以不加()来接收数据,vue默认将传递的数据作为参数传递过去)

            子组件访问父组件:使用$parent       子组件访问根组件:使用$root        (这两种在开发中不常用)
      2.非父子:
         provide/inject
         事件总线eventBus:创建一个vue实例,通过该实例实现事件总线的功能
         vuex

    插槽  作用:让封装的组件更具有扩展性,可以让使用者决定组件内部展示什么内容
      1.匿名插槽(普通插槽)
          基本使用: (1)在子组件中使用slot开启一个插槽  (2)slot中可以设置默认的内容,如果没有在该组件中插入任何内容,就显示默认内容
      2.具名插槽
          基本使用: (1)在子组件(例:son)中给slot设置name属性 <slot name="left">左边</slot>  (2) <son> <span slot="left">标题<span> </son>
      3.作用域插槽  用一句话总结:父组件替换插槽中的标签,但是内容由子组件来提供
          基本使用: (1)在子组件(例:son)中给slot自定义属性 <slot :data="message">左边</slot>  (2)slot-scope是固定写法<son> <template slot-scope="scope">{{scope.data}} // scope表示引用的插槽对象 scope.data表示传过来的mssage </template></son>

    前端模块化

    webpack

    Vue Cli
      node是使用C++开发的,核心是V8引擎

    vue-router
      1.认识路由

      (1)网页发展历史:
        第一阶段:后端路由阶段 (后端路由:后端处理URL和页面之间的映射关系)
                后端渲染:url发送到服务器,服务器会通过正则对url进行匹配,并利用jsp(java server page)/php,在后端将网页渲染好,最终生成html或者数据传给前端
`
                优点:渲染好的页面,不需要单独加载任何js和css,可以直接交给浏览器展示,有利于SEO优化
                缺点:前端人员需要学习后端语言;html代码和逻辑会混在一起,不易维护

        第二阶段:前后端分离阶段 (ajax出现) :后端只提供api来返回数据,前端通过ajax获取数据,并且可以通过js将数据渲染到页面中
                前端渲染:浏览器网页中的大部分内容,都是由前端js代码在浏览器中执行,最终渲染出来的

                优点:前后端各司其职,后端专注于数据上,前端专注于交互和可视化

        第三阶段:单页面富应用SPA阶段 (只有一个html页面,前端来维护一套路由规则,一个url对应一个页面)
                特点:前后端分离的基础上加了一层前端路由
                前端路由的核心是改变URL,但是页面不进行整体的刷新

      (2) url的hash和HTML5的history  (改变url,不会发生请求)

          url的hash也就是锚点(#),本质是改变window.location的href属性
          我们可以通过直接赋值location.hash来改变href,但是页面不刷新
           例如:
              location.href  "http://192.168.1.101:8080/examples/urlChange/"
              赋值location.hash = '/'后: location.href  "http://192.168.1.101:8080/examples/urlChange/#/"
              赋值location.hash = '/foo'后: location.href  "http://192.168.1.101:8080/examples/urlChange/#/foo"

          h5的history模式:pushState
          例如:
              location.href  "http://192.168.1.101:8080/examples/urlChange/"
              赋值history.pushState({},'','/foo')后: location.href  "http://192.168.1.101:8080/foo"
              赋值history.pushState({},'','/')后: location.href  "http://192.168.1.101:8080/"
              pushState用法: pushState(data,title,?url)
              其他关于history的方法:replaceState,go,back,forward

          一般情况下,默认为hash模式,若想改成history模式,见下方代码
          不过history模式也有一个问题，当你在浏览器的地址栏中直接输入URL或者刷新页面的时候，因为该URL是正常的URL，所以浏览器会解析该URL向服务器发起的请求，如果服务器没有针对该URL的响应，就会出现404错误。
          在history模式下，如果是通过导航链接来跳转页面，VueRouter会在内部截获单击事件，通过JS操作window.history来改变浏览器地址栏里的路径，在这个过程中并没有发起HTTP请求，所以就不会出现404错误。
          如果使用history模式，那么需要在前端程序部署的Web服务器上配置一个覆盖所有情况的备选资源，即当URL匹配不到任何资源的时候，返回一个固定的index.html页面，这个页面就是单页应用程序的主页面。
          原文链接：https://blog.csdn.net/qq_42024058/article/details/108455467

      2.基本使用
        (1)安装 npm install vue-router --save
        (2)在模块化工程中使用它
             第一步:导入路由对象,并且调用Vue.use(VueRouter)
             第二步:创建路由实例,并且传入路由映射配置   router/index.js文件:
                                                        import VueRouter from 'vue-router'
                                                        import Vue from 'vue'

                                                        Vue.use(VueRouter)

                                                        const router = new VueRouter({
                                                          // 配置路由和组件之间的映射关系
                                                          routes:[
                                                          {
                                                            path:'/',
                                                            // 让路径默认跳到首页
                                                            redirect:'/home',
                                                            // 路由的懒加载
                                                               当打包构建应用时,js包会变得非常大,影响页面加载.
                                                               懒加载相当于把不同路由对应的组件分割成不同的代码块,当路由被访问时才加载对应组件
                                                               路由懒加载的作用:将路由对应的组件打包成一个个的js代码块
                                                            component: ()=>import('../components/home')
                                                          },
                                                          {
                                                            ......
                                                          }
                                                          ],
                                                          // 改成history模式
                                                          mode:'history'
                                                          // 修改自带的类名router-link-active
                                                          linkActiveClass:'active'
                                                        })

                                                        export default router

             第三步:在Vue实例中挂载创建的路由实例       main.js中:
                                                       import router from './router'
                                                        new Vue({
                                                           el:'#app',
                                                           router,
                                                           render:h=>h(App)
                                                         })

             最后在APP.vue中插入router-view标签,用于展示路由相对应的组件
             使用路由:通过<router-link>  该标签是一个vue-router中已经内置的组件,它会被渲染成一个a标签 (<a href='#/home'>首页</a> 本质是通过改变hash值来改变url)
                     和 <router-view>  该标签会根据当前的路径,动态渲染出不同的组件 (在路由切换时,切换的是router-view挂载的组件,其他内容不会发生改变)

                    router-link的补充: 1.to属性:用于指定跳转的路径  后面跟完整的组件所在路径

                                      2.tag属性
                                         例: router-link默认渲染成a标签,想将它渲染成button标签
                                         <router-link to="/home/test" tag="button"></router-link>

                                      3.replace属性:replace不会留下history记录,所以在指定replace的情况下,后退键返回不能返回到上一个页面中
                                         例: <router-link to="/home/test" replace ></router-link>

                                      4.自带的类名router-link-active  当标签被点击时,该类名会自动添加到标签上
                                        若想更换自带的类名,使用active-class属性 或 在  创建路由实例时使用linkActiveClass属性(见上方代码)
                                        例: <router-link to="/home/test" active-class="active"></router-link>

               通过代码跳转路由的方法(不通过router-link跳转):
                 <button @click="homeClick"></button>
                 homeClick() {
                   this.$router.push('/home')
                 }
      3.动态路由
        例: path:'/user/:id'
        通过this.$route.params.id可以拿到id

      4.嵌套路由
         实现嵌套路由有两个步骤:(1)创建对应的子组件,并且在路由映射中配置对应的子路由 (2)在组件内部使用<router-view>

        例:在home页面中,希望通过/home/news和/home/message访问一些内容
        {
          path:'/home',
          component: ()=>import('../components/home'),
          children:[
          {
            path:'new',  //注:子路由的path最前面不要加 /
            component:...
          },
          // 设置默认路径,当path为/home时,转成/home/new
          {
            path:'',
            redirect:'new'
          }
          ]
        },

        在父组件Home.vue中合适的位置使用<router-view>,用于展示子组件

      5.参数传递
        传递参数主要有两种类型:params和query  (如果有大量的数据,选择用query)
        (1)params的类型:
            配置路由格式：/router/:id 传递的方式：<router-link :to="'/user/'+userId">用户</router-link>
            配置路由格式：/router/:id 传递的方式：this.$router.push('/user/'+this.userId)
            配置路由格式：/router 传递的方式：this.$router.push({name:'User',params: {userId: 666}})  (⚠️params要使用name来引入路由)
            params传递后形成的路径：/router/123,/router/zhangsan
            params接受传递的参数：<p>我是{{$route.params.userId}}用户相关信息</p>

        (2)query的类型
            配置路由格式：/router 传递的方式：this.$router.push({path:'/profile', query: {name:'123', age: 10}})(⚠️query要使用path来引入路由)
            query传递后形成的路径：/router?id=666&name=zhangsan
            query接受传递的参数：<h2>姓名：{{$route.query.name}}</h2>

      6.$router和$route的区别
        $router是VueRouter实例(new Router创建出来的路由对象),包含push,replace,resolve,go,back等方法,控制路由的跳转

        $route是当前活跃状态下的路由,包含fullPath,path,meta,params,query等属性

      6.导航守卫
      (1)全局导航守卫  (缺点:页面较多时,这种方式不易维护,因为需要在多个页面实现不同的功能.更好的方式是导航守卫)
       const router = new VueRouter({
                                      routes:[
                                      {
                                        path:'/',
                                        redirect:'/home',
                                        component: ()=>import('../components/home')
                                      }
                                      ],
                                      linkActiveClass:'active'
                                    })
        // 前置守卫
        router.beforeEach((to,from,next)=>{
          // from,to表示要去的路由,即上方routes属性里配置的一个个路由,to里面包含了配置的路由信息,可在配置meta(元数据)属性来添加需要的信息
             有时从meta里拿不到,可到matched[0]属性里拿(打印to即可看到)

          // 必须要调next函数
           next()
        })
        // 后置守卫 afterEach,不需要主动调用next()

        (2)路由独享守卫

           const router = new VueRouter({
                                      routes:[
                                      {
                                        path:'/',
                                        redirect:'/home',
                                        component: ()=>import('../components/home')
                                        // here
                                        beforeEnter:(to,from,next)=>{... //记得调用next方法}
                                      }
                                      ],
                                    })

        (3)组件内的守卫
           beforeRouteEnter(to,from,next){....}
           beforeRouteUpdate(to,from,next){....}
           beforeRouteLeave(to,from,next){....}

      7.keep-alive
      keep-alive是Vue内置的一个组件,可以使被包含的组件保留状态,避免被频繁地创建和销毁
      有两个非常重要的属性:(1)include-字符串或正则表达式或数组,匹配的组件会被缓存  例:<keep-alive inclclude="Profile"><router-view/></keep-alive>
                                                                            <keep-alive :inclclude="/a|b/"><router-view/></keep-alive>  // 正则的时候是动态绑定的格式
                                                                            <keep-alive :inclclude="['a','b']"><router-view/></keep-alive> // 数组的时候是动态绑定的格式

                        (2)exclude-字符串或正则表达式或数组,匹配的组件都不会被缓存    例:<keep-alive exclude="Profile,User">  //"Profile,User"为组件中name属性的值
                                                                               <router-view/>
                                                                             </keep-alive>
                        (3)max-数字或字符串,表示最多可以缓存多少组件实例,一旦达到这个数字,那么缓存组件中最近没有 被访问的实例会被销毁

      对于缓存的组件来说,再次进入时,是不会执行created或者mounted生命周期函数的.
      如果希望监听到何时重新进入组件,何时离开组件,可使用activated(当前为活跃状态)和deactivated(当前为非活跃状态)这两个钩子函数

      如果router-view被包在keep-alive里面,所有路径匹配到的视图组件都会被缓存(这种情况下,created()和destoryed()中的代码只会在第一次被执行,后期后不会再执行)

    Vuex (通俗地讲,Vuex是一个状态管理工具,可以将需要共享的变量全部存储在一个对象里,然后将这个对象放在顶层的Vue实例中,各个组件都可以使用.之后,按照规定好的规定,进行访问和修改)
      概念:是一个专为Vue应用程序 开发的状态管理模式,采用集中式存储管理,以相应的规则保证状态以一种可预测的方式发生变化
      Vuex也集成到Vue的官方调试工具devtools extension,提供了诸如零配置的time-travel

      Vuex有几个比较核心的概念:
      (1)State 单一状态树
      (2)Getters  //类似于组件的计算属性
      (3)Mutation  // Vuex的store状态的唯一更新方式:提交Mutation
          Mutation中的方法必须是同步的,主要原因是devtools可以捕捉mutations的快照,如果是异步操作,devtools不能很好的捕捉

      (4)Action  //作用是代替Mutation进行异步操作

      (5)Module  //用于划分模块,针对每个模块,再做相关数据的保存

      安装 npm install vuex --save
      在src文件夹里新建一个store文件夹,该文件夹下新建index.js文件
         index.js文件中:
            import Vue from 'vue'
            import Vuex from 'vuex'
            // 1.安装插件
            Vue.use(Vuex)
            // 2.创建对象
            const store = new Vuex.Store({
              // 在其他组件中可通过this.$store.state.xxx拿到对应变量
              state:{
                counter:1000,
                info:{
                  name:'600',
                  age:18
                }
              },
              // 在其他组件中可通过this.$store.getters.powerCounter拿到对应变量
              getters:{
                //方法,默认第一个参数为state,第二个参数为getters
                powerCounter(state){
                  return state.counter*3
                },
                twicePowerCounter(state,getters){
                  return getters.powerCounter*2
                }
                // 如果想接收额外参数并使用,可以return一个函数
                handleCounter(state){
                  return function(aaa){
                       return ...
                  }
                },

              },
              // 同步操作
              // 在其他组件中可通过this.$store.commit('increment')调用对应方法.  若有自定义参数,调用this.$store.commit('increment',aaa)  此处aaa的专业名词叫payload 负载,接收参数时,payload即为aaa
                           还可通过this.$store.commit({
                             type:'increment',
                             aaa,
                             bbb
                           })  //若通过该方法,payload接收参数时,为整个对象,通过payload.aaa拿到aaa的值
              mutations:{
                //方法,默认第一个参数为state,第二个参数可为自定义的额外参数
                increment(state){
                  state.counter++
                },
                decrement(state,payload){
                  state.counter=payload.couter
                },
                updateInfo(state){
                  state.info.name='lll'
                }

              },
              // 异步操作  一般用于发送后端请求
              // 在其他组件中可通过this.$store.dispatch('aUpdateInfo')调用对应方法. 若有自定义参数,调用this.$store.dispatch('increment',bbb)  此处bbb的专业名词叫payload 负载,接收参数时,payload即为bbb
              // 补充知识点:在action里可以返回一个promise,便于在其他组件调用dispatch后使用.then进行下一步操作
              actions:{
                // 默认参数context,指store对象,即Vuex.store new出来的对象
                aUpdateInfo(context,payload){
                   setTimeout(()=>{
                      context.commit('updateInfo')
                   },1000)
                }

              },
              modules:{

              }

            })
            // 3.导出store对象并在main.js中导入,挂载
            export default store

   -->
  <!--
     (1)响应式添加属性
     (不行)state.info.address='洛杉矶'
     (不行)state.info['address']='洛杉矶'
     需要使用Vue.set(state.info,'address','洛杉矶')或 给对象重新赋值
     用数组下标的方式添加元素的情况也不能做到响应式,可使用splice方法或Vue.set

     Vue.set(参数1,参数2,参数3)
     参数1:要修改的对象或数组
     参数2:如果是对象,传入key;如果是数组,传入下标
     参数3:要添加的值

    (2)响应式删除属性
    (不行)delete.state.info.age
    需要使用Vue.delete(state.info,'age')

    Vue.delete(参数1,参数2)
    参数1:要修改的对象
    参数2:删除的属性

    -->
</template>

