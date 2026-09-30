/* ==========================================================================
   generar-mapa.mjs — genera js/datos/mapa-geo.js (contornos del mapa).
   NO es necesario para usar la app: el archivo ya viene generado.
   Solo sirve si quieres regenerarlo o cambiar la simplificación.

   Uso (requiere Node.js 18 o más reciente):
     cd herramientas
     npm install @webrek/mx-geo topojson-client world-atlas@2
     node generar-mapa.mjs
   Fuentes: Marco Geoestadístico del INEGI (vía @webrek/mx-geo, MIT) y
   Natural Earth (dominio público, vía world-atlas).
   ========================================================================== */
import { estadosTopoJSON } from '@webrek/mx-geo';
import * as topo from 'topojson-client';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const carpetaDist = path.resolve('node_modules/@webrek/mx-geo/dist');
const archivoQroo = fs.readdirSync(carpetaDist).find((f) => /^23-.*\.js$/.test(f));
const muniTopo = (await import(pathToFileURL(path.join(carpetaDist, archivoQroo)).href)).default;
const world = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-10m.json','utf8'));

const LON_MIN=-89.45, LON_MAX=-86.55, LAT_MIN=17.75, LAT_MAX=21.75;
const LAT0=19.75, COS=Math.cos(LAT0*Math.PI/180), K=250;
const W=+( (LON_MAX-LON_MIN)*COS*K ).toFixed(1), H=+((LAT_MAX-LAT_MIN)*K).toFixed(1);
const px = ([lon,lat]) => [ (lon-LON_MIN)*COS*K, (LAT_MAX-lat)*K ];
const M=30; // clip margin
const R={x0:-M,y0:-M,x1:W+M,y1:H+M};

function clipRing(pts){
  const edges=[
    p=>p[0]>=R.x0, p=>p[0]<=R.x1, p=>p[1]>=R.y0, p=>p[1]<=R.y1];
  const inter=[
    (a,b)=>{const t=(R.x0-a[0])/(b[0]-a[0]);return [R.x0,a[1]+t*(b[1]-a[1])]},
    (a,b)=>{const t=(R.x1-a[0])/(b[0]-a[0]);return [R.x1,a[1]+t*(b[1]-a[1])]},
    (a,b)=>{const t=(R.y0-a[1])/(b[1]-a[1]);return [a[0]+t*(b[0]-a[0]),R.y0]},
    (a,b)=>{const t=(R.y1-a[1])/(b[1]-a[1]);return [a[0]+t*(b[0]-a[0]),R.y1]}];
  let out=pts;
  for(let e=0;e<4;e++){
    const inp=out; out=[]; if(!inp.length) break;
    for(let i=0;i<inp.length;i++){
      const cur=inp[i], prev=inp[(i+inp.length-1)%inp.length];
      const ci=edges[e](cur), pi=edges[e](prev);
      if(ci){ if(!pi) out.push(inter[e](prev,cur)); out.push(cur);} else if(pi) out.push(inter[e](prev,cur));
    }
  }
  return out;
}
function dp(pts,tol){
  if(pts.length<4) return pts;
  const keep=new Uint8Array(pts.length); keep[0]=keep[pts.length-1]=1;
  const st=[[0,pts.length-1]];
  while(st.length){const [a,b]=st.pop(); let md=0,mi=-1;
    const [x1,y1]=pts[a],[x2,y2]=pts[b]; const dx=x2-x1,dy=y2-y1; const L=Math.hypot(dx,dy)||1e-9;
    for(let i=a+1;i<b;i++){const d=Math.abs(dy*pts[i][0]-dx*pts[i][1]+x2*y1-y2*x1)/L; if(d>md){md=d;mi=i;}}
    if(md>tol){keep[mi]=1; st.push([a,mi],[mi,b]);}}
  return pts.filter((_,i)=>keep[i]);
}
function ringsOf(geom){ if(geom.type==='Polygon') return geom.coordinates; if(geom.type==='MultiPolygon') return geom.coordinates.flat(); return []; }
function pathOf(geom,tol,clip=false){
  let d='';
  for(const ring of ringsOf(geom)){
    let pts=ring.map(px);
    if(clip) pts=clipRing(pts);
    if(pts.length>3){ const a=pts[0],z=pts[pts.length-1]; if(a[0]===z[0]&&a[1]===z[1]) pts=pts.slice(0,-1);
      let fi=0,fd=-1; pts.forEach((q,i)=>{const dd=Math.hypot(q[0]-pts[0][0],q[1]-pts[0][1]); if(dd>fd){fd=dd;fi=i;}});
      pts=[...dp(pts.slice(0,fi+1),tol).slice(0,-1), ...dp([...pts.slice(fi),pts[0]],tol).slice(0,-1)]; }
    if(pts.length<3) continue;
    // drop tiny rings
    let area=0; for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length]; area+=a[0]*b[1]-b[0]*a[1];}
    if(Math.abs(area/2)<1.5) continue;
    d+='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')+'Z';
  }
  return d;
}
const est = topo.feature(estadosTopoJSON, estadosTopoJSON.objects.estados).features;
const vecinos=[];
for(const f of est){ if(['04','31'].includes(f.properties.cve)) vecinos.push({nombre:f.properties.nombre, d:pathOf(f.geometry,1.0,true)}); }
const wf = topo.feature(world, world.objects.countries).features;
for(const f of wf){ if(['084','320'].includes(f.id)) vecinos.push({nombre: f.id==='084'?'Belice':'Guatemala', d:pathOf(f.geometry,1.0,true)}); }
const qr = est.find(f=>f.properties.cve==='23');
const estadoD = pathOf(qr.geometry,0.5,true);
const obj = muniTopo.objects[Object.keys(muniTopo.objects)[0]];
const munis = topo.feature(muniTopo, obj).features.map(f=>({id:f.properties.cvegeo, nombre:f.properties.nombre, d:pathOf(f.geometry,0.6,true)}));
// centroid labels (area-weighted of largest ring)
function centroid(geom){ let best=null,ba=0; for(const r of ringsOf(geom)){const p=r.map(px); let a=0,cx=0,cy=0; for(let i=0;i<p.length;i++){const q=p[i],s=p[(i+1)%p.length]; const c=q[0]*s[1]-s[0]*q[1]; a+=c; cx+=(q[0]+s[0])*c; cy+=(q[1]+s[1])*c;} a/=2; if(Math.abs(a)>ba){ba=Math.abs(a); best=[cx/(6*a),cy/(6*a)];}} return best.map(v=>+v.toFixed(1)); }
topo.feature(muniTopo, obj).features.forEach((f,i)=>munis[i].c=centroid(f.geometry));
const out={ancho:W,alto:H,proyeccion:{lonMin:LON_MIN,latMax:LAT_MAX,cos:+COS.toFixed(6),k:K},estado:estadoD,municipios:munis,vecinos};
const js = `/* Geometría del mapa de Quintana Roo.
 * Fuente de límites estatales y municipales: Marco Geoestadístico de INEGI (vía paquete @webrek/mx-geo, licencia MIT).
 * Belice y Guatemala: Natural Earth (dominio público, vía paquete world-atlas).
 * Proyección equirectangular simple (latitud de referencia 19.75° N). Generado por herramientas/generar-mapa.mjs */
const MAPA_GEO = ${JSON.stringify(out)};\n`;
fs.writeFileSync('../js/datos/mapa-geo.js', js);
console.log('W',W,'H',H,'bytes',js.length, munis.map(m=>m.nombre+':'+m.d.length).join(', '));
