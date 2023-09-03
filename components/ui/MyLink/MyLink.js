import Link from 'next/link';

const MyLink = props => {
  const { classes, children, aProps, clickHandler = () => {}, newWindow } = props;
  const openNewWindow = newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Link
      prefetch={false}
      {...props}
    >
      <a
        role="button"
        tabIndex={0}
        onClick={clickHandler}
        className={classes}
        {...aProps}
        {...openNewWindow}
      >
        {children}
      </a>
    </Link>
  );
};

export default MyLink;
