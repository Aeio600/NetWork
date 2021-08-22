<template>
  <h1>js基础知识点</h1>
  <!--
    数组的哪些方法在vue中是响应式的?
    push()
    pop()
    shift()
    unshift()
    splice()  //删除元素:第二个参数传入要删除几个元素 splice(2,2); 如果没有传,就删除第一个参数所在位置后面的所有元素 splice(2),
                插入元素: 第二个参数传入0,后面跟上要插入的参数 splice(2,0,'p','x')
                替换元素: 第二个参数传入要替换几个元素,后面跟上用于替换的元素  splice(1,3,'m','n','l')
    sort()
    reverse()

    // this.names[1]='zero' 不会实时改变数据,通过 this.names.splice(1,1,'zero') 或 Vue.set(this.name,1,'zero')

    js高阶函数的使用
    1. reduce 对数组中所有的内容进行汇总  reduce(参数1,参数2)
              参数1:下面例子中的参数1是箭头函数
              参数2:表示初始值,也是preValue的第一次取值   下面例子中的参数2是0
       let array=[1,2,3]
       array.reduce((preValue,n)=>{
         // preValue的第一次取值是参数2,第二次取值是函数第一次return出去的值,第三次次取值是函数第二次return出去的值,以此类推
         // n的第一次取值是数组的第一项,第二次取值是数组的第二项,以此类推
           return ...
       },0)

    2. filter 返回新数组
    3. map
    4. some
    5. every

    ES6知识点:
    1.
    let/var:
       ES5中的var是没有块级作用域的(if/for).,所以有很多时候,我们都必须借助闭包(因为函数是一个作用域)来解决应用外面变量的问题
       ES6中的let是有块级作用域的(if/for)

       1.变量作用域:变量在什么范围内是可用的
       2.没有块级作用域引起的问题:变量容易被随意更改

       以后开发过程中写let,它有块级作用域

    const: 1.使用const修饰的标识符为常量,不可以再次赋值.  2.const修饰的标识符必须赋值
    使用场景:当修饰的标识符不会被再次赋值时,就可以使用const来保证数据的安全性

    2.对象增强写法:
       1.属性的简写
        // ES6之前                        //ES6之后
            let name='600'                   let name='600'
            let age=18                       let age=18
            let obj={                        let obj={
              name:name,                       name,
              age:age                          age
            }                                }

       2.方法的简写
       //ES6之前                          //ES6之后
           let obj1={                        let obj1={
             test:function(){...}              test(){...}
           }                                  }

    3.箭头函数
       什么时候使用箭头函数:想把一个函数当做参数传递到另一个函数里时
       箭头函数的this引用的是最近作用域中的this (向外层作用域中,一层层查找this,直到this有定义)

    4.Promise
       Promise是一种异步编程的解决方案.比较常见的场景就是网络请求
       Q:什么情况下会用到Promise?
       A:一般情况是有异步操作时,使用Promise对这个异步操作进行封装.
         异步操作后会有三种状态:(1)pending:等待状态,比如正在进行网络请求,或者定时器没有到时间
                            (2)fulfill:满足状态,当我们主动调用resolve时,就处于该状态,并且会回调.then()
                            (2)reject:拒绝状态,当我们主动调用reject时,就处于该状态,并且会回调.catch()

       new Promise的参数是一个函数,该函数用于处理异步操作.该函数有两个默认参数resolve,reject.  调用resolve函数后可执行.then(参数),里面的参数是一个箭头函数
       resolve和reject本身就是函数

       new  Promise((resolve,reject)=>{
          setTimeout(()=>{
            // 成功和失败只能调用一个
            // 成功的时候调用resolve,然后执行.then
            resolve()
            // 失败的时候调用reject,然后执行.catch
            reject('error message')
          },1000)
       }).then(()=>{
         console.log('777')
       }).catch(err=>{
         console.log('error message')
       })
       也可将.then和.catch合并
       new  Promise((resolve,reject)=>{
          setTimeout(()=>{
            // 成功的时候调用resolve,然后执行.then
            resolve()
            // 失败的时候调用reject,然后执行.catch
            reject('error message')
          },1000)
       }).then(()=>{
         console.log('777')
       },err=>{
         console.log(err)
       })

       实现原理: 执行new Promise的时候,先保存了一些状态信息,然后内部执行传入的函数.
                执行该函数时,会给这个函数传入两个参数:resolve和reject,这两个参数本身也是函数
                在new Promise里面执行异步代码,对于执行后得到的数据,则放到.then里进行处理.通过resolve(data)传递,.then((data)=>{...})接收数据.
                (注:new Promise里面不负责处理异步请求得到的数据,否则代码又会很乱
                    Promise的设计原则是分离 异步请求 和 处理数据的操作
                )

      Promise.all的使用
      需求:两个请求都成功完成,才能执行以后的代码
        Promise.all([
          new Promise((resolve,reject)=>{
            $.ajax({
              url:'url1',
              success:function(data){
                resolve(data)
              }
            })
          }),
          new Promise((resolve,reject)=>{
            $.ajax({
              url:'url2',
              success:function(data){
                resolve(data)
              }
            })
          }),
        ]).then(results=>{
          //results是一个数组,results[0]表示第一个请求得到的数据,results[1]表示第二个请求得到的数据
        })

    5.axios
    功能特点:在浏览器中发送XMLHttpRequests请求;在node.js中发送http请求;支持Promise API;拦截请求和响应;转换请求和响应数据

    6.jsonp
      在前端开发中,我们常用的一种网络请求方式是jsonp,使用它的最主要的原因往往是为了解决跨域问题
      jsonp的核心在于通过script标签的src来请求数据.
      原因是项目部署在domain1.com服务器上时,是不能直接访问domain2.com服务器上的资料的
      这个时候,我们利用script标签的src去服务器请求数据,将数据当做一个js函数来执行,并且在执行的过程中传入我们需要的json
      所以,封装json的核心就在于我们监听window上的jsonp进行回调的名称

   -->
</template>

<script>
export default {

}
</script>

<style>
</style>
