<template>
  <!--
   1. Promise
   如何正确处理下面的情况
   情况1:new  Promise((resolve,reject)=>{
          setTimeout(()=>{
             console.log('777)
               setTimeout(()=>{
                 console.log('777)
                    setTimeout(()=>{
                      console.log('777)
                    },1000)
               },1000)
          },1000)
    })

    答:
    new  Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve()
      },1000)
    }).then(()=>{
      console.log('777)
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve()
        },1000)
      })
    }).then(()=>{
      console.log('777)
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve()
        },1000)
      })
    }).then(()=>{
      console.log('777)
    })

    情况2: (链式操作的过程中,有的没有进行异步操作,可简写成Promise.resolve()或Promise.reject().  当执行return Promise.reject('error')时,也可用 throw 'error'代替)
    网络请求,得到数据aaa -> 第一次处理
    处理:aaa222 -> 第二次处理
    处理:aaa222333 -> 第三次处理

    new Promise((reslove,reject)=>{
      setTimeout(()=>{
        resolve('aaa')
      },1000)
    }).then(res=>{
      console.log('第一次处理')
      return Promise.resolve(res+'222')
      // 完整写法 return new Promise(resolve=>{resolve(res+'222')})

    }).then(res=>{
      console.log('第二次处理')
      return Promise.resolve(res+'333')
    }).then(res)=>{
      console.log(res,'第三次处理')
    }
    更简洁的方法: 省略掉 Promise.resolve
    new Promise((reslove,reject)=>{
      setTimeout(()=>{
        resolve('aaa')
      },1000)
    }).then(res=>{
      console.log('第一次处理')
      return res+'222'
    }).then(res=>{
      console.log('第二次处理')
      return res+'333'
    }).then(res)=>{
      console.log(res,'第三次处理')
    }

    情况3: 需要两个请求都完成,才能执行以后的代码
    //请求一
    //请求二
   -->

  <script>
    export default {

    }
  </script>

</template>
