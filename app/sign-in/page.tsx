import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type CardProps = React.ComponentProps<typeof Card>;

const SignIn = ({ ...props }: CardProps) => {
  return (
    <main className="grid h-full place-items-center">
      <Container>
        <Card className={cn('mx-auto w-[380px]')} {...props}>
          <CardHeader>
            <CardTitle className={cn('text-center')}>My Account</CardTitle>
            <CardDescription className={cn('text-center')}>
              Sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </CardContent>
          <CardFooter className={cn('flex flex-col space-y-2')}>
            <Button className="w-full">Sign In</Button>
            <span>
              Don't have an account?{' '}
              <Link href="/register">
                <Button variant={'link'}>Register</Button>
              </Link>
            </span>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
};

export default SignIn;
