<template>
  <div />
  <!--
    composition api 在setup函数中使用
    setup 其实就是组件的另外一个选项,可以用它来替代之前的大部分其他选项;比如methods,computed,watch,data,生命周期等

    setup函数有两个参数:props,context
    (1)props:父组件传递过来的属性会被放在props对象中
       如果需要在setup中使用,直接通过props参数获取,不可以通过this去获取,因为setup被调用之前,data,computed,methods都没有被解析,所以使用this不会找到组件实例;
       对于定义props的类型,还是和之前的规则一样,在props选项中定义;
       在template中依然是正常使用props中的属性;

    (2)context:也称之为SetupContext,它里面包含了三个属性:attrs(所有的非prop属性),slots(父组件传递过来的插槽),emit(内部发射事件)

   -->
</template>

<script>
export default {

}
</script>

<style>

</style>
