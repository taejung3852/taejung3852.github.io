import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Header(){
 const [open,setOpen]=useState(false), [theme,setTheme]=useState(document.documentElement.dataset.theme || 'light'), [activeSection,setActiveSection]=useState(null);
 const menu=useRef(null), firstLink=useRef(null), location=useLocation();
 useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
 useEffect(()=>{setOpen(false)},[location]);
 useEffect(()=>{if(open) firstLink.current?.focus()},[open]);
 useEffect(()=>{
   let frame=0;
   const update=()=>{
     if(location.pathname!=='/') {setActiveSection(null);return;}
     const line=140;
     const active=['about','projects'].find(id=>{
       const rect=document.getElementById(id)?.getBoundingClientRect();
       return rect && rect.top<=line && rect.bottom>line;
     });
     setActiveSection(active||null);
   };
   const onscroll=()=>{
     if(frame)return;
     frame=requestAnimationFrame(()=>{frame=0;update()});
   };
   addEventListener('scroll',onscroll,{passive:true});
   addEventListener('resize',onscroll);
   onscroll();
   return()=>{
     removeEventListener('scroll',onscroll);
     removeEventListener('resize',onscroll);
     if(frame)cancelAnimationFrame(frame);
   };
 },[location.pathname,location.hash]);
 function toggle(){const next=theme==='dark'?'light':'dark';setTheme(next);try{localStorage.setItem('theme',next)}catch{}}
 return <><Link className="skip-link" to="#main" onClick={()=>document.getElementById('main')?.focus({preventScroll:true})}>본문 바로가기</Link><header className="site-header shell"><nav aria-label="주 내비게이션"><Link className="wordmark" to="/">박태정</Link><div className="nav-actions" onKeyDown={e=>{if(e.key==='Escape'&&open){e.preventDefault();setOpen(false);menu.current?.focus()}}}><div className={'nav-links'+(open?' is-open':'')} id="navigation"><Link ref={firstLink} to="/#projects" onClick={()=>setOpen(false)} aria-current={activeSection==='projects'?'location':undefined}>프로젝트</Link><Link to="/#about" onClick={()=>setOpen(false)} aria-current={activeSection==='about'?'location':undefined}>역량</Link><a href="/documents/taejung-resume.pdf" download onClick={()=>setOpen(false)}>이력서 <span aria-hidden="true">↗</span></a></div><button className="theme-toggle" onClick={toggle} aria-label={theme==='dark'?'라이트 모드로 전환':'다크 모드로 전환'} aria-pressed={theme==='dark'}><span className="theme-symbol" aria-hidden="true">◐</span><span className="theme-text">{theme==='dark'?'Dark':'Light'}</span></button><button ref={menu} className="menu-toggle" aria-label={open?'메뉴 닫기':'메뉴 열기'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'닫기':'메뉴'}</button></div></nav></header></>
}
