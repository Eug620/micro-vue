import{u as e,L as a,T as t,a as l,s,i as n,b as u,c as o,d}from"http://47.93.229.170:8081/assets/index.e132cbdd.js";import{d as m,r as i,k as r,ao as f,ad as c,aI as v,b as _,$ as h,a7 as y,ag as k,ak as p,a6 as g,v as b,e as C,al as V,au as j,a8 as w,A as x,am as I,an as $,ah as A,c as L,aM as M,aN as O,aO as P,m as T,w as S,_ as U,aP as z,av as B,aQ as E,a5 as H,aR as K,aS as N}from"http://47.93.229.170:8081/assets/acro-design.11e8372c.js";import"./lodash.e19b6f4f.js";import"./highlight.f408fb22.js";import"./bytemd.420c8372.js";const Q=m({__name:"index",setup(l){const s=e(),n=i(!1),u=r({lang:s.lang,theme:s.theme});document.addEventListener("keydown",(e=>{e.ctrlKey&&84===e.keyCode&&O()}));const o=e=>{s.setLang(e)},d=e=>{s.setTheme(e)},m=()=>{M()},L=()=>{M()},M=()=>{n.value=!1},O=()=>{n.value=!0};return x("close",M),x("open",O),(e,l)=>{const i=f,r=I,x=$,M=A,O=c,P=v;return _(),h(P,{width:"50%",visible:n.value,onOk:m,onCancel:L,unmountOnClose:""},{title:y((()=>[k(p(e.$t("vue.creativeWork.drawerTitle")),1)])),default:y((()=>[g(O,{model:u,layout:"vertical"},{default:y((()=>[g(i,{orientation:"left"},{default:y((()=>[k("System Config")])),_:1}),g(M,{field:"lang",label:"语言切换"},{default:y((()=>[g(x,{type:"button",modelValue:u.lang,"onUpdate:modelValue":l[0]||(l[0]=e=>u.lang=e),"default-value":b(s).lang,onChange:o},{default:y((()=>[(_(!0),C(V,null,j(b(a),(e=>(_(),h(r,{value:e,key:e},{default:y((()=>[k(p(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue","default-value"])])),_:1}),g(M,{field:"theme",label:"主题切换"},{default:y((()=>[g(x,{type:"button","default-value":b(s).theme,modelValue:u.theme,"onUpdate:modelValue":l[1]||(l[1]=e=>u.theme=e),onChange:d},{default:y((()=>[(_(!0),C(V,null,j(b(t),(e=>(_(),h(r,{value:e,key:e},{default:y((()=>[k(p(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["default-value","modelValue"])])),_:1}),w(e.$slots,"default")])),_:3},8,["model"])])),_:3},8,["visible"])}}}),R=m({__name:"BaseHeader",setup(e){const a=l(),{getMenus:t}=s(a),o=L((()=>[...n,...t.value])),d=u(),m=e=>{d.push({name:e})};return(e,a)=>{const t=P,l=M;return _(),h(l,{mode:"horizontal","selected-keys":[e.$route.name],onMenuItemClick:m},{default:y((()=>[(_(!0),C(V,null,j(b(o),(e=>(_(),h(t,{key:e.name},{icon:y((()=>[(_(),h(O(e.meta.icon)))])),default:y((()=>{var a;return[k(" "+p((null==(a=e.meta)?void 0:a.title)||e.name),1)]})),_:2},1024)))),128))])),_:1},8,["selected-keys"])}}}),W={key:0,class:"animate__animated animate__fadeIn"},q={class:"animate__animated animate__fadeIn"},D=m({__name:"index",setup(e){const a=i(null),t=o(),{mitt:l}=s(t);l.value.on("setting",(e=>{a.value=T(e)}));const n=d();return S(n,(e=>{a.value=null})),(e,t)=>{const l=K,s=U("router-view"),n=N,u=z,o=Q;return _(),C(V,null,[g(u,{class:"chat-layout"},{default:y((()=>[g(l,{class:"chat-layout-header"},{default:y((()=>[g(R)])),_:1}),g(n,{class:"chat-layout-container"},{default:y((()=>[g(s,null,{default:y((({Component:e,route:a})=>[a.meta.keepAlive?B("",!0):(_(),C("div",W,[(_(),h(O(e),{key:a.fullPath}))])),a.meta.keepAlive?(_(),h(E,{key:1},[H("div",q,[(_(),h(O(e),{key:a.fullPath}))])],1024)):B("",!0)])),_:1})])),_:1})])),_:1}),g(o,null,{default:y((()=>[(_(),h(O(a.value)))])),_:1})],64)}}});export{D as default};
