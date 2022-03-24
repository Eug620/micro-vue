import{_ as e}from"./index.1427f9c8.js";import{r as l,l as a,f as t,o as r,c as d,g as o,w as i,u,p as s,b as n,m as p,C as c,n as m,a as f,e as g}from"./vendor.32aea718.js";const y=e=>{e&&e.validate((e=>{if(!e)return!1}))},v=e=>{e&&e.resetFields()};const b=e=>(s("data-v-928dd604"),e=e(),n(),e),_={class:"page2"},V=b((()=>f("div",{class:"test-btn"},"test",-1))),h=b((()=>f("span",{class:"text-gray-500"},"-",-1))),k=g("Create"),x=g("Reset"),P=g("el-popover"),q=b((()=>f("span",null," Some content ",-1))),A=g("返回首页");var U=e({setup(e){const s=l(""),n=l(),f=a({name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}),g=a({name:[{required:!0,message:"Please input Activity name",trigger:"blur"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],region:[{required:!0,message:"Please select Activity zone",trigger:"change"}],date1:[{type:"date",required:!0,message:"Please pick a date",trigger:"change"}],date2:[{type:"date",required:!0,message:"Please pick a time",trigger:"change"}],type:[{type:"array",required:!0,message:"Please select at least one activity type",trigger:"change"}],resource:[{required:!0,message:"Please select activity resource",trigger:"change"}],desc:[{required:!0,message:"Please input activity form",trigger:"blur"}]}),b=l(),U=l(),w=()=>{var e,l;null==(l=null==(e=u(U).popperRef)?void 0:e.delayHide)||l.call(e)};return(e,l)=>{const a=t("el-input"),R=t("el-form-item"),z=t("el-option"),C=t("el-select"),j=t("el-date-picker"),F=t("el-col"),S=t("el-time-picker"),I=t("el-switch"),O=t("el-checkbox"),Z=t("el-checkbox-group"),H=t("el-radio"),L=t("el-radio-group"),W=t("el-button"),B=t("el-popover"),D=t("el-form"),E=t("router-link");return r(),d("div",_,[V,o(D,{ref_key:"ruleFormRef",ref:n,model:u(f),rules:u(g),"label-width":"120px",class:"demo-ruleForm",size:s.value},{default:i((()=>[o(R,{label:"Activity name",prop:"name"},{default:i((()=>[o(a,{modelValue:u(f).name,"onUpdate:modelValue":l[0]||(l[0]=e=>u(f).name=e)},null,8,["modelValue"])])),_:1}),o(R,{label:"Activity zone",prop:"region"},{default:i((()=>[o(C,{modelValue:u(f).region,"onUpdate:modelValue":l[1]||(l[1]=e=>u(f).region=e),placeholder:"Activity zone","popper-append-to-body":!1},{default:i((()=>[o(z,{label:"Zone one",value:"shanghai"}),o(z,{label:"Zone two",value:"beijing"})])),_:1},8,["modelValue"])])),_:1}),o(R,{label:"Activity time",required:""},{default:i((()=>[o(F,{span:11},{default:i((()=>[o(R,{prop:"date1"},{default:i((()=>[o(j,{modelValue:u(f).date1,"onUpdate:modelValue":l[2]||(l[2]=e=>u(f).date1=e),type:"date",placeholder:"Pick a date",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1}),o(F,{class:"text-center",span:2},{default:i((()=>[h])),_:1}),o(F,{span:11},{default:i((()=>[o(R,{prop:"date2"},{default:i((()=>[o(S,{modelValue:u(f).date2,"onUpdate:modelValue":l[3]||(l[3]=e=>u(f).date2=e),placeholder:"Pick a time",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),o(R,{label:"Instant delivery",prop:"delivery"},{default:i((()=>[o(I,{modelValue:u(f).delivery,"onUpdate:modelValue":l[4]||(l[4]=e=>u(f).delivery=e)},null,8,["modelValue"])])),_:1}),o(R,{label:"Activity type",prop:"type"},{default:i((()=>[o(Z,{modelValue:u(f).type,"onUpdate:modelValue":l[5]||(l[5]=e=>u(f).type=e)},{default:i((()=>[o(O,{label:"Online activities",name:"type"}),o(O,{label:"Promotion activities",name:"type"}),o(O,{label:"Offline activities",name:"type"}),o(O,{label:"Simple brand exposure",name:"type"})])),_:1},8,["modelValue"])])),_:1}),o(R,{label:"Resources",prop:"resource"},{default:i((()=>[o(L,{modelValue:u(f).resource,"onUpdate:modelValue":l[6]||(l[6]=e=>u(f).resource=e)},{default:i((()=>[o(H,{label:"Sponsorship"}),o(H,{label:"Venue"})])),_:1},8,["modelValue"])])),_:1}),o(R,{label:"Activity form",prop:"desc"},{default:i((()=>[o(a,{modelValue:u(f).desc,"onUpdate:modelValue":l[7]||(l[7]=e=>u(f).desc=e),type:"textarea"},null,8,["modelValue"])])),_:1}),o(R,null,{default:i((()=>[o(W,{type:"primary",onClick:l[8]||(l[8]=e=>u(y)(n.value))},{default:i((()=>[k])),_:1}),o(W,{onClick:l[9]||(l[9]=e=>u(v)(n.value))},{default:i((()=>[x])),_:1}),p((r(),m(W,{ref_key:"buttonRef",ref:b},{default:i((()=>[P])),_:1})),[[u(c),w]]),o(B,{ref_key:"popoverRef",ref:U,"virtual-ref":b.value,trigger:"click",title:"With title","virtual-triggering":""},{default:i((()=>[q])),_:1},8,["virtual-ref"])])),_:1})])),_:1},8,["model","rules","size"]),o(E,{to:"/"},{default:i((()=>[o(W,{type:"primary",plain:""},{default:i((()=>[A])),_:1})])),_:1})])}}},[["__scopeId","data-v-928dd604"]]);export{U as default};
