import { Link, type LinkProps, useLocation } from "react-router-dom";

type NavLinks = LinkProps;

export function NavLink(props: NavLinks) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-6 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  );
}