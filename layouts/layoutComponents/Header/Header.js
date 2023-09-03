import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header = props => {
  const router = useRouter();

  const pages = [
    { title: 'Index', path: '/'},
    { title: 'Other', path: '/other'},
    { title: 'Third', path: '/third'},
  ]
  return (
  <>
    <p>Header</p>
    {pages.map(it => (
      router.pathname === it.path ? <span key={it.title}>{it.title}</span> : <Link key={it.title} prefetch={false} href={it.path}>{it.title}</Link>
    ))}
  </>
)};


export default Header;
