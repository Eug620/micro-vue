import{u as e,L as a,T as l,a as t,s,i as n,b as u,c as o,d}from"http://47.93.229.170:8081/assets/index.d2f79e21.js";import{d as m,r as i,j as f,ao as r,ai as c,aI as _,b as v,_ as h,a7 as y,af as p,ak as g,a6 as k,v as b,e as C,au as j,al as V,a8 as w,A as x,an as I,ag as $,am as A,c as L,aM as M,aN as O,aO as P,m as T,w as K,aP as S,av as U,aQ as z,aR as B,$ as E,aS as H}from"http://47.93.229.170:8081/assets/acro-design.3beefd98.js";import"./lodash.e19b6f4f.js";import"./highlight.f408fb22.js";import"./bytemd.7f457dfd.js";const N=m({__name:"index",setup(t){const s=e(),n=i(!1),u=f({lang:s.lang,theme:s.theme});document.addEventListener("keydown",(e=>{e.altKey&&e.ctrlKey&&84===e.keyCode&&O()}));const o=e=>{s.setLang(e)},d=e=>{s.setTheme(e)},m=()=>{M()},L=()=>{M()},M=()=>{n.value=!1},O=()=>{n.value=!0};return x("close",M),x("open",O),(e,t)=>{const i=r,f=A,x=I,M=$,O=c,P=_;return v(),h(P,{width:"50%",visible:n.value,onOk:m,onCancel:L,"mask-closable":!1,footer:!1,unmountOnClose:""},{title:y((()=>[p(g(e.$t("vue.creativeWork.drawerTitle")),1)])),default:y((()=>[k(O,{model:u,layout:"vertical"},{default:y((()=>[k(i,{orientation:"left"},{default:y((()=>[p("System Config")])),_:1}),k(M,{field:"lang",label:"语言切换"},{default:y((()=>[k(x,{type:"button",modelValue:u.lang,"onUpdate:modelValue":t[0]||(t[0]=e=>u.lang=e),"default-value":b(s).lang,onChange:o},{default:y((()=>[(v(!0),C(V,null,j(b(a),(e=>(v(),h(f,{value:e,key:e},{default:y((()=>[p(g(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue","default-value"])])),_:1}),k(M,{field:"theme",label:"主题切换"},{default:y((()=>[k(x,{type:"button","default-value":b(s).theme,modelValue:u.theme,"onUpdate:modelValue":t[1]||(t[1]=e=>u.theme=e),onChange:d},{default:y((()=>[(v(!0),C(V,null,j(b(l),(e=>(v(),h(f,{value:e,key:e},{default:y((()=>[p(g(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["default-value","modelValue"])])),_:1}),w(e.$slots,"default")])),_:3},8,["model"])])),_:3},8,["visible"])}}}),Q=m({__name:"BaseHeader",setup(e){const a=t(),{getMenus:l}=s(a),o=L((()=>[...n,...l.value])),d=u(),m=e=>{d.push({name:e})};return(e,a)=>{const l=P,t=M;return v(),h(t,{mode:"horizontal","selected-keys":[e.$route.name],onMenuItemClick:m},{default:y((()=>[(v(!0),C(V,null,j(b(o),(e=>(v(),h(l,{key:e.name},{icon:y((()=>[(v(),h(O(e.meta.icon)))])),default:y((()=>{var a;return[p(" "+g((null==(a=e.meta)?void 0:a.title)||e.name),1)]})),_:2},1024)))),128))])),_:1},8,["selected-keys"])}}}),R=m({__name:"index",setup(e){const a=i(null),l=o(),{mitt:t}=s(l);t.value.on("setting",(e=>{a.value=T(e)}));const n=d();return K(n,(e=>{a.value=null})),(e,l)=>{const t=B,s=E("router-view"),n=H,u=S,o=N;return v(),C(V,null,[k(u,{class:"chat-layout"},{default:y((()=>[k(t,{class:"chat-layout-header"},{default:y((()=>[k(Q)])),_:1}),k(n,{class:"chat-layout-container"},{default:y((()=>[k(s,null,{default:y((({Component:e,route:a})=>[a.meta.keepAlive?U("",!0):(v(),h(O(e),{key:a.fullPath,class:"animate__animated animate__fadeIn"})),(v(),h(z,null,[a.meta.keepAlive?(v(),h(O(e),{key:a.fullPath,class:"animate__animated animate__fadeIn"})):U("",!0)],1024))])),_:1})])),_:1})])),_:1}),k(o,null,{default:y((()=>[(v(),h(O(a.value)))])),_:1})],64)}}});export{R as default};