(function(){var e,t,n,i,o,s,r,u,c,a,l,d,h,m,g,f,p,b,w,S;w=window.require("electron").ipcRenderer,m=require("vue"),f=require("vue-router"),g=require("vue-async-data"),S=require("moment"),l=require("./space.js"),s=require("../vues/Navbar.vue"),c=require("../vues/SignIn.vue"),a=require("../vues/SignUp.vue"),t=require("../vues/DeletePopup.vue"),r=require("../vues/Popup.vue"),d=require("../vues/Tasks.vue"),o=require("../vues/Mockups.vue"),i=require("../vues/Mockup.vue"),e=require("../vues/Chat.vue"),h=require("../vues/Teams.vue"),n=require("../vues/JoinTeam.vue"),u=require("../vues/Settings.vue"),m.config.debug=!0,window.init=function(){var l,p,b,v,y;return m.use(f),m.use(g),l=m.extend({data:function(){return{settings:{usability:{theme:"light",hasSchedule:!1,isColorblind:!1}},timer:null,platform:""}},ready:function(){return this.platform=global.location.search.replace("?platform=",""),document.body.className=this.platform,document.querySelector("html").className="light",window.change=function(e){return function(t){var n;return 0===t&&(n="dark"),1===t&&(n="light"),e.switchTheme(n)}}(this),w.on("switchTheme",function(e){return function(t,n){return e.switchTheme(n),e.$broadcast("themeChanged",n),socket.emit("user.settings.write",e.settings)}}(this)),w.on("toggleTheme",function(e){return function(t){var n;return n="light"===e.settings.usability.theme?"dark":"light",e.switchTheme(n),socket.emit("user.settings.write",e.settings),e.$broadcast("themeChanged",n)}}(this)),w.on("toggleSchedule",function(e){return function(t,n){return e.toggleSchedule(n),socket.emit("user.settings.write",e.settings)}}(this)),w.on("navigateToSettings",function(e){return function(t,n){if(localStorage.getItem("userId"))return e.$router.go("/settings")}}(this)),w.on("toggleColorblind",function(e){return function(t,n){return e.toggleColorblind(n),socket.emit("user.settings.write",e.settings)}}(this))},watch:{theme:function(e,t){return this.switchTheme(e)}},methods:{switchTheme:function(e){var t;return this.settings.usability.theme=e,document.querySelector("html").className=e,localStorage.settings&&(t=JSON.parse(localStorage.settings),t.usability.theme=e,localStorage.settings=JSON.stringify(t)),localStorage.selectedTheme=e,w.send("updateTheme",e)},setCountdownToThemeSwitch:function(){var e,t,n,i,o,s;return s=S(),n=S().hour(8).minute(0).second(0),t=S().hour(20).minute(0).second(0),s.isBefore(n)&&(e=n.diff(s),i="light",o={title:"Good morning!",body:"Turning the lights on."}),s.isSameOrAfter(n)&&(e=t.diff(s),i="dark",o={title:"It‘s getting late...",body:"Turning the lights off."}),s.isSameOrAfter(t)&&(e=n.add(1,"d").diff(s),i="light",o={title:"Good morning!",body:"Turning the lights on..."}),this.timer=setTimeout(function(e){return function(){return new Notification(o.title,{body:o.body,silent:!0}),setTimeout(function(){return e.switchTheme(i),e.$broadcast("themeChanged",i)},500),e.setCountdownToThemeSwitch()}}(this),e)},toggleSchedule:function(e){return this.settings.usability.hasSchedule=e,localStorage.hasSchedule=e,e?this.setCountdownToThemeSwitch():clearTimeout(this.timer),this.$broadcast("scheduleChanged",e),w.send("updateSchedule",e)},toggleColorblind:function(e){var t;if(this.settings.usability.isColorblind=e,localStorage.settings)return t=JSON.parse(localStorage.settings),t.usability.isColorblind=e,localStorage.settings=JSON.stringify(t),this.$broadcast("toggleColorblind",e),w.send("updateColorblind",e)},minimize:function(){return console.log("minimizing"),w.send("minimize")},maximize:function(){return console.log("maximizing"),w.send("maximize")},close:function(){return console.log("closing"),w.send("close")},showMenu:function(){return w.send("showMenu")}},events:{clearUnreadMessageCount:function(){return this.$broadcast("clearUnreadMessageCount")},changeProject:function(e,t){return localStorage.selectedProject=t.uuid,localStorage.selectedTeam=e.uuid,socket.emit("user.join",[t.uuid,e.uuid]),this.$broadcast("changeProject",e,t)},leftTeam:function(e){return this.$broadcast("leftTeam",e)},logout:function(){return this.$broadcast("logout")},changeTheme:function(e){return this.switchTheme(e)},toggleSchedule:function(e){return this.toggleSchedule(e)},toggleColorblind:function(e){return this.toggleColorblind(e)},notificationPreferenceChanged:function(e,t){return this.$broadcast("notificationPreferenceChanged",e,t)},error:function(e){return this.$broadcast("newError",e)},userConnected:function(){var e;if(e=JSON.parse(localStorage.settings),this.switchTheme(e.usability.theme),w.send("updateTheme",this.settings.usability.theme),null!==e.usability.hasSchedule&&(this.settings.usability.hasSchedule=e.usability.hasSchedule,w.send("updateSchedule",this.settings.usability.hasSchedule)),this.settings.usability.hasSchedule&&this.setCountdownToThemeSwitch(),null!==e.usability.isColorblind)return this.toggleColorblind(e.usability.isColorblind),w.send("updateColorblind",e.usability.isColorblind)},setBadge:function(e){return w.send("setBadge",e)},bounceIcon:function(){return w.send("bounceIcon")}}}),b=m.component("navbar",s),c=m.component("signin-component",c),a=m.component("signup-component",a),p=m.component("delete-popup",t),v=m.component("popup",r),d=m.component("tasks-component",d),o=m.component("mockups-component",o),i=m.component("mockup-component",i),e=m.component("chat-component",e),h=m.component("teams-component",h),n=m.component("jointeam-component",n),u=m.component("settings-component",u),y=new f,y.redirect({"/":"/signin"}),y.map({"/signin":{component:c},"/signup":{component:a},"/tasks":{component:d},"/mockups":{component:o},"/mockups/:id":{component:i},"/chat":{component:e},"/teams":{component:h},"/joinTeam":{component:n},"/settings":{component:u}}),y.start(l,"#app"),socket.on("disconnect",function(e){return function(){return new Notification("Whoops! Connection lost.",{body:"Please wait a moment...",silent:!0})}}(this)),socket.on("reconnect",function(e){return function(){return socket.emit("user.rejoin",localStorage.userId,[localStorage.selectedProject,localStorage.selectedTeam,localStorage.userId]),new Notification("We're good!",{body:"Connection to server established.",silent:!0})}}(this))},"undefined"==typeof io?(window.starfield&&window.starfield.isRunning||(window.starfield=new l,window.starfield.animate=function(){return window.starfield.iAnimationRequestId=window.requestAnimationFrame(window.starfield.animate),window.starfield.render()},window.starfield.isRunning=!0,window.starfield.animate()),"Win32"!==navigator.platform&&(document.getElementById("menu").style.display="none",document.getElementById("captionbutton").style.display="none"),p=document.createElement("div"),p.classList.add("no-server"),b=document.createElement("p"),b.classList.add("no-server__message"),b.innerHTML="Could not reach server! <br>Retrying in 5 seconds...",p.appendChild(b),document.body.appendChild(p),setTimeout(function(e){return function(){return window.location.reload()}}(this),5e3)):window.init()}).call(this);