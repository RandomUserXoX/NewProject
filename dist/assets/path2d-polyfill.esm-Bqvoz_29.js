function F(n,a,r){for(var t=0,o=a.length,l;t<o;t++)(l||!(t in a))&&(l||(l=Array.prototype.slice.call(a,0,t)),l[t]=a[t]);return n.concat(l||Array.prototype.slice.call(a))}var q={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},Z=/([astvzqmhlc])([^astvzqmhlc]*)/gi,_=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;function U(n){var a=n.match(_);return a?a.map(Number):[]}function j(n){var a=[],r=String(n).trim();return r[0]!=="M"&&r[0]!=="m"||r.replace(Z,function(t,o,l){var s=U(l),u=o.toLowerCase(),h=o;if(u==="m"&&s.length>2&&(a.push(F([h],s.splice(0,2))),u="l",h=h==="m"?"l":"L"),s.length<q[u])return"";for(a.push(F([h],s.splice(0,q[u])));s.length>=q[u]&&s.length&&q[u];)a.push(F([h],s.splice(0,q[u])));return""}),a}function B(n,a){var r=n.x*Math.cos(a)-n.y*Math.sin(a),t=n.y*Math.cos(a)+n.x*Math.sin(a);n.x=r,n.y=t}function J(n,a,r){n.x+=a,n.y+=r}function H(n,a){n.x*=a,n.y*=a}var L=function(){function n(a){var r;this.commands=[],a&&a instanceof n?(r=this.commands).push.apply(r,a.commands):a&&(this.commands=j(a))}return n.prototype.addPath=function(a){var r;a&&a instanceof n&&(r=this.commands).push.apply(r,a.commands)},n.prototype.moveTo=function(a,r){this.commands.push(["M",a,r])},n.prototype.lineTo=function(a,r){this.commands.push(["L",a,r])},n.prototype.arc=function(a,r,t,o,l,s){this.commands.push(["AC",a,r,t,o,l,!!s])},n.prototype.arcTo=function(a,r,t,o,l){this.commands.push(["AT",a,r,t,o,l])},n.prototype.ellipse=function(a,r,t,o,l,s,u,h){this.commands.push(["E",a,r,t,o,l,s,u,!!h])},n.prototype.closePath=function(){this.commands.push(["Z"])},n.prototype.bezierCurveTo=function(a,r,t,o,l,s){this.commands.push(["C",a,r,t,o,l,s])},n.prototype.quadraticCurveTo=function(a,r,t,o){this.commands.push(["Q",a,r,t,o])},n.prototype.rect=function(a,r,t,o){this.commands.push(["R",a,r,t,o])},n.prototype.roundRect=function(a,r,t,o,l){typeof l>"u"?this.commands.push(["RR",a,r,t,o,0]):this.commands.push(["RR",a,r,t,o,l])},n}();function N(n,a){var r=0,t=0,o,l,s,u,h,v,P,C,I,A,S,G,D,p,f,z,d,b,k,E,Q,R=null,g=null,y=null,T=null,M=null,m=null;n.beginPath();for(var i=0;i<a.length;++i){b=a[i][0],b!=="S"&&b!=="s"&&b!=="C"&&b!=="c"&&(R=null,g=null),b!=="T"&&b!=="t"&&b!=="Q"&&b!=="q"&&(y=null,T=null);var e=void 0;switch(b){case"m":case"M":e=a[i],b==="m"?(r+=e[1],t+=e[2]):(r=e[1],t=e[2]),(b==="M"||!M)&&(M={x:r,y:t}),n.moveTo(r,t);break;case"l":e=a[i],r+=e[1],t+=e[2],n.lineTo(r,t);break;case"L":e=a[i],r=e[1],t=e[2],n.lineTo(r,t);break;case"H":e=a[i],r=e[1],n.lineTo(r,t);break;case"h":e=a[i],r+=e[1],n.lineTo(r,t);break;case"V":e=a[i],t=e[1],n.lineTo(r,t);break;case"v":e=a[i],t+=e[1],n.lineTo(r,t);break;case"a":case"A":if(e=a[i],m===null)throw new Error("This should never happen");b==="a"?(r+=e[6],t+=e[7]):(r=e[6],t=e[7]),p=e[1],f=e[2],P=e[3]*Math.PI/180,s=!!e[4],u=!!e[5],h={x:r,y:t},v={x:(m.x-h.x)/2,y:(m.y-h.y)/2},B(v,-P),C=v.x*v.x/(p*p)+v.y*v.y/(f*f),C>1&&(C=Math.sqrt(C),p*=C,f*=C),k={x:p*v.y/f,y:-(f*v.x)/p},I=p*p*f*f,A=p*p*v.y*v.y+f*f*v.x*v.x,u!==s?H(k,Math.sqrt((I-A)/A)||0):H(k,-Math.sqrt((I-A)/A)||0),l=Math.atan2((v.y-k.y)/f,(v.x-k.x)/p),o=Math.atan2(-(v.y+k.y)/f,-(v.x+k.x)/p),B(k,P),J(k,(h.x+m.x)/2,(h.y+m.y)/2),n.save(),n.translate(k.x,k.y),n.rotate(P),n.scale(p,f),n.arc(0,0,1,l,o,!u),n.restore();break;case"C":e=a[i],R=e[3],g=e[4],r=e[5],t=e[6],n.bezierCurveTo(e[1],e[2],R,g,r,t);break;case"c":e=a[i],n.bezierCurveTo(e[1]+r,e[2]+t,e[3]+r,e[4]+t,e[5]+r,e[6]+t),R=e[3]+r,g=e[4]+t,r+=e[5],t+=e[6];break;case"S":e=a[i],(R===null||g===null)&&(R=r,g=t),n.bezierCurveTo(2*r-R,2*t-g,e[1],e[2],e[3],e[4]),R=e[1],g=e[2],r=e[3],t=e[4];break;case"s":e=a[i],(R===null||g===null)&&(R=r,g=t),n.bezierCurveTo(2*r-R,2*t-g,e[1]+r,e[2]+t,e[3]+r,e[4]+t),R=e[1]+r,g=e[2]+t,r+=e[3],t+=e[4];break;case"Q":e=a[i],y=e[1],T=e[2],r=e[3],t=e[4],n.quadraticCurveTo(y,T,r,t);break;case"q":e=a[i],y=e[1]+r,T=e[2]+t,r+=e[3],t+=e[4],n.quadraticCurveTo(y,T,r,t);break;case"T":e=a[i],(y===null||T===null)&&(y=r,T=t),y=2*r-y,T=2*t-T,r=e[1],t=e[2],n.quadraticCurveTo(y,T,r,t);break;case"t":e=a[i],(y===null||T===null)&&(y=r,T=t),y=2*r-y,T=2*t-T,r+=e[1],t+=e[2],n.quadraticCurveTo(y,T,r,t);break;case"z":case"Z":M&&(r=M.x,t=M.y),M=null,n.closePath();break;case"AC":e=a[i],r=e[1],t=e[2],D=e[3],l=e[4],o=e[5],E=e[6],n.arc(r,t,D,l,o,E);break;case"AT":e=a[i],S=e[1],G=e[2],r=e[3],t=e[4],D=e[5],n.arcTo(S,G,r,t,D);break;case"E":e=a[i],r=e[1],t=e[2],p=e[3],f=e[4],P=e[5],l=e[6],o=e[7],E=e[8],n.save(),n.translate(r,t),n.rotate(P),n.scale(p,f),n.arc(0,0,1,l,o,E),n.restore();break;case"R":e=a[i],r=e[1],t=e[2],z=e[3],d=e[4],M={x:r,y:t},n.rect(r,t,z,d);break;case"RR":e=a[i],r=e[1],t=e[2],z=e[3],d=e[4],Q=e[5],M={x:r,y:t},n.roundRect(r,t,z,d,Q);break}m?(m.x=r,m.y=t):m={x:r,y:t}}}function K(n){if(!(!n||!n.CanvasRenderingContext2D||n.Path2D)){var a=n.CanvasRenderingContext2D,r=a.prototype.fill,t=a.prototype.stroke,o=a.prototype.isPointInPath;a.prototype.fill=function(){for(var s=[],u=0;u<arguments.length;u++)s[u]=arguments[u];if(s[0]instanceof L){var h=s[0],v=s[1]||"nonzero";N(this,h.commands),r.apply(this,[v])}else{var v=s[0]||"nonzero";return r.apply(this,[v])}},a.prototype.stroke=function(s){s&&N(this,s.commands),t.apply(this)},a.prototype.isPointInPath=function(){for(var s=[],u=0;u<arguments.length;u++)s[u]=arguments[u];if(s[0]instanceof L){var h=s[0],v=s[1],P=s[2],C=s[3]||"nonzero";return N(this,h.commands),o.apply(this,[v,P,C])}else return o.apply(this,s)},n.Path2D=L}}function V(n,a,r,t,o){var l=this;if(o===void 0&&(o=0),typeof o=="number"&&(o=[o]),Array.isArray(o)){if(o.length===0||o.length>4)throw new RangeError("Failed to execute 'roundRect' on '".concat(this.constructor.name,"': ").concat(o.length," radii provided. Between one and four radii are necessary."));o.forEach(function(C){if(C<0)throw new RangeError("Failed to execute 'roundRect' on '".concat(l.constructor.name,"': Radius value ").concat(C," is negative."))})}else return;if(o.length===1&&o[0]===0)return this.rect(n,a,r,t);var s=Math.min(r,t)/2,u,h,v,P=u=h=v=Math.min(s,o[0]);o.length===2&&(u=v=Math.min(s,o[1])),o.length===3&&(u=v=Math.min(s,o[1]),h=Math.min(s,o[2])),o.length===4&&(u=Math.min(s,o[1]),h=Math.min(s,o[2]),v=Math.min(s,o[3])),this.moveTo(n,a+t-v),this.arcTo(n,a,n+P,a,P),this.arcTo(n+r,a,n+r,a+u,u),this.arcTo(n+r,a+t,n+r-h,a+t,h),this.arcTo(n,a+t,n,a+t-v,v),this.moveTo(n,a)}function O(n){if(!(!n||!n.CanvasRenderingContext2D)){var a=n.CanvasRenderingContext2D,r=n.Path2D;a&&!a.prototype.roundRect&&(a.prototype.roundRect=V),r&&!r.prototype.roundRect&&(r.prototype.roundRect=V)}}K(window);O(window);
