(this.webpackJsonpspotibike=this.webpackJsonpspotibike||[]).push([[0],{72:function(e,t,n){},73:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n(0),i=n.n(a),r=n(12),s=n.n(r),l=(n(72),n(73),{expiresAt:null,isAuth:!1,api:null,userID:null}),o=a.createContext(l),u=n(19);function j(){var e=Object(a.useContext)(o).isAuth;return Object(c.jsx)("div",{children:Object(c.jsx)("header",{className:"Splash-header",children:Object(c.jsx)(u.b,{to:"/spotibike/setup",children:e?"Continue":"Login"})})})}var b=n(10),d=n(110),h=n(122),O=n(112),x=n(114),f=n(115),p=n(116),m=n(117),g=n(118),v=n(124),k=n(119),y=Object(d.a)({root:{padding:32},buttons:{padding:64},button:{marginLeft:12,marginRight:12},link:{textDecoration:"none"},table:{maxWidth:500,marginBottom:40}}),C=function(){};function P(){var e=Object(a.useState)([60,120]),t=Object(b.a)(e,2),n=t[0],i=t[1],r=Object(a.useContext)(o).isAuth,s=y(),l=Object(a.useCallback)((function(e){return{pathname:"/spotibike/songs",search:"?use_user_artists=".concat(e,"&min_bpm=").concat(n[0],"&max_bpm=").concat(n[1])}}),[n]);return r?Object(c.jsxs)(h.a,{display:"flex",flexDirection:"column",className:s.root,children:[Object(c.jsx)(O.a,{children:Object(c.jsxs)(x.a,{size:"medium",className:s.table,children:[Object(c.jsx)(f.a,{children:Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{children:"Biking Type"}),Object(c.jsx)(m.a,{children:"Recommended BPM Range"})]})}),Object(c.jsxs)(g.a,{children:[Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{children:"Recovery"}),Object(c.jsx)(m.a,{children:"~100-110 BPM"})]}),Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{children:"Intervals"}),Object(c.jsx)(m.a,{children:"~160+ BPM"})]}),Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{children:"Tempo"}),Object(c.jsx)(m.a,{children:"~140-150 BPM"})]}),Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{children:"Endurance"}),Object(c.jsx)(m.a,{children:"~120-130 BPM"})]})]})]})}),Object(c.jsxs)("div",{children:["Selected BPM: ",n[0]," - ",n[1]]}),Object(c.jsx)(v.a,{value:n,onChange:function(e,t){i(t)},valueLabelDisplay:"on","aria-labelledby":"range-slider",step:1,min:50,max:220}),Object(c.jsxs)(h.a,{display:"flex",flexDirection:"row",className:s.buttons,justifyContent:"space-around",children:[Object(c.jsx)(k.a,{variant:"contained",color:"primary",onClick:C,className:s.button,children:Object(c.jsx)(u.b,{to:l(!0),style:{textDecoration:"none",color:"white"},children:"Make Playlist from Your Artists/Albums"})}),Object(c.jsx)(k.a,{variant:"contained",onClick:C,className:s.button,children:Object(c.jsx)(u.b,{to:l(!1),style:{textDecoration:"none",color:"black"},children:"Make Playlist from Random Top Music"})})]})]}):Object(c.jsx)(c.Fragment,{})}var S=n(13);var w=function(){};function M(e){var t=Object(a.useRef)();return Object(a.useEffect)((function(){t.current=e}),[e]),t.current}var _=new Map;var D=n(121),A=n(123),N=n(120),T=Object(d.a)({root:{padding:32},table:{minWidth:750},button:{marginLeft:12,marginRight:12}});function B(e){var t=function(){var e=Object(a.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),r=Object(b.a)(i,2),s=r[0],l=r[1],u=Object(a.useState)(0),j=Object(b.a)(u,2),d=j[0],h=j[1],O=Object(a.useState)(!1),x=Object(b.a)(O,2),f=x[0],p=x[1],m=Object(a.useContext)(o).api,g=n.length,v=Object(a.useCallback)((function(){p(!0),l(!0),m.getMySavedTracks({limit:50,offset:g}).then((function(e){h(e.total);var t=e.items.map((function(e){return e.track}));c(n.concat(t))})).finally((function(){l(!1)}))}),[m,n,g]),k=Object(a.useRef)(v);Object(a.useEffect)((function(){0===n.length&&k.current()}),[n]);var y=!f||n.length<d;return[n,v,y,s]}(),n=function(){var e=Object(a.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],i=Object(a.useContext)(o).api;return Object(a.useCallback)((function(){i.getPlaylistTracks("37i9dQZEVXbMDoHDwVN2tF").then((function(e){var t=e.items.map((function(e){return e.track}));c(t)}))}),[i]),[n,w,!1,!1]}();return e?t:n}function R(){var e,t,n=Object(a.useState)([]),i=Object(b.a)(n,2),r=i[0],s=i[1],l=Object(a.useState)(""),u=Object(b.a)(l,2),j=u[0],d=u[1],v=Object(a.useContext)(o),y=v.isAuth,C=v.api,P=v.userID,w=T(),R=Object(S.f)(),L=new URLSearchParams(window.location.search),E="true"===L.get("use_user_artists"),F=+(null!==(e=L.get("min_bpm"))&&void 0!==e?e:"0"),I=+(null!==(t=L.get("max_bpm"))&&void 0!==t?t:"0"),z=B(E),U=Object(b.a)(z,4),W=U[0],q=U[1],J=U[2],V=U[3],H=function(e,t,n){var c=Object(a.useState)([]),i=Object(b.a)(c,2),r=i[0],s=i[1],l=Object(a.useContext)(o).api,u=e.filter((function(e){var t=e.id;return!_.has(t)})).map((function(e){return e.id})),j=Object(a.useCallback)((function(){0!==u.length&&l.getAudioFeaturesForTracks(u).then((function(c){c.audio_features.forEach((function(e){null!=e&&_.set(e.id,e.tempo)}));var a=e.filter((function(e){var c=_.get(e.id);return null!=c&&c>=t&&c<=n}));s(a)}))}),[l,u,t,n,e]),d=M(e.length);return Object(a.useEffect)((function(){e.length!==d&&j()}),[e.length,d,j]),r}(W,F,I);if(!y)return Object(c.jsx)(c.Fragment,{});var Q=""===j.trim()||r.length<1;return Object(c.jsxs)(h.a,{display:"flex",flexDirection:"column",className:w.root,children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:"Song Select"}),Object(c.jsxs)("div",{children:["Enter Playlist Name:"," ",Object(c.jsx)(D.a,{label:"Playlist Name",variant:"filled",value:j,onChange:function(e){return d(e.target.value)}}),Object(c.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){Q||C.createPlaylist(P,{name:j,public:!1,description:"".concat(F," to ").concat(I," BPM playlist - Made with Spotibike")}).then((function(e){var t=function(e,t){for(var n=[],c=0;c<e.length;c+=t){var a=e.slice(c,c+t);n.push(a)}return n}(r.map((function(e){return e.uri})),100);Promise.all(t.map((function(t){return C.addTracksToPlaylist(e.id,t)}))).then((function(){R.push("/spotibike/success/".concat(e.id))}))}))},className:w.button,disabled:Q,children:"Create Playlist"})]})]}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(x.a,{className:w.table,size:"medium",children:[Object(c.jsx)(f.a,{children:Object(c.jsxs)(p.a,{children:[Object(c.jsx)(m.a,{padding:"checkbox",children:Object(c.jsx)(A.a,{onChange:function(){if(0===r.length){var e=H.map((function(e){return{id:e.id,uri:e.uri}}));s(e)}else s([])},indeterminate:r.length>0&&r.length<H.length,checked:r.length>0})}),Object(c.jsx)(m.a,{children:"Track Name"}),Object(c.jsx)(m.a,{children:"Artist(s)"}),Object(c.jsx)(m.a,{children:"Album"})]})}),Object(c.jsx)(g.a,{children:H.map((function(e){var t=r.map((function(e){return e.id})).includes(e.id);return Object(c.jsxs)(p.a,{hover:!0,role:"checkbox",onClick:function(){return function(e,t){var n=r.map((function(e){return e.id})).indexOf(e),c=[];-1===n?c=c.concat(r,{id:e,uri:t}):0===n?c=c.concat(r.slice(1)):n===r.length-1?c=c.concat(r.slice(0,-1)):n>0&&(c=r.concat(r.slice(0,n),r.slice(n+1))),s(c)}(e.id,e.uri)},children:[Object(c.jsx)(m.a,{padding:"checkbox",children:Object(c.jsx)(A.a,{checked:t})}),Object(c.jsx)(m.a,{children:e.name}),Object(c.jsx)(m.a,{children:e.artists.map((function(e){return e.name})).join(", ")}),Object(c.jsx)(m.a,{children:e.album.name})]},e.id)}))})]})}),V&&Object(c.jsx)(N.a,{}),Object(c.jsx)(k.a,{onClick:q,disabled:!J||V,children:"Load More"})]})}var L=Object(d.a)({root:{padding:32},buttons:{padding:64},button:{marginLeft:12,marginRight:12},link:{textDecoration:"none"},table:{maxWidth:500,marginBottom:40}});var E=function(){};function F(){var e,t=Object(a.useContext)(o).isAuth,n=function(e){var t=Object(a.useContext)(o).api,n=Object(a.useState)(null),c=Object(b.a)(n,2),i=c[0],r=c[1];return Object(a.useEffect)((function(){t.getPlaylist(e).then((function(e){var t=e.external_urls,n=e.images;r({external_urls:t,images:n})}))}),[t,e]),i}(Object(S.g)().playlistid),i=L();return t?Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{children:["Playlist Created:"," ",Object(c.jsx)("a",{href:null===n||void 0===n?void 0:n.external_urls.spotify,children:null!==(e=null===n||void 0===n?void 0:n.external_urls.spotify)&&void 0!==e?e:"Loading Details..."})]}),Object(c.jsx)(k.a,{variant:"contained",color:"primary",onClick:E,className:i.button,children:Object(c.jsx)(u.b,{to:"/spotibike/setup",style:{textDecoration:"none",color:"white"},children:"Make Another"})})]}):Object(c.jsx)(c.Fragment,{})}var I=n(56),z=["playlist-read-private","playlist-modify-private","user-library-read"];function U(e){return Object(a.useContext)(o).isAuth||(window.location.href=encodeURI("".concat("https://accounts.spotify.com/authorize","?client_id=").concat("6fd3ee11d3a146ffad18854c9762964c","&response_type=token&redirect_uri=").concat("https://rageandqq.github.io/spotibike/","&scope=").concat(z.join(" "),"&show_dialog=").concat(!1))),Object(c.jsx)(S.a,Object(I.a)({},e))}var W=n(57),q=new(n.n(W).a);function J(e){var t=e.children,n=Object(a.useState)(null),i=Object(b.a)(n,2),r=i[0],s=i[1],l=new URLSearchParams(window.location.hash.substr(1)),u=l.get("access_token"),j=l.get("exipres_in"),d=Object(a.useState)(u),h=Object(b.a)(d,2),O=h[0],x=h[1],f=Object(a.useState)(null!=j?+j:null),p=Object(b.a)(f,2),m=p[0],g=p[1],v=Object(a.useCallback)((function(e){q.setAccessToken(e),q.getMe().then((function(e){s(e.id)}))}),[]),k=M(u),y=M(j);Object(a.useEffect)((function(){null!=u&&k!==u&&(x(u),v(u)),null!=j&&y!==j&&g((new Date).getTime()+ +j)}),[k,u,y,j,v]);var C=Object(a.useMemo)((function(){return{expiresAt:m,isAuth:null!=O,api:q,userID:r}}),[O,m,r]);return Object(c.jsx)(o.Provider,{value:C,children:t})}var V=function(){return Object(c.jsx)(u.a,{children:Object(c.jsx)(J,{children:Object(c.jsxs)(S.c,{children:[Object(c.jsx)(U,{path:"/spotibike/success/:playlistid",children:Object(c.jsx)(F,{})}),Object(c.jsx)(U,{path:"/spotibike/songs",children:Object(c.jsx)(R,{})}),Object(c.jsx)(U,{path:"/spotibike/setup",children:Object(c.jsx)(P,{})}),Object(c.jsx)(S.a,{path:"/spotibike/",children:Object(c.jsx)(j,{})})]})})})},H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,126)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};n(79).config(),s.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(V,{})}),document.getElementById("root")),H()}},[[82,1,2]]]);
//# sourceMappingURL=main.08d3b8e4.chunk.js.map