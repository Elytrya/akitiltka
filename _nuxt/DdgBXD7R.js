import{_ as u,v as e,x as s,y as c,B as p,O as i,P as a,t as o}from"./DKaWNbbP.js";const h={data(){return{selectedProject:null,projects:[{id:1,name:"SpiderNodes",shortDescription:"Хостинг для дискорд и телеграм ботов",description:"SpiderNodes - это хостинг для дискорд/телеграм ботов и самп серверов.",languages:["Python","JavaScript"],status:"В разработке",icon:"https://i.imgur.com/LJ1j8l7.jpg",links:[{label:"Официальный сайт",url:"https://spidernodes.space"},{label:"Билинг панель",url:"https://my.spidernodes.space"}]},{id:2,name:"ShadowManager",shortDescription:"Бот для дискорда. Имеет много функций",description:"ShadowManager - многофункциональный бот для дискорда. Имеет много разных функций, такие как тикеты, модерация и другие.",languages:["Python"],status:"Заморожен",icon:"https://i.imgur.com/LN4EfFy.png",links:[{label:"Официальный сайт",url:"https://shadowmanager.space"},{label:"Документация",url:"https://docs.shadowmanager.space"}]},{id:3,name:"DepressionAI",shortDescription:"Дискорд бот с нейросетями.",description:`DepressionAI - бот с нейросетями. В данный момент умеет генерировать изображеня и текста. 
  В разработке.`,languages:["Python"],status:"В разработке",icon:"https://i.imgur.com/07n2N6N.jpg"}]}},methods:{selectProject(d){this.selectedProject=d},goBack(){this.selectedProject=null},goHome(){this.$router.push("/")}}},_={class:"projects-container"},g={key:0,class:"project-detail"},m={class:"selected-project"},j={class:"blog-header"},k={class:"gradient-text"},b={class:"project-status"},P={class:"blog-content"},v={class:"project-description"},y=s("strong",null,"Описание:",-1),f=s("p",{class:"project-languages"},[s("strong",null,"Языки программирования:")],-1),x=s("p",{class:"project-links"},[s("strong",null,"Ссылки:")],-1),B=["href"],D={class:"buttons"},N={key:1,class:"projects-list"},S=s("h1",{class:"page-title"},"Проекты",-1),C=s("p",{class:"page-subtitle"},"Выберите проект, чтобы узнать о нем больше",-1),H=["onClick"],w={class:"project-icon"},I=["src"],L={class:"project-info"},A={class:"gradient-text"},E={class:"project-status"};function F(d,r,J,M,n,l){return o(),e("div",_,[n.selectedProject?(o(),e("div",g,[s("div",m,[s("div",j,[s("h2",k,c(n.selectedProject.name),1),s("p",b,c(n.selectedProject.status),1)]),s("div",P,[s("p",v,[y,p(" "+c(n.selectedProject.description),1)]),f,s("ul",null,[(o(!0),e(i,null,a(n.selectedProject.languages,t=>(o(),e("li",{key:t,class:"gradient-text"},c(t),1))),128))]),x,s("ul",null,[(o(!0),e(i,null,a(n.selectedProject.links,t=>(o(),e("li",{key:t.url},[s("a",{href:t.url,target:"_blank"},c(t.label),9,B)]))),128))])])]),s("div",D,[s("button",{onClick:r[0]||(r[0]=(...t)=>l.goBack&&l.goBack(...t)),class:"back-button"},"Вернуться к проектам"),s("button",{onClick:r[1]||(r[1]=(...t)=>l.goHome&&l.goHome(...t)),class:"home-button"},"Вернуться на главную")])])):(o(),e("div",N,[S,C,(o(!0),e(i,null,a(n.projects,t=>(o(),e("div",{class:"project-card",key:t.id,onClick:V=>l.selectProject(t)},[s("div",w,[s("img",{src:t.icon,alt:"Project Icon"},null,8,I)]),s("div",L,[s("h3",A,c(t.name),1),s("p",null,c(t.shortDescription),1),s("span",E,c(t.status),1)])],8,H))),128)),s("button",{onClick:r[2]||(r[2]=(...t)=>l.goHome&&l.goHome(...t)),class:"home-button"},"Вернуться на главную")]))])}const T=u(h,[["render",F]]);export{T as default};
