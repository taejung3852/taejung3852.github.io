import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import FowocoStudy from './components/FowocoStudy';
import ProjectStudy from './components/ProjectStudy';
import './styles/home-snap.css';
import Hero from './components/Hero';
import About from './components/About';
import CompanyContribution from './components/CompanyContribution';
import { contribution } from './content/contribution';
import ProjectList from './components/ProjectList';
import { projects, projectSlugs } from './content/site';
import './styles/tokens.css';
import './styles/home.css';
function LocationEffects(){const {pathname,hash}=useLocation();useEffect(()=>{if(hash){requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'instant'}))}else{window.scrollTo({top:0,behavior:'instant'})}},[pathname,hash]);return null}
function Home(){useEffect(()=>{document.documentElement.classList.add('home-reading');return()=>document.documentElement.classList.remove('home-reading')},[]);return <><Hero/><About/><ProjectList sectionNumber="02" showFooter={!contribution.enabled}/><CompanyContribution sectionNumber="03"/>{contribution.enabled&&<footer className="site-footer shell"><Link to="/">박태정</Link><a href="/documents/taejung-resume.pdf" download>이력서 다운로드 <span aria-hidden="true">↗</span></a></footer>}</>}
function ProjectPlaceholder(){const {slug}=useParams();const p=projects[projectSlugs.indexOf(slug)];useEffect(()=>{if(slug==='fowoco')window.location.replace('/projects/fowoco/')},[slug]);if(!p)return <NotFound/>;return <section className="placeholder shell"><p className="section-index">프로젝트</p><h1>{p.name}</h1><p>상세 페이지를 준비하고 있습니다.</p><a className="text-link" href={p.href} target="_blank" rel="noreferrer">저장소 보기 ↗</a><Link className="text-link" to="/#projects">← 주요 프로젝트로 돌아가기</Link></section>}
function NotFound(){return <section className="placeholder shell"><p className="section-index">404</p><h1>페이지를 찾을 수 없습니다.</h1><Link className="text-link" to="/">홈으로 돌아가기 ↗</Link></section>}
function PageFooter(){const {pathname}=useLocation();if(pathname==='/'||['fowoco','hwpx','ownhands','llm-gateway'].some(slug=>pathname.replace(/\/$/,'')==='/projects/'+slug))return null;return <footer className="site-footer shell"><Link to="/">박태정</Link><a href="/documents/taejung-resume.pdf" download>이력서 다운로드 <span aria-hidden="true">↗</span></a></footer>}
function App(){return <BrowserRouter><LocationEffects/><Header/><main id="main" tabIndex="-1"><Routes><Route path="/" element={<Home/>}/><Route path="/projects/fowoco" element={<FowocoStudy/>}/><Route path="/projects/hwpx" element={<ProjectStudy slug="hwpx"/>}/><Route path="/projects/ownhands" element={<ProjectStudy slug="ownhands"/>}/><Route path="/projects/llm-gateway" element={<ProjectStudy slug="llm-gateway"/>}/><Route path="/projects/:slug" element={<ProjectPlaceholder/>}/><Route path="*" element={<NotFound/>}/></Routes></main><PageFooter/></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
