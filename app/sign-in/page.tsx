'use client';

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
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerAccountSchema, signInSchema } from '@/validation/schemas';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type CardProps = React.ComponentProps<typeof Card>;

interface FormValues {
  username: string;
  password: string;
}

const SignIn = ({ ...props }: CardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [response, setResponse] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const user: any = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (user.ok === true) {
        router.push('account');
      } else {
        setResponse('Wrong username or password');
      }
      setSubmiting(false);
    } catch (error) {
      setSubmiting(false);
      console.error(error);
    }
  };
  return (
    <main className="grid h-full place-items-center">
      <Container>
        <Card className={cn('mx-auto w-[380px]')} {...props}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className={cn('text-center')}>My Account</CardTitle>
              <CardDescription className={cn('text-center')}>
                Sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="text"
                placeholder="Email"
                {...register('username')}
              />
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
            </CardContent>
            <CardFooter className={cn('flex flex-col space-y-2')}>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
              <span>
                Don't have an account?{' '}
                <Link href="/register">
                  <Button variant={'link'}>Register</Button>
                </Link>
              </span>
            </CardFooter>
          </form>
        </Card>
      </Container>
    </main>
  );
};

export default SignIn;
