import Vue from "vue";
import loadingView from '@/components/loadingView'
// 创建一个组件构造器，他不是一个组件实例
const loadingFn = Vue.extend(loadingView)
// 通new创建一个组件实例
const loadingCpn = new loadingFn()
// 通过$mount进行挂载
loadingCpn.$mount()

Vue.directive('loadings', {
    inserted (el, binding) {
        if (binding.value) {
            el.appendChild(loadingCpn.$el)
        }
    },
    update (el, binding) {
        if (binding.value) {
            el.appendChild(loadingCpn.$el)
        } else {
            if (document.body.contains(loadingCpn.$el)) {
                el.removeChild(loadingCpn.$el)
            }
        }
        // binding.value ? el.appendChild(loadingCpn.$el) : el.removeChild(loadingCpn.$el)
    }
})