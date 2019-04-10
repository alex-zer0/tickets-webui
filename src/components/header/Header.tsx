import React from 'react';
import './Header.scss';

export interface HeaderProps {
  title: string
  imageUrl: string
  pageTitle?: string
}

export default function Header(props: HeaderProps) {
  const { title, imageUrl, pageTitle } = props;
  return (
    <header className='Header'>
      <img className='Header__image' src={imageUrl} alt={name} />
      <h1 className='Header__title'>
        {title}
        {pageTitle && ' > ' + pageTitle}
      </h1>
    </header>
  );
}
