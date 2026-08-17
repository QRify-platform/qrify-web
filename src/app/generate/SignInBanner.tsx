import { beginLogin } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/Button';

export function SignInBanner() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border border-soot/15 px-4 py-3">
      <p className="text-sm text-steel">
        Generate freely — sign in only if you want to save to My codes.
      </p>
      <Button variant="outline" onClick={() => beginLogin(ROUTES.generate)}>
        Sign in
      </Button>
    </div>
  );
}
