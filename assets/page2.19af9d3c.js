import{_ as N}from"./index.b2540121.js";import{r as c,l as w,f as n,o as P,c as Z,g as e,w as o,u as l,p as $,b as j,m as D,C as H,n as L,a as v,e as m}from"./vendor.32aea718.js";const T=s=>{!s||s.validate(_=>{if(_)console.log("submit!");else return console.log("error submit!"),!1})},W=s=>{!s||s.resetFields()};const y=s=>($("data-v-928dd604"),s=s(),j(),s),G={class:"page2"},J=y(()=>v("div",{class:"test-btn"},"test",-1)),K=y(()=>v("span",{class:"text-gray-500"},"-",-1)),M=m("Create"),Q=m("Reset"),X=m("el-popover"),Y=y(()=>v("span",null," Some content ",-1)),E=m("\u8FD4\u56DE\u9996\u9875"),ee={setup(s){const _=c(""),f=c(),a=w({name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}),R=w({name:[{required:!0,message:"Please input Activity name",trigger:"blur"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],region:[{required:!0,message:"Please select Activity zone",trigger:"change"}],date1:[{type:"date",required:!0,message:"Please pick a date",trigger:"change"}],date2:[{type:"date",required:!0,message:"Please pick a time",trigger:"change"}],type:[{type:"array",required:!0,message:"Please select at least one activity type",trigger:"change"}],resource:[{required:!0,message:"Please select activity resource",trigger:"change"}],desc:[{required:!0,message:"Please input activity form",trigger:"blur"}]}),b=c(),V=c(),q=()=>{var d,t;(t=(d=l(V).popperRef)==null?void 0:d.delayHide)==null||t.call(d)};return(d,t)=>{const k=n("el-input"),i=n("el-form-item"),h=n("el-option"),A=n("el-select"),C=n("el-date-picker"),g=n("el-col"),U=n("el-time-picker"),F=n("el-switch"),p=n("el-checkbox"),S=n("el-checkbox-group"),x=n("el-radio"),z=n("el-radio-group"),u=n("el-button"),I=n("el-popover"),B=n("el-form"),O=n("router-link");return P(),Z("div",G,[J,e(B,{ref_key:"ruleFormRef",ref:f,model:l(a),rules:l(R),"label-width":"120px",class:"demo-ruleForm",size:_.value},{default:o(()=>[e(i,{label:"Activity name",prop:"name"},{default:o(()=>[e(k,{modelValue:l(a).name,"onUpdate:modelValue":t[0]||(t[0]=r=>l(a).name=r)},null,8,["modelValue"])]),_:1}),e(i,{label:"Activity zone",prop:"region"},{default:o(()=>[e(A,{modelValue:l(a).region,"onUpdate:modelValue":t[1]||(t[1]=r=>l(a).region=r),placeholder:"Activity zone","popper-append-to-body":!1},{default:o(()=>[e(h,{label:"Zone one",value:"shanghai"}),e(h,{label:"Zone two",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"Activity time",required:""},{default:o(()=>[e(g,{span:11},{default:o(()=>[e(i,{prop:"date1"},{default:o(()=>[e(C,{modelValue:l(a).date1,"onUpdate:modelValue":t[2]||(t[2]=r=>l(a).date1=r),type:"date",placeholder:"Pick a date",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1}),e(g,{class:"text-center",span:2},{default:o(()=>[K]),_:1}),e(g,{span:11},{default:o(()=>[e(i,{prop:"date2"},{default:o(()=>[e(U,{modelValue:l(a).date2,"onUpdate:modelValue":t[3]||(t[3]=r=>l(a).date2=r),placeholder:"Pick a time",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(i,{label:"Instant delivery",prop:"delivery"},{default:o(()=>[e(F,{modelValue:l(a).delivery,"onUpdate:modelValue":t[4]||(t[4]=r=>l(a).delivery=r)},null,8,["modelValue"])]),_:1}),e(i,{label:"Activity type",prop:"type"},{default:o(()=>[e(S,{modelValue:l(a).type,"onUpdate:modelValue":t[5]||(t[5]=r=>l(a).type=r)},{default:o(()=>[e(p,{label:"Online activities",name:"type"}),e(p,{label:"Promotion activities",name:"type"}),e(p,{label:"Offline activities",name:"type"}),e(p,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"Resources",prop:"resource"},{default:o(()=>[e(z,{modelValue:l(a).resource,"onUpdate:modelValue":t[6]||(t[6]=r=>l(a).resource=r)},{default:o(()=>[e(x,{label:"Sponsorship"}),e(x,{label:"Venue"})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"Activity form",prop:"desc"},{default:o(()=>[e(k,{modelValue:l(a).desc,"onUpdate:modelValue":t[7]||(t[7]=r=>l(a).desc=r),type:"textarea"},null,8,["modelValue"])]),_:1}),e(i,null,{default:o(()=>[e(u,{type:"primary",onClick:t[8]||(t[8]=r=>l(T)(f.value))},{default:o(()=>[M]),_:1}),e(u,{onClick:t[9]||(t[9]=r=>l(W)(f.value))},{default:o(()=>[Q]),_:1}),D((P(),L(u,{ref_key:"buttonRef",ref:b},{default:o(()=>[X]),_:1})),[[l(H),q]]),e(I,{ref_key:"popoverRef",ref:V,"virtual-ref":b.value,trigger:"click",title:"With title","virtual-triggering":""},{default:o(()=>[Y]),_:1},8,["virtual-ref"])]),_:1})]),_:1},8,["model","rules","size"]),e(O,{to:"/"},{default:o(()=>[e(u,{type:"primary",plain:""},{default:o(()=>[E]),_:1})]),_:1})])}}};var le=N(ee,[["__scopeId","data-v-928dd604"]]);export{le as default};
