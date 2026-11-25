{
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- navegación por hash ---------- */
const views=['inicio','historia','cultura','protocolo','riesgos','oportunidades','fuentes'];
const show=()=>{
  const h=(location.hash||'').slice(1);
  const v=views.includes(h)?h:'inicio';
  document.querySelectorAll('section.view').forEach(s=>s.classList.toggle('on',s.dataset.v===v));
  document.querySelectorAll('nav.tabs a').forEach(a=>{if(a.getAttribute('href')==='#'+v)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  window.scrollTo(0,0);
  if(window.__anim)window.__anim(v);
};
window.addEventListener('hashchange',show);

/* ---------- línea de tiempo ---------- */
const TL=[
 {y:1947,c:'ape',t:'Apertura obligada de posguerra',d:'Sin petróleo, carbón ni hierro, y con presión de Estados Unidos, Italia abre su economía al mercado internacional entre 1945 y 1950. Llega la ayuda del Plan Marshall y en 1948 ingresa a la OECE.',s:'PBS (s. f.); Geopop (s. f.)'},
 {y:1950,c:'ape',t:'Ingreso al GATT',d:'Italia es parte contratante del GATT desde el 30 de mayo de 1950: se compromete con la reducción multilateral de aranceles.',s:'OMC (s. f.)'},
 {y:1951,c:'int',t:'Fundadora de la CECA',d:'Con Francia, Alemania Occidental y el Benelux crea la Comunidad Europea del Carbón y del Acero, primer paso de la integración europea.',s:'Geopop (s. f.)'},
 {y:1957,c:'int',t:'Tratados de Roma: nace la CEE',d:'El 25 de marzo de 1957 se firma en Roma el tratado de la Comunidad Económica Europea. La unión aduanera acaba con lo que quedaba del proteccionismo italiano.',s:'PBS (s. f.)'},
 {y:1958,c:'ape',t:'El "milagro económico" (1958–1963)',d:'Entre 1950 y 1963 el PIB crece 5,9 % anual en promedio, con un máximo de 8,3 % en 1961. El Norte industrial exporta; el Sur agrícola se queda atrás.',s:'Britannica (s. f.-a)'},
 {y:1961,c:'ape',t:'Fundadora de la OCDE',d:'Italia es uno de los 20 países que firman en 1960 la convención de la OCDE, vigente desde el 30 de septiembre de 1961.',s:'OCDE (s. f.); MAECI (s. f.)'},
 {y:1975,c:'ape',t:'Miembro fundador del G6/G7',d:'Es uno de los seis países de la primera cumbre, en Rambouillet (Francia), en noviembre de 1975; con Canadá, desde 1976, el grupo pasa a ser el G7.',s:'Ministerio de Relaciones Exteriores de Japón (s. f.)'},
 {y:1992,c:'int',t:'Maastricht y privatizaciones',d:'Para cumplir los criterios de Maastricht, Italia inicia en 1992 privatizaciones a gran escala (unos USD 12.000 millones anuales en 1992–2000) que reducen la deuda pública; el holding estatal IRI, motor de la posguerra, se desmonta.',s:'Goldstein (2003)'},
 {y:1995,c:'ape',t:'Miembro de la OMC',d:'Desde el 1 de enero de 1995 es miembro de la Organización Mundial del Comercio; su política comercial se negocia a través de la Unión Europea.',s:'OMC (s. f.)'},
 {y:1999,c:'int',t:'Adopta el euro',d:'Tras un programa de disciplina fiscal para calificar, Italia entra al euro desde su inicio en 1999 (billetes en 2002). Pierde la devaluación como herramienta para ganar competitividad.',s:'Britannica (s. f.-b)'},
 {y:2011,c:'cri',t:'Crisis de deuda soberana',d:'El diferencial de los bonos a 10 años frente a Alemania pasa de menos de 200 puntos básicos en junio a más de 500 a finales de 2011; cae el gobierno y llega un gabinete técnico de ajuste. Queda expuesto el bajo crecimiento de largo plazo.',s:'CEPR VoxEU (2013)'},
 {y:2013,c:'hoy',t:'Acuerdo Comercial UE–Colombia',d:'Desde el 1 de agosto de 2013 se aplica de forma provisional el acuerdo de la Unión Europea, incluida Italia, con Colombia.',s:'Comisión Europea (s. f.)'},
 {y:2019,c:'cri',t:'Entra a la Franja y la Ruta con China',d:'Italia es el único país del G7 que firma el memorando de la Franja y la Ruta.',s:'CSIS (2023)'},
 {y:2023,c:'cri',t:'Sale de la Franja y la Ruta',d:'En diciembre de 2023 no renueva el memorando: sus exportaciones a China crecieron poco mientras las importaciones casi se duplicaron.',s:'CSIS (2023)'},
 {y:2024,c:'hoy',t:'Primer vuelo directo Milán–Cartagena',d:'El 22 y 23 de diciembre de 2024 Neos inaugura la ruta, semanal, con escala técnica en Punta Cana. Es la primera conexión directa en años entre los dos países.',s:'Cancillería de Colombia (2024); Aviacionline (2024)'},
 {y:2025,c:'hoy',t:'Cuarto exportador mundial',d:'En el tercer trimestre de 2025 sus exportaciones (casi USD 190.000 millones) superan a las de Japón; solo China, Estados Unidos y Alemania exportan más.',s:'LaPresse (2025)'}
];
const Y0=1945,Y1=2027;
const band=document.getElementById('tlBand'),det=document.getElementById('tlDetail'),list=document.getElementById('tlList');
band.innerHTML=TL.map((e,i)=>{const x=((e.y-Y0)/(Y1-Y0)*100).toFixed(2);const lab=[1947,1957,1975,1995,2011,2025];const minor=!lab.includes(e.y)?' hide':([1957,1995].includes(e.y)?' minor':'');return `<button class="tl-dot ${e.c}" style="left:${x}%" data-i="${i}" aria-pressed="false" aria-label="${e.y}: ${esc(e.t)}"></button><span class="tl-yr${minor}" style="left:${x}%">${e.y}</span>`}).join('');
list.innerHTML=TL.map((e,i)=>`<li data-i="${i}"><span class="y">${e.y}</span><div><strong>${esc(e.t)}</strong><span>${esc(e.d)} <em>(${esc(e.s)})</em></span></div></li>`).join('');
const pick=i=>{
  const e=TL[i];
  det.innerHTML=`<div class="yr">${e.y}</div><h3 style="margin:.3em 0">${esc(e.t)}</h3><p>${esc(e.d)}</p><p class="src">Fuente: ${esc(e.s)}</p>`;
  band.querySelectorAll('.tl-dot').forEach(b=>b.setAttribute('aria-pressed',b.dataset.i==i?'true':'false'));
  list.querySelectorAll('li').forEach(l=>l.classList.toggle('sel',l.dataset.i==i));
};
band.addEventListener('click',ev=>{const b=ev.target.closest('.tl-dot');if(b)pick(+b.dataset.i)});
band.addEventListener('keydown',ev=>{const b=ev.target.closest('.tl-dot');if(!b)return;let i=+b.dataset.i;if(ev.key==='ArrowRight')i=Math.min(TL.length-1,i+1);else if(ev.key==='ArrowLeft')i=Math.max(0,i-1);else return;ev.preventDefault();pick(i);band.querySelector(`[data-i="${i}"]`).focus()});
pick(TL.length-1);

/* ---------- Hofstede ---------- */
const HOF=[
 ['Distancia al poder','PDI',50,67,'Italia es más igualitaria en el Norte y más jerárquica en el Sur. Con todo, se respeta el rango: hay que hablar con el decisor real.'],
 ['Individualismo','IDV',76,13,'La mayor brecha. El italiano valora el logro personal y la competencia; el colombiano, la lealtad al grupo. Reconocer el mérito individual del interlocutor.'],
 ['Motivación por el logro','MAS',70,64,'Ambos son competitivos y orientados al éxito: se espera una propuesta ambiciosa y bien argumentada.'],
 ['Evitación de la incertidumbre','UAI',75,80,'Los dos buscan reglas y seguridad: contratos claros, condiciones de cancelación y seguros por escrito.'],
 ['Orientación al largo plazo','LTO',61,13,'El italiano planea y ahorra; el colombiano prioriza el corto plazo. Presentar la relación como un plan de varias temporadas.'],
 ['Indulgencia','IVR',30,83,'Italia es más contenida y pesimista en este índice. No exagerar el tono festivo en la venta: seriedad primero, disfrute como resultado.']
];
document.getElementById('hof').innerHTML=HOF.map(([n,k,a,b,imp])=>{const lo=Math.min(a,b),hi=Math.max(a,b);return `<div class="hrow"><div class="hname">${n}<small>${k}</small></div><div class="track" role="img" aria-label="${n}: Italia ${a}, Colombia ${b}"><span class="seg" style="left:${lo}%;width:${hi-lo}%"></span><span class="d it" style="left:${a}%"></span><span class="d co" style="left:${b}%"></span><span class="v" style="left:${a}%;color:var(--azz);transform:translateX(${a<b?-95:-5}%)">${a}</span><span class="v" style="left:${b}%;color:var(--oro);transform:translateX(${a<b?-5:-95}%)">${b}</span></div><div class="himp">${imp}</div></div>`}).join('');

/* ---------- riesgos ---------- */
const R=[
 {p:3,i:3,t:'Incumplir lo prometido en destino',ctx:'Cambiar un hotel, retrasar un traslado o bajar la calidad de un guía parece menor en Colombia. En Italia el tour operador es el organizador legal y responde ante el viajero, que puede reclamar daños por "vacanza rovinata" (vacaciones arruinadas). El costo pasa al proveedor y la relación se pierde.',m:'Contrato con estándares por servicio, seguro de responsabilidad civil, proveedores verificados y un plan B documentado para cada servicio.'},
 {p:3,i:2,t:'Presionar para cerrar en la primera reunión',ctx:'La urgencia por firmar se interpreta como desconfianza o desesperación. Los contratos rara vez se firman en el primer encuentro (Accor Business Travel, s. f.).',m:'Plantear objetivos por etapas: primera reunión para conocerse, segunda para la propuesta, fam trip antes del contrato.'},
 {p:3,i:2,t:'Confundir entusiasmo con acuerdo',ctx:'La conversación italiana es expresiva y de contexto alto; un "sì, interessante" en una comida no es un compromiso. El colombiano que lo toma como venta cerrada planea mal la temporada.',m:'Cerrar cada reunión con un resumen por correo y próximos pasos con fecha.'},
 {p:2,i:3,t:'Propuesta descuidada o solo en inglés',ctx:'Por la "bella figura", un dossier con errores, fotos pobres o en un inglés que el comprador maneja a medias se lee como poca seriedad del proveedor, y por extensión del destino.',m:'Material profesional en italiano revisado por un hablante nativo; fichas técnicas y tarifas netas claras.'},
 {p:2,i:2,t:'Tutear o saltarse los títulos',ctx:'Usar el nombre de pila o el "tú" de entrada choca con la formalidad y la jerarquía por edad y cargo. En una empresa familiar, ofender al dueño cierra la puerta.',m:'Usar Signor/Signora o el título profesional y el "Lei" hasta que el italiano proponga el trato informal.'},
 {p:2,i:2,t:'Choque con la concepción del tiempo',ctx:'Se exige puntualidad al extranjero, pero las reuniones pueden empezar tarde y los plazos estirarse; el Norte es más estricto que el Sur. El colombiano puede caer en los dos errores: llegar tarde o irritarse por la espera.',m:'Llegar puntual, no mostrar impaciencia y fijar fechas de entrega por escrito.'},
 {p:2,i:3,t:'Humor y estereotipos sobre mafia o narcotráfico',ctx:'Los estereotipos van en las dos direcciones: hay contenido en medios italianos que asocia a Colombia con drogas y turismo sexual, y bromas colombianas sobre la mafia italiana. Una broma así en una reunión destruye la imagen de seriedad. Además, cualquier asociación con turismo sexual tiene consecuencias legales bajo la Ley 1336 de 2009.',m:'Evitar el tema; presentar el código de conducta contra la explotación sexual infantil y la oferta de turismo responsable.'},
 {p:2,i:1,t:'Gestos que se interpretan mal',ctx:'El gesto de los "cuernos" (índice y meñique extendidos) se entiende como insulto; la gesticulación italiana puede parecer agresiva a un colombiano sin serlo.',m:'Evitar gestos de mano no conocidos y no interpretar el tono alto como enojo.'},
 {p:2,i:2,t:'Ignorar agosto y el calendario local',ctx:'Escribir o viajar en agosto, o en el día del santo patrono de una ciudad, lleva a correos sin respuesta y reuniones canceladas, y retrasa la contratación de la temporada de invierno.',m:'Calendario comercial anual: prospección en otoño y en las ferias (BIT en febrero, TTG en octubre), nada en agosto.'},
 {p:1,i:3,t:'Riesgos legales por datos y documentos de viaje',ctx:'Manejar listas de pasajeros sin cumplir el RGPD, o que el equipo comercial no pueda entrar a una feria por no tramitar el ETIAS cuando entre en vigor, son errores de comunicación con costos altos.',m:'Acuerdo de tratamiento de datos con cada operador y verificación de requisitos de viaje un mes antes de cada desplazamiento.'}
];
const lbl={1:'Baja',2:'Media',3:'Alta'},ilbl={1:'Bajo',2:'Medio',3:'Alto'};
const mx=document.getElementById('matrix');
let mh='';
for(const p of [3,2,1]){mh+=`<div class="ax v">${lbl[p]}</div>`;for(const i of [1,2,3]){const sev=p+i>=5?'c3':p+i>=4?'c2':'c1';mh+=`<div class="cell ${sev}">${R.map((r,k)=>r.p===p&&r.i===i?`<button class="chip" data-k="${k}" aria-pressed="false" aria-label="Riesgo ${k+1}: ${esc(r.t)}">${k+1}</button>`:'').join('')}</div>`}}
mh+=`<div></div><div class="ax">Impacto bajo</div><div class="ax">Impacto medio</div><div class="ax">Impacto alto</div>`;
mx.innerHTML=mh;
const rk=document.getElementById('risks'),rf=document.getElementById('riskFocus');
rk.innerHTML=R.map((r,k)=>`<article class="risk" id="r${k+1}"><h3><span class="num">${k+1}</span>${esc(r.t)}</h3><p><span class="tag">Probabilidad ${lbl[r.p].toLowerCase()}</span> <span class="tag">Impacto ${ilbl[r.i].toLowerCase()}</span></p><p>${esc(r.ctx)}</p><p class="mit"><b>Mitigación:</b> ${esc(r.m)}</p></article>`).join('');
const focusR=(k,scroll)=>{
  const r=R[k];
  rf.innerHTML=`<p class="src">Riesgo ${k+1} de ${R.length}</p><h3>${esc(r.t)}</h3><p>${esc(r.ctx)}</p><p><b>Mitigación:</b> ${esc(r.m)}</p>`;
  mx.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k==k?'true':'false'));
  rk.querySelectorAll('.risk').forEach((a,j)=>a.classList.toggle('sel',j===k));
  if(scroll)document.getElementById('r'+(k+1)).scrollIntoView({behavior:'smooth',block:'center'});
};
mx.addEventListener('click',ev=>{const c=ev.target.closest('.chip');if(c)focusR(+c.dataset.k,true)});
focusR(0,false);

/* ---------- llegadas ---------- */
const ARR=[[2019,9111],[2020,2475],[2021,5122],[2022,6934],[2023,6814],[2024,6424]];
const amax=Math.max(...ARR.map(a=>a[1]));
document.getElementById('arrBars').innerHTML=ARR.map(([y,v])=>`<div class="bar"><span>${y}</span><div class="t"><div class="f${y>2019?' low':''}" style="width:${(v/amax*100).toFixed(1)}%"></div></div><span class="val">${v.toLocaleString('es-CO')}</span></div>`).join('')+`<p class="src" style="margin:4px 0 0">En 2024 las llegadas estaban 29,5 % por debajo de 2019.</p>`;

/* ---------- evaluador de modo de entrada ---------- */
const CR=[['inv','Baja inversión requerida',4,'Inversión'],['ctl','Control de la experiencia del viajero',3,'Control'],['vel','Velocidad para llegar al cliente italiano',4,'Velocidad'],['leg','Bajo riesgo legal y de responsabilidad',5,'Riesgo legal'],['cul','Ajuste a una cultura de relaciones e intermediarios',4,'Ajuste cultural']];
const MODES=[
 {n:'Exportación directa B2C (web en italiano)',s:{inv:3,ctl:5,vel:2,leg:2,cul:2},why:'Control total, pero vender paquetes directo al consumidor europeo convierte a la empresa en organizadora ante la ley europea; además el italiano prefiere comprar a quien conoce.'},
 {n:'Distribuidor local (tour operadores italianos, B2B)',s:{inv:5,ctl:3,vel:4,leg:4,cul:5},why:'El operador italiano asume la responsabilidad legal y la garantía de insolvencia y ya tiene la cartera de agencias. Se cede parte del control y del margen.'},
 {n:'Alianza estratégica (operador + ruta aérea)',s:{inv:4,ctl:2,vel:5,leg:4,cul:5},why:'Producto conjunto con un operador ligado al vuelo directo: rápido y visible, pero crea dependencia de un solo socio y de una ruta estacional.'},
 {n:'Franquicia',s:{inv:2,ctl:3,vel:2,leg:3,cul:2},why:'Requiere una marca reconocida y un modelo replicable que una DMC colombiana no tiene en Italia.'},
 {n:'Licencia',s:{inv:4,ctl:1,vel:2,leg:3,cul:2},why:'Licenciar contenidos o marca de destino da poco control sobre la experiencia, que es el producto.'}
];
const W={};CR.forEach(c=>W[c[0]]=c[2]);
const wEl=document.getElementById('weights'),mb=document.getElementById('modeBars'),mt=document.getElementById('modeTable');
wEl.innerHTML='<h3>Importancia de cada criterio (0 a 5)</h3>'+CR.map(([k,n])=>`<div class="sl"><label for="w-${k}">${n}</label><output id="o-${k}" for="w-${k}">${W[k]}</output><input type="range" id="w-${k}" min="0" max="5" step="1" value="${W[k]}" data-k="${k}"></div>`).join('')+'<button class="btn" id="wReset" type="button">Volver a los pesos del grupo</button>';
mt.innerHTML='<thead><tr><th>Modo</th>'+CR.map(c=>`<th title="${esc(c[1])}" style="text-align:right">${esc(c[3])}</th>`).join('')+'</tr></thead><tbody>'+MODES.map(m=>`<tr><td>${esc(m.n)}<br><span class="src">${esc(m.why)}</span></td>${CR.map(c=>`<td style="text-align:right">${m.s[c[0]]}</td>`).join('')}</tr>`).join('')+'</tbody>';
const calc=()=>{
  const sw=CR.reduce((a,c)=>a+W[c[0]],0)||1;
  const sc=MODES.map(m=>({n:m.n,v:CR.reduce((a,c)=>a+W[c[0]]*m.s[c[0]],0)/(5*sw)*100})).sort((a,b)=>b.v-a.v);
  mb.innerHTML=sc.map((m,i)=>`<div class="bar" style="grid-template-columns:minmax(0,13em) minmax(0,1fr) 3.2em"><span style="font-weight:${i?400:700}">${esc(m.n)}</span><div class="t"><div class="f" style="width:${m.v.toFixed(1)}%;background:${i?'color-mix(in srgb,var(--azz) 45%,var(--sur))':'var(--azz)'}"></div></div><span class="val">${Math.round(m.v)}</span></div>`).join('');
};
wEl.addEventListener('input',ev=>{const k=ev.target.dataset.k;if(!k)return;W[k]=+ev.target.value;document.getElementById('o-'+k).textContent=W[k];calc()});
document.getElementById('wReset').addEventListener('click',()=>{CR.forEach(([k,,d])=>{W[k]=d;document.getElementById('w-'+k).value=d;document.getElementById('o-'+k).textContent=d});calc()});
calc();


/* ---------- protocolos ProChile ---------- */
const PROTO=[
 ['Idioma','Se recomienda realizar las reuniones y comunicaciones en italiano. Si no es posible, se debe consultar previamente si la otra parte prefiere comunicarse en inglés o español.','Ruta Viva envía el dossier en italiano y pregunta antes de la primera llamada si el operador prefiere inglés o español.'],
 ['Puntualidad','Es importante llegar a tiempo y solicitar las reuniones con anticipación, demostrando responsabilidad y respeto.','Citas pedidas con dos o tres semanas de antelación, nunca en agosto, y confirmadas por correo el día anterior.'],
 ['Vestimenta','Se recomienda utilizar ropa formal y cuidar la presentación personal, ya que refleja seriedad e interés en los negocios.','Traje formal en ferias como la BIT de Milán: la imagen del equipo es parte de la "bella figura" que se juzga desde el primer minuto.'],
 ['Saludo y presentación','Al iniciar una reunión es habitual saludar con un apretón de manos e intercambiar tarjetas de presentación.','Tarjetas bilingües español-italiano con el cargo claro; trato de usted y apellido hasta que el italiano proponga otra cosa.'],
 ['Confianza y comunicación','Se valora establecer una buena relación con la otra empresa. Por eso, es importante conversar, escuchar y mostrar interés por la otra parte.','La primera reunión se dedica a conocer al operador, su cartera de clientes y sus destinos; la tarifa se discute después.'],
 ['Desarrollo de la reunión','Se debe tener paciencia, presentar las propuestas de manera clara y estar preparado para responder preguntas o aclarar diferentes aspectos del negocio.','Llevar respuestas listas sobre seguros, políticas de cancelación y estándares de cada proveedor en Colombia.'],
 ['Cumplimiento de acuerdos','Los empresarios italianos valoran que se respeten las condiciones acordadas, especialmente en cuanto a calidad, precios y entregas.','Es el riesgo n.º 1 de la página 4: un incumplimiento en destino recae legalmente sobre el operador italiano ante el viajero.'],
 ['Seguimiento','Después de la reunión es recomendable enviar un correo de agradecimiento, donde se resuman los temas tratados y los compromisos establecidos.','Correo en italiano dentro de las 24 horas siguientes, con compromisos, responsables y fechas.']
];
const pl=document.getElementById('protoList'),pc=document.getElementById('protoCard');
let pi=0;
pl.innerHTML=PROTO.map((p,i)=>`<button role="tab" id="pt-${i}" aria-controls="protoCard" aria-selected="false" data-i="${i}"><span class="pn">${i+1}</span><span>${esc(p[0])}</span></button>`).join('');
const pset=(i,focus)=>{
  pi=(i+PROTO.length)%PROTO.length;const p=PROTO[pi];
  pl.querySelectorAll('button').forEach((b,j)=>{b.setAttribute('aria-selected',j===pi?'true':'false');b.tabIndex=j===pi?0:-1});
  pc.innerHTML=`<div class="pbar"><i style="width:${((pi+1)/PROTO.length*100).toFixed(1)}%"></i></div><p class="src">Protocolo ${pi+1} de ${PROTO.length}</p><h3><span class="big">${pi+1}</span>${esc(p[0])}</h3><p>${esc(p[1])}</p><p class="apply"><b>Aplicación al caso:</b> ${esc(p[2])}</p><div class="pnav"><button class="btn" type="button" data-d="-1">Anterior</button><button class="btn" type="button" data-d="1">Siguiente</button></div>`;
  if(focus)pl.querySelector(`[data-i="${pi}"]`).focus();
  if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches){gsap.fromTo(pc.querySelectorAll('h3,p,.pnav'),{y:14,opacity:0},{y:0,opacity:1,duration:.45,stagger:.05,ease:'power2.out'})}
};
pl.addEventListener('click',e=>{const b=e.target.closest('button');if(b)pset(+b.dataset.i)});
pl.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();pset(pi+1,true)}else if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();pset(pi-1,true)}});
pc.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b)pset(pi+ +b.dataset.d)});
pset(0);

