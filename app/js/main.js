(function(){var e,t,n,o,u,i,c,r,s,h,m,a,l,d,p,g,v,f,T,S,w,q;f=require("vue"),S=require("vue-router"),T=require("vue-async-data"),w=require("moment"),h=require("../vues/Navbar.vue"),d=require("../vues/SignIn.vue"),p=require("../vues/SignUp.vue"),o=require("../vues/DeletePopup.vue"),m=require("../vues/Popup.vue"),n=require("../vues/Dashboard.vue"),g=require("../vues/Tasks.vue"),r=require("../vues/Mockups.vue"),c=require("../vues/Mockup.vue"),t=require("../vues/Chat.vue"),v=require("../vues/Teams.vue"),i=require("../vues/JoinTeam.vue"),l=require("../vues/Settings.vue"),f.config.debug=!0,f.use(S),f.use(T),e=f.extend({data:function(){return{theme:{name:"",hasSchedule:!1},timer:null}},ready:function(){return this.theme.name=localStorage.selectedTheme,this.switchTheme(this.theme.name),null!==localStorage.hasSchedule&&(this.theme.hasSchedule=localStorage.hasSchedule),console.log(this.theme.hasSchedule),this.theme.hasSchedule&&this.setCountdownToThemeSwitch(),window.change=function(e){return function(t){var n;return 0===t&&(n="dark"),1===t&&(n="light"),e.switchTheme(n)}}(this)},watch:{theme:function(e,t){return this.switchTheme(e)}},methods:{switchTheme:function(e){return document.querySelector("html").className=e,localStorage.selectedTheme=e},setCountdownToThemeSwitch:function(){var e,t,n,o,u,i;return i=w(),n=w().hour(8).minute(0).second(0),t=w().hour(20).minute(0).second(0),i.isBefore(n)&&(e=n.diff(i),o="light",u={title:"Good morning!",body:"Turning the lights on."}),i.isSameOrAfter(n)&&(e=t.diff(i),o="dark",u={title:"It‘s getting late...",body:"Turning the lights off."}),i.isSameOrAfter(t)&&(e=n.add(1,"d").diff(i),o="light",u={title:"Good morning!",body:"Turning the lights on..."}),console.log("countdown",e),this.timer=setTimeout(function(e){return function(){return console.log("countdown over, switching"),new Notification(u.title,{body:u.body,silent:!0}),setTimeout(function(){return e.switchTheme(o),e.$broadcast("themeChanged",o)},500),e.setCountdownToThemeSwitch()}}(this),e)}},events:{changeProject:function(e,t){return localStorage.selectedProject=t.uuid,localStorage.selectedTeam=e.uuid,this.$broadcast("changeProject",e,t)},leftTeam:function(e){return this.$broadcast("leftTeam",e)},changeTheme:function(e){return this.switchTheme(e)},toggleSchedule:function(e){return this.theme.hasSchedule=e,localStorage.hasSchedule=e,e?this.setCountdownToThemeSwitch():clearTimeout(this.timer)}}}),s=f.component("navbar",h),d=f.component("signin-component",d),p=f.component("signup-component",p),u=f.component("delete-popup",o),a=f.component("popup",m),n=f.component("dashboard-component",n),g=f.component("tasks-component",g),r=f.component("mockups-component",r),c=f.component("mockup-component",c),t=f.component("chat-component",t),v=f.component("teams-component",v),i=f.component("jointeam-component",i),l=f.component("settings-component",l),q=new S,q.redirect({"/":"/signin"}),q.map({"/signin":{component:d},"/signup":{component:p},"/dashboard":{component:n},"/tasks":{component:g},"/mockups":{component:r},"/mockups/:id":{component:c},"/chat":{component:t},"/teams":{component:v},"/joinTeam":{component:i},"/settings":{component:l}}),q.start(e,"#app")}).call(this);