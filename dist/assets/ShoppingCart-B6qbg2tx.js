import{_ as S,h,f as C}from"./footerComponent-N6OYSSlE.js";import{c as p,g as l,a as t,n as d,b as a,F as v,j as u,o as c,p as f,f as k}from"./index-DPfQL411.js";const b={name:"shopping-cart",components:{headerComponent:h,footerComponent:C},data(){return{currentStep:1}},methods:{nextStep(){this.currentStep<3&&this.currentStep++},prevStep(){this.currentStep>1&&this.currentStep--}}},i=r=>(f("data-v-c7b15623"),r=r(),k(),r),g={class:"shopping-cart"},x={class:"step-indicator"},I={class:"step"},A=i(()=>t("span",null,"Shopping Cart",-1)),y={class:"step"},B=i(()=>t("span",null,"Shipping Information",-1)),N={class:"step"},V=i(()=>t("span",null,"Confirm Purchase",-1)),F={class:"step-content"},j={key:0},w={key:1},z={key:2},E=i(()=>t("button",null,"Confirmar Compra",-1));function P(r,e,q,D,s,n){const _=u("headerComponent"),m=u("footerComponent");return c(),p(v,null,[l(_,{itemsAdded:r.itemStoredInCart},null,8,["itemsAdded"]),t("div",g,[t("div",x,[t("div",I,[t("div",{class:d({completed:s.currentStep>=1})},"1",2),A]),t("div",y,[t("div",{class:d({completed:s.currentStep>=2})},"2",2),B]),t("div",N,[t("div",{class:d({completed:s.currentStep>=3})},"3",2),V])]),t("div",F,[s.currentStep===1?(c(),p("div",j,[t("button",{onClick:e[0]||(e[0]=(...o)=>n.nextStep&&n.nextStep(...o))},"Continuar")])):a("",!0),s.currentStep===2?(c(),p("div",w,[t("button",{onClick:e[1]||(e[1]=(...o)=>n.prevStep&&n.prevStep(...o))},"Atrás"),t("button",{onClick:e[2]||(e[2]=(...o)=>n.nextStep&&n.nextStep(...o))},"Continuar")])):a("",!0),s.currentStep===3?(c(),p("div",z,[t("button",{onClick:e[3]||(e[3]=(...o)=>n.prevStep&&n.prevStep(...o))},"Atrás"),E])):a("",!0)])]),l(m)],64)}const J=S(b,[["render",P],["__scopeId","data-v-c7b15623"]]);export{J as default};
