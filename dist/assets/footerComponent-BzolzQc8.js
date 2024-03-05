import{c as n,a as t,b as w,F as $,r as S,t as r,g as u,k as m,d as v,n as p,l as V,j as g,o as l,p as C,f as y,e as x}from"./index-BTLAiogN.js";const A={props:{isVisible:Boolean,objAdded:Array},data(){return{cartItems:[]}},emits:["toggleCart","removeItem","clearCart"],methods:{increaseQuantity(a){this.cartItems[a].quantity<this.cartItems[a].stock&&this.cartItems[a].quantity++},decreaseQuantity(a){this.cartItems[a].quantity>1&&this.cartItems[a].quantity--},calculateSubtotal(){let a=0;for(const e of this.cartItems){const o=e.price*e.quantity,b=o*e.discountPercentage/100;a+=o-b}return a.toFixed(2)},toggleCartVisibility(){this.$emit("toggleCart"),this.objAdded.length>0&&(this.cartItems=this.objAdded)},removeItem(a){this.cartItems.splice(a,1),this.$emit("removeItem",a)},clearCart(){this.cartItems=[],this.$emit("clearCart")},closeCart(){this.$emit("toggleCart")}}},q="/vue-ecommerce/assets/empty_cart-BIu1O69-.svg",I=(a,e)=>{const o=a.__vccOpts||a;for(const[b,d]of e)o[b]=d;return o},c=a=>(C("data-v-c02216ca"),a=a(),y(),a),P=c(()=>t("i",{class:"bi bi-cart-fill icon"},null,-1)),j=[P],T={key:0,class:"overlay"},R={class:"d-flex justify-content-between align-items-center m-3"},L=c(()=>t("h4",null,"Your shopping list",-1)),N={class:"items-list"},B={key:0},D=["onClick"],F=["src","alt"],E=c(()=>t("strong",null,"Brand: ",-1)),O={style:{color:"#fba834"}},Q={key:0},Y={class:"quantity-controls"},z=["onClick","disabled"],U=["onClick","disabled"],M={class:"position-absolute bottom-0"},W=c(()=>t("hr",null,null,-1)),G={class:"d-flex justify-content-between mx-4"},J=c(()=>t("h5",null,"Subtotal",-1)),H=c(()=>t("i",{class:"bi bi-box-arrow-right"},null,-1)),K=c(()=>t("i",{class:"bi bi-trash3"},null,-1)),X={key:1,class:"shop--no--products"},Z=c(()=>t("div",{class:"text-center"},[t("span",null,"There are no products in the cart."),t("hr"),t("img",{src:q,width:"150"})],-1)),tt=[Z];function at(a,e,o,b,d,i){const h=g("RouterLink");return l(),n($,null,[t("a",{class:"icon-link m-2 shop--icon",onClick:e[0]||(e[0]=(...s)=>i.toggleCartVisibility&&i.toggleCartVisibility(...s))},j),o.isVisible?(l(),n("div",T)):w("",!0),t("div",{class:p(["cart-sidebar text-white",{visible:o.isVisible}]),onClick:e[3]||(e[3]=V((...s)=>i.closeCart&&i.closeCart(...s),["self"]))},[t("div",R,[L,t("i",{class:"bi bi-x-circle-fill fs-3",onClick:e[1]||(e[1]=(...s)=>i.closeCart&&i.closeCart(...s))})]),t("div",N,[d.cartItems.length>0?(l(),n("div",B,[(l(!0),n($,null,S(d.cartItems,(s,_)=>(l(),n("div",{key:_,class:"d-flex shop--list--products"},[t("i",{class:"bi bi-x-square fs-5 mt-4 me-1",style:{color:"red"},onClick:k=>i.removeItem(_)},null,8,D),t("div",null,[t("img",{src:s.thumbnail,alt:s.title,class:"card-img-top",width:"50",height:"50"},null,8,F),t("p",null,[E,v(r(s.brand),1)])]),t("div",null,[t("h6",null,r(s.title),1),t("p",O,[v("$"+r(s.price)+" USD ",1),s.discountPercentage>0?(l(),n("span",Q," - "+r(s.discountPercentage)+" %",1)):w("",!0)]),t("div",Y,[t("button",{onClick:k=>i.decreaseQuantity(_),disabled:s.quantity===1,style:{"border-radius":"100%","font-size":"10px"}},"-",8,z),t("span",null,r(s.quantity),1),t("button",{onClick:k=>i.increaseQuantity(_),disabled:s.quantity===s.stock,style:{"border-radius":"100%","font-size":"10px"}},"+",8,U)])])]))),128)),t("div",M,[W,t("div",G,[J,t("h5",null,"$ "+r(i.calculateSubtotal())+" USD",1)]),u(h,{to:"/shopping-cart",class:"btn btn-primary mx-4",style:{width:"250px"}},{default:m(()=>[v("Go to shopping cart "),H]),_:1}),t("button",{class:"btn btn-danger m-4",style:{width:"250px"},onClick:e[2]||(e[2]=(...s)=>i.clearCart&&i.clearCart(...s))},[K,v(" Empty Cart")])])])):(l(),n("div",X,tt))])],2)],64)}const st=I(A,[["render",at],["__scopeId","data-v-c02216ca"]]),et="/vue-ecommerce/assets/logo-jIDqmhY3.svg",it={name:"Menu",components:{shoppingCart:st},props:{itemsAdded:Array},data(){return{isCartVisible:!1}},methods:{toggleCartVisibility(){this.isCartVisible=!this.isCartVisible},handleRemoveItem(a){this.$emit("removeItem",a)},handleClearCart(){this.$emit("clearCart")}}},f=a=>(C("data-v-1abad71a"),a=a(),y(),a),ot={class:"navbar-dark bg-dark"},nt={class:"d-flex row"},lt=x('<div class="d-flex justify-content-around align-items-center p-3 hea--component" data-v-1abad71a><div class="mx-2" data-v-1abad71a><img src="'+et+'" width="50" class="image-transition" data-v-1abad71a></div><form class="input-group px-2 hea--search" data-v-1abad71a><input type="text" class="form-control" placeholder="Search products, brands and more" data-v-1abad71a><button class="btn btn-outline-light" type="button" data-v-1abad71a>Search</button></form><div class="px-2" data-v-1abad71a><button class="btn btn-outline-light" data-v-1abad71a>Login</button></div></div>',1),ct={class:"d-flex align-items-center justify-content-between"},rt={class:"nav"},dt=f(()=>t("button",{class:"btn btn-primary"},"Products",-1)),bt=f(()=>t("button",{class:"btn btn-primary"},"Promotions",-1)),ht=f(()=>t("button",{class:"btn btn-primary"},"Contact",-1)),ut={class:"d-flex align-items-center mx-2"},vt=f(()=>t("a",{href:"#",class:"icon-link me-5"},[t("i",{class:"bi bi-bell-fill icon"})],-1));function _t(a,e,o,b,d,i){const h=g("RouterLink"),s=g("shoppingCart");return l(),n("header",ot,[t("div",nt,[lt,t("div",ct,[t("ul",rt,[u(h,{class:p(["nav-item",{active:a.$route.path==="/"}]),to:"/"},{default:m(()=>[dt]),_:1},8,["class"]),u(h,{class:p(["nav-item",{active:a.$route.path==="/promotions"}]),to:"/promotions"},{default:m(()=>[bt]),_:1},8,["class"]),u(h,{class:p(["nav-item",{active:a.$route.path==="/contact"}]),to:"/contact"},{default:m(()=>[ht]),_:1},8,["class"])]),t("div",ut,[vt,u(s,{"is-visible":d.isCartVisible,onToggleCart:i.toggleCartVisibility,objAdded:o.itemsAdded,onRemoveItem:i.handleRemoveItem,onClearCart:i.handleClearCart},null,8,["is-visible","onToggleCart","objAdded","onRemoveItem","onClearCart"])])])])])}const wt=I(it,[["render",_t],["__scopeId","data-v-1abad71a"]]),mt={},pt=a=>(C("data-v-6a0754b7"),a=a(),y(),a),ft={class:"footer"},gt=x('<div class="footer-container" data-v-6a0754b7><div class="footer-section" data-v-6a0754b7><h3 data-v-6a0754b7>Subscribe to our newsletter</h3><input type="email" class="form-control" placeholder="Enter your email" data-v-6a0754b7><br data-v-6a0754b7><button class="btn btn-primary" data-v-6a0754b7>Subscribe</button></div><div class="footer-section" data-v-6a0754b7><h3 data-v-6a0754b7>Navigation</h3><ul data-v-6a0754b7><li data-v-6a0754b7><a href="/" data-v-6a0754b7>Start</a></li><li data-v-6a0754b7><a href="#" data-v-6a0754b7>Products</a></li><li data-v-6a0754b7><a href="#" data-v-6a0754b7>Frequent questions</a></li><li data-v-6a0754b7><a href="#" data-v-6a0754b7>Privacy Policy</a></li><li data-v-6a0754b7><a href="#" data-v-6a0754b7>Terms and Conditions</a></li></ul></div><div class="footer-section" data-v-6a0754b7><h3 data-v-6a0754b7>Contact us</h3><p data-v-6a0754b7>Address: [Address]</p><p data-v-6a0754b7>Phone: [Phone]</p><p data-v-6a0754b7>E-mail: [E-mail]</p></div><div class="footer-section" data-v-6a0754b7><h3 data-v-6a0754b7>Follow us</h3><div class="social-icons" data-v-6a0754b7><a href="#" class="social-icon" title="Facebook" data-v-6a0754b7><i class="bi bi-facebook" data-v-6a0754b7></i></a><a href="#" class="social-icon" title="Twitter" data-v-6a0754b7><i class="bi bi-twitter" data-v-6a0754b7></i></a><a href="#" class="social-icon" title="Instagram" data-v-6a0754b7><i class="bi bi-instagram" data-v-6a0754b7></i></a><a href="#" class="social-icon" title="WhatsApp" data-v-6a0754b7><i class="bi bi-whatsapp" data-v-6a0754b7></i></a></div></div></div>',1),Ct={class:"footer-bottom"},yt=pt(()=>t("p",null,[t("a",{href:"#"},"Cookies policy"),v(" | "),t("a",{href:"#"},"Legal warning")],-1));function It(a,e){return l(),n("footer",ft,[gt,t("div",Ct,[t("p",null,"© "+r(new Date().getFullYear())+" Welker José Pérez Acero. All rights reserved.",1),yt])])}const $t=I(mt,[["render",It],["__scopeId","data-v-6a0754b7"]]);export{I as _,$t as f,wt as h,st as s};