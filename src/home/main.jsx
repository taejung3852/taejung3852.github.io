import React, { useEffect, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration, Link, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import FowocoStudy from './components/FowocoStudy';
import OwnhandsStudy from './components/OwnhandsStudy';
import HwpxStudy from './components/HwpxStudy';
import GatewayStudy from './components/GatewayStudy';
import './styles/home-snap.css';
import Hero from './components/Hero';
import About from './components/About';
import CompanyContribution from './components/CompanyContribution';
import Credentials from './components/Credentials';
import { contribution } from './content/contribution';
import ProjectList from './components/ProjectList';
import { projects, projectSlugs } from './content/site';
import './styles/tokens.css';
import './styles/home.css';
function Home(){useLayoutEffect(()=>{document.documentElement.classList.add('home-reading');return()=>document.documentElement.classList.remove('home-reading')},[]);return <><Hero/><ProjectList sectionNumber="01"/><About sectionNumber="02"/><Credentials sectionNumber="03"/><CompanyContribution sectionNumber="04"/>{<footer className="site-footer shell"><Link to="/">박태정</Link><a href="/documents/taejung-resume.pdf" download>이력서 다운로드 <span aria-hidden="true">↗</span></a></footer>}</>}
function ProjectPlaceholder(){const {slug}=useParams();const p=projects[projectSlugs.indexOf(slug)];useEffect(()=>{if(slug==='fowoco')window.location.replace('/projects/fowoco/')},[slug]);if(!p)return <NotFound/>;return <section className="placeholder shell"><p className="section-index">프로젝트</p><h1>{p.name}</h1><p>상세 페이지를 준비하고 있습니다.</p><a className="text-link" href={p.href} target="_blank" rel="noreferrer">저장소 보기 ↗</a><Link className="text-link" to="/#projects">← 주요 프로젝트로 돌아가기</Link></section>}
function NotFound(){return <section className="placeholder shell"><p className="section-index">404</p><h1>페이지를 찾을 수 없습니다.</h1><Link className="text-link" to="/">홈으로 돌아가기 ↗</Link></section>}
function PageFooter(){const {pathname}=useLocation();if(pathname==='/'||['fowoco','hwpx','ownhands','llm-gateway'].some(slug=>pathname.replace(/\/$/,'')==='/projects/'+slug))return null;return <footer className="site-footer shell"><Link to="/">박태정</Link><a href="/documents/taejung-resume.pdf" download>이력서 다운로드 <span aria-hidden="true">↗</span></a></footer>}
function App(){return <><Header/><main id="main" tabIndex="-1"><Outlet/></main><PageFooter/><ScrollRestoration/></>}

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      { path: '/', element: <Home/> },
      { path: '/projects/fowoco', element: <FowocoStudy/> },
      { path: '/projects/hwpx', element: <HwpxStudy/> },
      { path: '/projects/ownhands', element: <OwnhandsStudy/> },
      { path: '/projects/llm-gateway', element: <GatewayStudy/> },
      { path: '/projects/:slug', element: <ProjectPlaceholder/> },
      { path: '*', element: <NotFound/> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);
