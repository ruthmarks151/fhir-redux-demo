(this["webpackJsonpfhir-redux"]=this["webpackJsonpfhir-redux"]||[]).push([[0],{109:function(e,t,n){},111:function(e,t,n){},218:function(e,t,n){},219:function(e,t,n){},220:function(e,t,n){},221:function(e,t,n){},222:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(28),i=n.n(c),s=(n(85),n(14)),l=s.c,o=n(47),d=n.n(o),h=n(76),u=n(15),j=n(29),b=n(77),f=n.n(b);function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=new URL("http://hapi.fhir.org/baseR4/Patient");return n.searchParams.set("_pretty","false"),n.searchParams.set("_count",String(t)),n.searchParams.set("_offset",String((e-1)*t)),n.searchParams.set("_include","Patient:link"),n.searchParams.set("birthdate","gt1900-01-01"),n.searchParams.set("birthdate","lt2021-10-17"),f.a.get(n.toString())}var x=Object(u.b)("patients/fetchPatients",function(){var e=Object(h.a)(d.a.mark((function e(t){var n,a,r,c,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.page,a=void 0===n?1:n,r=t.pageSize,c=void 0===r?10:r,e.next=3,O(a,c);case 3:return i=e.sent,e.abrupt("return",i.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),g=Object(u.c)({name:"patients",initialState:{patients:{},status:"idle"},reducers:{},extraReducers:function(e){e.addCase(x.pending,(function(e){e.status="loading"})).addCase(x.fulfilled,(function(e,t){e.status="idle",t.payload.entry.forEach((function(t){return e.patients[t.resource.id]=t.resource}))})).addCase(x.rejected,(function(e){e.status="failed"}))}}),m=Object(j.a)((function(e){return e.patients.patients}),Object.values),p=function(e){var t=e.birthDate,n=Date.now()-Date.parse(t),a=new Date(n);return Math.abs(a.getUTCFullYear()-1970)},v=Object(j.a)(m,(function(e){return e.filter((function(e){return!!e.birthDate})).map(p)})),P=function(e){return e.patients.status},w=g.reducer,y=(n(109),n(1)),D=function(e){var t=e.count,n=e.label;return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("strong",{children:t})," ",n,1===t?"":"s"]})},N=function(){var e=l(m),t=l(v),n=l(P),a=t.filter((function(e){return e<18})).length,r=t.reduce((function(e,t){return e+t}),0)/t.length;return Object(y.jsxs)("div",{className:"AgeDataSummary",children:[Object(y.jsx)("h2",{children:"Data Summary"}),"loading"===n?Object(y.jsx)("p",{children:"Loading..."}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("h3",{children:"In the loaded data there are..."}),Object(y.jsxs)("ul",{children:[Object(y.jsx)("li",{children:Object(y.jsx)(D,{count:e.length,label:"Total Patient"})}),Object(y.jsx)("li",{children:Object(y.jsx)(D,{count:a,label:"Pediatric Patient"})}),Object(y.jsxs)("li",{children:["Average Age ",Object(y.jsx)("strong",{children:r.toFixed(2)})," (of Patients with Known Ages)"]})]})]})]})},k=(n(111),function(){return Object(y.jsxs)("div",{className:"FhirExplainer",children:[Object(y.jsx)("h3",{children:"What is FHIR?"}),Object(y.jsx)("article",{children:"FHIR is a standard for health care data exchange, published by HL7. It makes very pleasantly structured healthcare data available from many systems."}),Object(y.jsx)("h3",{children:"What is this demo?"}),Object(y.jsxs)("article",{children:["This demo uses the",Object(y.jsx)("a",{href:"http://hapi.fhir.org/resource?encoding=null&pretty=false&resource=Patient",children:" UHN HAPI FHIR  "}),"(University Health Network) (HL7 application programming interface) (Fast Healthcare Interoperability Resources) server to fetch patients, and perfom some simple birthdate and age related analsis on them. Use the table view to view all the loaded data and load more"]})]})}),F=n(80),C=(n(218),function(){var e=l(v),t=Array(10).fill(0);return e.forEach((function(e){t[Math.floor(e/10)]+=1})),Object(y.jsxs)("div",{className:"PatientAgePlot",children:[Object(y.jsx)("h2",{children:"Loaded Patient Ages"}),Object(y.jsx)("div",{className:"PatientAgePlot__chart",children:Object(y.jsx)(F.a,{options:{responsive:!0,maintainAspectRatio:!1},data:{labels:t.map((function(e,t){return"".concat(10*t," - ").concat(10*(t+1)-1)})),datasets:[{label:"Patient Count",data:t,backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1}]}})})]})}),R=n(2),S=n(16),A=(n(219),function(e){var t,n="No Name",a=e.name&&e.name[0];return(null===a||void 0===a?void 0:a.given)&&a.family?n=[].concat(Object(R.a)(a.given),[a.family]).join(" "):(null===a||void 0===a?void 0:a.text)&&(n=a.text),Object(y.jsxs)("tr",{children:[Object(y.jsx)("td",{children:e.id}),Object(y.jsx)("td",{children:n}),Object(y.jsx)("td",{children:null!==(t=e.birthDate)&&void 0!==t?t:"No Birthdate"})]})}),H=function(){var e,t=Object(s.b)(),n=l(m),r=l(P),c=Object(a.useState)(!1),i=Object(S.a)(c,2),o=i[0],d=i[1],h=Object(a.useCallback)((function(){return d((function(e){return!e}))}),[]),u=new Date((new Date).setFullYear((new Date).getFullYear()-18)),b=l((e=u,Object(j.a)(m,(function(t){return t.filter((function(t){var n=t.birthDate;return n&&new Date(n)>e}))})))),f=Object(a.useCallback)((function(){return t(x({pageSize:10,page:Math.floor(n.length/10)+1}))}),[t,n.length]);return Object(a.useEffect)((function(){"idle"!==r||n.length||f()}),[n.length,f,r]),Object(y.jsxs)("div",{className:"PatientsTable",children:[Object(y.jsx)("h2",{children:"Loaded Patients"}),Object(y.jsxs)("section",{className:"PatientsTable__filters",children:[Object(y.jsx)("h3",{children:"Filters"}),Object(y.jsx)("input",{type:"checkbox",checked:o,onChange:h}),Object(y.jsx)("label",{children:"Only Show Pediatric Patients?"})]}),Object(y.jsx)("div",{className:"PatientsTable__table-container",children:Object(y.jsxs)("table",{children:[Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{children:"ID"}),Object(y.jsx)("th",{children:"Name"}),Object(y.jsx)("th",{children:"Birthdate"})]}),(o?b:n).map(A)]})}),Object(y.jsx)("button",{disabled:"loading"===r,onClick:f,children:"loading"===r?"Loading":"Load More Patients"})]})};n(220);function I(){return Object(y.jsxs)("div",{className:"Patients",children:[Object(y.jsxs)("div",{className:"left-pane",children:[Object(y.jsx)(k,{}),Object(y.jsx)(N,{}),Object(y.jsx)(C,{})]}),Object(y.jsx)(H,{})]})}n(221);var _=function(){return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("h1",{children:"Ryan's Redux FHIR Demo"}),Object(y.jsx)(I,{})]})},L=Object(u.a)({reducer:{patients:w}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(y.jsx)(r.a.StrictMode,{children:Object(y.jsx)(s.a,{store:L,children:Object(y.jsx)(_,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,t,n){}},[[222,1,2]]]);
//# sourceMappingURL=main.224daad3.chunk.js.map