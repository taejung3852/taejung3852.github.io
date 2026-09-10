import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Header(){
 const [open,setOpen]=useState(false), [theme,setTheme]=useState(document.documentElement.dataset.theme || 'light');
 const menu=useRef(null), manual=useRef(false), location=useLocation();
 useEffect(()=>{try{manual.current=['light','dark'].includes(localStorage.getItem('theme'))}catch{}const media=matchMedia('(prefers-color-scheme: dark)');const update=e=>{if(!manual.current){setTheme(e.matches?'dark':'light')}};media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
 useEffect(()=>{setOpen(false)},[location]);
 function toggle(){const next=theme==='dark'?'light':'dark';manual.current=true;setTheme(next);try{localStorage.setItem('theme',next)}catch{}}
 return <><a className="skip-link" href="#main">본문 바로가기</a><header className="site-header shell"><nav aria-label="주 내비게이션"><Link className="wordmark" to="/">박태정</Link><div className="nav-actions" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);menu.current?.focus()}}}><div className={'nav-links'+(open?' is-open':'')} id="navigation"><Link to="/#projects" aria-current={location.hash==='#projects'?'location':undefined}>프로젝트</Link><Link to="/#about" aria-current={location.hash==='#about'?'location':undefined}>소개</Link><a href="/documents/taejung-resume.pdf" download onClick={()=>setOpen(false)}>이력서 <span aria-hidden="true">↗</span></a></div><button className="theme-toggle" onClick={toggle} aria-label={theme==='dark'?'라이트 모드로 전환':'다크 모드로 전환'} aria-pressed={theme==='dark'}><span className="theme-symbol" aria-hidden="true">◐</span><span className="theme-text">{theme==='dark'?'Dark':'Light'}</span></button><button ref={menu} className="menu-toggle" aria-label={open?'메뉴 닫기':'메뉴 열기'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'닫기':'메뉴'}</button></div></nav></header></>
}