/* ---------- multimedia ---------- */
const MED=[
 {p:'historia',k:'v',u:'https://www.youtube.com/watch?v=p1CIxlrUq1Q',t:'25 de marzo de 1957: el Tratado de Roma y el nacimiento de la UE',a:'Video en español · 1mview'},
 {p:'historia',k:'v',u:'https://www.youtube.com/watch?v=ZKbMYXSKhGY',t:'Italy built an economic miracle after WWII: so why did its economy stop growing?',a:'Video en inglés · Uncover History'},
 {p:'cultura',k:'v',u:'https://www.youtube.com/watch?v=bac1wWSgQMs',t:'Cultural Dimensions Theory (explained in 3 minutes)',a:'Video en inglés · Helpful Professor'},
 {p:'cultura',k:'d',u:'https://empresarios.colombia.travel/es/system/tdf/emprasarios/pdf/perfil_turista_italia_es.pdf?file=1&force=&id=2451&type=node',t:'Perfil del turista italiano',a:'Documento PDF · ProColombia'},
 {p:'protocolo',k:'v',u:'https://www.youtube.com/watch?v=erO8d8pynvU',t:'El mapa cultural, de Erin Meyer',a:'Video en español · David Cano'},
 {p:'protocolo',k:'v',u:'https://www.youtube.com/watch?v=JSwaHukBQAo',t:'How to master Italian business etiquette and gestures',a:'Video en inglés · Iryna Bushmina'},
 {p:'riesgos',k:'v',u:'https://www.youtube.com/watch?v=UEfOGAVW988',t:'8 things to know before doing business in Italy (Norte y Sur)',a:'Video en inglés · Dreamerspro'},
 {p:'riesgos',k:'d',u:'https://ecc-netitalia.it/wp-content/uploads/pdf_pubblicazioni/Pacchetti_turistici_leaflet.pdf',t:'Paquetes turísticos: derechos del viajero en Italia',a:'Documento PDF en italiano · ECC-Net Italia'},
 {p:'oportunidades',k:'v',u:'https://www.youtube.com/watch?v=ffqF8cYnB6g',t:'Become a Colombia travel expert: viaje de familiarización con ProColombia',a:'Video en inglés · Impulse Travel Colombia'},
 {p:'protocolo',k:'d',u:'https://acceso.prochile.cl/wp-content/uploads/2018/11/como_hacer_negocios_italia_2018.pdf',t:'Cómo hacer negocios en Italia',a:'Documento PDF · ProChile (2018)'},
 {p:'oportunidades',k:'d',u:'https://www.procolombia.co/colombiatrade/exportador/herramientas-del-exportador/perfil-logistico/italia',t:'Perfil logístico de Italia',a:'Página web · ProColombia'},
 {p:'oportunidades',k:'d',u:'https://trade.ec.europa.eu/access-to-markets/es/content/acuerdo-comercial-ue-colombia-ecuador-peru',t:'Acuerdo comercial UE–Colombia–Perú–Ecuador',a:'Página web · Comisión Europea'},
 {p:'oportunidades',k:'d',u:'https://www.ttgexpo.it/en',t:'TTG Travel Experience, Rímini',a:'Página web · Italian Exhibition Group'}
];
const icon=k=>k==='v'?'<svg viewBox="0 0 64 44" aria-hidden="true"><rect width="64" height="44" rx="9" fill="#c8102e"/><path d="M26 13 L44 22 L26 31Z" fill="#fff"/></svg>':'<svg viewBox="0 0 64 44" aria-hidden="true"><rect width="64" height="44" rx="9" fill="#0a4fa3"/><rect x="22" y="8" width="20" height="28" rx="2" fill="#fff"/><path d="M26 16h12M26 21h12M26 26h8" stroke="#0a4fa3" stroke-width="2.5"/></svg>';
const ytId=u=>(u.match(/[?&]v=([\w-]{11})/)||[])[1];
const card=m=>`<a class="vid" href="${esc(m.u)}" target="_blank" rel="noopener">${icon(m.k)}<div><b>${esc(m.t)}</b><span>${esc(m.a)} · abre en pestaña nueva</span></div></a>`;
const emb=m=>`<figure class="yt"><div class="ratio"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(m.u)}?rel=0" title="${esc(m.t)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><figcaption><b>${esc(m.t)}</b>${esc(m.a)} · <a href="${esc(m.u)}" target="_blank" rel="noopener">ver en YouTube</a></figcaption></figure>`;
document.querySelectorAll('.media').forEach(el=>{const p=el.dataset.media;const items=MED.filter(m=>p==='all'||m.p===p);if(p==='all'){el.innerHTML=items.map(card).join('');return}el.classList.add('has-yt');el.innerHTML=items.filter(m=>m.k==='v').map(emb).join('')+items.filter(m=>m.k!=='v').map(card).join('')});

