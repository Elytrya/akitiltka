import{_ as h,v as c,x as t,L as l,y as a,M as _,B as u,N as m,t as i}from"./DKaWNbbP.js";const v=window.setInterval,g={data(){return{track:null,error:null,intervalId:null,gradientColors:{color1:"#222",color2:"#444"},titleColor:"#fff",backgroundImageUrl:""}},computed:{progressWidth(){return this.track&&this.track.duration_ms?`${this.track.progress_ms/this.track.duration_ms*100}%`:"0%"},musicBoxGradient(){return{backgroundImage:`linear-gradient(135deg, ${this.gradientColors.color1}, ${this.gradientColors.color2}), url(${this.backgroundImageUrl})`,transition:"background-image 1s ease"}}},mounted(){this.fetchCurrentTrack(),this.intervalId=v(this.fetchCurrentTrack,1e3)},beforeDestroy(){clearInterval(this.intervalId)},methods:{async fetchCurrentTrack(){try{let r=await fetch("http://127.0.0.1:5000/current-track");r.status===401&&(await this.refreshToken(),r=await fetch("http://127.0.0.1:5000/current-track"));const s=await r.json();if(s.error)this.error=s.error,this.track=null;else{this.track=s.track,this.error=null;const e=document.querySelector(".music-box img");e&&this.extractColorsFromCover(e.src)}}catch(r){this.error="Ошибка при получении данных",console.error("Error fetching current track:",r)}},async extractColorsFromCover(r){try{const s=await fetch(`http://localhost:3001/extract-colors?url=${encodeURIComponent(r)}`);if(!s.ok)throw new Error("Network response was not ok");const e=await s.json();this.updateGradient(e.vibrant,e.muted)}catch(s){console.error("Error extracting colors:",s)}},updateGradient(r,s){this.gradientColors.color1=r,this.gradientColors.color2=s},formatTime(r){const s=Math.floor(r/6e4),e=Math.floor(r%6e4/1e3);return`${s}:${e<10?"0":""}${e}`}}},p={class:"container"},k=m('<div class="main-position"><h1 class="title" data-text=""> Привет! Я <span class="title-name">@Elytrya__</span></h1><p>Веб разработчик из России. Разработчик ботов. Пишу разные вещи на Python, JS.</p><div class="links-position"><div class="buttons-row"><a href="/projects" class="blob-btn">Мои проекты</a><a href="/socials" class="blob-btn">Мои соц.сети</a></div><div class="buttons-row"><a href="/skills" class="blob-btn">Мои скиллы</a></div></div></div>',1),f={class:"right-position"},w=t("div",{class:"stars"},null,-1),y=t("h1",null,"Сейчас слушаю:",-1),C={key:0},b=["src"],x={class:"status-container"},I={key:0,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",class:"animated-icon"},S=t("path",{d:"m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.962,0-9-4.038-9-9S7.038,3,12,3s9,4.038,9,9-4.038,9-9,9Zm-1-11.5v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Zm5,0v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Z"},null,-1),B=[S],T={key:1,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",class:"animated-icon"},Z=t("path",{d:"m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.963,0-9-4.038-9-9S7.037,3,12,3s9,4.038,9,9-4.037,9-9,9Zm-3-13.5l8,4.5-8,4.5V7.5Z"},null,-1),E=[Z],N={class:"progress-container"},V={class:"time-info"},F={class:"current-time"},G={class:"remaining-time"},j=t("strong",null,"Автор:",-1),M={key:1},U={key:2},D=t("p",null,"Загрузка...",-1),L=[D],W=t("footer",null,[t("p",null,"Copyright © 2024 Elytrya__. Все права съедены.")],-1);function q(r,s,e,z,o,n){return i(),c("div",p,[k,t("div",f,[t("div",{class:"music-box",style:l(n.musicBoxGradient)},[w,y,o.track?(i(),c("div",C,[t("h3",{style:l({color:o.titleColor}),class:"animated-title"},a(o.track.title),5),o.track.cover?(i(),c("img",{key:0,src:o.track.cover,alt:"Обложка альбома",onLoad:s[0]||(s[0]=(...d)=>n.extractColorsFromCover&&n.extractColorsFromCover(...d)),class:"album-cover"},null,40,b)):_("",!0),t("div",x,[o.track.is_playing?(i(),c("svg",I,B)):(i(),c("svg",T,E))]),t("div",N,[t("div",{class:"progress-bar",style:l({width:n.progressWidth})},null,4)]),t("div",V,[t("span",F,a(n.formatTime(o.track.progress_ms)),1),t("span",G,a(n.formatTime(o.track.duration_ms-o.track.progress_ms)),1)]),t("p",null,[j,u(" "+a(o.track.artist),1)])])):o.error?(i(),c("div",M,[t("p",null,a(o.error),1)])):(i(),c("div",U,L))],4),W])])}const P=h(g,[["render",q]]);export{P as default};