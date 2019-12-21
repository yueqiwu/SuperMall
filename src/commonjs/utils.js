export function debounce(fn,delay=200){
  let timer = null;
  return function(...args){
    timer && clearTimeout(timer);

    timer = setTimeout(()=>{
      fn.apply(this,args) // this的指向是最后确定的 所以指向的是组件
      // fn()
    },delay)
  }
}