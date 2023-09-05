import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import HeaderStyled from './HeaderStyled';

const Header = props => {
  const router = useRouter();

  const pages = [
    { title: 'Index', path: '/'},
    { title: 'Other', path: '/other'},
    { title: 'Third', path: '/third'},
  ]
  return (
    <HeaderStyled>
      <h2 className='title'>Header</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
      </p>
      {pages.map(it => (
        router.pathname === it.path ? <span key={it.title}>{it.title}</span> : <Link key={it.title} prefetch={false} href={it.path}>{it.title}</Link>
      ))}
    </HeaderStyled>
  );
};


export default Header;
