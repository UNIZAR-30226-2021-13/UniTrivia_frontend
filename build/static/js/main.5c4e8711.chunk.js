(this["webpackJsonplogin-app-reactjs"]=this["webpackJsonplogin-app-reactjs"]||[]).push([[0],{119:function(e,a,t){e.exports=t(150)},124:function(e,a,t){},150:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(10),i=t.n(l),o=(t(124),t(6)),c=t(42),s=t(35),u=t(16),m=t.n(u),d=function(){var e=localStorage.getItem("user");return e?JSON.parse(e):null},p=function(){return localStorage.getItem("token")||null},g=function(){localStorage.removeItem("token"),localStorage.removeItem("user")},b=t(186),f=t(27),E=t(206),v=t(48),h=t.n(v),j=t(187),O=t(203),x=t(189),y=t(183),w=t(204),S=t(185),k=t(184);function C(){return r.a.createElement(f.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(y.a,{color:"inherit",href:"https://material-ui.com/"},"UniGames")," ",(new Date).getFullYear(),".")}var W=Object(k.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}}));var N=function(e){var a=Object(n.useState)(e),t=Object(o.a)(a,2),r=t[0],l=t[1];return{value:r,onChange:function(e){l(e.target.value)}}},T=function(e){var a=N(""),t=N(""),l=N(""),i=Object(n.useState)(null),c=Object(o.a)(i,2),s=c[0],u=c[1],d=Object(n.useState)(!1),p=Object(o.a)(d,2),g=p[0],v=p[1],y=Object(n.useState)(!1),k=Object(o.a)(y,2),T=k[0],I=k[1],P=Object(n.useState)(!1),q=Object(o.a)(P,2),R=q[0],U=q[1],z=W();return r.a.createElement(S.a,{component:"main",maxWidth:"xs",className:z.root},r.a.createElement(b.a,null),r.a.createElement("div",{className:z.paper},r.a.createElement(f.a,{component:"h1",variant:"h2"},"UniTrivia"),r.a.createElement(E.a,{className:z.avatar},r.a.createElement(h.a,null)),r.a.createElement(f.a,{component:"h1",variant:"h5"},"He olvidado mi contrase\xf1a"),r.a.createElement("form",{className:z.form,noValidate:!0},r.a.createElement(j.a,{container:!0,spacing:2},r.a.createElement(j.a,{item:!0,xs:12,spacing:2},r.a.createElement(O.a,Object.assign({error:g,autoComplete:"fname",name:"username",variant:"outlined",required:!0,fullWidth:!0,id:"username",label:"Usuario",autoFocus:!0},a,{helperText:g?"Introduzca el usuario":""}))),r.a.createElement(j.a,{item:!0,xs:12,spacing:2},r.a.createElement(x.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){try{""==a.value?v(!0):(v(!1),m.a.get("https://unitrivia.herokuapp.com/api/login/recover/question",{headers:{username:a.value}}).then((function(e){console.log(e),u(e.data)})).catch((function(e){alert("Error al recuperar pregunta, usuario no existe")})))}catch(e){alert(e.message)}}},"Recuperar pregunta")),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,{variant:"outlined",disabled:!0,fullWidth:!0,value:s,id:"question",name:"question",defaultValue:"---",label:"Pregunta de seguridad"})),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:R,variant:"outlined",required:!0,fullWidth:!0,id:"answer",label:"Respuesta a la pregunta",name:"answer"},t,{helperText:R?"Introduzca la respuesta":""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:T,variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Nueva contrase\xf1a",type:"password",id:"password"},l,{helperText:T?"Introduzca la nueva contrase\xf1a":""}))),r.a.createElement(j.a,{item:!0,xs:12})),r.a.createElement(x.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){try{""==a.value||""==t.value||""==l.value?(""==a.value?v(!0):v(!1),""==t.value?U(!0):U(!1),""==l.value?I(!0):I(!1)):(v(!1),U(!1),I(!1),m.a.post("https://unitrivia.herokuapp.com/api/login/recover/password",{},{headers:{username:a.value,res:t.value,newpassword:l.value}}).then((function(a){e.history.push("/login")})).catch((function(e){alert("Error al validar respuesta, revise la respuesta introducida")})))}catch(n){alert(n.message)}}},"Confirmar"))),r.a.createElement(w.a,{mt:5},r.a.createElement(C,null)))};t(151);function I(){return r.a.createElement(f.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(y.a,{color:"inherit",href:"https://material-ui.com/"},"UniGames")," ",(new Date).getFullYear(),".")}var P=Object(k.a)((function(e){return{root:{height:"80vh"},image:{backgroundImage:"url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)",backgroundRepeat:"repeat-x",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center",height:"110%",width:"200%"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},fondo:{margin:e.spacing(2,2,5),position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",backgroundColor:"white",marginTop:e.spacing(1),boxShadow:"0px 0px 5px 2px #9E9E9E"}}})),q=function(e){var a=Object(n.useState)(e),t=Object(o.a)(a,2),r=t[0],l=t[1];return{value:r,onChange:function(e){l(e.target.value)}}};function R(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),l=(t[0],t[1]),i=Object(n.useState)(null),c=Object(o.a)(i,2),s=(c[0],c[1]),u=q(""),d=q(""),p=q(""),g=q(""),b=q(""),v=q(""),S=Object(n.useState)(!1),k=Object(o.a)(S,2),C=k[0],W=k[1],N=Object(n.useState)(!1),T=Object(o.a)(N,2),R=T[0],U=T[1],z=Object(n.useState)(!1),V=Object(o.a)(z,2),A=V[0],D=V[1],F=Object(n.useState)(!1),M=Object(o.a)(F,2),G=M[0],H=M[1],_=Object(n.useState)(!1),B=Object(o.a)(_,2),J=B[0],Y=B[1],K=Object(n.useState)(!1),L=Object(o.a)(K,2),Q=L[0],X=L[1],Z=Object(n.useState)(!1),$=Object(o.a)(Z,2),ee=$[0],ae=$[1],te=Object(n.useState)(null),ne=Object(o.a)(te,2),re=ne[0],le=ne[1],ie=(new RegExp("/S+@S+.S+/"),P());return r.a.createElement(j.a,{container:!0,component:"main",className:ie.root},r.a.createElement(j.a,{item:!0,xs:!1,className:ie.image}),r.a.createElement("div",{className:ie.fondo},r.a.createElement("div",{className:ie.paper},r.a.createElement(f.a,{component:"h1",variant:"h2"},"UniTrivia"),r.a.createElement(E.a,{className:ie.avatar},r.a.createElement(h.a,null)),r.a.createElement(f.a,{component:"h1",variant:"h5"},"Reg\xedstrate"),r.a.createElement("form",{className:ie.form,noValidate:!0},r.a.createElement(j.a,{container:!0,spacing:2},r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===C,autoComplete:"fname",name:"username",variant:"outlined",required:!0,fullWidth:!0,id:"username",label:"Usuario",autoFocus:!0},u,{helperText:C?"introduce el usario":""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===A,variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",type:"email",name:"email",autoComplete:"email"},d,{helperText:A?"introduce el email":""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===R,variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Contrase\xf1a",type:"password",id:"password",autoComplete:"current-password"},p,{helperText:R?"introduce la contrase\xf1a":""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===Q||!0===ee,variant:"outlined",required:!0,fullWidth:!0,name:"reppassword",label:"Repetir contrase\xf1a",type:"password",id:"reppassword",autoComplete:"current-password"},g,{helperText:!0===Q||!0===ee?re:""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===G,variant:"outlined",required:!0,fullWidth:!0,id:"question",label:"Pregunta de seguridad",name:"question"},b,{helperText:G?"introduce la pregunta de seguridad":""}))),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(O.a,Object.assign({error:!0===J,variant:"outlined",required:!0,fullWidth:!0,id:"answer",label:"Respuesta a la pregunta",name:"answer"},v,{helperText:J?"introduce la respuesta a la pregunta de seguridad":""}))),r.a.createElement(j.a,{item:!0,xs:12})),r.a.createElement(x.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){s(null),l(!0),""==u.value?W(!0):W(!1),""==p.value?U(!0):U(!1),""==d.value?D(!0):D(!1),""==b.value?H(!0):H(!1),""==v.value?Y(!0):Y(!1),""==g.value?(ae(!0),le("introduce la contrase\xf1a")):ae(!1),p.value!=g.value?(X(!0),le("las contrase\xf1as no coinciden")):X(!1),""!=u.value&&""!=p.value&&""!=d.value&&""!=b.value&&""!=v.value&&p.value==g.value&&m.a.post("https://unitrivia.herokuapp.com/api/register",{},{headers:{username:u.value,password:p.value,email:d.value,preg:b.value,res:v.value}}).then((function(a){console.log(a.data),console.log(a),l(!1),e.history.push("/login")})).catch((function(e){l(!1),console.log(e.response),400===e.response.status?(s(e.response.data.message),alert("usuario existente")):s("Something went wrong. Please try again later.")}))}},"Registrarse"),r.a.createElement(j.a,{container:!0,justify:"flex-end"},r.a.createElement(j.a,{item:!0},r.a.createElement(y.a,{href:"/login",variant:"body2"},"Ya tienes una cuenta? Accede")))))),r.a.createElement(w.a,{mt:5},r.a.createElement(I,null)))}var U=t(190),z=t(205);function V(){return r.a.createElement(f.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(y.a,{color:"inherit",href:"https://material-ui.com/"},"UniGames")," ",(new Date).getFullYear(),".")}var A=Object(k.a)((function(e){return{root:{height:"80vh"},image:{backgroundImage:"url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)",backgroundRepeat:"repeat-x",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center",width:"100%"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},fondo:{margin:e.spacing(2,2,5),position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",backgroundColor:"white",marginTop:e.spacing(1),boxShadow:"0px 0px 5px 2px #9E9E9E"},error:{width:"100%",position:"absolute",textAlign:"center",color:"white",backgroundColor:"red"}}}));var D=function(e){var a=Object(n.useState)(e),t=Object(o.a)(a,2),r=t[0],l=t[1];return{value:r,onChange:function(e){l(e.target.value)}}},F=function(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),l=(t[0],t[1]),i=D(""),c=D(""),s=Object(n.useState)(!1),u=Object(o.a)(s,2),d=u[0],p=u[1],g=Object(n.useState)(null),v=Object(o.a)(g,2),S=v[0],k=v[1],C=Object(n.useState)(!1),W=Object(o.a)(C,2),N=W[0],T=W[1],I=Object(n.useState)(!1),P=Object(o.a)(I,2),q=P[0],R=P[1],F=A();return r.a.createElement(j.a,{container:!0,component:"main",className:F.root},r.a.createElement(b.a,null),d?r.a.createElement("div",{className:F.error},S):null,r.a.createElement(j.a,{item:!0,xs:!1,className:F.image}),r.a.createElement("div",{className:F.fondo},r.a.createElement("div",{className:F.paper},r.a.createElement(E.a,{className:F.avatar},r.a.createElement(h.a,null)),r.a.createElement(f.a,{component:"h1",variant:"h5"},"Acceder"),r.a.createElement("form",{className:F.form,noValidate:!0},r.a.createElement(O.a,Object.assign({error:!0===N,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Usuario",name:"username",autoComplete:"username",autoFocus:!0},i,{helperText:N?"introduce el usario":""})),r.a.createElement(O.a,Object.assign({error:!0===q,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Contrase\xf1a",type:"password",id:"password",helperText:q?"introduce la contrase\xf1a":""},c)),r.a.createElement(U.a,{control:r.a.createElement(z.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(x.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){k(null),l(!0),""==i.value?T(!0):T(!1),""==c.value?R(!0):R(!1),""!=i.value&&""!=c.value&&m.a.get("https://unitrivia.herokuapp.com/api/login",{headers:{username:i.value,password:c.value}}).then((function(a){var t,n;l(!1),console.log(a),t=a.data,n=i.value,localStorage.setItem("token",t),localStorage.setItem("user",JSON.stringify(n)),e.history.push("/menu")})).catch((function(e){l(!1),e.response.status,p(!0),k("El Ususario o la contrase\xf1a se han introducido incorrectamente")}))}},"Acceder"),r.a.createElement(j.a,{container:!0},r.a.createElement(j.a,{item:!0,xs:!0},r.a.createElement(y.a,{href:"/changepassword",variant:"body2"},"Olvidaste la contrase\xf1a?")),r.a.createElement(j.a,{item:!0},r.a.createElement(y.a,{href:"/register",variant:"body2"},"No tienes cuenta? Reg\xedstrate"))),r.a.createElement(x.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){k(null),l(!0),m.a.get("https://unitrivia.herokuapp.com/api/logAsGuest").then((function(a){var t;l(!1),t=a.data,localStorage.setItem("token",t),e.history.push("/menu")})).catch((function(e){l(!1),alert(e.message),401===e.response.status?(k(e.response.data.message),console.log(e)):(p(!0),k("Something went wrong. Please try again later."),console.log(e))}))}},"Acceder como invitado"),r.a.createElement(w.a,{mt:5},r.a.createElement(V,null))))))},M=t(192),G=t(193),H=t(191),_=Object(k.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var B=function(e){var a=_();return r.a.createElement(M.a,{position:"static"},r.a.createElement(G.a,null,r.a.createElement(H.a,{edge:"start",className:a.menuButton,color:"inherit","aria-label":"menu"}),r.a.createElement(f.a,{variant:"h6",className:a.title},"UniTrivia"),r.a.createElement(x.a,{color:"inherit",href:"/login"},"Login"),r.a.createElement(x.a,{color:"inherit",href:"/Register"},"Sign up")))};var J=function(e){return Object(n.useEffect)((function(){null!=d()&&e.history.push("/menu")}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(B,null),r.a.createElement("div",null,"Welcome to the Home Page!"))},Y=t(49);var K=function(e){var a=e.component,t=Object(Y.a)(e,["component"]);return r.a.createElement(s.b,Object.assign({},t,{render:function(e){return p()?r.a.createElement(a,e):r.a.createElement(s.a,{to:{pathname:"/login",state:{from:e.location}}})}}))};var L,Q,X=t(71),Z=t(62),$=(Z.a.button(L||(L=Object(X.a)(["\n  background-color: #fce2e2;\n  font-size: 32px;\n  color: #6c6ce3;\n"]))),Z.a.div(Q||(Q=Object(X.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 70%;\n  margin: 2em auto;\n\n  @media screen and (min-width: 1180px) {\n    width: 50%;\n  }\n"])))),ee=Object(k.a)((function(e){return{root:{height:"100vh"},image:{backgroundImage:"url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)",backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));var ae=function(){var e=ee();return r.a.createElement($,null,r.a.createElement("h3",null,"UniTrivia"),"MEN\xda",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Jugar")),r.a.createElement("div",{style:{marginTop:10}},r.a.createElement(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,href:"/profile",disabled:null==d()},"Perfil")),r.a.createElement("div",{style:{marginTop:10}},r.a.createElement(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,href:"/Settings"},"Ajustes")),r.a.createElement("div",{style:{marginTop:100}},r.a.createElement(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",href:"/Login",onClick:g},"Cerrar sesi\xf3n")))},te=t(100),ne=(t(148),t(194)),re=t(195),le=t(196),ie=t(197),oe="/images/avatars/avatar_6.png";var ce=function(e){var a=e;return r.a.createElement(ne.a,e,r.a.createElement(re.a,null,r.a.createElement(w.a,{sx:{alignItems:"center",display:"flex",flexDirection:"column"}},r.a.createElement(E.a,{src:oe,sx:{height:100,width:100}}),r.a.createElement(f.a,{color:"textPrimary",gutterBottom:!0,variant:"h3"},a.user),r.a.createElement(f.a,{color:"textSecondary",variant:"body1"},"".concat(a.mail," ")))),r.a.createElement(le.a,null),r.a.createElement(ie.a,null,r.a.createElement(x.a,{color:"primary",fullWidth:!0,variant:"text"},"Modificar avatar"),r.a.createElement(x.a,{color:"primary",fullWidth:!0,variant:"text"},"Modificar banner"),r.a.createElement(x.a,{color:"primary",fullWidth:!0,variant:"text"},"Modificar forma de ficha")))},se=t(198);var ue=function(e){var a=e;return r.a.createElement("form",Object.assign({autoComplete:"off",noValidate:!0},e),r.a.createElement(ne.a,null,r.a.createElement(se.a,{subheader:"Informaci\xf3n del usuario",title:"Perfil"}),r.a.createElement(le.a,null),r.a.createElement(re.a,null,r.a.createElement(j.a,{container:!0,spacing:3},r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,value:a.user,disabled:!0,id:"outlined-disabled",label:"Usuario",defaultValue:"Hello World",variant:"outlined"})),r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,value:a.mail,disabled:!0,id:"outlined-disabled",label:"Email",defaultValue:"Hello World",variant:"outlined"})),r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,value:a.pregu,disabled:!0,id:"outlined-disabled",label:"Pregunta de seguridad",defaultValue:"Hello World",variant:"outlined"})),r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,value:a.resu,disabled:!0,id:"outlined-disabled",label:"Respuesta",defaultValue:"Hello World",variant:"outlined"})))),r.a.createElement(le.a,null),r.a.createElement(w.a,{sx:{display:"flex",justifyContent:"flex-end",p:2}},r.a.createElement(x.a,{color:"primary",variant:"contained"},"Save details"))))},me=t(24),de=t(52),pe=function(e){var a=Object(n.useState)({oldpassword:"",password:"",confirm:""}),t=Object(o.a)(a,2),l=t[0],i=t[1],c=function(e){i(Object(de.a)(Object(de.a)({},l),{},Object(me.a)({},e.target.name,e.target.value)))},s=function(){m.a.post("https://unitrivia.herokuapp.com/api/profile/modify/password",{},{headers:{jwt:p(),newpassword:l.password,oldpassword:l.oldpassword}}).then((function(e){console.log(e),alert("Contrase\xf1a cambiada exitosamente"),window.location.reload(!0)})).catch((function(e){alert(e.message)}))};return r.a.createElement("form",Object.assign({},e,{onSubmit:s}),r.a.createElement(ne.a,null,r.a.createElement(se.a,{subheader:"Update password",title:"Password"}),r.a.createElement(le.a,null),r.a.createElement(re.a,null,r.a.createElement(O.a,{fullWidth:!0,label:"Old password",margin:"normal",name:"oldpassword",onChange:c,type:"password",value:l.oldpassword,variant:"outlined"}),r.a.createElement(O.a,{fullWidth:!0,label:"New Password",margin:"normal",name:"password",onChange:c,type:"password",value:l.password,variant:"outlined"}),r.a.createElement(O.a,{fullWidth:!0,label:"Confirm new password",margin:"normal",name:"confirm",onChange:c,type:"password",value:l.confirm,variant:"outlined"})),r.a.createElement(le.a,null),r.a.createElement(w.a,{sx:{display:"flex",justifyContent:"flex-end",p:2}},r.a.createElement(x.a,{color:"primary",variant:"contained",onClick:s},"Update"))))};var ge=function(e){var a=e;return r.a.createElement("form",Object.assign({autoComplete:"off",noValidate:!0},e),r.a.createElement(ne.a,null,r.a.createElement(se.a,{subheader:"Estad\xedsticas del usuario",title:"Estad\xedsticas"}),r.a.createElement(le.a,null),r.a.createElement(re.a,null,r.a.createElement(j.a,{container:!0,spacing:3},r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,label:"Partidas jugadas",name:"firstName",defaultValue:"0",value:a.jugadas,variant:"outlined",disabled:!0})),r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,label:"Partidas ganadas",name:"email",defaultValue:"0",value:a.ganadas,variant:"outlined",disabled:!0})),r.a.createElement(j.a,{item:!0,md:6,xs:12},r.a.createElement(O.a,{fullWidth:!0,label:"Monedas obtenidas",name:"question",value:a.coins,defaultValue:"0",variant:"outlined",disabled:!0})))),r.a.createElement(le.a,null)))},be=t(188),fe=t(199),Ee=t(200),ve=t(202),he=t(201),je=t(103),Oe=t.n(je),xe=t(104),ye=t.n(xe),we=Object(k.a)((function(e){return{root:{flexGrow:1,maxWidth:752},demo:{backgroundColor:e.palette.background.paper},title:{margin:e.spacing(4,0,2)}}}));var Se=function(e){var a=e,t=we(),l=Object(n.useState)({played:"6",wins:"3",ncoins:"67"}),i=Object(o.a)(l,2);return i[0],i[1],r.a.createElement(ne.a,null,r.a.createElement(se.a,{subheader:"Objetos adquiridos por el usuario",title:"Objetos"}),r.a.createElement("div",{className:t.demo},r.a.createElement(be.a,null,function(e){if(null!=a.comprados)return a.comprados.map((function(a){return r.a.cloneElement(e,{key:a})}))}(r.a.createElement(fe.a,null,r.a.createElement(Ee.a,null,r.a.createElement(E.a,null,r.a.createElement(Oe.a,null))),r.a.createElement(he.a,{primary:"Single-line item",secondary:null}),r.a.createElement(ve.a,null,r.a.createElement(H.a,{edge:"end","aria-label":"delete"},r.a.createElement(ye.a,null))))))))},ke=Object(k.a)((function(e){return{root:{height:"100vh"},image:{backgroundImage:"url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)",backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));var Ce=function(e){ke();var a=Object(n.useState)(null),t=Object(o.a)(a,2),l=t[0],i=t[1],c=Object(n.useState)(),s=Object(o.a)(c,2),u=s[0],d=s[1],b=Object(n.useState)(null),f=Object(o.a)(b,2),E=f[0],v=f[1],h=Object(n.useState)(null),O=Object(o.a)(h,2),y=O[0],k=O[1],C=Object(n.useState)(null),W=Object(o.a)(C,2),N=(W[0],W[1]),T=Object(n.useState)(null),I=Object(o.a)(T,2),P=(I[0],I[1]),q=Object(n.useState)(null),R=Object(o.a)(q,2),U=R[0],z=R[1],V=Object(n.useState)(null),A=Object(o.a)(V,2),D=A[0],F=A[1],M=Object(n.useState)(null),G=Object(o.a)(M,2),H=G[0],_=G[1],B=Object(n.useState)(null),J=Object(o.a)(B,2),Y=J[0],K=J[1],L=Object(n.useState)(null),Q=Object(o.a)(L,2),X=Q[0],Z=Q[1];return Object(n.useEffect)((function(){console.log(p()),m.a.get("https://unitrivia.herokuapp.com/api/profile",{headers:{jwt:p()}}).then((function(e){i(e.data.preg),d(e.data.res),v(e.data.cns),k(e.data.ng),N(e.data.fich),P(e.data.bnr),z(e.data.rfs),F(e.data.avtr),_(e.data.nj),K(e.data.mail),Z(e.data._id),console.log(e.data),console.log(e)})).catch((function(e,a){console.log(e.response)}))}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,null,r.a.createElement("title",null,"Account | Material Kit")),r.a.createElement(w.a,{sx:{backgroundColor:"background.default",minHeight:"100%",py:3}},r.a.createElement(S.a,{maxWidth:"lg"},r.a.createElement(j.a,{container:!0,spacing:3},r.a.createElement(j.a,{item:!0,lg:8,md:6,xs:12},r.a.createElement(ce,{user:X,mail:Y,avatar:D})),r.a.createElement(j.a,{item:!0,lg:8,md:6,xs:12},r.a.createElement(ue,{user:X,mail:Y,pregu:l,resu:u})),r.a.createElement(j.a,{item:!0,lg:8,md:6,xs:12},r.a.createElement(ge,{jugadas:H,ganadas:y,coins:E})),r.a.createElement(j.a,{item:!0,lg:8,md:6,xs:12},r.a.createElement(Se,{comprados:U})),r.a.createElement(j.a,{item:!0,lg:8,md:6,xs:12},r.a.createElement(w.a,{sx:{pt:3}},r.a.createElement(pe,null))),r.a.createElement(x.a,{color:"primary",variant:"contained",onClick:function(){try{!0===window.confirm("Presione en OK para borrar cuenta para siempre")&&m.a.delete("https://unitrivia.herokuapp.com/api/profile",{headers:{jwt:p()}}).then((function(a){console.log(a),g(),e.history.push("/login")})).catch((function(e){alert(e.message),console.log(e)}))}catch(a){alert(a.message)}}},"Borrar usuario")))))},We=Object(k.a)((function(e){return{paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between"},but:{display:"flex",backgroundRepeat:"repeat-x",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center",width:"10%"}}}));var Ne=function(){var e=We(),a=Object(n.useState)("On"),t=Object(o.a)(a,2),l=t[0],i=t[1],c=Object(n.useState)("On"),s=Object(o.a)(c,2),u=s[0],m=s[1];return r.a.createElement("div",{className:e.paper},r.a.createElement(x.a,{className:e.but,onClick:function(){i("On"==l?"Off":"On")}},"Sonido ",l),r.a.createElement(x.a,{className:e.but,onClick:function(){"On"==u?m("Off"):"Off"==u&&m("On")}},"Musica ",u))};var Te=function(e){var a=e.component,t=Object(Y.a)(e,["component"]);return r.a.createElement(s.b,Object.assign({},t,{render:function(e){return p()&&d()?r.a.createElement(a,e):r.a.createElement(s.a,{to:{pathname:"/login",state:{from:e.location}}})}}))};var Ie=function(e){var a=Object(n.useState)(!0),t=Object(o.a)(a,2),l=t[0],i=t[1];return Object(n.useEffect)((function(){p()&&i(!1)}),[]),l&&p()?r.a.createElement("div",{className:"content"},"Checking Authentication..."):r.a.createElement("div",{className:"App"},r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement("div",{className:"content"},r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/",component:J}),r.a.createElement(s.b,{path:"/login",component:F}),r.a.createElement(s.b,{exact:!0,path:"/ChangePassword",component:T}),r.a.createElement(s.b,{path:"/register",component:R}),r.a.createElement(K,{path:"/Menu",component:ae}),r.a.createElement(K,{path:"/Settings",component:Ne}),r.a.createElement(Te,{path:"/Profile",component:Ce}))))))};i.a.render(r.a.createElement(Ie,null),document.getElementById("root"))}},[[119,1,2]]]);
//# sourceMappingURL=main.5c4e8711.chunk.js.map