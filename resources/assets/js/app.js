require('./bootstrap');

window.Vue = require('vue');
Vue.component('message', require('./components/message.vue'));
import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
import Axios from 'axios';
Vue.use(VueChatScroll)

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: []
        }
    },
    methods: {
        send() {
           if(this.message.length != 0) {
                this.chat.message.push(this.message);
                axios.post('/send', {
                    message : this.message
                })
                .then(response => {
                    console.log("data response :"+ response);
                }).catch(error => {
                    console.log("data error :"+ error);
                })
                this.message = '';

            }
        }
    },
    created(){
        Echo.private('chat')
        .listen('ChatEvent', (e) => {
            console.log("data response message :"+e.message);
            console.log("data response user :"+ e.user);
        });
    }
});