/* ---------- referencias ---------- */
const REFS=[
 'Accor Business Travel. (s. f.). <i>11 tips for successful business negotiations in Italy</i>. https://businesstravel.accor.com/travelstyle-blog/business-trip-planning/11-tips-for-successful-business-negotiations-in-italy.en.shtml',
 'AOL / Reuters. (2026, 29 de enero). <i>Italian exports to US rise 7% in 2025 despite Trump\'s tariffs</i>. https://www.aol.com/articles/italian-exports-us-rise-7-114332370.html',
 'Aviacionline. (2024). <i>Nuevo puente entre Colombia e Italia: Neos inauguró sus vuelos a Cartagena</i>. https://aviacionline.com/nuevo-puente-entre-colombia-e-italia-neos-inauguro-sus-vuelos-a-cartagena',
 'Britannica. (s. f.-a). <i>Italy: Postwar economic development</i>. https://www.britannica.com/place/Italy/Postwar-economic-development',
 'Britannica. (s. f.-b). <i>Italy: Economic strength</i>. https://www.britannica.com/place/Italy/Economic-strength',
 'CEPR VoxEU. (2013). <i>Sovereign turmoil, private-sector woes: Italian sovereign spreads and their pass-through</i>. https://cepr.org/voxeu/columns/sovereign-turmoil-private-sector-woes-italian-sovereign-spreads-and-their-pass',
 'Cancillería de Colombia. (2024, 23 de diciembre). <i>Nueva conexión aérea entre Colombia e Italia: se estrenó la nueva ruta Milán-Cartagena de Indias-Milán</i>. https://cancilleria.gov.co/node/29996',
 'Center for Strategic and International Studies. (2023). <i>Italy withdraws from China\'s Belt and Road Initiative</i>. https://www.csis.org/analysis/italy-withdraws-chinas-belt-and-road-initiative',
 'Centro de Estudios Internacionales Gilberto Bosques. (s. f.). <i>Ceremonial y protocolo en el mundo: República Italiana</i>. Senado de la República (México). https://oficinadigital.senado.gob.mx/docs/ITALIA.pdf',
 'CIBT Visas. (s. f.). <i>A guide to business etiquette in Italy</i>. https://cibtvisas.com/blog/business-etiquette-italy',
 'Comisión Europea. (s. f.). <i>Acuerdo comercial UE-Colombia-Perú-Ecuador</i>. Access2Markets. https://trade.ec.europa.eu/access-to-markets/es/content/acuerdo-comercial-ue-colombia-ecuador-peru',
 'Commisceo Global. (s. f.). <i>The culture of doing business in Italy</i>. https://commisceo-global.com/blog/doing-business-in-italy-culture',
 'Country Navigator. (s. f.). <i>Top tips for doing business in Italy</i>. https://www.countrynavigator.com/blog/top-tips-for-doing-business-in-italy',
 'Cuadrado Esclapez, C. (2020). <i>Protocolo en las relaciones internacionales de la empresa y los negocios</i> (2.ª ed.). Fundación Confemetal.',
 'Cultural Atlas. (s. f.). <i>Italian culture: Business culture</i>. SBS. https://culturalatlas.sbs.com.au/italian-culture/italian-culture-business-culture',
 'Decreto Legislativo 21 maggio 2018, n. 62. Attuazione della direttiva (UE) 2015/2302 relativa ai pacchetti turistici e ai servizi turistici collegati. <i>Gazzetta Ufficiale</i> n. 129 (6 de junio de 2018).',
 'ECC-Net Italia. (s. f.). <i>Pacchetti turistici</i> [Folleto]. https://ecc-netitalia.it/wp-content/uploads/pdf_pubblicazioni/Pacchetti_turistici_leaflet.pdf',
 'EF Education First. (2026). <i>EF English Proficiency Index: Italy fact sheet</i>. https://www.ef.com/assetscdn/WIBIwq6RdJvcD9bc8RMd/cefcom-epi-site/fact-sheets/2026/ef-epi-fact-sheet-italy-english.pdf',
 'Expat Arrivals. (s. f.). <i>Doing business in Italy</i>. https://expatarrivals.com/europe/italy/doing-business-italy',
 'Frontex. (s. f.). <i>About ETIAS</i>. https://www.frontex.europa.eu/what-we-do/etias-ees/about-etias',
 'Geopop. (s. f.). <i>Come l\'Italia è diventata un paese industriale: breve storia del boom economico</i>. https://www.geopop.it/come-litalia-e-diventata-un-paese-industriale-breve-storia-del-boom-economico/',
 'Goldstein, A. (2003). <i>Privatization in Italy 1993-2002: Goals, institutions, outcomes, and outstanding issues</i> (CESifo Working Paper n.º 912). https://cesifo.org/DocDL/cesifo_wp912.pdf',
 'Hofstede Insights. (s. f.). <i>Country comparison tool: Italy and Colombia</i>. https://www.hofstede-insights.com/country-comparison-tool',
 'LaPresse. (2025, 13 de diciembre). <i>Exports, CGIA: Soaring despite tariffs, Italy ranks fourth among G20 countries</i>. https://uk.lapresse.it/economy-en/2025/12/13/exports-cgia-soaring-despite-tariffs-italy-ranks-fourth-among-g20-countries',
 'Lewis, R. D. (2006). <i>When cultures collide: Leading across cultures</i> (3.ª ed.). Nicholas Brealey.',
 'Ministerio de Comercio, Industria y Turismo. (2025). <i>Colombia, el País de la Belleza, rompió nuevo récord en turismo al recibir cerca de 6,7 millones de visitantes no residentes en 2024</i>. https://www.mincit.gov.co/prensa/noticias/turismo/colombia-rompio-nuevo-record-en-turismo-en-2024',
 'Ministerio de Relaciones Exteriores de Japón. (s. f.). <i>G7: Frequently asked questions</i>. https://www.mofa.go.jp/policy/economy/summit/hiroshima23/en/summit/about/faq/',
 'Ministerio de Comercio, Industria y Turismo. (s. f.). <i>Internacionalización y acceso a nuevos mercados</i>. https://www.mincit.gov.co/minindustria/estrategia-transversal/internacionalizacion-acceso-nuevos-mercados',
 'Ministero degli Affari Esteri e della Cooperazione Internazionale. (s. f.). <i>OECD</i>. https://www.esteri.it/en/temi/organizzazioni_internazionali/fora-organizzazioni-economiche-internazionali/ocse/',
 'MIT Professional Education. (s. f.). <i>Negotiating across cultures: How global differences shape expectations at the bargaining table</i>. https://professional.mit.edu/news/articles/negotiating-across-cultures-how-global-differences-shape-expectations-bargaining',
 '9Colonne. (2026). <i>Italy defies trade pressures with €50.7 billion surplus in 2025</i>. https://www.9colonne.it/602316/italy-defies-trade-pressures-with-50-7-billion-surplus-in-2025',
 'OCDE. (s. f.). <i>Italy</i>. https://www.oecd.org/italy/',
 'Organización Mundial del Comercio. (s. f.). <i>Italy and the WTO</i>. https://www.wto.org/english/thewto_e/countries_e/italy_e.htm',
 'Ortiz Velásquez, M. (2019). <i>Introducción a los negocios internacionales: conceptos y aplicaciones</i>. Universidad del Norte.',
 'PBS. (s. f.). <i>Commanding heights: Italy, trade policy</i>. https://www.pbs.org/wgbh/commandingheights/lo/countries/it/it_trade.html',
 'Pontificia Universidad Javeriana Cali. (2026). <i>Oportunidades de productos colombianos de moda y cuero en el mercado italiano</i> [Documento de investigación]. Repositorio Vitela. https://vitela.javerianacali.edu.co/items/66914818-49d4-44b8-afd2-f86f2b61bf58',
 'PR Newswire. (2025, 19 de noviembre). <i>Pubblicato l\'Indice di conoscenza dell\'inglese EF 2025</i>. https://www.prnewswire.com/it/comunicati-stampa/pubblicato-lindice-di-conoscenza-dellinglese-ef-2025-302618323.html',
 'ProChile. (2018). <i>Cómo hacer negocios en Italia</i>. https://acceso.prochile.cl/wp-content/uploads/2018/11/como_hacer_negocios_italia_2018.pdf',
 'ProChile. (2023). <i>Documento de mercado: Italia</i> [Publicado en ADEX Data Trade]. https://www.adexdatatrade.com/ADTFileServer/Publicaciones/607-8527eb32-84e4-409c-ad14-40b5714f098c.pdf',
 'ProColombia. (s. f.-a). <i>Guía de oportunidades</i>. https://procolombia.co/publicaciones/guia-de-oportunidades-bogota',
 'ProColombia. (s. f.-b). <i>Perfil logístico: Italia</i>. Colombia Trade. https://www.procolombia.co/colombiatrade/exportador/herramientas-del-exportador/perfil-logistico/italia',
 'ProColombia. (s. f.-c). <i>Lista la hoja de ruta para exportaciones agroindustriales a la Unión Europea</i>. https://www.procolombia.co/sala-de-prensa/noticias/lista-la-hoja-de-ruta-para-exportaciones-agroindustriales-la-union-europea',
 'ProColombia. (2025). <i>Perfil del turista: Italia</i>. https://empresarios.colombia.travel/es/system/tdf/emprasarios/pdf/perfil_turista_italia_es.pdf?file=1&force=&id=2451&type=node',
 'Regione Lazio. (2021). <i>Agenzie di viaggio e turismo: avviso sulla protezione in caso di insolvenza o fallimento</i>. https://regione.lazio.it/sites/default/files/2021-03/agenzie-viaggio-turismo-avviso-protezione-insolvenza-fallimento.pdf',
 'Semana. (2025, 9 de junio). <i>Colombia en el cine italiano: esta es la estrategia para promocionar el país como destino turístico en 29 ciudades de la nación europea</i>. https://www.semana.com/economia/capsulas/articulo/colombia-en-el-cine-italiano-esta-es-la-estrategia-para-promocionar-el-pais-como-destino-turistico-en-29-ciudades-de-la-nacion-europea/202536/',
 'Travel Daily News. (2026). <i>BIT outlines strategy for 2027 edition</i>. https://www.traveldailynews.com/fairs-exhibitions/bit-outlines-strategy-for-2027-edition/',
 'TTG Travel Experience. (s. f.). <i>TTG Travel Experience</i>. Italian Exhibition Group. https://www.ttgexpo.it/en',
 'Wanted in Rome. (2026, 8 de febrero). <i>Italy overtakes Japan to become the world\'s fourth largest exporter</i>. https://www.wantedinrome.com/news/italy-overtakes-japan-to-become-the-worlds-fourth-largest-exporter.html',
 'Which? (2026). <i>European visa waiver no longer confirmed for 2026</i>. https://www.which.co.uk/news/article/etias-visa-waiver-europe-aUyAH7U3Hd2p'
];
document.getElementById('refs').innerHTML=REFS.map(r=>`<p>${r.replace(/(https?:\/\/\S+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>')}</p>`).join('');

