import Link from 'next/link';

type AuthSwitchLinkProps = {
  prompt: string;
  href: string;
  label: string;
};

/** The "Need an account? Sign up" line at the bottom of the auth forms. */
export function AuthSwitchLink({ prompt, href, label }: AuthSwitchLinkProps) {
  return (
    <p className="mt-8 text-center text-sm text-bone/50">
      {prompt}{' '}
      <Link href={href} className="font-medium text-acid hover:underline">
        {label}
      </Link>
    </p>
  );
}