/* retícula decorativa de la portada */
const g=document.getElementById('grat');
let gh='';for(let x=-100;x<=800;x+=70)gh+=`<path d="M${x} 0 Q${x+40} 230 ${x} 460"/>`;for(let y=40;y<460;y+=60)gh+=`<path d="M0 ${y} Q350 ${y-24} 700 ${y}"/>`;g.innerHTML=gh;

show();
}

/* ================= capa de animación ================= */
{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt=n=>Math.round(n).toLocaleString('es-CO');
/* barra de progreso de lectura */
const pg=document.getElementById('progress');
const onScroll=()=>{const h=document.documentElement;const m=h.scrollHeight-h.clientHeight;pg.style.transform=`scaleX(${m>0?h.scrollTop/m:0})`};
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(!RM&&window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  const counters=root=>root.querySelectorAll('[data-count]').forEach(el=>{
    if(el.dataset.done)return;el.dataset.done=1;const end=+el.dataset.count;const o={v:0};
    gsap.to(o,{v:end,duration:1.6,ease:'power2.out',onUpdate:()=>{el.textContent=fmt(o.v)},scrollTrigger:{trigger:el,start:'top 92%',once:true}});
  });
  const seen=new Set();
  window.__anim=v=>{
    const secs=[...document.querySelectorAll(`section.view[data-v="${v}"]`)];
    const head=secs.flatMap(s=>[...s.querySelectorAll(':scope > .wrap > h1, :scope > .wrap > h2, :scope > .wrap > .finding, .hero h1, .hero .lead, .intro2')]);
    gsap.fromTo(head,{y:28,opacity:0},{y:0,opacity:1,duration:.8,stagger:.07,ease:'power3.out'});
    secs.forEach(counters);
    if(v==='inicio'){
      gsap.fromTo('#arcDraw',{attr:{'stroke-dashoffset':1}},{attr:{'stroke-dashoffset':0},duration:2.2,ease:'power2.inOut',delay:.2});
      gsap.fromTo('.ticket > div',{y:18,opacity:0},{y:0,opacity:1,duration:.6,stagger:.08,delay:.3,ease:'power2.out'});
    }
    if(v==='historia'&&!seen.has(v)){gsap.from('.tl-dot',{scale:0,duration:.5,stagger:.05,ease:'back.out(2.5)',delay:.2})}
    if(v==='cultura'&&!seen.has(v)){
      document.querySelectorAll('.hrow').forEach(r=>{
        gsap.from(r.querySelectorAll('.d, .v'),{left:'50%',opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:r,start:'top 92%',once:true}});
        gsap.from(r.querySelector('.seg'),{scaleX:0,transformOrigin:'50% 50%',duration:1.1,ease:'power3.out',scrollTrigger:{trigger:r,start:'top 92%',once:true}});
      });
    }
    if(v==='oportunidades'&&!seen.has(v)){
      document.querySelectorAll('[data-v="oportunidades"] .bars').forEach(b=>gsap.from(b.querySelectorAll('.f'),{width:0,duration:1.2,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:b,start:'top 90%',once:true}}));
    }
    if(v==='riesgos'&&!seen.has(v)){gsap.from('.chip',{scale:0,duration:.45,stagger:.04,ease:'back.out(2.5)',delay:.3})}
    seen.add(v);
    requestAnimationFrame(()=>ScrollTrigger.refresh());
  };
  ScrollTrigger.batch('.panel,.card,.risk,.tl-list li,.sector,.vid,.yt,.proto,.route li,.statband > div,.verdict,.casehead,table',{
    start:'top 94%',once:true,
    onEnter:b=>gsap.fromTo(b,{y:34,opacity:0},{y:0,opacity:1,duration:.7,stagger:.07,ease:'power3.out',overwrite:true})
  });
  /* leve parallax en la ilustración de portada */
  gsap.to('.hero .fig svg',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  const cur=(location.hash||'#inicio').slice(1);
  window.__anim(['inicio','historia','cultura','protocolo','riesgos','oportunidades','fuentes'].includes(cur)?cur:'inicio');
}
}
